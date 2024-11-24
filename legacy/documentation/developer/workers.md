---
layout: doctoc
title: Worker Processes
---

Everything related to worker processes.

### Philosophy
The idea behind separate worker processes is to achieve protected
parallelization. Protected because a worker being naughty shouldn't
affect the core process, and parallel because we use multiple
workers. Ideally between 1.5 and 3 per CPU core available to us.

Workers are free-standing processes, kept small, and with no
knowledge about Naemon's object structure or logic. The reason for
this is that small processes can achieve a lot more fork()s per
second than large processes (800/sec for a 300MB process against
13900/sec for a 1MB process). While workers can (and do) grow a
little bit in memory usage when it's running many checks in
parallel, they will still be a lot smaller than the primary Naemon
daemon, and the memory they occupy should be released once the
checks they're running are done.

### Protocol
Workers use a text-based protocol to communicate with workers. It's
fairly simple and very easy to debug. The breakdown goes as follows:

- A request consists of a sequence of key/value pairs.
- A key is separated from its value with an equal sign ('=').
- A key/value pair is separated from the next key/value pair with a
  nul byte ('\0').
- Each request is separated from the next with a message delimiter
  sequence made up by a one-byte followed by two nul bytes: "\1\0\0".
- Keys cannot contain equal signs.
  underscores and numbers.
- Values cannot contain nul bytes.
- Neither keys nor values can contain the message delimiter.
- A zero-length value is considered to be the empty string.

{{ site.info }}
Even though it's technically legal to put almost anything in the
key field, you should stick to mnemonic names when extending the
protocol and just use lower case letters and underscores.
{{ site.end }}

{{ site.info }}Keys are case sensitive. JOB_ID is *not* the same as job_id.{{ site.end }}

#### API's
Worker processes communicate with Naemon using libnaemon API's
exclusively. Since you're looking at a subpage of the documentation
for that documentation right now, I'll just assume you've found it.
Although using the libnaemon api's when writing a worker is
completely optional, it's highly recommended.

The key API's to use are:

- nsock - for connecting to and communicating through the qh socket
- kvvec - for parsing requests and building responses
- worker - for utils and stuff nifty to have if you're a worker
- runcmd - for spawning and reaping commands
- squeue - for maintaining a queue of the running job's timeouts
- iocache - for bulk-reading requests and parsing them
- iobroker - for multiplexing between running tasks and the master naemon process.

{{ site.info }}
In particular, have a look at the "parse_command_kvvec()" and
"finish_job()" functions in lib/worker.c. They will do a large part
of the request/response handling for you.
{{ site.end }}

### Registering a worker - The handshake
Workers register with Naemon through the queryhandler, using a query
sent to the wproc handler. Since the query handler reserves the nul
byte as a magic delimiter for its messages, this one time we use the
semicolon instead, as is almost-standard in the internal-only
queryhandlers. Typically, the default worker process registers with a
query such as this:

```
@wproc register name=Core Worker $pid;pid=$pid\0
```

Naemon will then respond with

```
OK\0
```

followed by a stream of commands.

Naemon currently understands the following (short) list of special
keys:

- pid - The pid of the worker process. Sometimes used to check if a worker is online
- name - Used to set the name of the worker
- max_jobs - Used to tell Naemon how many concurrent jobs this worker can handle
- plugin - basename() or absolute path of specific plugins that this worker wants to handle checks for.

{{ site.info }}
plugin can be given multiple times. It is valid for a single
single worker to say "plugin=check_snmp;plugin=check_iferrors", for
example.
{{ site.end }}

{{ site.info }}
Many workers can register for the same plugin(s). They will
share the load in round-robin fashion.
{{ site.end }}

Complete C-code for registering a generic worker with Naemon follows:

```c
static int naemon_core_worker(const char *path)
{
	int sd, ret;
	char response[128];

	is_worker = 1;

	set_loadctl_defaults();

	sd = nsock_unix(path, NSOCK_TCP | NSOCK_CONNECT);
	if (sd < 0) {
		printf("Failed to connect to query socket '%s': %s: %s\n",
			   path, nsock_strerror(sd), strerror(errno));
		return 1;
	}

	ret = nsock_printf_nul(sd, "@wproc register name=Core Worker %d;pid=%d", getpid(), getpid());
	if (ret < 0) {
		printf("Failed to register as worker.\n");
		return 1;
	}

	ret = read(sd, response, 3);
	if (ret != 3) {
		printf("Failed to read response from wproc manager\n");
		return 1;
	}
	if (memcmp(response, "OK", 3)) {
		read(sd, response + 3, sizeof(response) - 4);
		response[sizeof(response) - 2] = 0;
		printf("Failed to register with wproc manager: %s\n", response);
		return 1;
	}

	enter_worker(sd, start_cmd);
	return 0;
}
```

