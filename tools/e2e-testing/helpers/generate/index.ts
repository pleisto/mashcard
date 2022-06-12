import inquirer from 'inquirer'
import * as fs from 'fs/promises'
import path from 'path'
import { createPage } from './createFile/page'
import { createSelector } from './createFile/selector'
import { createSpec } from './createFile/spec'

const QUESTION = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'What module do you want to create?'
  }
]

async function main(): Promise<void> {
  const { moduleName } = await inquirer.prompt(QUESTION)
  await createDir(moduleName)
}

const createDir = async (moduleName: string): Promise<void> => {
  const modulePath = path.join(__dirname, `../../tests/${moduleName}`)
  const name = moduleName.split('/')[moduleName.split('/').length - 1]

  // use recursive to deep create, require nodejs >= v10.0.0
  await fs.mkdir(modulePath, { recursive: true })
  await Promise.all([createPage(modulePath, name), createSelector(modulePath, name), createSpec(modulePath, name)])
  console.log('created successful!')
}

main()
