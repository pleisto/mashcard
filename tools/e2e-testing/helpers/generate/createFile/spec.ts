import * as fs from 'fs/promises'

const SPEC = (camelModuleName: string): string => `import { ${
  camelModuleName.slice(0, 1).toUpperCase() + camelModuleName.slice(1)
}Page } from './${camelModuleName}.page'
import { test, expect } from '@/fixtures'

test.describe('${camelModuleName.slice(0, 1).toUpperCase() + camelModuleName.slice(1)}', () => {
  let ${camelModuleName}: ${camelModuleName.slice(0, 1).toUpperCase() + camelModuleName.slice(1)}Page

  test.beforeEach(async ({ api, page }) => {
    ${camelModuleName} = new ${camelModuleName.slice(0, 1).toUpperCase() + camelModuleName.slice(1)}Page(page)
  })

})
`

export const createSpec = async (modulePath: string, name: string): Promise<void> => {
  const filePath = `${modulePath}/${name}.spec.ts`
  await fs.writeFile(filePath, SPEC(name))
}
