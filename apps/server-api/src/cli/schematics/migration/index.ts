import { Rule, url, apply, applyTemplates, chain, mergeWith, MergeStrategy, move } from '@brickdoc/schematics'
import { format } from 'date-fns'
import { relative } from 'path'
import { kebabCase } from '@brickdoc/active-support'
import { Schema as ComponentOptions } from './schema'
import { migrationDir, rootDir } from '../../utils'

export function migration(options: ComponentOptions): Rule {
  console.log(999, relative(rootDir, migrationDir))
  return chain([
    (): Rule =>
      mergeWith(
        apply(url(`./files/${options.type}`), [
          applyTemplates({
            filename: generateFilename(options.name)
          }),
          move(relative(rootDir, migrationDir))
        ]),
        MergeStrategy.Error
      )
  ])
}

/**
 * Generate a base64 encoded secret key seed
 * @returns
 */
function generateFilename(name: string): string {
  const prefix = format(new Date(), 'yyyyMMddHHmmss')
  return `${prefix}-${kebabCase(name)}`
}
