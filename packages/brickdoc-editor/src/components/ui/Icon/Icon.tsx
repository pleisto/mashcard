import { cloneElement, FC, ReactElement } from 'react'
import { Icon, IconProps, theme, rgba } from '@brickdoc/design-system'
import { IconBackground } from './IconBackground'

export { IconBackground }

export interface EditorIconProps extends IconProps {
  square?: boolean
}

const createEditorIcon =
  (Icon: ReactElement, bgColor: string): FC<EditorIconProps> =>
  ({ square, color, ...props }) => {
    if (square) {
      const iconProps: IconProps = { color }
      if (props.fill) iconProps.fill = props.fill
      return (
        <IconBackground color={bgColor} {...props}>
          {cloneElement(Icon, iconProps)}
        </IconBackground>
      )
    }
    return cloneElement(Icon, props)
  }

export const TextMessage = createEditorIcon(<Icon.TextMessage />, 'unset')
export const Copy = createEditorIcon(<Icon.Copy />, 'unset')
export const Add = createEditorIcon(<Icon.Add />, 'unset')
export const TextStyle = createEditorIcon(<Icon.TextStyle />, 'unset')
export const RteH1 = createEditorIcon(<Icon.RteH1 fill={theme.colors.blue4.value} />, theme.colors.blue4.value)
export const RteH2 = createEditorIcon(
  <Icon.RteH2 fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
export const RteH3 = createEditorIcon(<Icon.RteH3 fill={theme.colors.purple4.value} />, theme.colors.purple4.value)
export const RteH4 = createEditorIcon(<Icon.RteH4 fill={theme.colors.blue4.value} />, theme.colors.blue4.value)
export const RteH5 = createEditorIcon(<Icon.RteH5 fill={theme.colors.cyan4.value} />, theme.colors.cyan4.value)
export const ListOrdered = createEditorIcon(
  <Icon.ListOrdered fill={theme.colors.blue4.value} />,
  theme.colors.blue4.value
)
export const ListUnordered = createEditorIcon(
  <Icon.ListUnordered fill={theme.colors.purple4.value} />,
  theme.colors.purple4.value
)
export const CheckboxSquare = createEditorIcon(
  <Icon.CheckboxSquare fill={theme.colors.purple4.value} />,
  theme.colors.purple4.value
)
export const Quote = createEditorIcon(<Icon.Quote fill={theme.colors.cyan4.value} />, theme.colors.cyan4.value)
export const Code = createEditorIcon(<Icon.Code fill={theme.colors.cyan4.value} />, theme.colors.cyan4.value)
export const Formula = createEditorIcon(<Icon.Formula fill={theme.colors.cyan4.value} />, theme.colors.cyan4.value)
export const Divider = createEditorIcon(
  <Icon.Divider theme="multi-color" fill={[theme.colors.purple4.value, rgba(theme.colors.purple4.value, 0.3)]} />,
  theme.colors.purple4.value
)
export const Toc = createEditorIcon(
  <Icon.Toc theme="multi-color" fill={[theme.colors.blue4.value, rgba(theme.colors.blue4.value, 0.3)]} />,
  theme.colors.blue4.value
)
export const MindmapList = createEditorIcon(
  <Icon.MindmapList fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
export const Image = createEditorIcon(<Icon.Image fill={theme.colors.blue4.value} />, theme.colors.blue4.value)
export const Upload = createEditorIcon(
  <Icon.Upload fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
export const Link = createEditorIcon(
  <Icon.Link fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
export const Table = createEditorIcon(
  <Icon.Table fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
export const Unsplash = createEditorIcon(
  <Icon.Unsplash fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)

export const DragSecondary = createEditorIcon(
  <Icon.DragSecondary theme="multi-color" fill={[theme.colors.primaryDefault.value, theme.colors.blue2.value]} />,
  theme.colors.primaryDefault.value
)

export const Bulb = createEditorIcon(
  <Icon.Bulb fill={theme.colors.deepPurple4.value} />,
  theme.colors.deepPurple4.value
)
