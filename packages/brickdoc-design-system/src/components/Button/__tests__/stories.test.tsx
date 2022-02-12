import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonHTMLProps } from 'reakit/ts'
import { BtnType, Size } from '../constants'
import { a11yTest, toStoryTable } from '../../../utilities/testing'
import * as ButtonStories from '../button.stories'

const stories = composeStories(ButtonStories)
const storyTable = toStoryTable(stories)
const { Basic } = stories

describe('Button', () => {
  describe('rendering', () => {
    it.each(storyTable)('$name should pass the a11y test', async ({ story }) => {
      await a11yTest(story)
    })
    it.each(storyTable)('$name should match the snapshot', ({ Component }) => {
      const { container } = render(<Component />)
      expect(container).toMatchSnapshot()
    })
    it.each([{ type: 'primary' }, { type: 'secondary' }, { type: 'danger' }, { type: 'text' }] as Array<{
      type: BtnType
    }>)('should match the snapshot by type "$type"', ({ type }) => {
      const { container } = render(<Basic type={type} />)
      expect(container).toMatchSnapshot()
    })
    it.each([{ size: 'sm' }, { size: 'md' }, { size: 'lg' }] as Array<{
      size: Size
    }>)('should match the snapshot by size "$size"', ({ size }) => {
      const { container } = render(<Basic size={size} />)
      expect(container).toMatchSnapshot()
    })
    it('should match the snapshot as a block button', () => {
      const { container } = render(<Basic block />)
      expect(container).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    it('should trigger the onClick callback when being clicked', () => {
      const onClick = jest.fn()
      render(<Basic onClick={onClick} />)
      userEvent.click(screen.getByRole('button'))
      expect(onClick).toBeCalledTimes(1)
    })
    it('should not trigger the onClick callback if disabled', () => {
      const onClick = jest.fn()
      render(<Basic onClick={onClick} disabled />)
      // Use `fireEvent` instead of `userEvent` to force perform the click action.
      // Because `userEvent` will throw an error saying that the element is not
      // receiving a user interaction.
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toBeCalledTimes(1)
    })
    it('should not throw an error if the onClick callback is not set', () => {
      render(<Basic />)
      function doClick() {
        userEvent.click(screen.getByRole('button'))
      }
      expect(doClick).not.toThrow()
    })
  })

  describe('as a form button', () => {
    const onSubmit = jest.fn(e => e.preventDefault())
    const onReset = jest.fn()
    const getForm = (htmlType: ButtonHTMLProps['type']) => (
      <form onSubmit={onSubmit} onReset={onReset}>
        <input type="text" name="foo" />
        <Basic htmlType={htmlType} />
      </form>
    )
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should submit the form when being clicked by htmlType="submit"', () => {
      render(getForm('submit'))
      userEvent.click(screen.getByRole('button'))
      expect(onSubmit).toBeCalledTimes(1)
      expect(onReset).not.toBeCalled()
    })
    it('should reset the form when being clicked by htmlType="reset"', () => {
      render(getForm('reset'))
      userEvent.click(screen.getByRole('button'))
      expect(onSubmit).not.toBeCalled()
      expect(onReset).toBeCalledTimes(1)
    })
  })

  describe('loading state', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.useRealTimers()
    })
    const POSITIVE_DELAY = 1000
    // TODO: changed spin, owe first~
    /* function findLoadingIcon() {
*   return screen.queryByTestId('mock-icon-Rotation')
* }

* it('should show the loading state on a positive delay', () => {
*   render(<Basic loading={{ delay: POSITIVE_DELAY }} />)
*   expect(findLoadingIcon()).not.toBeInTheDocument()
*   act(() => {
*     jest.advanceTimersByTime(POSITIVE_DELAY)
*   })
*   expect(findLoadingIcon()).toBeInTheDocument()
* })
* it('should show the loading state immedialy if delay is 0', () => {
*   render(<Basic loading={{ delay: 0 }} />)
*   expect(findLoadingIcon()).toBeInTheDocument()
* })
* it('should show the loading state immedialy on an empty loading object', () => {
*   render(<Basic loading={{}} />)
*   expect(findLoadingIcon()).toBeInTheDocument()
* }) */
    it('should call clearTimeout when disposing the component', () => {
      const spySetTimer = jest.spyOn(global, 'setTimeout')
      const spyClearTimer = jest.spyOn(global, 'clearTimeout')
      render(<Basic loading={{ delay: POSITIVE_DELAY }} />)
      expect(setTimeout).toBeCalledTimes(1)
      expect(setTimeout).lastCalledWith(expect.any(Function), POSITIVE_DELAY)
      // The clearTimeout should be called only on disposal.
      expect(clearTimeout).not.toBeCalled()
      cleanup()
      expect(clearTimeout).toBeCalledTimes(1)
      spySetTimer.mockRestore()
      spyClearTimer.mockRestore()
    })
    it('should call clearTimeout when rendering a different loading state', () => {
      const spySetTimer = jest.spyOn(global, 'setTimeout')
      const spyClearTimer = jest.spyOn(global, 'clearTimeout')
      const { rerender } = render(<Basic loading={{ delay: POSITIVE_DELAY }} />)
      expect(setTimeout).toBeCalledTimes(1)
      expect(setTimeout).lastCalledWith(expect.any(Function), POSITIVE_DELAY)
      expect(clearTimeout).not.toBeCalled()
      rerender(<Basic loading={{ delay: 2000 }} />)
      expect(clearTimeout).toBeCalledTimes(1)
      expect(setTimeout).toBeCalledTimes(2)
      expect(setTimeout).lastCalledWith(expect.any(Function), 2000)
      spySetTimer.mockRestore()
      spyClearTimer.mockRestore()
    })
    // fixme
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should not operate on the timer if "loading" is a boolean', () => {
      const spySetTimer = jest.spyOn(global, 'setTimeout')
      const spyClearTimer = jest.spyOn(global, 'clearTimeout')
      render(<Basic loading />)
      expect(setTimeout).not.toBeCalled()
      cleanup()
      expect(clearTimeout).not.toBeCalled()
      spySetTimer.mockRestore()
      spyClearTimer.mockRestore()
    })
  })
})
