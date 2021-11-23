declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': { name: string }
  }
}
