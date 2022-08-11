import { spawn, spawnSync } from 'child_process'
import { Command, OptionValues } from 'commander'
import path from 'path'
import fs from 'fs'

const program = new Command()

program.name('multiview').description('Multiple view to show e2e runtime')

program
  .option('-p, --project <char>', 'Project in playwright config')
  .option('-m, --module <char>', 'Module in e2e')
  .option('--mode <char>', 'e2e or visual')
  .parse()

const config = getSpawnConfig(program.opts())
spawn('stmux', config, { stdio: 'inherit' })

function getSpawnConfig(params: OptionValues): string[] {
  const { project, module, mode } = params
  const modules = module ? [module] : getModuleName()
  const projects = project ? [project] : ['chromium', 'firefox']

  const config = ['-w', 'always', '[', ...parseConfig(projects, modules, mode), ']']
  return config
}

/**
 *
 * @param projects The projects want to be run
 * @param modules The modules want to be run
 * @param mode The mode wants to be run, provide e2e or visual
 * @returns commands
 */
function parseConfig(projects: string[], modules: string[], mode: 'e2e' | 'visual' | undefined): string[] {
  const commands: string[] = []
  projects.forEach((project, projectIndex) => {
    let command = ''

    modules.forEach((module, moduleIndex) => {
      // eslint-disable-next-line no-nested-ternary
      const specifyMode = mode ? (mode === 'e2e' ? ' --grep-invert @visual' : ' --grep @visual') : ''

      command += `TEST_MODULE=${module} TEST_BROWSER=${project} yarn run-playwright ${module} --project=${project}${specifyMode}${
        modules.length - 1 === moduleIndex ? '' : ' && '
      }`
    })

    commands.push(command)
    if (projects.length - 1 !== projectIndex) {
      commands.push(':')
    }
  })
  return commands
}

function getModuleName(): string[] {
  const MODULE_FILE_PATH = path.join(__dirname, '../../MODULE')
  spawnSync('yarn', ['module'], { stdio: 'inherit' })

  return JSON.parse(fs.readFileSync(MODULE_FILE_PATH, 'utf8'))
}
