---
layout: default
title: Downloads
---

### Stable release

<div class="alert alert-success"><i class="glyphicon glyphicon-download-alt"></i> Latest stable release: <b>{{ site.release_version }}</b>, released {{ site.release_date }}</div>

We have build binary packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu which are available
via the [Consol repository](http://labs.consol.de/repo/stable/). After the repository has been setup, you just
have to  install the `naemon` package with your package manager.

The binary packages can also be downloaded here:

<table>
 <tr>
   <td><img src="../images/centos.png"></td>
   <td>CentOS</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/">CentOS 6</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel5/">CentOS 5</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles11sp3/">11 SP3</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles11sp2/">11 SP2</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles11sp1/">11 SP1</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/debian.png"></td>
   <td>Debian</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/">8 Jessie</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/">7 Wheezy</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/">6 Squeeze</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/">13.10 Saucy</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/">13.04 Raring</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/">12.10 Quantal</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/">12.04 Precise</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/">10.04 Lucid</a>
   </td>
 </tr>
</table>

<a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/src/">Source tarball and source RPM packages can be downloads here.</a>

### Development snapshot
For new user, we recommend you grab one of our nightly binary snapshots. You can also build yourself from source.

Travis-CI core build status: <a href="https://travis-ci.org/naemon/naemon-core" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon-core.png?branch=master"></a><br />
Travis-CI suite build status: <a href="https://travis-ci.org/naemon/naemon" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon.png?branch=master"></a>

#### Binary packages
We build nightly packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu. First [install the Consol testing repository](http://labs.consol.de/repo/testing/), and then install the `naemon` package with your package manager.

#### Source
Download the latest development source code from [github](http://github.com/naemon/naemon).

### Getting started

See the [getting started](/documentation/usersguide/toc.html#getting_started) document in the users guide.

#### Download Statistics
As true monitoring people we love statistics:

<style type="text/css">
.yaxisLabel {
  left: 2px;
  top: 50%;
  transform: rotate(-90deg);
  transform-origin: 0 0 0;
}
.axisLabel {
  font-size: 12px;
  position: absolute;
  text-align: center;
}
DIV.legend TD {
  border: 0;
}
</style>
<div id="downloadstats" style="width:1000px; height: 300px;"></div>
<script language="javascript" type="text/javascript" src="/ressources/flot/jquery.flot.min.js"></script>
<script language="javascript" type="text/javascript" src="/ressources/flot/jquery-flot-dashes.js"></script>
<script language="javascript" type="text/javascript" src="http://labs.consol.de/naemon/downloadstats.js"></script>
<script type="text/javascript">
function extract_data(name, ticks, stats) {
    var data = [];
    jQuery.each(ticks, function(nr, tick) {
        var tmp   = tick[1].split("-");
        var year  = tmp[0];
        var month = tmp[1];
        var value = 0;
        if(stats[year][month][name] != undefined) {
            value = stats[year][month][name];
        }
        data.push([tick[0], value]);
    });
    return(data);
}

jQuery(document).ready(function() {
    var months = [];
    jQuery.each(download_stats, function(year, data) {
        jQuery.each(download_stats[year], function(month, data) {
            months.push(year+"-"+month);
        });
    });
    var ticks = [];
    months = months.sort();
    jQuery.each(months, function(nr, month) {
        ticks.push([nr, month]);
    });

    var d1 = { label: "Core",           data: extract_data("naemon-core",       ticks, download_stats) };
    var d2 = { label: "Thruk",          data: extract_data("naemon-thruk",      ticks, download_stats) };
    var d3 = { label: "Livestatus",     data: extract_data("naemon-livestatus", ticks, download_stats) };
    var d4 = { label: "Source-Tarball", data: extract_data("naemon-source",     ticks, download_stats) };
    var series = [d1,d2,d3,d4];

    // estimates
    var today  = new Date();
    var day    = today.getDate();
    var days   = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    if(day != days) {
        var factor = days / day;
        var d5 = { label: "", data: [d1.data[d1.data.length-2],  [d1.data.length-1, d1.data[d1.data.length-1][1]*factor ]], dashes: { show: true } };
        var d6 = { label: "", data: [d2.data[d2.data.length-2],  [d2.data.length-1, d2.data[d2.data.length-1][1]*factor ]], dashes: { show: true } };
        var d7 = { label: "", data: [d3.data[d3.data.length-2],  [d3.data.length-1, d3.data[d3.data.length-1][1]*factor ]], dashes: { show: true } };
        var d8 = { label: "", data: [d4.data[d4.data.length-2],  [d4.data.length-1, d4.data[d4.data.length-1][1]*factor ]], dashes: { show: true } };
        series.push(d5,d6,d7,d8);
    }

    jQuery.plot("#downloadstats", series,{
        colors: ['#CB514D', '#4CA251', '#AFD9F7', '#EDBF4B','#CB514D', '#4CA251', '#AFD9F7', '#EDBF4B'],
        lines: {
            fill:  false,
            steps: false,
            fillColor: { colors: [ { opacity: 0.6 }, { opacity: 0.9 } ] }
        },
        xaxis: {
          ticks: ticks
        },
        legend: {
            position: 'nw'
        },
        grid: {
            margin: {
                left: 20
            },
            hoverable: true,
            clickable: true
        }
    });
    var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
                    .text("Downloads")
                    .appendTo("#downloadstats");
    yaxisLabel.css("margin-top", yaxisLabel.width() / 2 - 20);

    jQuery("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #fdd",
        padding: "2px",
        "background-color": "#fee",
        opacity: 0.80
    }).appendTo("body");
    jQuery("#downloadstats").bind("plothover", function (event, pos, item) {
        if (item) {
            jQuery("#tooltip").html(item.series.label+": " + item.datapoint[1] + " downloads in " + ticks[item.datapoint[0]][1])
                              .css({top: item.pageY+5, left: item.pageX+5})
                              .fadeIn(200);
        } else {
            $("#tooltip").hide();
        }
    });
});
</script>
