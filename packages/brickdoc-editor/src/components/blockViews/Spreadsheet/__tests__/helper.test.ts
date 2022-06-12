import { columnDisplayIndex, columnIndexFromDisplay, parsePasteTable } from '../helper'

describe('Spreadsheet Helper', () => {
  it('index to display', () => {
    expect(columnDisplayIndex(0)).toEqual('A')
    expect(columnDisplayIndex(25)).toEqual('Z')

    expect(columnDisplayIndex(26)).toEqual('AA')
    expect(columnDisplayIndex(51)).toEqual('AZ')

    expect(columnDisplayIndex(52)).toEqual('BA')

    expect(columnDisplayIndex(702)).toEqual('AAA')
  })

  it('display to index', () => {
    expect(columnIndexFromDisplay('1')).toEqual(-1)

    expect(columnIndexFromDisplay('A')).toEqual(0)
    expect(columnIndexFromDisplay('Z')).toEqual(25)

    expect(columnIndexFromDisplay('AA')).toEqual(26)
    expect(columnIndexFromDisplay('AZ')).toEqual(51)

    expect(columnIndexFromDisplay('BA')).toEqual(52)

    expect(columnIndexFromDisplay('AAA')).toEqual(702)
  })

  it('parse pasteboard data', () => {
    expect(parsePasteTable('col')).toEqual([['col']])
    expect(parsePasteTable('c1\tc2')).toEqual([['c1', 'c2']])
    expect(parsePasteTable("c1\tc2\t'c\n3'")).toEqual([['c1', 'c2', 'c\n3']])
    expect(parsePasteTable("c1\tc2\t'c\n3'\ne1")).toEqual([['c1', 'c2', 'c\n3'], ['e1']])
    expect(parsePasteTable('c1\tc2\t\'c\n3\'\ne1\n"f\t3"')).toEqual([['c1', 'c2', 'c\n3'], ['e1'], ['f\t3']])
    expect(parsePasteTable('"1\n1"\t2\n3\t\n4\t\n5\t')).toEqual([['1\n1', '2'], ['3'], ['4'], ['5']])

    expect(parsePasteTable('col with space')).toEqual([['col with space']])
  })
})
