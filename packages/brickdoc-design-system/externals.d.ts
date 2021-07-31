declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': { name: string }
  }
}
