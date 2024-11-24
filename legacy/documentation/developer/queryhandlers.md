---
layout: doctoc
title: Query Handler
---

A brief intro to the Naemon query handler system

### Purpose
The purpose of the query handler is to provide Naemon Core and its
eventbroker modules with the ability to communicate directly with
the outside world through a well-defined API, as well as allowing
external apps a way to help out with various Naemon tasks.

### Caveats
The query handlers run in the main thread. Naemon doesn't provide any
parallelism here and main Naemon will be blocked while a query is
running. As such, it's a very good idea to make ones queryhandlers
complete in as little time as possible.

### Registering a query handler
This is really for module authors only.

To register a query handler, you *must* have a function like the one
below:
the following arguments:

```c
int lala_query_handler(int sd, char *query, unsigned int query_len)
```

The parameters don't have to have those exact names, and the function
certainly doesn't have to be called "lala_query_handler()". We're not
quite that childish (well, we are, but we like to pretend we're not).
They will suffice for this explanation, however.

- sd - The socket you should respond to.
- query - The query, minus the address and the magic byte.
- query_len - Length of the query, in bytes.

The call to register it with Naemon so you get all queries directed
to the 'lala' address is then:

```c
qh_register_handler("lala", "The LaLa query handler", 0, lala_query_handler);
```

The second argument is a description, which will be printed when
someone sends a help request.

{{ site.info }}
It's a good idea to handle queries such as "help" and take
them to mean "print me some text telling me at least the basics
of how to use this query handler".
{{ site.end }}


### Syntax
The query language is remarkably simple (although each handler may
implement its own parsers that handle and do pretty much whatever
they want). The first byte is magic. If it's an at-sign, we expect
the queryer to persist and issue more queries after the first one.
If it's a hash-sign, the query handler will disconnect the client
as soon as it regains control from whatever handler registered for
the particular address. Each particular handler has some control
over this behaviour though, and can use specific return codes to
denote that it will take over the socket from the query handler.
If no at-sign and no hash-sign is present at the first byte, the
-1'th byte will be considered an at-sign, and the connection will
consequently be considered persistent.

#### Example queries
Subscribe for real-time push-events for servicechecks from the NERD radio:

```
@nerd subscribe servicechecks\0
```

One-shot query the core query handler for current load-control options:

```
#core loadctl\0
```

Get Naemon to say hi to you:

```
#echo Greetings, Exalted One
```

Ask the help handler to list registered handlers:

```
#help list
```


### In-core query handlers
There are a few in-core query handlers.

#### The help service
The help query handler is quite possibly the most important one. It
can be used to list registered handlers (with short descriptions),
and can be used to get help about registered handlers (assuming
they've implemented it, that is). It should be noted that the ones
that *have* implemented it can also be queried directly for their
help output, like so:

```
@core help
```


#### The echo service
As I'm sure you've already guessed, the echo service just prints the
inbound data right back at you. While that's not exactly nobel prize
winning material, it's actually pretty nifty to figure out how fast
Naemon can parse its inbound data, which in turn shows how fast it can
handle its inbound checkresults, which puts an upper cap on how many
checks Naemon can handle at any given time (although short bursts that
exceed that limit are ok and will be handled just fine).

It can be addressed as such:

```
@echo foo bar baz said the bunny\0
```

#### Naemon Event Radio Dispatcher
The nerd radio is a core part of Naemon and but is current lacking further
documentation.


#### Worker process manager
The worker process manager lets you register workers that can help out
with running checks, send notifications, run eventhandlers or whatever.

In order to register a worker that only handles checks supposed to be
run by the plugins check_foo and check_bar (irrespective of where in
the paths they are), you'd do something like this:

```
@wproc register name=foobar;plugin=check_foo;plugin=check_bar\0
```
