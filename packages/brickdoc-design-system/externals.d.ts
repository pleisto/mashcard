declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '*.svg' {
  const content: string

  export default content
}

/**
 * IconPark
 */
interface IconParkIcon extends HTMLElement {
  'icon-id'?: '39155' | '39156' | '39157' | '39158' | '39159' | '39160' | '39161' | '39162' | '39163' | '39164' | '39165'
  name?:
    | 'rte-h3'
    | 'list-unordered'
    | 'list-ordered'
    | 'text-underline'
    | 'strikethrough'
    | 'bold-words'
    | 'rte-h2'
    | 'rte-h1'
    | 'italics'
    | 'font-size'
    | 'line-down'
  size?: string
  width?: string
  height?: string
  color?: string
  stroke?: string
  fill?: string
  rtl?: string
  spin?: string
}
interface HTMLElementTagNameMap {
  'iconpark-icon': IconParkIcon
}
declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': HTMLElement<IconParkIcon>
  }
}
