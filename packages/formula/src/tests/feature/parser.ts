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
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
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
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
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
        errorMessage: 'errors.parse.missing.expression',
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
                  { message: 'errors.parse.missing.expression' },
                  { message: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"="' }] },
                  { message: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }] }
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
        errorMessage: 'errors.parse.missing.expression',
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
                  { message: 'errors.parse.missing.expression' },
                  { message: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"=="' }] },
                  { message: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }] }
                ],
                type: 'boolean'
              }
            ]
          }
        ]
      },
      ...[
        {
          definition: '="if"',
          groupOptions: [{ name: 'basicError' }] as const,
          expected: [
            {
              key: 'codeFragments',
              matchType: 'toMatchObject',
              match: [
                { code: 'Equal', errors: [] },
                { code: 'StringLiteral', errors: [] }
              ]
            }
          ] as const
        },
        {
          definition: '=  ',
          label: 'blank vs nameCheck priority',
          expected: [
            {
              key: 'codeFragments',
              matchType: 'toMatchObject',
              match: [
                { code: 'Equal', errors: [] },
                { code: 'Space', errors: [] }
              ]
            }
          ] as const
        }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        errorType: 'name_check',
        errorMessage: 'errors.parse.name.reserved',
        namespaceId,
        name: 'if',
        ...t
      })),
      ...[
        { name: 'in', groupOptions: [{ name: 'basicError' }] as const },
        { name: '1asd' },
        { name: 'asd$asd' },
        { name: '' },
        { name: ' asd' },
        { name: '  ' },
        { name: 'asd foo bar' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        definition: '="bar"',
        errorType: 'name_invalid',
        errorMessage: 'errors.parse.name.invalid',
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
        ],
        ...t
      })),
      ...[
        { name: 'bar', groupOptions: [{ name: 'basicError' }] as const },
        { name: 'BaR' },
        { name: 'ParserPage', label: 'block name' },
        { name: 'spreadsheet123', label: 'spreadsheet name' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        definition: '="bar"',
        errorType: 'name_unique',
        errorMessage: 'errors.parse.name.duplicated',
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
        ...t
      }))
    ]
  }
}
