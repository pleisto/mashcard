export interface PageBlock {
  id?: string
  title: string
  icon?: { name: string; emoji: string }
  children?: PageBlock[]
}
