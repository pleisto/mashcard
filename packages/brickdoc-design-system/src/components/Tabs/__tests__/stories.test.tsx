import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { range } from 'lodash-es'
import { a11yTest } from '../../../utilities/testing'
import { FC } from 'react'
import * as TabsStories from '../tabs.stories'
import { Tabs, TabPane } from '../index'

const { Basic } = composeStories(TabsStories)

it('Tabs Should be passed a11y test', async () => await a11yTest(Basic as FC))

describe('Tabs', () => {
  it(`matches snapshot correctly`, () => {
    const { container } = render(
      <Tabs defaultActiveKey="2">
        <TabPane tab="tab 1" key="1">
          first
        </TabPane>
        <TabPane tab="tab 2" key="2">
          second
        </TabPane>
        <TabPane tab="tab 3" key="3">
          third
        </TabPane>
      </Tabs>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`The number of snapshots is matched correctly`, () => {
    const list = range(10)
    const { container } = render(
      <Tabs defaultActiveKey="2">
        {list.map(i => (
          <TabPane tab={`tab-${i}`} key={i}>
            tab title {i}
          </TabPane>
        ))}
      </Tabs>
    )
    expect(container).toMatchSnapshot()
  })
})
