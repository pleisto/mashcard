declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.mp4' {
  const src: string
  export = src
}

declare module '*.png' {
  const src: string
  export = src
}

declare module '*.webp' {
  const src: string
  export = src
}

declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': { name: string }
  }
}
