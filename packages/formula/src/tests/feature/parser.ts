import { generateUUIDs } from '../testHelper'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const [namespaceId, spreadsheetId, firstColumnId, firstRowId] = generateUUIDs()
const richType = { type: 'spreadsheet', meta: { spreadsheetId, columnId: firstColumnId, rowId: firstRowId } } as const

export const ParserTestCase: TestCaseInterface = {
  name: 'parser',
  testCases: {
    pages: [
      {
        pageName: 'ParserPage',
        pageId: namespaceId,
        variables: [{ definition: '=24', variableName: 'bar' }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<1, 1>>{
            name: 'spreadsheet123',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                columnId: firstColumnId,
                displayIndex: 'A',
                cells: [{ value: '1' }]
              }
            ],
            rows: [{ rowId: firstRowId }]
          }
        ]
      }
    ],
    successTestCases: [
      { definition: '="ok"', result: 'ok', name: 'ok', namespaceId },
      { definition: '== 1', label: 'equal parse', result: 1 },
      ...[
        {
          definition: '=',
          result: 'Blank',
          expected: [{ key: 'codeFragments', matchType: 'toMatchObject', match: [{ code: 'Equal' }] }] as const
        },
        {
          definition: '= \n ',
          result: 'Blank',
          expected: [
            {
              key: 'codeFragments',
              matchType: 'toMatchObject',
              match: [{ code: 'Equal' }, { code: 'Space', display: ' \n ' }]
            }
          ] as const
        }
      ].flatMap<NonNullable<TestCaseInterface['testCases']['successTestCases']>[0]>(t => [
        { ...t },
        { ...t, namespaceId, richType }
      ])
    ],
    errorTestCases: [
      {
        definition: '==',
        label: 'equal 1',
        errorType: 'parse',
        errorMessage: 'Parse error: ""',
        valid: false,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'Equal', errors: [] }
            ]
          }
        ]
      },
      {
        definition: '===',
        label: 'equal 2',
        errorType: 'parse',
        errorMessage: 'Parse error: ""',
        valid: false,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'Equal2', errors: [] }
            ]
          }
        ]
      },
      {
        definition: '====',
        label: 'equal 3',
        errorType: 'syntax',
        errorMessage: 'Missing expression',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'Equal2', errors: [] },
              {
                code: 'Equal',
                errors: [
                  { message: 'Missing expression' },
                  { message: 'Parse error: "="' },
                  { message: 'Parse error: ""' }
                ],
                type: 'boolean'
              }
            ]
          }
        ]
      },
      {
        definition: '=====',
        label: 'equal 4',
        errorType: 'syntax',
        errorMessage: 'Missing expression',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'Equal2', errors: [] },
              {
                code: 'Equal2',
                errors: [
                  { message: 'Missing expression' },
                  { message: 'Parse error: "=="' },
                  { message: 'Parse error: ""' }
                ],
                type: 'boolean'
              }
            ]
          }
        ]
      },
      {
        definition: '="if"',
        errorType: 'name_check',
        errorMessage: 'Variable name is reserved',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'StringLiteral', errors: [] }
            ]
          }
        ],
        namespaceId,
        name: 'if'
      },
      ...[
        { name: 'in' },
        { name: '1asd' },
        { name: 'asd$asd' },
        { name: '' },
        { name: ' asd' },
        { name: '  ' },
        { name: 'asd foo bar' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        ...t,
        definition: '="bar"',
        errorType: 'name_invalid',
        errorMessage: 'Variable name is not valid',
        namespaceId,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'StringLiteral', errors: [] }
            ]
          }
        ]
      })),
      ...[
        { name: 'bar' },
        { name: 'BaR' },
        { name: 'ParserPage', label: 'block name' },
        { name: 'spreadsheet123', label: 'spreadsheet name' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        ...t,
        definition: '="bar"',
        errorType: 'name_unique',
        errorMessage: 'Name exist in same namespace',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal', errors: [] },
              { code: 'StringLiteral', errors: [] }
            ]
          }
        ],
        namespaceId
      }))
    ]
  }
}
