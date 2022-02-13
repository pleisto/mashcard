import * as console from './console'
import * as dbCreate from './dbCreate'
import * as dbDrop from './dbDrop'
import * as generate from './generate'

export const commands = [console, dbCreate, dbDrop, generate]
