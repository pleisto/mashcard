import { FC } from 'react'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import { Button } from '../../'
import { EmptyType } from '../constants'
import * as Stories from '../empty.stories'
import { Empty } from '../index'

jest.mock('../../../hooks/useId')
const { Basic, Found } = composeStories(Stories)

it('Empty-Basic Should be passed a11y test', async () => await a11yTest(Basic as FC))
it('Empty-Found Should be passed a11y test', async () => await a11yTest(Found as FC))

describe('tag', () => {
  it(`matches snapshot correctly`, () => {
    const args = {
      description: 'There is empty.',
      type: EmptyType.Empty,
      id: 'testid',
      action: (
        <Button size="sm" type="primary">
          go to
        </Button>
      )
    }
    const { container } = render(<Empty {...args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
