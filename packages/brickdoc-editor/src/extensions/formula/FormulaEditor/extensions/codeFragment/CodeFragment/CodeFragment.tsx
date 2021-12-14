import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'
import {
  CodeFragment as CodeFragmentType,
  ColumnCodeFragment,
  SpreadsheetCodeFragment,
  VariableCodeFragment
} from '@brickdoc/formula'
import { StringLiteral } from '../CodeFragment/StringLiteral/StringLiteral'
import { NumberLiteral } from '../CodeFragment/NumberLiteral/NumberLiteral'
import './CodeFragment.less'
import { Variable } from './Variable/variable'
import { Function } from './Function/function'
import { BooleanLiteral } from './BooleanLiteral/BooleanLiteral'
import { Spreadsheet } from './Spreadsheet/Spreadsheet'
import { Column } from './Column/Column'

export interface CodeFragmentProps extends NodeViewProps {}

type CodeFragmentWithBlockId = CodeFragmentType & { blockId: string }

const renderContent = (codeFragment: CodeFragmentWithBlockId, content: string): React.ReactElement => {
  switch (codeFragment.code) {
    case 'StringLiteral':
      return <StringLiteral content={content} />
    case 'NumberLiteral':
      return <NumberLiteral content={content} />
    case 'BooleanLiteral':
      return <BooleanLiteral content={content} />
    case 'Variable':
      return <Variable codeFragment={codeFragment as VariableCodeFragment & { blockId: string }} />
    case 'Function':
      return <Function codeFragment={codeFragment} content={content} />
    case 'Spreadsheet':
      return <Spreadsheet codeFragment={codeFragment as SpreadsheetCodeFragment} />
    case 'Column':
      return <Column codeFragment={codeFragment as ColumnCodeFragment} />
    default:
      return <span className="brickdoc-formula-code-fragment-content">{content}</span>
  }
}

export const CodeFragment: React.FC<CodeFragmentProps> = ({ editor, node }) => {
  const codeFragment = node.attrs as CodeFragmentWithBlockId
  const text = `${codeFragment.spaceBefore ? ' ' : ''}${codeFragment.name}${codeFragment.spaceAfter ? ' ' : ''}`
  const errors = codeFragment.errors
  // console.log({ attrs: node.attrs, text, errors })

  return (
    <NodeViewWrapper as="span">
      <span
        className={errors.length ? 'brickdoc-formula-code-fragment-error' : 'brickdoc-formula-code-fragment-normal'}>
        {renderContent(codeFragment, text)}
      </span>
    </NodeViewWrapper>
  )
}
