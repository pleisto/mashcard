import fs from 'fs'
import path from 'path'

const walkSync = (currentDirPath: string, callback: (filePath: string, stat: fs.Dirent) => void): void => {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(dirent => {
    const filePath = path.join(currentDirPath, dirent.name)
    if (dirent.isFile()) {
      callback(filePath, dirent)
    } else if (dirent.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}

const main = (): void => {
  const list: string[] = []
  walkSync('./tests', (filePath, stat) => {
    if (stat.name.includes('spec.ts')) {
      list.push(stat.name.split('.')[0])
    }
  })
  fs.writeFile('MODULE', JSON.stringify(list), () => {})
}

main()
