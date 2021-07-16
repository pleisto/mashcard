declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.svgr' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}

declare module '*.svg' {
  const content: string

  export default content
}
