import { VisuallyHidden } from './'

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
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
