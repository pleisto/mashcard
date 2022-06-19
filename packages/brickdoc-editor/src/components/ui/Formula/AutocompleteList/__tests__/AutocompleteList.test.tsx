import { fireEvent, render, screen } from '@testing-library/react'
import {
  AnyFunctionClause,
  BlockType,
  ColumnType,
  Completion,
  FormulaContext,
  generateVariable,
  interpret,
  parse,
  SpreadsheetType,
  SuccessParseResult,
  VariableMetadata
} from '@brickdoc/formula'
import { AutocompleteList } from '../..'
import { CompletionType } from '../../../../blockViews'

describe('AutocompleteList', () => {
  it('renders nothing if input is empty', () => {
    const preview: Partial<BlockType> = {
      name: () => 'name'
    }
    const activeCompletion: Partial<Completion> = {
      kind: 'block',
      preview: preview as BlockType
    }
    const completion: CompletionType = {
      kind: 'Completion',
      input: '=',
      formulaType: 'normal',
      completions: [activeCompletion as Completion],
      activeCompletion: activeCompletion as Completion,
      activeCompletionIndex: 0
    }
    render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

    expect(() => screen.getAllByRole('button')).toThrow()
  })

  it('renders nothing if no completions', () => {
    const completion: CompletionType = {
      kind: 'Completion',
      input: '=1+1',
      formulaType: 'normal',
      completions: [],
      activeCompletion: undefined,
      activeCompletionIndex: 0
    }
    render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

    expect(() => screen.getAllByRole('button')).toThrow()
  })

  it('triggers completion click event correctly', () => {
    const preview: Partial<BlockType> = {
      name: () => 'name'
    }
    const activeCompletion: Partial<Completion> = {
      kind: 'block',
      preview: preview as BlockType
    }
    const completion: CompletionType = {
      kind: 'Completion',
      input: '=1+1',
      formulaType: 'normal',
      completions: [activeCompletion as Completion],
      activeCompletion: activeCompletion as Completion,
      activeCompletionIndex: 0
    }
    render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

    const item = screen.getAllByRole('button')[0]

    expect(() => fireEvent.click(item)).not.toThrow()
  })

  it('triggers completion keydown event correctly', () => {
    const preview: Partial<BlockType> = {
      name: () => 'name'
    }
    const activeCompletion: Partial<Completion> = {
      kind: 'block',
      preview: preview as BlockType
    }
    const completion: CompletionType = {
      kind: 'Completion',
      input: '=1+1',
      formulaType: 'normal',
      completions: [activeCompletion as Completion],
      activeCompletion: activeCompletion as Completion,
      activeCompletionIndex: 0
    }
    render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

    const item = screen.getAllByRole('button')[0]

    expect(() => fireEvent.keyDown(item)).not.toThrow()
  })

  describe('Active Completion', () => {
    it('renders block kind correctly', () => {
      const preview: Partial<BlockType> = {
        name: () => 'name'
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'block',
        preview: preview as BlockType
      }
      const completion: CompletionType = {
        kind: 'Completion',
        input: '=1+1',
        formulaType: 'normal',
        completions: [activeCompletion as Completion],
        activeCompletion: activeCompletion as Completion,
        activeCompletionIndex: 0
      }
      const { container } = render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
      expect(container).toMatchSnapshot()
    })

    it('renders column kind correctly', () => {
      const spreadsheet: Partial<SpreadsheetType> = {
        listColumns: () => [],
        listRows: () => [],
        findCellDisplayData: () => undefined,
        name: () => 'name'
      }
      const preview: Partial<ColumnType> = {
        spreadsheet: spreadsheet as SpreadsheetType
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'column',
        preview: preview as ColumnType
      }
      const completion: CompletionType = {
        kind: 'Completion',
        input: '=1+1',
        formulaType: 'normal',
        completions: [activeCompletion as Completion],
        activeCompletion: activeCompletion as Completion,
        activeCompletionIndex: 0
      }
      const { container } = render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
      expect(container).toMatchSnapshot()
    })

    it('renders spreadsheet kind correctly', () => {
      const preview: Partial<SpreadsheetType> = {
        listColumns: () => [],
        listRows: () => [],
        findCellDisplayData: () => undefined,
        name: () => 'name'
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'spreadsheet',
        preview: preview as SpreadsheetType
      }
      const completion: CompletionType = {
        kind: 'Completion',
        input: '=1+1',
        formulaType: 'normal',
        completions: [activeCompletion as Completion],
        activeCompletion: activeCompletion as Completion,
        activeCompletionIndex: 0
      }
      const { container } = render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
      expect(container).toMatchSnapshot()
    })

    it('renders function kind correctly', () => {
      const preview: Partial<AnyFunctionClause> = {
        name: 'name',
        args: [
          {
            name: 'arg',
            type: 'number'
          }
        ],
        examples: [
          {
            codeFragments: [],
            input: 'input',
            output: null
          }
        ]
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'function',
        preview: preview as AnyFunctionClause
      }
      const completion: CompletionType = {
        kind: 'Completion',
        input: '=1+1',
        formulaType: 'normal',
        completions: [activeCompletion as Completion],
        activeCompletion: activeCompletion as Completion,
        activeCompletionIndex: 0
      }
      const { container } = render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
      expect(container).toMatchSnapshot()
    })

    it('renders variable kind correctly', async () => {
      const formulaContext = new FormulaContext({ domain: 'test' })
      const interpretContext = { ctx: {}, arguments: [] }

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
      const variable = generateVariable({ formulaContext, t: tempT })

      const activeCompletion: Partial<Completion> = {
        kind: 'variable',
        preview: variable
      }
      const completion: CompletionType = {
        kind: 'Completion',
        input: '=1+1',
        formulaType: 'normal',
        completions: [activeCompletion as Completion],
        activeCompletion: activeCompletion as Completion,
        activeCompletionIndex: 0
      }
      const { container } = render(<AutocompleteList rootId="rootId" formulaId="formulaId" completion={completion} />)

      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
      expect(container).toMatchSnapshot()
    })
  })
})
