---
layout: doctoc
title: Naemon Event Broker Modules (NEB)
---

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
#include <naemon/naemon.h>

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

Also have a look at real world examples:

* [https://github.com/naemon/naemon-livestatus](https://github.com/naemon/naemon-livestatus) (Naemon Livestatus API)
* [https://github.com/naemon/naemon-vimcrypt-vault-broker](https://github.com/naemon/naemon-vimcrypt-vault-broker) (Naemon vim vault macros)
* [https://github.com/sni/mod_gearman](https://github.com/sni/mod_gearman) (Distributed checks with Gearman)
* [https://github.com/ITRS-Group/monitor-merlin](https://github.com/ITRS-Group/monitor-merlin) (Loadbalancing in Naemon)
* [https://github.com/statusengine/module](https://github.com/statusengine/module) (Export status information as JSON)
* [https://github.com/ConSol/go-neb-wrapper](https://github.com/ConSol/go-neb-wrapper) (Go framework to write neb modules in Golang)


### Callback Types

#### NEBCALLBACK_VAULT_MACRO_DATA

The vault callback can be used to dynamically set macro values. The module registers
a single callback which sets the value of the supplied data structure.

```C
#include <naemon/naemon.h>
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
