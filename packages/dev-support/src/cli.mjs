#!/usr/bin/env node
import { Command } from 'commander'
import { spawn, spawnSync } from 'node:child_process'
import * as path from 'node:path'
import chalk from 'chalk'
import isCI from 'is-ci'
import open from 'open'
import fse from 'fs-extra'

const program = new Command()
const devSupportRoot = new URL('..', import.meta.url).pathname
const monorepoRoot = path.resolve(devSupportRoot, '../..')

program
  .name('dev-support')
  .description('CLI to provide development toolings for the MashCard monorepo')
  .enablePositionalOptions()
  .allowExcessArguments(false)

program
  .command('run-dev-deps')
  .description('Quickly spin up postgres/redis/etc. instances for development with Docker')
  .action(() => {
    exitOnExit(
      spawn('docker', ['compose', '-f', './dev-deps-compose.yml', 'up'], {
        stdio: 'inherit',
        cwd: devSupportRoot
      })
    )
  })

program
  .command('pdftron-post-setup')
  .description('Run some post-setup steps required by @pdftron/webviewer')
  .action(() => {
    // https://www.pdftron.com/documentation/web/get-started/npm/#2-copy-static-assets
    const srcDir = './node_modules/@pdftron/webviewer/public'
    const targetDir = './apps/client-web/src/public/pdftron'
    fse.copySync(path.resolve(monorepoRoot, srcDir), path.resolve(monorepoRoot, targetDir))
    console.log(chalk.green(`Copied PDFTron static assets to ${targetDir}.`))
  })

program
  .command('sync-vscode-workspace')
  .description('Update the VSCode workspace file (workspace.code-workspace) to list all projects in this monorepo')
  .action(() => {
    const projects = listProjectsInMonorepo()
    const vscWorkspaceFile = path.resolve(monorepoRoot, './workspace.code-workspace')
    const result = fse.existsSync(vscWorkspaceFile) ? JSON.parse(fse.readFileSync(vscWorkspaceFile)) : {}
    result.folders = [
      { name: '/', path: '.' },
      ...projects.map(match => ({
        name: match[1],
        path: match[1]
      }))
    ]
    fse.writeFileSync(vscWorkspaceFile, JSON.stringify(result, null, 2))
  })

program
  .command('depcheck')
  .description(
    'Check for unused/missing dependencies. If run in the monorepo root, it will check all projects in the monorepo.'
  )
  .action(() => {
    let dirsToCheck = [process.cwd()]
    if (process.cwd() === monorepoRoot) {
      dirsToCheck = listProjectsInMonorepo().map(project => path.resolve(monorepoRoot, project))
    }
    const depcheckPath = resolveNodeModulesBin('depcheck')
    for (const dir of dirsToCheck) {
      console.log(chalk.yellow(`Checking ${path.relative(monorepoRoot, dir)}`))
      spawnSync(depcheckPath, { cwd: dir, stdio: 'inherit' })
    }
  })

program
  .command('is-ci')
  .description('Check if we are running in a CI environment, if not, exit with code 1')
  .action(() => {
    process.exit(isCI ? 0 : 1)
  })

const viteCommand = program
  .command('vite')
  .description('Run vite to build the client-web app (config: packages/dev-support/vite.config.ts)')

;['start', 'build', 'optimize', 'preview'].forEach(subCommand => {
  let realCommand = `vite ${subCommand}`
  const preArgs = [subCommand, '../../apps/client-web/src', '--config', 'vite.config.ts']
  if (subCommand === 'start') {
    realCommand = 'vite'
    preArgs.splice(0, 1)
  }
  viteCommand
    .command(subCommand)
    .description(`Call \`${realCommand}\``)
    .argument('[args...]', `Arguments to pass to \`${realCommand}\``)
    .passThroughOptions()
    .allowUnknownOption()
    .action(args => {
      const vitePath = resolveNodeModulesBin('vite')
      exitOnExit(
        spawn(vitePath, [...preArgs, args], {
          stdio: 'inherit',
          cwd: devSupportRoot
        })
      )
    })
})

viteCommand
  .command('analyze')
  .description(`Call \`vite build\` and collect bundle size info`)
  .argument('[args...]', `Arguments to pass to \`vite build\``)
  .passThroughOptions()
  .allowUnknownOption()
  .action(args => {
    const vitePath = resolveNodeModulesBin('vite')
    spawnSync(vitePath, ['build', '../../apps/client-web/src', '--config', 'vite.config.ts', ...args], {
      stdio: 'inherit',
      cwd: devSupportRoot,
      env: {
        ...process.env,
        BUNDLE_STATS: '1'
      }
    })
    const bundleStatsPath = path.resolve(devSupportRoot, './tmp/esm-bundle-stats.html')
    console.log(chalk.green(`Bundle size statistics written to: ${bundleStatsPath}`))
    open(bundleStatsPath)
  })

program
  .command('typedoc')
  .description('Run typedoc to generate API documentations (config: packages/dev-support/typedoc.json)')
  .argument('[args...]', `Arguments to pass to \`typedoc\``)
  .passThroughOptions()
  .allowUnknownOption()
  .action(args => {
    const typedocPath = resolveNodeModulesBin('typedoc')
    exitOnExit(
      spawn(typedocPath, ['--options', path.resolve(devSupportRoot, './typedoc.json'), ...args], {
        stdio: 'inherit'
      })
    )
  })

// Expose some tools listed in package.json
;['prettier', 'eslint', 'graphql-codegen'].forEach(toolName => {
  program
    .command(toolName)
    .description(`Call \`${toolName}\` with provided args`)
    .argument('[args...]', `Arguments to pass to \`${toolName}\``)
    .passThroughOptions()
    .allowUnknownOption()
    .action(args => {
      const toolPath = resolveNodeModulesBin(toolName)
      exitOnExit(spawn(toolPath, args, { stdio: 'inherit' }))
    })
})

program.parse()

function listProjectsInMonorepo() {
  const yarnProcess = spawnSync('yarn', ['workspaces', 'list'], { cwd: monorepoRoot })
  return Array.from(yarnProcess.stdout.toString().matchAll(/YN0000: (.+\/.+)/gm)).map(match => match[1])
}

function resolveNodeModulesBin(binName) {
  return spawnSync('yarn', ['bin', binName], { cwd: devSupportRoot }).stdout.toString().trim()
}

function exitOnExit(childProcess) {
  childProcess.on('exit', () => process.exit(childProcess.exitCode))
}
