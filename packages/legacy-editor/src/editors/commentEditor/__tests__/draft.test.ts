import { clearDraft, getDraft, setDraft } from '../draft'

describe('draft', () => {
  it('handles getDraft correctly', () => {
    expect(() => {
      getDraft('markId')
    }).not.toThrow()
  })

  it('handles setDraft correctly', () => {
    expect(() => {
      setDraft('markId', [])
    }).not.toThrow()
  })

  it('handles clearDraft correctly', () => {
    expect(() => {
      clearDraft('markId')
    }).not.toThrow()
  })
})
