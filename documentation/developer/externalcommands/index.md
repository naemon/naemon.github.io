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


<h5 class='commands host'><a href='acknowledge_host_problem.html'>ACKNOWLEDGE_HOST_PROBLEM</a></h5>
<h5 class='commands service'><a href='acknowledge_svc_problem.html'>ACKNOWLEDGE_SVC_PROBLEM</a></h5>
<h5 class='commands comment host'><a href='add_host_comment.html'>ADD_HOST_COMMENT</a></h5>
<h5 class='commands comment service'><a href='add_svc_comment.html'>ADD_SVC_COMMENT</a></h5>
<h5 class='commands contact notification'><a href='change_contact_host_notification_timeperiod.html'>CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD</a></h5>
<h5 class='commands contact'><a href='change_contact_modattr.html'>CHANGE_CONTACT_MODATTR</a></h5>
<h5 class='commands contact'><a href='change_contact_modhattr.html'>CHANGE_CONTACT_MODHATTR</a></h5>
<h5 class='commands contact'><a href='change_contact_modsattr.html'>CHANGE_CONTACT_MODSATTR</a></h5>
<h5 class='commands contact notification'><a href='change_contact_svc_notification_timeperiod.html'>CHANGE_CONTACT_SVC_NOTIFICATION_TIMEPERIOD</a></h5>
<h5 class='commands contact'><a href='change_custom_contact_var.html'>CHANGE_CUSTOM_CONTACT_VAR</a></h5>
<h5 class='commands host'><a href='change_custom_host_var.html'>CHANGE_CUSTOM_HOST_VAR</a></h5>
<h5 class='commands service'><a href='change_custom_svc_var.html'>CHANGE_CUSTOM_SVC_VAR</a></h5>
<h5 class='commands process'><a href='change_global_host_event_handler.html'>CHANGE_GLOBAL_HOST_EVENT_HANDLER</a></h5>
<h5 class='commands process'><a href='change_global_svc_event_handler.html'>CHANGE_GLOBAL_SVC_EVENT_HANDLER</a></h5>
<h5 class='commands host'><a href='change_host_check_command.html'>CHANGE_HOST_CHECK_COMMAND</a></h5>
<h5 class='commands host'><a href='change_host_check_timeperiod.html'>CHANGE_HOST_CHECK_TIMEPERIOD</a></h5>
<h5 class='commands host'><a href='change_host_event_handler.html'>CHANGE_HOST_EVENT_HANDLER</a></h5>
<h5 class='commands host'><a href='change_host_modattr.html'>CHANGE_HOST_MODATTR</a></h5>
<h5 class='commands host notification'><a href='change_host_notification_timeperiod.html'>CHANGE_HOST_NOTIFICATION_TIMEPERIOD</a></h5>
<h5 class='commands host'><a href='change_max_host_check_attempts.html'>CHANGE_MAX_HOST_CHECK_ATTEMPTS</a></h5>
<h5 class='commands service'><a href='change_max_svc_check_attempts.html'>CHANGE_MAX_SVC_CHECK_ATTEMPTS</a></h5>
<h5 class='commands host'><a href='change_normal_host_check_interval.html'>CHANGE_NORMAL_HOST_CHECK_INTERVAL</a></h5>
<h5 class='commands service'><a href='change_normal_svc_check_interval.html'>CHANGE_NORMAL_SVC_CHECK_INTERVAL</a></h5>
<h5 class='commands host'><a href='change_retry_host_check_interval.html'>CHANGE_RETRY_HOST_CHECK_INTERVAL</a></h5>
<h5 class='commands service'><a href='change_retry_svc_check_interval.html'>CHANGE_RETRY_SVC_CHECK_INTERVAL</a></h5>
<h5 class='commands service'><a href='change_svc_check_command.html'>CHANGE_SVC_CHECK_COMMAND</a></h5>
<h5 class='commands service'><a href='change_svc_check_timeperiod.html'>CHANGE_SVC_CHECK_TIMEPERIOD</a></h5>
<h5 class='commands service'><a href='change_svc_event_handler.html'>CHANGE_SVC_EVENT_HANDLER</a></h5>
<h5 class='commands host service'><a href='change_svc_modattr.html'>CHANGE_SVC_MODATTR</a></h5>
<h5 class='commands notification service'><a href='change_svc_notification_timeperiod.html'>CHANGE_SVC_NOTIFICATION_TIMEPERIOD</a></h5>
<h5 class='commands host notification'><a href='delay_host_notification.html'>DELAY_HOST_NOTIFICATION</a></h5>
<h5 class='commands notification service'><a href='delay_svc_notification.html'>DELAY_SVC_NOTIFICATION</a></h5>
<h5 class='commands comment host'><a href='del_all_host_comments.html'>DEL_ALL_HOST_COMMENTS</a></h5>
<h5 class='commands comment service'><a href='del_all_svc_comments.html'>DEL_ALL_SVC_COMMENTS</a></h5>
<h5 class='commands downtime hostgroup'><a href='del_downtime_by_hostgroup_name.html'>DEL_DOWNTIME_BY_HOSTGROUP_NAME</a></h5>
<h5 class='commands downtime host'><a href='del_downtime_by_host_name.html'>DEL_DOWNTIME_BY_HOST_NAME</a></h5>
<h5 class='commands comment downtime'><a href='del_downtime_by_start_time_comment.html'>DEL_DOWNTIME_BY_START_TIME_COMMENT</a></h5>
<h5 class='commands comment'><a href='del_host_comment.html'>DEL_HOST_COMMENT</a></h5>
<h5 class='commands downtime'><a href='del_host_downtime.html'>DEL_HOST_DOWNTIME</a></h5>
<h5 class='commands comment'><a href='del_svc_comment.html'>DEL_SVC_COMMENT</a></h5>
<h5 class='commands downtime'><a href='del_svc_downtime.html'>DEL_SVC_DOWNTIME</a></h5>
<h5 class='commands host notification'><a href='disable_all_notifications_beyond_host.html'>DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST</a></h5>
<h5 class='commands contactgroup notification'><a href='disable_contactgroup_host_notifications.html'>DISABLE_CONTACTGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands contactgroup notification'><a href='disable_contactgroup_svc_notifications.html'>DISABLE_CONTACTGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands contact notification'><a href='disable_contact_host_notifications.html'>DISABLE_CONTACT_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands contact notification'><a href='disable_contact_svc_notifications.html'>DISABLE_CONTACT_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands process'><a href='disable_event_handlers.html'>DISABLE_EVENT_HANDLERS</a></h5>
<h5 class='commands process'><a href='disable_flap_detection.html'>DISABLE_FLAP_DETECTION</a></h5>
<h5 class='commands hostgroup'><a href='disable_hostgroup_host_checks.html'>DISABLE_HOSTGROUP_HOST_CHECKS</a></h5>
<h5 class='commands hostgroup notification'><a href='disable_hostgroup_host_notifications.html'>DISABLE_HOSTGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands hostgroup'><a href='disable_hostgroup_passive_host_checks.html'>DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands hostgroup'><a href='disable_hostgroup_passive_svc_checks.html'>DISABLE_HOSTGROUP_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands hostgroup'><a href='disable_hostgroup_svc_checks.html'>DISABLE_HOSTGROUP_SVC_CHECKS</a></h5>
<h5 class='commands hostgroup notification'><a href='disable_hostgroup_svc_notifications.html'>DISABLE_HOSTGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands host notification'><a href='disable_host_and_child_notifications.html'>DISABLE_HOST_AND_CHILD_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='disable_host_check.html'>DISABLE_HOST_CHECK</a></h5>
<h5 class='commands host'><a href='disable_host_event_handler.html'>DISABLE_HOST_EVENT_HANDLER</a></h5>
<h5 class='commands host'><a href='disable_host_flap_detection.html'>DISABLE_HOST_FLAP_DETECTION</a></h5>
<h5 class='commands process'><a href='disable_host_freshness_checks.html'>DISABLE_HOST_FRESHNESS_CHECKS</a></h5>
<h5 class='commands host notification'><a href='disable_host_notifications.html'>DISABLE_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='disable_host_svc_checks.html'>DISABLE_HOST_SVC_CHECKS</a></h5>
<h5 class='commands host notification'><a href='disable_host_svc_notifications.html'>DISABLE_HOST_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands notification'><a href='disable_notifications.html'>DISABLE_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='disable_passive_host_checks.html'>DISABLE_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands service'><a href='disable_passive_svc_checks.html'>DISABLE_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands process'><a href='disable_performance_data.html'>DISABLE_PERFORMANCE_DATA</a></h5>
<h5 class='commands servicegroup'><a href='disable_servicegroup_host_checks.html'>DISABLE_SERVICEGROUP_HOST_CHECKS</a></h5>
<h5 class='commands notification servicegroup'><a href='disable_servicegroup_host_notifications.html'>DISABLE_SERVICEGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands servicegroup'><a href='disable_servicegroup_passive_host_checks.html'>DISABLE_SERVICEGROUP_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands servicegroup'><a href='disable_servicegroup_passive_svc_checks.html'>DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands servicegroup'><a href='disable_servicegroup_svc_checks.html'>DISABLE_SERVICEGROUP_SVC_CHECKS</a></h5>
<h5 class='commands notification servicegroup'><a href='disable_servicegroup_svc_notifications.html'>DISABLE_SERVICEGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands process'><a href='disable_service_freshness_checks.html'>DISABLE_SERVICE_FRESHNESS_CHECKS</a></h5>
<h5 class='commands service'><a href='disable_svc_check.html'>DISABLE_SVC_CHECK</a></h5>
<h5 class='commands service'><a href='disable_svc_event_handler.html'>DISABLE_SVC_EVENT_HANDLER</a></h5>
<h5 class='commands service'><a href='disable_svc_flap_detection.html'>DISABLE_SVC_FLAP_DETECTION</a></h5>
<h5 class='commands notification service'><a href='disable_svc_notifications.html'>DISABLE_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands host notification'><a href='enable_all_notifications_beyond_host.html'>ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST</a></h5>
<h5 class='commands contactgroup notification'><a href='enable_contactgroup_host_notifications.html'>ENABLE_CONTACTGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands contactgroup notification'><a href='enable_contactgroup_svc_notifications.html'>ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands contact notification'><a href='enable_contact_host_notifications.html'>ENABLE_CONTACT_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands contact notification'><a href='enable_contact_svc_notifications.html'>ENABLE_CONTACT_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands process'><a href='enable_event_handlers.html'>ENABLE_EVENT_HANDLERS</a></h5>
<h5 class='commands process'><a href='enable_flap_detection.html'>ENABLE_FLAP_DETECTION</a></h5>
<h5 class='commands hostgroup'><a href='enable_hostgroup_host_checks.html'>ENABLE_HOSTGROUP_HOST_CHECKS</a></h5>
<h5 class='commands hostgroup notification'><a href='enable_hostgroup_host_notifications.html'>ENABLE_HOSTGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands hostgroup'><a href='enable_hostgroup_passive_host_checks.html'>ENABLE_HOSTGROUP_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands hostgroup'><a href='enable_hostgroup_passive_svc_checks.html'>ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands hostgroup'><a href='enable_hostgroup_svc_checks.html'>ENABLE_HOSTGROUP_SVC_CHECKS</a></h5>
<h5 class='commands hostgroup notification'><a href='enable_hostgroup_svc_notifications.html'>ENABLE_HOSTGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands host notification'><a href='enable_host_and_child_notifications.html'>ENABLE_HOST_AND_CHILD_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='enable_host_check.html'>ENABLE_HOST_CHECK</a></h5>
<h5 class='commands host'><a href='enable_host_event_handler.html'>ENABLE_HOST_EVENT_HANDLER</a></h5>
<h5 class='commands host'><a href='enable_host_flap_detection.html'>ENABLE_HOST_FLAP_DETECTION</a></h5>
<h5 class='commands process'><a href='enable_host_freshness_checks.html'>ENABLE_HOST_FRESHNESS_CHECKS</a></h5>
<h5 class='commands host notification'><a href='enable_host_notifications.html'>ENABLE_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='enable_host_svc_checks.html'>ENABLE_HOST_SVC_CHECKS</a></h5>
<h5 class='commands host notification'><a href='enable_host_svc_notifications.html'>ENABLE_HOST_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands notification'><a href='enable_notifications.html'>ENABLE_NOTIFICATIONS</a></h5>
<h5 class='commands host'><a href='enable_passive_host_checks.html'>ENABLE_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands service'><a href='enable_passive_svc_checks.html'>ENABLE_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands process'><a href='enable_performance_data.html'>ENABLE_PERFORMANCE_DATA</a></h5>
<h5 class='commands servicegroup'><a href='enable_servicegroup_host_checks.html'>ENABLE_SERVICEGROUP_HOST_CHECKS</a></h5>
<h5 class='commands notification servicegroup'><a href='enable_servicegroup_host_notifications.html'>ENABLE_SERVICEGROUP_HOST_NOTIFICATIONS</a></h5>
<h5 class='commands servicegroup'><a href='enable_servicegroup_passive_host_checks.html'>ENABLE_SERVICEGROUP_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands servicegroup'><a href='enable_servicegroup_passive_svc_checks.html'>ENABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands servicegroup'><a href='enable_servicegroup_svc_checks.html'>ENABLE_SERVICEGROUP_SVC_CHECKS</a></h5>
<h5 class='commands notification servicegroup'><a href='enable_servicegroup_svc_notifications.html'>ENABLE_SERVICEGROUP_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands process'><a href='enable_service_freshness_checks.html'>ENABLE_SERVICE_FRESHNESS_CHECKS</a></h5>
<h5 class='commands service'><a href='enable_svc_check.html'>ENABLE_SVC_CHECK</a></h5>
<h5 class='commands service'><a href='enable_svc_event_handler.html'>ENABLE_SVC_EVENT_HANDLER</a></h5>
<h5 class='commands service'><a href='enable_svc_flap_detection.html'>ENABLE_SVC_FLAP_DETECTION</a></h5>
<h5 class='commands notification service'><a href='enable_svc_notifications.html'>ENABLE_SVC_NOTIFICATIONS</a></h5>
<h5 class='commands process'><a href='process_file.html'>PROCESS_FILE</a></h5>
<h5 class='commands host'><a href='process_host_check_result.html'>PROCESS_HOST_CHECK_RESULT</a></h5>
<h5 class='commands service'><a href='process_service_check_result.html'>PROCESS_SERVICE_CHECK_RESULT</a></h5>
<h5 class='commands process'><a href='read_state_information.html'>READ_STATE_INFORMATION</a></h5>
<h5 class='commands host'><a href='remove_host_acknowledgement.html'>REMOVE_HOST_ACKNOWLEDGEMENT</a></h5>
<h5 class='commands service'><a href='remove_svc_acknowledgement.html'>REMOVE_SVC_ACKNOWLEDGEMENT</a></h5>
<h5 class='commands process'><a href='restart_process.html'>RESTART_PROCESS</a></h5>
<h5 class='commands process'><a href='restart_program.html'>RESTART_PROGRAM</a></h5>
<h5 class='commands process'><a href='save_state_information.html'>SAVE_STATE_INFORMATION</a></h5>
<h5 class='commands downtime host'><a href='schedule_and_propagate_host_downtime.html'>SCHEDULE_AND_PROPAGATE_HOST_DOWNTIME</a></h5>
<h5 class='commands downtime host'><a href='schedule_and_propagate_triggered_host_downtime.html'>SCHEDULE_AND_PROPAGATE_TRIGGERED_HOST_DOWNTIME</a></h5>
<h5 class='commands host'><a href='schedule_forced_host_check.html'>SCHEDULE_FORCED_HOST_CHECK</a></h5>
<h5 class='commands host'><a href='schedule_forced_host_svc_checks.html'>SCHEDULE_FORCED_HOST_SVC_CHECKS</a></h5>
<h5 class='commands service'><a href='schedule_forced_svc_check.html'>SCHEDULE_FORCED_SVC_CHECK</a></h5>
<h5 class='commands downtime hostgroup'><a href='schedule_hostgroup_host_downtime.html'>SCHEDULE_HOSTGROUP_HOST_DOWNTIME</a></h5>
<h5 class='commands downtime hostgroup'><a href='schedule_hostgroup_svc_downtime.html'>SCHEDULE_HOSTGROUP_SVC_DOWNTIME</a></h5>
<h5 class='commands host'><a href='schedule_host_check.html'>SCHEDULE_HOST_CHECK</a></h5>
<h5 class='commands downtime host'><a href='schedule_host_downtime.html'>SCHEDULE_HOST_DOWNTIME</a></h5>
<h5 class='commands host'><a href='schedule_host_svc_checks.html'>SCHEDULE_HOST_SVC_CHECKS</a></h5>
<h5 class='commands downtime host'><a href='schedule_host_svc_downtime.html'>SCHEDULE_HOST_SVC_DOWNTIME</a></h5>
<h5 class='commands downtime servicegroup'><a href='schedule_servicegroup_host_downtime.html'>SCHEDULE_SERVICEGROUP_HOST_DOWNTIME</a></h5>
<h5 class='commands downtime servicegroup'><a href='schedule_servicegroup_svc_downtime.html'>SCHEDULE_SERVICEGROUP_SVC_DOWNTIME</a></h5>
<h5 class='commands service'><a href='schedule_svc_check.html'>SCHEDULE_SVC_CHECK</a></h5>
<h5 class='commands downtime service'><a href='schedule_svc_downtime.html'>SCHEDULE_SVC_DOWNTIME</a></h5>
<h5 class='commands host notification'><a href='send_custom_host_notification.html'>SEND_CUSTOM_HOST_NOTIFICATION</a></h5>
<h5 class='commands notification service'><a href='send_custom_svc_notification.html'>SEND_CUSTOM_SVC_NOTIFICATION</a></h5>
<h5 class='commands host notification'><a href='set_host_notification_number.html'>SET_HOST_NOTIFICATION_NUMBER</a></h5>
<h5 class='commands notification service'><a href='set_svc_notification_number.html'>SET_SVC_NOTIFICATION_NUMBER</a></h5>
<h5 class='commands process'><a href='shutdown_process.html'>SHUTDOWN_PROCESS</a></h5>
<h5 class='commands process'><a href='shutdown_program.html'>SHUTDOWN_PROGRAM</a></h5>
<h5 class='commands process'><a href='start_accepting_passive_host_checks.html'>START_ACCEPTING_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands process'><a href='start_accepting_passive_svc_checks.html'>START_ACCEPTING_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands process'><a href='start_executing_host_checks.html'>START_EXECUTING_HOST_CHECKS</a></h5>
<h5 class='commands process'><a href='start_executing_svc_checks.html'>START_EXECUTING_SVC_CHECKS</a></h5>
<h5 class='commands host'><a href='start_obsessing_over_host.html'>START_OBSESSING_OVER_HOST</a></h5>
<h5 class='commands process'><a href='start_obsessing_over_host_checks.html'>START_OBSESSING_OVER_HOST_CHECKS</a></h5>
<h5 class='commands service'><a href='start_obsessing_over_svc.html'>START_OBSESSING_OVER_SVC</a></h5>
<h5 class='commands process'><a href='start_obsessing_over_svc_checks.html'>START_OBSESSING_OVER_SVC_CHECKS</a></h5>
<h5 class='commands process'><a href='stop_accepting_passive_host_checks.html'>STOP_ACCEPTING_PASSIVE_HOST_CHECKS</a></h5>
<h5 class='commands process'><a href='stop_accepting_passive_svc_checks.html'>STOP_ACCEPTING_PASSIVE_SVC_CHECKS</a></h5>
<h5 class='commands process'><a href='stop_executing_host_checks.html'>STOP_EXECUTING_HOST_CHECKS</a></h5>
<h5 class='commands process'><a href='stop_executing_svc_checks.html'>STOP_EXECUTING_SVC_CHECKS</a></h5>
<h5 class='commands host'><a href='stop_obsessing_over_host.html'>STOP_OBSESSING_OVER_HOST</a></h5>
<h5 class='commands process'><a href='stop_obsessing_over_host_checks.html'>STOP_OBSESSING_OVER_HOST_CHECKS</a></h5>
<h5 class='commands service'><a href='stop_obsessing_over_svc.html'>STOP_OBSESSING_OVER_SVC</a></h5>
<h5 class='commands process'><a href='stop_obsessing_over_svc_checks.html'>STOP_OBSESSING_OVER_SVC_CHECKS</a></h5>



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

