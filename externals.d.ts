declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.mp4' {
  const src: string
  // eslint-disable-next-line import/no-default-export
  export default src
}

declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': { name: string }
  }
}
