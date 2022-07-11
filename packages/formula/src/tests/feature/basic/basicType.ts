import { SpreadsheetInput, TestCaseInterface } from '../../testType'

const [namespaceId, spreadsheetId, columnId, rowId] = [
  'aaaa0000-0000-0000-0000-000000000000',
  'aaaa1111-1111-1111-1111-111111111111',
  'aaaa2222-2222-2222-2222-222222222222',
  'aaaa3333-3333-3333-3333-333333333333'
]

const richType = { type: 'spreadsheet', meta: { spreadsheetId, columnId, rowId } } as const

export const BasicTypeTestCase: TestCaseInterface = {
  name: 'basicType',
  testCases: {
    pages: [
      {
        pageName: 'BasicTypePage',
        pageId: namespaceId,
        variables: [
          { definition: '=24', variableName: 'bar' },
          { variableName: 'lazy', definition: '=SLEEP(24)' }
        ],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<2, 2>>{
            name: 'spreadsheet',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                columnId,
                displayIndex: 'A',
                cells: [{ value: '1' }, { value: '3' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }]
              }
            ],
            rows: [{ rowId }, {}]
          }
        ]
      }
    ],
    basicTestCases: [
      ...[
        { definition: '=', label: 'Empty' },
        { definition: '=1 ++ 1', label: 'parse error 1' },
        { definition: '=1 +', label: 'partial error 1' },
        { definition: '=custom::ADD(1)', label: 'partial error 2' },
        { definition: '=SLEEP(123)', label: 'async 1' },
        { definition: '=BasicPage.lazy', label: 'async 2' },
        { definition: '=   1 + 1 + 1   ' },
        { definition: '="string" & "fasd"' },
        { definition: '=true && false' },
        { definition: '=null' },
        { definition: '=[]' },
        { definition: '=DATE("1926-08-17")', label: 'Date' },
        { definition: '=BasicPage.bar', label: 'Variable' },
        { definition: '=1/0', label: 'Divide by zero error' },
        { definition: '=[1,"1",false]' },
        { definition: '={}' },
        { definition: '={a: 1,b: false, c: "string", d: [1]}' },
        { definition: 'literal', label: 'literal string' },
        { definition: '=BasicPage', label: 'Block' },
        { definition: '=BasicPage.spreadsheet', label: 'Spreadsheet' },
        { definition: '=BasicPage.spreadsheet.first', label: 'column1' },
        { definition: '=BasicPage.spreadsheet.A', label: 'column2' },
        { definition: '=BasicPage.spreadsheet.1', label: 'row' },
        { definition: '=BasicPage.spreadsheet.first.1', label: 'cell' }
      ].flatMap(t => [{}, { namespaceId, richType }].map(rest => ({ ...t, ...rest })))
    ]
  }
}
