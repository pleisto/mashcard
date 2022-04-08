import * as server from './server'
import * as console from './console'
import * as dbCreate from './db-create'
import * as dbMigrate from './db-migrate'
import * as dbRollback from './db-rollback'
import * as dbStatus from './db-status'
import * as dbRepair from './db-repair'
import * as dbDump from './db-dump'
import * as dbDrop from './db-drop'

export const commands = [server, console, dbCreate, dbMigrate, dbRollback, dbStatus, dbRepair, dbDump, dbDrop]
