import { FormulaContext, interpret, parse, SuccessParseResult, VariableMetadata } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaResult } from '../FormulaResult'

const formulaContext = new FormulaContext({ domain: 'test' })

const interpretContext = { ctx: {}, arguments: [] }

describe('FormulaResult', () => {
  it('renders formula result correctly', async () => {
    const namespaceId = '37198be0-d10d-42dc-ae8b-20d45a95401b'
    const variableId = 'b4289606-2a52-48e3-a50f-77ee321dd84e'
    const name = 'baz'

    const input = `= 1 + 1`
    const meta: VariableMetadata = { namespaceId, variableId, name, input, position: 0, richType: { type: 'normal' } }
    const parseResult = parse({ formulaContext, meta, interpretContext }) as SuccessParseResult

    const ctx = {
      formulaContext,
      meta,
      interpretContext
    }

    const tempT = await interpret({ ctx, parseResult })

    const { container } = render(<FormulaResult pageId="pageId" variableT={tempT} />)

    expect(container).toMatchSnapshot()
  })

  it('renders formula error result correctly', async () => {
    const namespaceId = '37198be0-d10d-42dc-ae8b-20d45a95401b'
    const variableId = 'b4289606-2a52-48e3-a50f-77ee321dd84e'
    const name = 'baz'

    // incorrect syntax
    const input = `= 1 ++++ 1`
    const meta: VariableMetadata = { namespaceId, variableId, name, input, position: 0, richType: { type: 'normal' } }
    const parseResult = parse({ formulaContext, meta, interpretContext }) as SuccessParseResult

    const ctx = {
      formulaContext,
      meta,
      interpretContext
    }

    const tempT = await interpret({ ctx, parseResult })

    const { container } = render(<FormulaResult pageId="pageId" variableT={tempT} />)

    expect(container).toMatchSnapshot()
  })

  it('renders nothing if no variableT', () => {
    const { container } = render(<FormulaResult pageId="pageId" variableT={undefined} />)

    expect(container).toMatchSnapshot()
  })

  it('renders nothing if input is empty', async () => {
    const namespaceId = '37198be0-d10d-42dc-ae8b-20d45a95401b'
    const variableId = 'b4289606-2a52-48e3-a50f-77ee321dd84e'
    const name = 'baz'

    const input = `=`
    const meta: VariableMetadata = { namespaceId, variableId, name, input, position: 0, richType: { type: 'normal' } }
    const parseResult = parse({ formulaContext, meta, interpretContext }) as SuccessParseResult

    const ctx = {
      formulaContext,
      meta,
      interpretContext
    }

    const tempT = await interpret({ ctx, parseResult })

    const { container } = render(<FormulaResult pageId="pageId" variableT={tempT} />)

    expect(container).toMatchSnapshot()
  })
})
