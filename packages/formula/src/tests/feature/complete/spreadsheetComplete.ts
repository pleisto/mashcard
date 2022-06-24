import { generateUUIDs } from '../../testHelper'
import { SpreadsheetInput, TestCaseInterface } from '../../testType'

const [namespaceId, spreadsheetId] = generateUUIDs()

export const SpreadsheetCompleteTestCase: TestCaseInterface = {
  name: 'spreadsheetComplete',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetCompletePage1',
        pageId: namespaceId,
        variables: [{ variableName: 'num0', definition: '=0' }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet1foobar',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                displayIndex: 'A',
                cells: [{ value: '1' }, { value: '3' }, { value: '5' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }, { value: '6' }]
              },
              {
                name: 'third',
                displayIndex: 'C',
                cells: [{ value: '3' }, { value: '' }, { value: 'Foo' }]
              }
            ]
          },
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<0, 0>>{
            name: 'Spreadsheet2 2',
            columns: []
          }
        ]
      }
    ],
    completeTestCases: [
      {
        definitionWithCursor: '= spreadsheet1F$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'spreadsheet1F' },
        namespaceId,
        firstCompletion: {
          name: 'spreadsheet1foobar',
          kind: 'spreadsheet',
          flags: ['nameStartsWith', 'defaultNamespace', 'spreadsheet']
        },
        completes: [{ definitionWithCursor: '= spreadsheet1foobar$ ' }]
      },
      {
        definitionWithCursor: '= spreadsheet1foobar$ ',
        firstNonSpaceCodeFragment: { code: 'Spreadsheet', display: 'spreadsheet1foobar' },
        namespaceId,
        firstCompletion: {
          name: 'spreadsheet1foobar',
          kind: 'spreadsheet',
          flags: ['exact', 'contextNamespace', 'defaultNamespace', 'spreadsheet']
        },
        completes: [{ definitionWithCursor: '= spreadsheet1foobar$ ' }]
      },
      {
        definitionWithCursor: '= SpreadsheetCompletePage1.spreadsheet1F$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'spreadsheet1F' },
        firstCompletion: {
          name: 'spreadsheet1foobar',
          kind: 'spreadsheet',
          flags: ['nameStartsWith', 'contextNamespace', 'spreadsheet']
        },
        completes: [{ definitionWithCursor: '= SpreadsheetCompletePage1.spreadsheet1foobar$ ' }]
      },
      {
        definitionWithCursor: '= SpreadsheetCompletePage1.spreadsheet1foobar$ ',
        firstNonSpaceCodeFragment: { code: 'Spreadsheet', display: 'spreadsheet1foobar' },
        firstCompletion: {
          name: 'spreadsheet1foobar',
          kind: 'spreadsheet',
          flags: ['exact', 'contextNamespace', 'spreadsheet']
        },
        completes: [{ definitionWithCursor: '= SpreadsheetCompletePage1.spreadsheet1foobar$ ' }]
      },
      {
        definitionWithCursor: '= Spreadsheet2$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'Spreadsheet2' },
        namespaceId,
        firstCompletion: {
          name: 'Spreadsheet2 2',
          kind: 'spreadsheet',
          flags: ['nameStartsWith', 'defaultNamespace', 'spreadsheet']
        },
        completes: [{ definitionWithCursor: '= "Spreadsheet2 2"$ ' }]
      },
      {
        label: 'Dot dynamic column',
        definitionWithCursor: '= spreadsheet1foobar.$ ',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'Spreadsheet', display: 'spreadsheet1foobar' },
        namespaceId,
        firstCompletion: {
          name: 'first',
          kind: 'column',
          flags: ['dynamicColumn', 'defaultNamespace', 'column']
        },
        completes: [{ definitionWithCursor: '= spreadsheet1foobar.first$ ' }]
      },
      {
        label: 'Dot dynamic column 2',
        definitionWithCursor: '= spreadsheet1foobar.fi$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'fi' },
        secondNonSpaceCodeFragment: { code: 'Dot' },
        thirdNonSpaceCodeFragment: { code: 'Spreadsheet', display: 'spreadsheet1foobar' },
        namespaceId,
        firstCompletion: {
          name: 'first',
          kind: 'column',
          flags: ['nameStartsWith', 'dynamicColumn', 'defaultNamespace', 'column']
        },
        completes: [{ definitionWithCursor: '= spreadsheet1foobar.first$ ' }]
      },
      {
        label: 'richType dynamic column',
        definitionWithCursor: '= fi$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'fi' },
        namespaceId,
        richType: { type: 'spreadsheet', meta: { spreadsheetId, rowId: '', columnId: '' } },
        firstCompletion: {
          name: 'first',
          kind: 'column',
          flags: ['nameStartsWith', 'dynamicColumn', 'defaultNamespace', 'column']
        },
        completes: [{ definitionWithCursor: '= first$ ' }]
      }
    ]
  }
}
