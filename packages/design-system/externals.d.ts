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

declare module '*.mp4' {
  const src: string
  export = src
}

declare module '*.mov' {
  const src: string
  export = src
}

declare module '*.webm' {
  const src: string
  export = src
}

declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': { name: string }
  }
}
