import { VisuallyHidden } from './'

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  args: {
    asChild: false
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      description:
        'Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Visually hides content while preserving it for assistive technology.
`
      }
    }
  }
}

export const Basic = () => (
  <button>
    <VisuallyHidden>Save the file</VisuallyHidden>
    <span aria-hidden>💾</span>
  </button>
)
