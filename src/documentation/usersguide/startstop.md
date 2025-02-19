# Starting, reload and stopping Naemon

## See Also
- [Verifying Your Configuration](verifyconfig)

There's more than one way to start, reload, stop, and restart Naemon.
Here are some of the more common ones.

> [!TIP]
> Always make sure you [verify your configuration](verifyconfig) before you (re)start Naemon.

### Reloading Naemon
The most common scenario will probably be to reload Naemon after changes of Naemon configuration. You don't need to restart Naemon after you added new hosts, commands and services. Simply reload the configuration.

Basically all modern distributions ship with systemd these days.
```
systemctl reload naemon.service
```

#### Manually

You can reload the Naemon process by sending it a `SIGHUP` signal like so:
```
kill -HUP <naemon_pid>
```


### Starting Naemon

```
systemctl start naemon.service
```

#### Manually

   You can start the Naemon daemon manually with the `-d` command line option like so:

```bash
/usr/bin/naemon -d /etc/naemon/naemon.cfg
```


### Restarting Naemon

Restarting/reloading is necessary when you modify your configuration files and want those changes to take effect.

```
systemctl restart naemon.service
```

#### Web Interface:
You can restart the Naemon through the web interface by clicking the
`Process Info` navigation link and selecting `Restart the Backend process`.

![Restart the Backend process](/images/usersguide/pixel/stoprestart.png) {.img-bg}



### Stopping Naemon

```
systemctl stop naemon.service
```

#### Web Interface:
You can restart the Naemon through the web interface by clicking the
`Process Info` navigation link and selecting `Restart the Backend process`.

![Restart the Backend process](/images/usersguide/pixel/stoprestart.png) {.img-bg}

#### Manually
You can stop the Naemon process by sending it a `SIGTERM` signal like so:
```
kill <naemon_pid>
```
