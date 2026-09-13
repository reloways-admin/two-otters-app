#!/usr/bin/env node
/**
 * ClickUp setup helper — discovery and a live end-to-end check.
 *
 * There is no ClickUp MCP connected here, and the third-party one needs a paid
 * licence, so this talks to the REST API with the same token the app uses.
 *
 *   CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs
 *       walk the workspace and print the id of every list
 *
 *   CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs --check <listId>
 *       confirm an id really is a list, and print which one
 *
 *   CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs --fields <listId>
 *       print the custom field ids for a list, as CLICKUP_FIELD_* lines
 *
 *   CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs --verify <listId>
 *       create one real task, proving the token, the list and the payload the
 *       app sends all work together. It is left in place on purpose: deleting
 *       is one click in the UI, and a setup script should not delete anything.
 */

const API = 'https://api.clickup.com/api/v2'
const token = process.env.CLICKUP_TOKEN

if (!token) {
  console.error('CLICKUP_TOKEN is not set.\nClickUp → Settings → Apps → API Token (pk_…)')
  process.exit(1)
}

async function call(path, init) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: token, 'Content-Type': 'application/json', ...init?.headers },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(`${init?.method ?? 'GET'} ${path} → ${response.status} ${JSON.stringify(body)}`)
  }
  return body
}

async function discover() {
  const { teams } = await call('/team')
  for (const team of teams) {
    console.log(`\nWorkspace: ${team.name}   (team id ${team.id})`)

    const { spaces } = await call(`/team/${team.id}/space?archived=false`)
    for (const space of spaces) {
      console.log(`  Space: ${space.name}`)

      const { lists: loose } = await call(`/space/${space.id}/list?archived=false`)
      for (const list of loose) console.log(`    • ${list.name.padEnd(28)} CLICKUP_LIST_LEADS=${list.id}`)

      const { folders } = await call(`/space/${space.id}/folder?archived=false`)
      for (const folder of folders) {
        console.log(`    Folder: ${folder.name}`)
        for (const list of folder.lists) {
          console.log(`      • ${list.name.padEnd(26)} CLICKUP_LIST_LEADS=${list.id}`)
        }
      }
    }
  }
  console.log('\nCopy the id of your Leads list into CLICKUP_LIST_LEADS.')
}

/** Field name in ClickUp → the env var the adapter reads. */
const ENV_KEY = name =>
  `CLICKUP_FIELD_${name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[^a-z0-9]+/gi, '_').toUpperCase()}`

async function fields(listId) {
  const { fields } = await call(`/list/${listId}/field`)
  if (!fields.length) {
    console.log('No custom fields on this list — which is fine. Every value already')
    console.log('appears in the task description; fields only buy filtering and sorting.')
    return
  }
  console.log('# Custom fields on this list:')
  for (const field of fields) console.log(`${ENV_KEY(field.name)}=${field.id}   # ${field.name} (${field.type})`)
}

/** Confirm an id really is a list, and say which one. */
async function check(listId) {
  const list = await call(`/list/${listId}`)
  console.log(`\nThat id is the list "${list.name}"`)
  if (list.space?.name) console.log(`  space:  ${list.space.name}`)
  if (list.folder?.name && !list.folder.hidden) console.log(`  folder: ${list.folder.name}`)
  console.log(`\nCLICKUP_LIST_LEADS=${list.id}`)
}

async function verify(listId) {
  const task = await call(`/list/${listId}/task`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'בקשת אודיט - example.com (setup check)',
      markdown_content: '**אתר לבדיקה:** example.com\n\n**שם:** בדיקת התקנה',
      tags: ['audit'],
      due_date: Date.now() + 2 * 24 * 60 * 60 * 1000,
      due_date_time: false,
    }),
  })
  console.log(`Created task ${task.id}`)
  console.log(task.url)
  console.log('\nThe token, the list and the payload all work. Delete that task when you are done.')
}

const [flag, value] = process.argv.slice(2)
try {
  if (flag === '--check') await check(value)
  else if (flag === '--fields') await fields(value)
  else if (flag === '--verify') await verify(value)
  else await discover()
} catch (err) {
  console.error(`\n${err.message}`)
  process.exit(1)
}
