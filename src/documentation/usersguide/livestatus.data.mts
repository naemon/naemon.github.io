import fs from 'node:fs'
import path from 'node:path'

interface LivestatusColumn {
	name:        string
	type:        string
	description: string
}

interface LivestatusTable {
  name:    string
  columns: LivestatusColumn[]
}

async function getColumns(): Promise<LivestatusTable[]> {
	const raw = await fs.readFileSync(path.join(__dirname, './livestatus.columns.json'), 'utf-8');
	let columns = JSON.parse(raw);

	let data:LivestatusTable[] = []
	let lookup = {}
	for(const colRaw of columns) {
		const tableName = colRaw[0];
		let t = lookup[tableName];
		if(!t) {
			t = {
				name:    tableName,
				columns: [],
			}
			data.push(t)
			lookup[tableName] = t;

			if(tableName == 'comments' || tableName == 'downtimes') {
				t.columns.push({ name: "host_*",    description: "All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.", type: "" })
				t.columns.push({ name: "service_*", description: "All columns from the <a href='#services'>services table</a> are available via service_ prefix.", type: "" })
			}
			if(tableName == 'services') {
				t.columns.push({ name: "host_*",    description: "All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.", type: "" })
			}
			if(tableName == 'log' || tableName == 'statehist') {
				t.columns.push({ name: "host_*",    description: "All columns from the <a href='#hosts'>hosts table</a> are available via current_host_ prefix.", type: "" })
				t.columns.push({ name: "service_*", description: "All columns from the <a href='#services'>services table</a> are available via current_service_ prefix.", type: "" })
			}
		}

		const colName = colRaw[1];
		if(tableName == 'comments'  && colName.match(/^host_/))    { continue; }
		if(tableName == 'comments'  && colName.match(/^service_/)) { continue; }
		if(tableName == 'downtimes' && colName.match(/^host_/))    { continue; }
		if(tableName == 'downtimes' && colName.match(/^service_/)) { continue; }
		if(tableName == 'services'  && colName.match(/^host_/))    { continue; }
		if(tableName == 'log'       && colName.match(/^current_/)) { continue; }
		if(tableName == 'statehist' && colName.match(/^current_/)) { continue; }

		t.columns.push({
			name:        colName,
			description: colRaw[2],
			type:        colRaw[3],
		})
	}
	return data;
}

export default {
  async load() {
    return await getColumns();
  }
}