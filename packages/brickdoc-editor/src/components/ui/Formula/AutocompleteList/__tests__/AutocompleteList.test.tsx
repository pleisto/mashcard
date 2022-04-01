import { fireEvent, render, screen } from '@testing-library/react'
import {
  BlockType,
  ColumnType,
  Completion,
  FormulaContext,
  FormulaType,
  FunctionClause,
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
      namespace: 'namespace',
      value: '#value',
      preview: preview as BlockType,
      renderDescription: () => 'description'
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
      namespace: 'namespace',
      value: '#value',
      preview: preview as BlockType,
      renderDescription: () => 'description'
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
      namespace: 'namespace',
      value: '#value',
      preview: preview as BlockType,
      renderDescription: () => 'description'
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
        namespace: 'namespace',
        value: '#value',
        preview: preview as BlockType,
        renderDescription: () => 'description'
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
        listColumns: () => [
          {
            columnId: 'column',
            namespaceId: 'namespace',
            name: 'name',
            index: 0
          }
        ],
        listRows: () => [
          {
            rowId: 'row',
            rowIndex: 0
          }
        ],
        findCellDisplayData: () => undefined,
        name: () => 'name'
      }
      const preview: Partial<ColumnType> = {
        spreadsheet: spreadsheet as SpreadsheetType
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'column',
        namespace: 'namespace',
        value: '#column.field',
        preview: preview as ColumnType,
        renderDescription: () => 'description'
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
        listColumns: () => [
          {
            columnId: 'column',
            namespaceId: 'namespace',
            name: 'name',
            index: 0
          }
        ],
        listRows: () => [
          {
            rowId: 'row',
            rowIndex: 0
          }
        ],
        findCellDisplayData: () => undefined,
        name: () => 'name'
      }
      const activeCompletion: Partial<Completion> = {
        kind: 'spreadsheet',
        namespace: 'namespace',
        value: '#column.field',
        preview: preview as SpreadsheetType,
        renderDescription: () => 'description'
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
      const preview: Partial<FunctionClause<FormulaType>> = {
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
        namespace: 'namespace',
        value: 'function()',
        preview: preview as FunctionClause<FormulaType>,
        renderDescription: () => 'description'
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
      const meta: VariableMetadata = { namespaceId, variableId, name, input, position: 0, type: 'normal' }
      const parseInput = { ctx: { formulaContext, meta, interpretContext } }
      const parseResult = parse(parseInput) as SuccessParseResult

      const ctx = {
        formulaContext,
        meta,
        interpretContext
      }

      const variable = await interpret({ ctx, parseResult })

      const activeCompletion: Partial<Completion> = {
        kind: 'variable',
        namespace: 'namespace',
        value: '#var.prop',
        preview: variable,
        renderDescription: () => 'description'
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
