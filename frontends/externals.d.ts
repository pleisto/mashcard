declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.css' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.svg' {
  const content: string

  export = content
}

declare module '*.png' {
  const content: string

  export = content
}