The "enter_worker()" part actually refers to a libnaemon function that
lives in worker.c. The set_loadctl_defaults() call can be ignored.
It's primarily intended to give sane defaults about how many jobs we
can run, so we (in theory) can tell Naemon that we're swamped in case
we run out of file descriptors or child processes.




#### Requests
A complete request looks like this (with C-style format codes
replaced with actual values):

```
job_id=%d\0type=%d\0command=%s\0timeout=%u\0\1\0\0
```

Note that values can contain equal signs, but cannot contain nul
bytes, and cannot contain the message delimiter sequence.
By including naemon/lib/worker.h and using worker_ioc2msg() followed
by worker_kvvec2buf_prealloc(), you will get a parsed key/value vector
handed to you. Have a look in base/workers.c to see how it's done for
the core workers.

#### Responses
Once the worker is done running a task, it hands over the result to
the master Naemon process and forgets it ever ran the job. The workers
take no further action, regardless of how the task went. The exception
is if the job timed out, or if the worker failed to even start the job,
in which case it should report the error to Naemon and only *then*
forget it ever got the job.

The response is identical to the request in formatting but differs in
the understood keys. The request sent from Naemon to the worker must
precede the other result variables. In particular, the job_id must be
the first variable Naemon sees for it to parse the result as a job
result rather than as something else.

The variables required for the response to a successfully executed job
on a registered worker process are as follows:

- job_id - The job id (as received by Naemon)
- type - The job type (as Naemon sent it)
- start - Timeval struct for start value in $sec.$usec format
- stop - Timeval struct for stop time in $sec.$usec format
- runtime - Floating point value of runtime, in seconds
- outstd - Output caught on stdout
- outerr - Output caught on stderr
- exited_ok - Boolean flag to denote if the job exited ok. A non-zero return code can still be achieved
- wait_status - Integer, as set by the wait() family of system calls

The following should only be present when the worker is unable to
execute the check due to an error, or when it cannot provide all the
variables required for a successfully executed job due to arbitrary
system errors:

- error_msg - An error message generated by the worker process
- error_code - The error code generated by the worker process

error_code 62 (ETIME - Timer expired) is reserved and means that the
job timed out.

{{ site.warn }}
*never* invent error codes in the range 0-10000, since we'll
want to reserve that for special cases.
{{ site.end }}

The following are completely optional (for now):

- command - The command we executed
- timeout - The timeout Naemon requested for this job
- ru_nsignals - The ru_nsignals field from the rusage struct
- ru_nswap - The ru_nswap field from the rusage struct
- ru_minflt - The ru_minflt field from the rusage struct
- ru_majflt - The ru_majflt field from the rusage struct
- ru_stime - The ru_stime field from the rusage struct
- ru_utime - The ru_utime field from the rusage struct
- ru_inblock - The ru_inblock field from the rusage struct
- ru_oublock - The ru_oublock field from the rusage struct

The meaning of the fields of the rusage struct can be viewed in the
section 2 man-page for the getrusage() system call. Normally, you
would access it by executing the following command:

```
man 2 getrusage
```

Note that most systems do not support all the fields of the rusage
struct and may leave them empty if so.

### Logging
Worker processes can send events to the main Naemon process that
will end up in the naemon.log file. The format is the same as that in
requests and responses, but a log-message consists of a single
key/value pair, where the key is always 'log'. Consequently, a request
from a worker to the main process to log something looks like this:

```
log=A random message that will get logged to naemon.log\0
```

It's worth noting that Naemon will prefix the message with the worker
process name, so as to make grep'ing easy when debugging experimental
workers.

### Protocol Exchange Example
A register + execution of one job on a worker process will, with the
standard Naemon core worker look like this, after the worker process
has connected to the query handler socket but before it has sent
anything. Note that the nul-bytes separating key/value pairs have been
replaced with newline to enhance readability. Also note that this
depicts only the required steps, which go as follows:

```
Step 1, Worker:
  @wproc register name=Worker Hoopla;max_jobs=100;pid=6196\0
Step 2, Naemon:
  OK\0
Step 3, Naemon:
  job_id=0
  type=2
  timeout=60
  command=/opt/plugins/check_ping -H localhost -w 40%,100.0 -c 60%,200.0
  \1\0\0
Step 4, Worker:
  job_id=0
  type=2
  timeout=60
  start=1355231532.000123
  stop=1355231532.994343
  runtime=0.994120
  exited_ok=1
  outstd=OK: RTA: 12.6ms; PL: 0%|rta=12.6ms;100.0;200.0;0;; pl=0%;40;60
  wait_status=0
  outerr=
  \1\0\0
```

Steps 3 and 4 in this chain repeat indefinitely.

