# Naemon Event Broker Modules (NEB)

Everything related to Naemon event broker modules (NEB).

### Philosophy
The idea behind NEB modules is to provide a way to extend Naemon at a very
low level. NEB modules are shared objects (mostly written in C) which are
loaded into memory on runtime. These modules can then hook callbacks into
certain events. Arguments and return codes depend on the event type.

### Example

This is the most basic NEB module, it needs a `nebmodule_init` and
a `nebmodule_deinit` function. It simply logs a welcome message and does
nothing else.

Usually callbacks would be registered during the init function.

```C
// module.c

#include <naemon/naemon.h>

NEB_API_VERSION(CURRENT_NEB_API_VERSION);
static void *neb_handle = NULL;

int nebmodule_init(int flags, char *arg, nebmodule *handle) {
    neb_handle = (void *)handle;
    nm_log(NSLOG_INFO_MESSAGE, "module loaded");

    return OK;
}

int nebmodule_deinit(int flags, int reason) {
    return OK;
}
```

compile with:
```bash
  %> gcc $(pkg-config --cflags naemon) -shared -fPIC  module.c -o module.o
```

And load the module from your `naemon.cfg` with:
```
broker_module=..../module.o
```

If everything worked, you should see something like this in your `naemon.log`

```
[1636297273] module loaded
[1636297273] Event broker module '/omd/sites/demo/var/tmp/mymodule.o' initialized successfully.
```


### Real World Examples

Also have a look at real world examples:

