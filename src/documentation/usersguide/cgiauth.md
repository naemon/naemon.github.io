# Authentication And Authorization In The CGIs

> [!DANGER] The CGIs have been removed from Naemon
> The documentation is only here for legacy reasons. Please see the [Addons](addons) page for alternatives.

* Issuing Naemon process commands via the [command CGI](cgis#cmd_cgi)
* Viewing host group, contact, contact group, time period, and command definitions via the [configuration CGI](cgis#config_cgi)

You will undoubtedly want to access this information, so you'll have to assign additional rights for yourself
(and possibly other users) as described below...

## Granting Additional Permissions To CGI Information

You can grant *authenticated contacts* or other *authenticated users* permission to additional information in the CGIs
by adding them to various authorization variables in the [CGI configuration file](configcgi).
I realize that the available options don't allow for getting really specific about particular permissions, but its better than nothing..

Additional authorization can be given to users by adding them to the following variables in the CGI configuration file...

Grant access by contact:

- [authorized for system information](configcgi#authorized_for_system_information)
- [authorized for system commands](configcgi#authorized_for_system_commands)
- [authorized for configuration information](configcgi#authorized_for_configuration_information)
- [authorized for all hosts](configcgi#authorized_for_all_hosts)
- [authorized for all host commands](configcgi#authorized_for_all_host_commands)
- [authorized for all services](configcgi#authorized_for_all_services)
- [authorized for all service commands](configcgi#authorized_for_all_service_commands)

Grant access by group:

- [authorized contactgroup for system information](configcgi#authorized_for_system_information)
- [authorized contactgroup for system commands](configcgi#authorized_for_system_commands)
- [authorized contactgroup for configuration information](configcgi#authorized_for_configuration_information)
- [authorized contactgroup for all hosts](configcgi#authorized_for_all_hosts)
- [authorized contactgroup for all host commands](configcgi#authorized_for_all_host_commands)
- [authorized contactgroup for all services](configcgi#authorized_for_all_services)
- [authorized contactgroup for all service commands](configcgi#authorized_for_all_service_commands)



## CGI Authorization Requirements

If you are confused about the authorization needed to access various information in the CGIs,
read the _**Authorization Requirements**_ section for each CGI as described [here](cgis).

## Authentication On Secured Web Servers

If your web server is located in a secure domain (i.e., behind a firewall) or if you are using SSL, you can define a
default username that can be used to access the CGIs.  This is done by defining the [default_user_name](configcgi#default_user_name)
option in the [CGI configuration file](configcgi).  By defining a default username that can
access the CGIs, you can allow users to access the CGIs without necessarily having to authenticate to the web server.
You may want to use this to avoid having to use basic web authentication, as basic authentication transmits passwords
in clear text over the Internet.

**Important:**  Do *not* define a default username unless you are running a secure web server and are sure that everyone
who has access to the CGIs has been authenticated in some manner. If you define this variable, anyone who has not
authenticated to the web server will inherit all rights you assign to this user!
