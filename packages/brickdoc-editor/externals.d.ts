declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.css' {
  const resource: { [key: string]: string }
  export = resource
}
