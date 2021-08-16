import React from 'react'
import { Story } from '@storybook/react'
import { Row, Col, Divider, Input } from '../'

export default {
  title: 'ReactComponents/Grid',
  component: Row,
  parameters: {
    docs: {
      description: {
        component: `
24 Grids System.

In most business situations, Brickdoc Design System needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 sections.

We name the divided area 'box'. We suggest four boxes for horizontal arrangement at most, one at least. Boxes are proportional to the entire screen as shown in the picture above. To ensure a high level of visual comfort, we customize the typography inside of the box based on the box unit.

#### Outline

In the grid system, we define the frame outside the information area based on \`row\` and \`column\`, to ensure that every area can have stable arrangement.

Following is a brief look at how it works:

- Establish a set of \`column\` in the horizontal space defined by \`row\` (abbreviated col).
- Your content elements should be placed directly in the \`col\`, and only \`col\` should be placed directly in \`row\`.
- The column grid system is a value of 1-24 to represent its range spans. For example, three columns of equal width can be created by \`<Col span={8} />\`.
- If the sum of \`col\` spans in a \`row\` are more than 24, then the overflowing \`col\` as a whole will start a new line arrangement.

Our grid systems base on Flex layout to allow the elements within the parent to be aligned horizontally - left, center, right, wide arrangement, and decentralized arrangement. The Grid system also supports vertical alignment - top aligned, vertically centered, bottom-aligned. You can also define the order of elements by using \`order\`.

Layout uses a 24 grid layout to define the width of each "box", but does not rigidly adhere to the grid layout.

#### API

If the Brickdoc Design System grid layout component does not meet your needs, you can use the excellent layout components of the community:

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](https://github.com/whoisandy/react-blocks/)

##### Row

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| align | Vertical alignment | \`top\` \\| \`middle\` \\| \`bottom\` | \`top\` |
| gutter | Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}. Or you can use array to make horizontal and vertical spacing work at the same time \`[horizontal, vertical]\` | number \\| object \\| array | 0 |
| justify | Horizontal arrangement | \`start\` \\| \`end\` \\| \`center\` \\| \`space-around\` \\| \`space-between\` | \`start\` |
| wrap | Auto wrap line | boolean | true |

##### Col

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| flex | Flex layout style | string \\| number | - |
| offset | The number of cells to offset Col from the left | number | 0 |
| order | Raster order | number | 0 |
| pull | The number of cells that raster is moved to the left | number | 0 |
| push | The number of cells that raster is moved to the right | number | 0 |
| span | Raster number of cells to occupy, 0 corresponds to \`display: none\` | number | none |
| xs | \`screen < 576px\` and also default setting, could be a \`span\` value or an object containing above props | number \\| object | - |
| sm | \`screen ≥ 576px\`, could be a \`span\` value or an object containing above props | number \\| object | - |
| md | \`screen ≥ 768px\`, could be a \`span\` value or an object containing above props | number \\| object | - |
| lg | \`screen ≥ 992px\`, could be a \`span\` value or an object containing above props | number \\| object | - |
| xl | \`screen ≥ 1200px\`, could be a \`span\` value or an object containing above props | number \\| object | - |
| xxl | \`screen ≥ 1600px\`, could be a \`span\` value or an object containing above props | number \\| object | - |

The breakpoints of responsive grid follow [BootStrap 4 media queries rules](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints) (not including \`occasionally part\`).
`
      }
    }
  }
}

const Template: Story = _args => {
  return (
    <div>
      <div>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    </div>
  )
}

export const Example = Template.bind({})
const style = { background: '#0092ff', padding: '8px 0' }
export const GridGutter: Story = _args => {
  return (
    <>
      <Divider orientation="left">Horizontal</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Vertical</Divider>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </>
  )
}

export const ColumnOffset: Story = _args => {
  return (
    <>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8} offset={8}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          col-12 col-offset-6
        </Col>
      </Row>
    </>
  )
}

export const GridSort: Story = _args => {
  return (
    <>
      <Row>
        <Col span={18} push={6}>
          col-18 col-push-6
        </Col>
        <Col span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row>
    </>
  )
}

export const FlexStrtch: Story = _args => {
  return (
    <>
      <Divider orientation="left">Percentage columns</Divider>
      <Row>
        <Col flex={2}>2 / 5</Col>
        <Col flex={3}>3 / 5</Col>
      </Row>
      <Divider orientation="left">Fill rest</Divider>
      <Row>
        <Col flex="100px">100px</Col>
        <Col flex="auto">Fill Rest</Col>
      </Row>
      <Divider orientation="left">Raw flex style</Divider>
      <Row>
        <Col flex="1 1 200px">1 1 200px</Col>
        <Col flex="0 1 300px">0 1 300px</Col>
      </Row>

      <Row wrap={false}>
        <Col flex="none">
          <div style={{ padding: '0 16px' }}>none</div>
        </Col>
        <Col flex="auto">auto with no-wrap</Col>
      </Row>
    </>
  )
}

const gutters = {}
const vgutters = {}
const colCounts = {}

;[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value
})
;[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value
})
;[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value
})

class App extends React.Component {
  state = {
    gutterKey: 1,
    vgutterKey: 1,
    colCountKey: 2
  }

  onGutterChange = gutterKey => {
    this.setState({ gutterKey })
  }

  onVGutterChange = vgutterKey => {
    this.setState({ vgutterKey })
  }

  onColCountChange = colCountKey => {
    this.setState({ colCountKey })
  }

  render() {
    const { gutterKey, vgutterKey, colCountKey } = this.state
    const cols = []
    const colCount = colCounts[colCountKey]
    let colCode = ''
    for (let i = 0; i < colCount; i += 1) {
      cols.push(
        <Col key={i.toString()} span={24 / colCount}>
          <div>Column</div>
        </Col>
      )
      colCode += `  <Col span={${24 / colCount}} />\n`
    }
    return (
      <>
        <span>Horizontal Gutter (px): </span>
        <div style={{ width: '50%' }}>
          <Input value={gutterKey} onChange={this.onGutterChange} />
        </div>
        <span>Vertical Gutter (px): </span>
        <div style={{ width: '50%' }}>
          <Input value={vgutterKey} onChange={this.onVGutterChange} />
        </div>
        <span>Column Count:</span>
        <div style={{ width: '50%', marginBottom: 48 }}>
          <Input value={colCountKey} onChange={this.onColCountChange} />
        </div>
        <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
          {cols}
          {cols}
        </Row>
        Another Row:
        <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
        <br />
        <Divider />
        <br />
        <pre>
          <code>{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}\n${colCode}</Row>`}</code>
        </pre>
        <pre>
          <code>{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</code>
        </pre>
      </>
    )
  }
}

export const Playground: Story = _args => <App />
