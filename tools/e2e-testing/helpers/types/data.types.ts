export interface PageBlock {
  id?: string
  title: string
  // find in packages/brickdoc-uploader/src/Dashboard/data-by-group.json
  icon?: { name: string; emoji: string }
  children?: PageBlock[]
}
