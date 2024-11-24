---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span>Up To: <a href="../toc.html">Contents</a><br>

Filter by Category: <select onchange="_update_cmd_filter(this.value)">
    <option value="">All</option>
    <option value="host">Host</option>
    <option value="hostgroup">Hostgroup</option>
    <option value="service">Service</option>
    <option value="servicegroup">Servicegroup</option>
    <option value="contact">Contact</option>
    <option value="contactgroup">Contactgroup</option>
    <option value="comment">Comments</option>
    <option value="downtime">Downtimes</option>
    <option value="notification">Notifications</option>
    <option value="process">Core process</option>
</select>

{% content %}


<script type="text/javascript">
<!--
function _update_cmd_filter(val) {
    if(val == "") {
        jQuery('h5.commands').show();
        return;
    }
    jQuery('h5.commands').hide();
    jQuery('h5.'+val).show();
    return;
}
-->
</script>
