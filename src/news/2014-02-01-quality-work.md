---
title: "Quality work"
date:   2014-02-01
layout: news
prev:
    text: 'News'
    link: '/news/'
next: false
editLink: false
---

One of our frustrations with Nagios is that while it does have a lot of tests, very few of them actually pass. That's OK, though, because they're executed very rarely.

Our plans for the future involve quite a bit of rewriting things behind the scenes, without any of our users noticing it. This is absolutely impossible to do without a much more serious QA effort.

Every night, the awesome [Consol build cluster][labslogs] creates nightly packages for our primary platforms, and runs tests on them. There are currently 13 different OSes with two arches each, adding up to 26 different builds. As they also build binary packages, this makes it easy for others to do further testing. The whole process takes hours

But hours every night isn't acceptable. We also need a modern CI system, with near-instant feedback on changes, which we have, thanks to [travis][travisorg]. Several different [core][traviscore] suites, as well as a few [overall][travisoverall] suites, are run per commit. This notifies us as soon as a test breaks and keeps quality and testing at the top of our minds.

While we have a lot of untested code today, going forward, there's no reason for you not to include tests in your pull requests.

[labslogs]: http://labs.consol.de/naemon/logs/
[travisorg]: http://travis-ci.org
[travisoverall]: https://travis-ci.org/naemon/naemon
[traviscore]: https://travis-ci.org/naemon/naemon-core
