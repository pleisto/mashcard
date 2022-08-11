import * as fs from 'fs/promises'
import { toUnderline } from '../utils'

const PAGE = (
  underlineModuleName: string,
  camelModuleName: string
): string => `import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ${underlineModuleName.toUpperCase()}_SELECTOR } from './${camelModuleName}.selector'

export class ${camelModuleName.slice(0, 1).toUpperCase() + camelModuleName.slice(1)}Page extends CommonPage {
  readonly selector = this.get('selector')

  get(selector: keyof typeof ${underlineModuleName.toUpperCase()}_SELECTOR): Locator {
    return this.locator(${underlineModuleName.toUpperCase()}_SELECTOR[selector])
  }
}
`

export const createPage = async (modulePath: string, name: string): Promise<void> => {
  const filePath = `${modulePath}/${name}.page.ts`
  console.log(filePath)
  await fs.writeFile(filePath, PAGE(toUnderline(name), name))
}
