import { FormulaContext } from '../../context'
import { NOW } from '../date'

const ctx = {
  ctx: new FormulaContext({}),
  interpretContext: {
    ctx: {},
    arguments: []
  },
  meta: {
    namespaceId: '57622108-1337-4edd-833a-2557835bcfe0',
    variableId: '481b6dd1-e668-4477-9e47-cfe5cb1239d0',
    name: 'v',
    input: '=24'
  }
}

describe('date', () => {
  it('DATE', () => {
    expect(typeof NOW(ctx).result).toBe('object')
  })
})
