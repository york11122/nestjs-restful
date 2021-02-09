import * as child from 'child_process'
import * as formatDate from 'dateformat'
// mongorestore --host hostname.com --port 27017 --username user --password pass mongodump/db/

import {
    MLAB_URL
} from '../environment'

enum fileType {
    JSON,
    CSV,
    TSV
}

const collection = 'users'
const now = formatDate(new Date(), 'yyyy/mm/dd') || new Date().toISOString()
const out = `./backup/${now}/${collection}.json`

// mongoexport
export const dump: child.ChildProcess = child.exec(
    `mongoexport -h ${MLAB_URL} -o ${out}`,
    () => {
        console.log(`Success.`)
    }
)
