import { Button } from '..'
export const Base = (): React.ReactElement => (
  <div>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="text" size="medium" block>
      Ghost Button
    </Button>
    <Button type="danger" size="large">
      Dang Button
    </Button>
  </div>
)
