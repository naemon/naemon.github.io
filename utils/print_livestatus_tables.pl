#!/usr/bin/env perl

use warnings;
use strict;
use Monitoring::Livestatus::Class::Lite;

my $connection_string = $ARGV[0] || die("usage: $0 <livestatus socket|livestatus tcp>");
my $class   = Monitoring::Livestatus::Class::Lite->new($connection_string);
my $columns = $class->table('columns')
                    ->columns(qw/table name description type/)
                    ->hashref_array();

my $tables = {};
for my $col (@{$columns}) {
    $tables->{$col->{'table'}}->{$col->{'name'}} = { description => $col->{'description'}, type => $col->{'type'} };
}

for my $name (sort keys %{$tables}) {
    next if $name eq 'columns';
    print "#### $name\n\n";
    print "<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'>";
    print "<tr><th data-defaultsort='asc'>Column</th>\n";
    print "    <th data-sort='true'>Type</th>\n";
    print "    <th data-sort='true'>Description</th>\n";
    print "</tr>\n";
    if($name eq 'comments' or $name eq 'downtimes') {
        print "<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.</td></tr>\n";
        print "<tr><td>_service_</td><td></td><td>All columns from the <a href='#services'>services table</a> are available via service_ prefix.</td></tr>\n";
    }
    if($name eq 'services') {
        print "<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.</td></tr>\n";
    }
    if($name eq 'log' or $name eq 'statehist') {
        print "<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via current_host_ prefix.</td></tr>\n";
        print "<tr><td>_service_</td><td></td><td>All columns from the <a href='#services'>services table</a> are available via current_service_ prefix.</td></tr>\n";
    }
    for my $col (sort keys %{$tables->{$name}}) {
        next if $name eq 'comments'  and $col =~ m/^host_/;
        next if $name eq 'comments'  and $col =~ m/^service_/;
        next if $name eq 'downtimes' and $col =~ m/^host_/;
        next if $name eq 'downtimes' and $col =~ m/^service_/;
        next if $name eq 'services'  and $col =~ m/^host_/;
        next if $name eq 'log'       and $col =~ m/^current_/;
        next if $name eq 'statehist' and $col =~ m/^current_/;
        my $description = $tables->{$name}->{$col}->{description};
        $description =~ s/\Q - not used by Nagios' web interface\E//gmx;
        $description =~ s/\Q (not used by Nagios standard web pages)\E//gmx;
        $description =~ s/Nagios/Naemon/gmx;
        $description =~ s/PNP4Naemon/PNP4Nagios/gmx;
        print "<tr><td>".$col."</td><td>".$tables->{$name}->{$col}->{type}."</td><td>".$description."</td></tr>\n";
    }
    print "</table>\n";
    print "\n\n";
}