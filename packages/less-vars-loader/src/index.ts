/*!
 * Copyright 2021 Brickdoc (Ningbo) Cloud Computing Technology LTD.
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

import { getOptions } from 'loader-utils'
import { loadLessWithImports, resolveLessVariables } from './loadAndResolveLessVars'
import fromPairs from 'lodash/fromPairs'

// eslint-disable-next-line import/no-default-export
export default async function lessVarsLoader(this: any): Promise<void> {
  const { lessOptions, transform } = getOptions(this) ?? {}
  const callback = this.async()

  const { code, imports } = loadLessWithImports(this.resourcePath)
  imports.forEach((path: string) => this.addDependency(path))

  const vars = await resolveLessVariables(code, lessOptions)
  // @ts-expect-error
  const processedVars = transform ? fromPairs(Object.entries(vars).map(transform)) : vars

  callback(null, `export default ${JSON.stringify(processedVars)}`)
}
