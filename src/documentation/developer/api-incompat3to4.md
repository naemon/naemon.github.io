# API Incompatibilities

A list of API incompatibilities between Nagios 3 and Naemon.

## Global Variables


 - `event_list_{high,low}` and `event_list_{high,low}_tail` are no more.
    Instead there is `squeue_t *nagios_sqeueue`, which is a single queue
    to handle all timed events.
 - `last_command_check`, `command_check_interval`, `external_command_buffer`
    and `external_command_buffer_slots` are no more.
 - `check_result_list` is no more
 - `passive_check_result_list` and `passive_check_result_list_tail` are no
    more.

## Data Structures


 - All primary objects have been given an `id` field, which can be
    used to store additional data about each object, or mark them in
    bitmaps, or...
 - Container-ish pointers have been removed pretty much everywhere in
    favour of testable libraries with specific lookup properties and
    containers. This means `next_hash` etc no longer exist in any object.
    The `next` pointers in primary objects still remain, but you should
    avoid using them in favour of iterating over objects using the object
    arrays.
 - `next` and `prev` have been removed from `timed_event`. It's no longer
    possible to sanely loop over all queued elements, since the squeue
    library keeps its types opaque. Adding an `squeue_foreach()` thing
    would be as simple as running a breadth-first search in the pqueue
    library that drives the squeue implementation.
 - The `scheduled_downtime` data type now has `start_event` and
    `stop_event`.
 - `nebstruct_program_status_data` no longer has a `last_command_check`
    var.
 - The `passive_service_check` data type is no more.
 - The data type `circular_buffer` has been removed.
 - The host object's `notify_on_down`, `notify_on_up`, `notify_on_blablah`
    variables have been replaced with a single `notification_options` field
    instead, which is a small hand-managed bitmask of the states we should
    notify on, based on `1 << current_state`.
 - As per above, with `flap_detection_options`
 - As per above, with `stalking_options`
 - As per the three above, with services
 - As per above, with dependencies which now have a `failure_options`
    field instead of multiple `fail_on_foo` fields.
 - As per above with escalations, which now have an
    `escalation_options` field instead of multiple `escalate on foo` fields.


## Functions

 - Event queue management functions have been significantly altered
    to match the new scheduling queue implementation. `add_event()`,
    `remove_event()`, `reschedule_event()` and `schedule_new_event()` are the
    primary ones.
 - `submit_external_command()` and `submit_raw_external_command()` have
    been removed, as has `check_for_external_commands()`.
 - All functions handling adding and removing objects to circular
    buffers or other types of linked lists used for searching have been
    removed.
 - The `*host*_3x()` functions are gone. They have been replaced with
    versions without the `_3x` suffix.
 - `run_sync_host_check_3x()` is gone. `perform_on_demand_host_check()`,
    which previously only called `run_sync_host_check_3x()`, now does
    something sensible instead of calling out to a single helper.
 - Using the `struct host_struct *foo` form of type-naming has been
    obsoleted and will no longer work. Use `struct host` instead.
 - Use of typedef'ed typenames for non-opaque structures is now
    deprecated. The typedef's will be removed in future Naemon releases, and modules
    that wish to continue using them after that will have to add them
    themselves. The new preferred form is `struct host *foo`, which
    clearly shows that we're dealing with a non-opaque type.
