import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import { FC } from 'react'
import * as TabsStories from '../tabs.stories'
import { Tabs } from '../index'

const { Basic } = composeStories(TabsStories)

it('Tabs Should be passed a11y test', async () => await a11yTest(Basic as FC))

describe('Tabs', () => {
  it(`matches snapshot correctly`, () => {
    const { container } = render(
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="tab 1" key="1">
          first
        </Tabs.TabPane>
        <Tabs.TabPane tab="tab 2" key="2">
          second
        </Tabs.TabPane>
        <Tabs.TabPane tab="tab 3" key="3">
          third
        </Tabs.TabPane>
      </Tabs>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
