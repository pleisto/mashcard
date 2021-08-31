# @brickdoc/design-colors

```js
import { Apple } from 'brickdoc-design-icons'
// OR
import Apple from 'brickdoc-design-icons/src/icons/Apple'
```

## Props

| prop           | description                             | type                                                             | default        | note |
| -------------- | --------------------------------------- | ---------------------------------------------------------------- | -------------- | ---- |
| theme          | Theme of the icons.                     | 'outline' &#124; 'filled' &#124; 'two-tone' &#124; 'multi-color' | 'outline'      |
| size           | The width/height of the icon            | number &#124; string                                             | '1em'          |
| spin           | Rotate icon with animation              | boolean                                                          | false          |
| fill           | Colors of theme                         | string &#124; string[]                                           | 'currentColor' |
| strokeLinecap  | the stroke-linecap prop of svg element  | 'butt' &#124; 'round' &#124; 'square'                            | 'round'        |
| strokeLinejoin | the stroke-linejoin prop of svg element | 'miter' &#124; 'round' &#124; 'bevel'                            | 'round'        |
| strokeWidth    | the stroke-width prop of svg element    | number                                                           | 3              |

**Other props**

You can use all props which are defined in `HTMLAttributes<HTMLSpanElement>>`, such as:

- className
- style
- onClick
- ...
