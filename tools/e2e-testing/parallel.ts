import commandLineArgs from 'command-line-args'

import { spawn } from 'child_process'

const optionDefinitions = [
  { name: 'project', type: String },
  { name: 'module', type: String },
  { name: 'debug', type: Boolean }
]

const options = commandLineArgs(optionDefinitions)

const runCommand = ({ project, module, debug }: commandLineArgs.CommandLineOptions): void => {
  const configs = ['run-playwright', `${module}`, `--project=${project}`, debug ? '--debug' : ' ']

  spawn('yarn', configs, {
    env: {
      ...process.env,
      TEST_MODULE: `${module}`,
      TEST_BROWSER: `${project}`
    },
    stdio: 'inherit'
  }).on('exit', code => {
    // When code equals 1, it means the child process has failed
    if (code === 1) {
      process.exit(1)
    }
  })
}

runCommand(options)