* [https://github.com/naemon/naemon-livestatus](https://github.com/naemon/naemon-livestatus) (Naemon Livestatus API)
* [https://github.com/naemon/naemon-vimcrypt-vault-broker](https://github.com/naemon/naemon-vimcrypt-vault-broker) (Naemon vim vault macros)
* [https://github.com/sni/mod_gearman](https://github.com/sni/mod_gearman) (Distributed checks with Gearman)
* [https://github.com/ITRS-Group/monitor-merlin](https://github.com/ITRS-Group/monitor-merlin) (Loadbalancing in Naemon)
* [https://github.com/statusengine/module](https://github.com/statusengine/module) (Export status information as JSON)
* [https://github.com/ConSol/go-neb-wrapper](https://github.com/ConSol/go-neb-wrapper) (Go framework to write neb modules in Golang)


### Callback Types

#### `NEBCALLBACK_VAULT_MACRO_DATA`

The vault callback can be used to dynamically set macro values. The module registers
a single callback which sets the value of the supplied data structure.

```C
// module.c

#include <naemon/naemon.h>
NEB_API_VERSION(CURRENT_NEB_API_VERSION);
static void *neb_handle = NULL;
static int handle_vault_macro(int cb, void *_ds) {
	nebstruct_vault_macro_data *ds = (nebstruct_vault_macro_data *)_ds;
	nm_free(ds->value);
	ds->value = strdup("example macro value");
	return OK;
}
int nebmodule_init(__attribute__((unused)) int flags, char *arg, nebmodule *handle) {
	neb_handle = (void *)handle;
	event_broker_options = BROKER_EVERYTHING;
	neb_register_callback(NEBCALLBACK_VAULT_MACRO_DATA, neb_handle, 0, handle_vault_macro);
	return OK;
}
int nebmodule_deinit(__attribute__((unused)) int flags, __attribute__((unused)) int reason) {
	return OK;
}

```

compile with:
```bash
  %> gcc $(pkg-config --cflags naemon) -shared -fPIC  module.c -o module.o
```

And load the module from your `naemon.cfg` with:
```
broker_module=/path/to/module.o
```


### Event Types

Every callback receives a struct whose `type` field holds one of the
`NEBTYPE_*` constants from `naemon/broker.h`. Types marked *not sent* exist
for compatibility, but Naemon never emits them.

#### Not tied to a callback

- `NEBTYPE_NONE`, `_HELLO`, `_GOODBYE`, `_INFO` (0–3): not sent

#### `NEBCALLBACK_PROCESS_DATA`

- `NEBTYPE_PROCESS_START` (100): the configuration is loaded and `objects.cache` written
- `NEBTYPE_PROCESS_DAEMONIZE` (101): Naemon has daemonized
- `NEBTYPE_PROCESS_RESTART` (102): the event loop ended for a restart
- `NEBTYPE_PROCESS_SHUTDOWN` (103): Naemon shuts down, normally or after a startup error
- `NEBTYPE_PROCESS_PRELAUNCH` (104): modules are loaded, before the configuration is read
- `NEBTYPE_PROCESS_EVENTLOOPSTART` (105): the event loop is about to start
- `NEBTYPE_PROCESS_EVENTLOOPEND` (106): the event loop has ended

#### `NEBCALLBACK_TIMED_EVENT_DATA`

- `NEBTYPE_TIMEDEVENT_*` (200–205): not sent

#### `NEBCALLBACK_LOG_DATA`

- `NEBTYPE_LOG_DATA` (300): a line is written to the log
- `NEBTYPE_LOG_ROTATION` (301): not sent

#### `NEBCALLBACK_SYSTEM_COMMAND_DATA`

- `NEBTYPE_SYSTEM_COMMAND_START`, `_END` (400, 401): not sent

#### `NEBCALLBACK_EVENT_HANDLER_DATA`

- `NEBTYPE_EVENTHANDLER_START` (500): an event handler is started
- `NEBTYPE_EVENTHANDLER_END` (501): an event handler was handed to a worker

#### `NEBCALLBACK_NOTIFICATION_DATA`

- `NEBTYPE_NOTIFICATION_START` (600): a host or service notification begins
- `NEBTYPE_NOTIFICATION_END` (601): a host or service notification is done

#### `NEBCALLBACK_CONTACT_NOTIFICATION_DATA`

- `NEBTYPE_CONTACTNOTIFICATION_START` (602): a contact is about to be notified
- `NEBTYPE_CONTACTNOTIFICATION_END` (603): a contact has been notified

#### `NEBCALLBACK_CONTACT_NOTIFICATION_METHOD_DATA`

- `NEBTYPE_CONTACTNOTIFICATIONMETHOD_START` (604): a contact's notification command is about to run
- `NEBTYPE_CONTACTNOTIFICATIONMETHOD_END` (605): a contact's notification command was handed to a worker

#### `NEBCALLBACK_SERVICE_CHECK_DATA`

- `NEBTYPE_SERVICECHECK_INITIATE` (700): a service check is about to go to a worker; `NEBERROR_CALLBACKOVERRIDE` takes it over, `NEBERROR_CALLBACKCANCEL` postpones it
- `NEBTYPE_SERVICECHECK_PROCESSED` (701): a service check result has been processed
- `NEBTYPE_SERVICECHECK_RAW_START`, `_RAW_END` (702, 703): not sent
- `NEBTYPE_SERVICECHECK_ASYNC_PRECHECK` (704): before a scheduled service check is prepared; same return codes as `INITIATE`

#### `NEBCALLBACK_HOST_CHECK_DATA`

- `NEBTYPE_HOSTCHECK_INITIATE` (800): a host check is about to go to a worker; `NEBERROR_CALLBACKOVERRIDE` takes it over, `NEBERROR_CALLBACKCANCEL` postpones it
- `NEBTYPE_HOSTCHECK_PROCESSED` (801): a host check result has been processed
- `NEBTYPE_HOSTCHECK_RAW_START`, `_RAW_END` (802, 803): not sent
- `NEBTYPE_HOSTCHECK_ASYNC_PRECHECK` (804): before a scheduled host check is prepared; same return codes as `INITIATE`
- `NEBTYPE_HOSTCHECK_SYNC_PRECHECK` (805): not sent

#### `NEBCALLBACK_COMMENT_DATA`

- `NEBTYPE_COMMENT_ADD` (900): a comment was added
- `NEBTYPE_COMMENT_DELETE` (901): a comment was deleted, or dropped while reading retention data
- `NEBTYPE_COMMENT_LOAD` (902): a comment is put into memory: when read from retention data, and right before `COMMENT_ADD`

#### `NEBCALLBACK_FLAPPING_DATA`

- `NEBTYPE_FLAPPING_START` (1000): a host or service started flapping
- `NEBTYPE_FLAPPING_STOP` (1001): it stopped flapping, or flap detection was disabled for it

#### `NEBCALLBACK_DOWNTIME_DATA`

- `NEBTYPE_DOWNTIME_ADD` (1100): a downtime was scheduled
- `NEBTYPE_DOWNTIME_DELETE` (1101): a downtime was removed
- `NEBTYPE_DOWNTIME_LOAD` (1102): a downtime is put into memory: when read from retention data, and right before `DOWNTIME_ADD`
- `NEBTYPE_DOWNTIME_START` (1103): a downtime began
- `NEBTYPE_DOWNTIME_STOP` (1104): a downtime ended or was cancelled

#### `NEBCALLBACK_PROGRAM_STATUS_DATA`

- `NEBTYPE_PROGRAMSTATUS_UPDATE` (1200): program-wide status changed

#### `NEBCALLBACK_HOST_STATUS_DATA`

- `NEBTYPE_HOSTSTATUS_UPDATE` (1201): host status changed, see below
- `NEBTYPE_HOSTSTATUS_SCHEDULE` (1204): only the host's next check was (re)scheduled, see below

#### `NEBCALLBACK_SERVICE_STATUS_DATA`

- `NEBTYPE_SERVICESTATUS_UPDATE` (1202): service status changed, see below
- `NEBTYPE_SERVICESTATUS_SCHEDULE` (1205): only the service's next check was (re)scheduled, see below

#### `NEBCALLBACK_CONTACT_STATUS_DATA`

- `NEBTYPE_CONTACTSTATUS_UPDATE` (1203): contact status changed

#### `NEBCALLBACK_ADAPTIVE_PROGRAM_DATA`

- `NEBTYPE_ADAPTIVEPROGRAM_UPDATE` (1300): a program-wide setting was changed at runtime

#### `NEBCALLBACK_ADAPTIVE_HOST_DATA`

- `NEBTYPE_ADAPTIVEHOST_UPDATE` (1301): a host attribute was changed at runtime

#### `NEBCALLBACK_ADAPTIVE_SERVICE_DATA`

- `NEBTYPE_ADAPTIVESERVICE_UPDATE` (1302): a service attribute was changed at runtime

#### `NEBCALLBACK_ADAPTIVE_CONTACT_DATA`

- `NEBTYPE_ADAPTIVECONTACT_UPDATE` (1303): a contact attribute was changed at runtime

#### `NEBCALLBACK_EXTERNAL_COMMAND_DATA`

- `NEBTYPE_EXTERNALCOMMAND_START` (1400): an external command is about to be processed
- `NEBTYPE_EXTERNALCOMMAND_END` (1401): an external command has been processed

#### `NEBCALLBACK_AGGREGATED_STATUS_DATA`

- `NEBTYPE_AGGREGATEDSTATUS_STARTDUMP` (1500): the periodic `status.dat` dump starts
- `NEBTYPE_AGGREGATEDSTATUS_ENDDUMP` (1501): the periodic `status.dat` dump is done

#### `NEBCALLBACK_RETENTION_DATA`

- `NEBTYPE_RETENTIONDATA_STARTLOAD` (1600): retention data is about to be read
- `NEBTYPE_RETENTIONDATA_ENDLOAD` (1601): retention data has been read
- `NEBTYPE_RETENTIONDATA_STARTSAVE` (1602): retention data is about to be written
- `NEBTYPE_RETENTIONDATA_ENDSAVE` (1603): retention data has been written

#### `NEBCALLBACK_ACKNOWLEDGEMENT_DATA`

- `NEBTYPE_ACKNOWLEDGEMENT_ADD` (1700): a host or service problem was acknowledged
- `NEBTYPE_ACKNOWLEDGEMENT_REMOVE`, `_LOAD` (1701, 1702): not sent

#### `NEBCALLBACK_STATE_CHANGE_DATA`

- `NEBTYPE_STATECHANGE_START` (1800): not sent
- `NEBTYPE_STATECHANGE_END` (1801): a host or service changed state

#### Status updates and schedule events

Since NEB API version 9, host and service status events come in two types.
`NEBTYPE_*STATUS_UPDATE` means something about the object changed: a check
result, a downtime, an acknowledgement, flapping, an external command or a
notification. `NEBTYPE_*STATUS_SCHEDULE` is sent when the object only got a
new `next_check`. Each scheduled check used to send two identical-looking
updates, see [#162](https://github.com/naemon/naemon-core/issues/162).

Both carry a complete snapshot of the object. A schedule event usually differs
only in `next_check`, but can also carry a fresh check result.

A module that stores status can skip schedule events: an update follows every
check result. The exception is a check that is scheduled but then does not
run (host down, outside the check period, failed dependencies, checks
disabled). For those objects only the schedule event fires, so skipping it
leaves their `next_check` stale. Modules that ignore the type see both events
as before.

