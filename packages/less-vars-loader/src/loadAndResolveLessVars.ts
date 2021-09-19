/*!
 * Copyright 2021 Brickdoc Inc..
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import less from 'less'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import enhancedResolve from 'enhanced-resolve'

// eslint-disable-next-line @typescript-eslint/naming-convention
function replaceSubstring(string: string, start: number, end: number, replacement: string): string {
  return string.substring(0, start) + replacement + string.substring(end)
}

function getRegexpMatches(regexp: RegExp, text: string): RegExpExecArray[] {
  const matches = []
  const lastIndex = regexp.lastIndex

  let match
  do {
    match = regexp.exec(text)
    if (match) {
      matches.push(match)
    }
    // prevent infinite loop (only regular expressions with `global` flag retain the `lastIndex`)
  } while (match && regexp.global)

  // don't leak `lastIndex` changes
  regexp.lastIndex = lastIndex

  return matches
}

const importRegExp = /^@import\s+['"]([^'"]+)['"];$/gm
export function loadLessWithImports(entry: string): any {
  const entryPath = resolve('./', entry)
  const input = readFileSync(entryPath, 'utf8')
  const imports = getRegexpMatches(importRegExp, input).map(match => {
    const importPath = match[1]
    const fullImportPath = /\.less$/.test(importPath) ? importPath : `${importPath}.less`
    const resolvedImportPath = /^~/.test(importPath)
      ? enhancedResolve.sync(__dirname, fullImportPath.slice(1))
      : resolve(dirname(entryPath), fullImportPath)
    return {
      match,
      path: resolvedImportPath,
      ...loadLessWithImports(resolvedImportPath as string)
    }
  })
  return {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    code: imports.reduceRight((acc, { match, code }) => replaceSubstring(acc, match.index, match.index + match[0].length, code), input),
    imports: imports.reduce((acc, { path, imports: nestedImports }) => [...acc, ...nestedImports, path], [])
  }
}

const varNameRegExp = /^\s*@([\w-]+)\s*:/gm
function findLessVariables(lessCode: any): string[] {
  return getRegexpMatches(varNameRegExp, lessCode).map(([, varName]) => varName)
}

const cssVarRegExp = /--([^:]+): ([^;]*);/g
export async function resolveLessVariables(lessCode: any, lessOptions: any): Promise<any> {
  const varNames = findLessVariables(lessCode)
  let renderResult: any
  try {
    renderResult = await less.render(
      `${lessCode} #resolved {\n${varNames.map(varName => `--${varName}: @${varName};`).join('\n')}\n}`,
      lessOptions
    )
  } catch (e) {
    throw new Error(`Less render failed! (${(e as Error).message}) Less code:\n${lessCode}\nVariables found:\n${varNames.join(', ')}`)
  }
  return getRegexpMatches(cssVarRegExp, renderResult.css.replace(/#resolved {(.*)}/, '$1')).reduce(
    (acc, [, varName, value]) => ({ ...acc, [varName]: value }),
    {}
  )
}

/**
 * Loads a Less file and all of its dependencies (transitively), compiles the Less code, and returns all variables
 * found in the resolved code in an object.
 * @param {String} entry path to the file
 * @param {Object} lessOptions (optional)
 * @returns {Promise<Object>}
 */
export async function loadAndResolveLessVars(entry: string, lessOptions: object): Promise<Object> {
  const { code: lessCode } = loadLessWithImports(entry)
  // eslint-disable-next-line no-return-await
  return await resolveLessVariables(lessCode, lessOptions)
}
