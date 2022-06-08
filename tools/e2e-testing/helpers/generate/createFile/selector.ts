import * as fs from 'fs/promises'
import { toUnderline } from '../utils'

const SELECTOR = (moduleName: string): string => `export const ${moduleName.toUpperCase()}_SELECTOR = {}`

export const createSelector = async (modulePath: string, name: string): Promise<void> => {
  const filePath = `${modulePath}/${name}.selector.ts`
  await fs.writeFile(filePath, SELECTOR(toUnderline(name)))
}
