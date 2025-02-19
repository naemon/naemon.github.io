# Configuration Overview

## See Also
- [Main Configuration File](configmain)
- [Object Configuration Overview](configobject)
- [CGI Configuration File](configcgi)
- [Standard Macros in Naemon](macrolist)


## Introduction

There are several different configuration files that you're going to need to create or edit before you start monitoring anything (except from the preconfigured test of the local host).  Be patient!  Configuring Naemon can take quite a while, especially if you're first-time user.  Once you figure out how things work, it'll all be well worth your time. <i class="fa-solid fa-face-smile"></i>

> [!TIP]
> Sample configuration files are installed in the `/etc/naemon/conf.d/` directory when you follow the [quickstart installation guide](quickstart).

![Config Overview](/images/usersguide/svg/configoverview.svg) {.img-bg}

## Main Configuration File

The main configuration file contains a number of directives that affect how the Naemon-core daemon operates.  This config file is read by both the Naemon daemon and Thruk, formerly known as "CGIs".  This is where you're going to want to get started in your configuration adventures. Thruk provides a simple way to edit Naemon configuration in the web interface without having to use the terminal.

Documentation for the main configuration file can be found [here](configmain).

## Resource File(s)

Resource files can be used to store user-defined macros.  The main point of having resource files is to use them to store sensitive configuration information (like passwords), without making them available to the CGIs.

You can specify one or more optional resource files by using the [resource_file](configmain#resource_file) directive in your main configuration file.

## Object Definition Files

Object definition files are used to define hosts, services, hostgroups, contacts, contactgroups, commands, etc.  This is where you define all the things you want monitor and how you want to monitor them.

You can specify one or more object definition files by using the [cfg_file](configmain#cfg_file) and/or [cfg_dir](configmain#cfg_dir) directives in your main configuration file.

An introduction to object definitions, and how they relate to each other, can be found [here](configobject).

## CGI Configuration File

The CGI configuration file contains a number of directives that affect the operation of the [CGIs](cgis).  It also contains a reference the main configuration file, so the CGIs know how you've configured Naemon and where your object definitions are stored.

Documentation for the CGI configuration file can be found [here](configcgi).
