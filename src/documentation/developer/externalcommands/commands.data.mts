import fs from 'node:fs'
import path from 'node:path'

const COMMANDS_URL      = 'https://raw.githubusercontent.com/naemon/naemon-core/master/src/naemon/commands.c';
const CACHE_FILE        = path.join(__dirname, './commands.c.cache');
const CACHE_DURATION_MS = 3600 * 1000; // 1 hour

interface CommandArg {
  name: string
  type: string
}
interface Command {
  name:          string
  description:   string
  args:          CommandArg[]
  argsStr:       string
  classes:       string[]
  exampleArgStr: string
}

function hasArg(command: Command, argName: string): boolean {
  return command.args.some((arg) => (arg.type === argName || arg.name === argName));
}

let data: Command[]
export { data }

// parse external commands from c source
async function getCommands(): Promise<Command[]> {
  await fetchSource();

  data = [];
  var text = fs.readFileSync(CACHE_FILE, 'utf-8');

  text = text.replace(/(\/\*.*?\*\/)/g, '');

  const lines: string[] = [];
  var lastLine = '';
  for (var line of text.split('\n')) {
    line = line.trim();
    if(line.match(/(\}|;)\s*$/)) {
        lines.push(lastLine+line);
        lastLine = "";
        continue;
    }
    if(!line.match(/^\s*$/)) {
      lastLine += "\n"+line;
    }
  }

  var registerStarted = false;
  var lastCommand: Command = {} as Command;
      lastCommand.args = [];
  for( const line of lines ) {
    if(line.match(/register_core_commands\s*\(/)) {
      registerStarted = true;
      continue;
    }
    if(line.match(/\}\s*$/)) {
      registerStarted = false;
      continue;
    }
    if(!registerStarted) { continue; }

    const matches = line.match(/command_create\s*\(\s*\"([^,]+)\"\s*,([^,]+),\s*"([^"]*)"\s*,\s*([^,]+)\)/);
    if (matches) {
      lastCommand.name = matches[1].trim();
      lastCommand.description = matches[3].trim();
      data.push(lastCommand);
      if(matches[4] != "NULL") {
        var args = matches[4].replace(/^\"/, "").replace(/\"$/, "");
        for( var arg of args.split(/;/) ) {
          var a = arg.split(/=/);
          lastCommand.args.push({ name: a[1].trim(), type: a[0].trim() });
        }
      }

      lastCommand = {} as Command;
      lastCommand.args = [];
    }
    const argmatches = line.match(/command_argument_add\s*\(([^,]+)\s*,\s*\"([^,]+)\"\s*,\s*([^,]+)\s*,\s*([^,]+)/);
    if (argmatches) {
      lastCommand.args.push({ name: argmatches[2].trim(), type: argmatches[3].trim() });
    }
  }

  const tpl = fs.readFileSync(path.join(__dirname, '_command.tpl'), 'utf-8');
  for(var command of data) {
    // extract classes
    command.classes = [];

    if(hasArg(command, "hostgroup") || command.name.match(/hostgroup/i)) {
        command.classes.push("hostgroup")
    }
    else if(hasArg(command, "host") || command.name.match(/host/i)) {
        command.classes.push("host")
    }
    if(hasArg(command, "servicegroup") || command.name.match(/servicegroup/i)) {
        command.classes.push("servicegroup")
    }
    else if(hasArg(command, "service") || command.name.match(/_svc_|_service_/i)) {
        command.classes.push("service")
    }
    if(hasArg(command, "contactgroup")) {
      command.classes.push("contactgroup")
    }
    else if(hasArg(command, "contact")) {
      command.classes.push("contact")
    }
    if(hasArg(command, "downtime") || command.name.match(/downtime/i)) {
        command.classes.push("downtime")
    }
    else if(hasArg(command, "comment") || command.name.match(/comment/i)) {
      command.classes.push("comment")
    }
    if(hasArg(command, "notification_number")) {
        command.classes.push("notification")
    }
    if(command.classes.length == 0) {
        command.classes.push("process")
    }

    var argStr  = ""
    var examStr = ""
    for(var ar of command.args) {
        argStr += ";"+ar.name;
        examStr += ";"+getExample(ar, command);
    }
    command.argsStr = argStr
    command.exampleArgStr = examStr

    // log command is special...
    if(command.name == "LOG") {
        command.argsStr = ";any text"
        command.exampleArgStr = ";SERVICE NOTE: testhost;event handler restarted service successfully"
    }

    var template = tpl.replace('{% cmd %}', JSON.stringify(command));
    fs.writeFileSync(path.join(__dirname, command.name.toLocaleLowerCase()+'.md'), template);
  }

  return data.sort((a, b) => a.name.localeCompare(b.name));
}

function getExample(arg: CommandArg, command: Command): string {
    if(arg.name.match(/^(sticky|notify|persistent|fixed|delete)$/)) {
        return("1");
    }
    if(arg.name.match(/^(trigger_id|notification_number|status_code|options|value)/)) {
        return("0");
    }
    if(arg.name == 'host_name' || arg.name == 'hostname') {
        return("host1");
    }
    if(arg.name == 'service' || arg.name == 'service_description') {
        return("service1");
    }
    if(arg.name == 'hostgroup_name' || arg.name == 'hosgroup_name') {
        return("hostgroup1");
    }
    if(arg.name == 'servicegroup_name') {
        return("servicegroup1");
    }
    if(arg.name == 'contactgroup_name') {
        return("contactgroup1");
    }
    if(arg.name == 'author' || arg.name == 'contact_name') {
        return("naemonadmin");
    }
    if(arg.name == 'comment') {
        return("This is an example comment.");
    }
    if(arg.name == 'timeperiod' || arg.name == 'notification_timeperiod' || arg.name == 'check_timeperiod') {
        return("24x7");
    }
    if(arg.name == 'duration') {
        return("3600");
    }
    if(arg.name == 'start_time' || arg.name == 'check_time' || arg.name == 'downtime_start_time') {
        return("1478648441");
    }
    if(arg.name == 'end_time' || arg.name == 'downtime_end_time' || arg.name == 'notification_time') {
        return("1478638441");
    }
    if(arg.name == 'plugin_output') {
        return("This is an example plugin output.");
    }
    if(arg.name == 'comment_id' || arg.name == 'downtime_id') {
        return("1234");
    }
    if(arg.name == 'check_interval' || arg.name == 'check_attempts') {
        return("10");
    }
    if(arg.name == 'event_handler_command') {
        return("restart_service");
    }
    if(arg.name == 'check_command') {
        return("check_ping");
    }
    if(arg.name == 'varname') {
        return("SOMEVAR");
    }
    if(arg.name == 'varvalue') {
        return("some new value");
    }
    if(arg.name == 'file_name') {
        return("/tmp/even_mode_commands.txt");
    }
    return ""
}

// fetch commands source file and save it to disk
async function fetchSource() {
  if(fs.existsSync(CACHE_FILE)) {
    const stats   = fs.statSync(CACHE_FILE);
    const fileAge = Date.now() - stats.mtimeMs;
    if (fileAge < CACHE_DURATION_MS) {
      return;
    }
  }
  const response = await fetch(COMMANDS_URL);
  const text = await response.text();
  fs.writeFileSync(CACHE_FILE, text);
}

export default {
  async load() {
    return await getCommands();
  }
}