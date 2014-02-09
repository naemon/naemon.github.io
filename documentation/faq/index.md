---
layout: affix
title: FAQ
---

Frequently asked questions... If you don't find the answer here, it's either in
the [Users Guide](/documentation/usersguide), the [Developers Guide](/documentation/developers)
or not yet written. For the latter, see [](#)

### General

#### Why A Fork?

We like(d) Nagios Core, and we would have liked to contribute to its further
development - in fact, as part of our team you'll find administrators with
plenty of experience from huge Nagios installations, as well as many of the
developers who contributed towards turning Nagios 3 into Nagios 4, including
Andreas Ericsson, who wrote about 95% of those patches. Alas, for reasons that
appear to be related to politics/profit, we no longer feel welcome in the
Nagios Core community.

We do feel many of the many forks and rewrites Nagios has spawned have
interesting ideas, but many of them are organized in ways that are vulnerable
to creating the same kind of second-guessing of motivations. We would like to
continue to explore the ideas we started to explore in Nagios 4, in terms of
features, behaviour and functionality, and we would also like to explore
project structure as well. Still, we believe we have much in common with many
of the other projects, and hope that as we find our place in the open
monitoring ecosystem, we'll be able to create a fruitful cooperation and
exchange of ideas and code.

#### How Can I Help?

Help is much appreciated and possible in many ways. Details can be found on
the [community page](/community) page.

### Suite

### Core

### Thruk

### Livestatus

### Addons

### Development

### Documentation

#### Help Extending The Documentation

Helping writing documentation is really easy and much appreciated. Most pages
are written in either Markdown ([Cheat Sheet][markdown]) or HTML. The website
itself uses [bootstrap][bootstrap] for a simple and nice layout.

##### Small Changes
Small changes like typos can be corrected and submited directly on [github][githubdocs] via the edit button.
<p>![github edit button](images/githubedit.png "Github Edit Button")</p>
Just navigation to the page you want to change and send a pull request via the online editor of github.
Read more about the [online editor][githubedithelp]...


##### Larger Changes
Larger changes should be tested and reviewed locally before submiting them. Also
it's good practice to talk to a team member before spending large amounts of time
in things we eventually won't accept for whatever reasons.
The [developer guide](/documentation/developer/#documentation) contains instructions on
how to run a local Jekyll server.
When done, just submit a normal pull request.


[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[bootstrap]: http://getbootstrap.com/css/
[githubdocs]: https://github.com/naemon/naemon.github.io/tree/master/documentation
[githubedithelp]: https://github.com/blog/905-edit-like-an-ace
