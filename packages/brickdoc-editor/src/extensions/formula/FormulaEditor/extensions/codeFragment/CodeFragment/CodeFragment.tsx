import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'
import { CodeFragment as CodeFragmentType } from '@brickdoc/formula'
import { StringLiteral } from '../CodeFragment/StringLiteral/StringLiteral'
import { NumberLiteral } from '../CodeFragment/NumberLiteral/NumberLiteral'
import './CodeFragment.less'
import { Variable } from './Variable/variable'
import { Function } from './Function/function'
import { BooleanLiteral } from './BooleanLiteral/BooleanLiteral'

export interface CodeFragmentProps extends NodeViewProps {}

const renderContent = (codeFragment: CodeFragmentType, content: string): React.ReactElement => {
  switch (codeFragment.code) {
    case 'StringLiteral':
      return <StringLiteral content={content} />
    case 'NumberLiteral':
      return <NumberLiteral content={content} />
    case 'BooleanLiteral':
      return <BooleanLiteral content={content} />
    case 'Variable':
      return <Variable codeFragment={codeFragment} />
    case 'Function':
      return <Function codeFragment={codeFragment} content={content} />
    default:
      return <span className="brickdoc-formula-code-fragment-content">{content}</span>
  }
}

export const CodeFragment: React.FC<CodeFragmentProps> = ({ editor, node }) => {
  const codeFragment = node.attrs as CodeFragmentType
  const text = `${codeFragment.spaceBefore ? ' ' : ''}${codeFragment.name}${codeFragment.spaceAfter ? ' ' : ''}`
  const errors = codeFragment.errors
  // console.log({ attrs: node.attrs, text, errors })

  return (
    <NodeViewWrapper as="span">
      <span className={errors.length ? 'brickdoc-formula-code-fragment-error' : 'brickdoc-formula-code-fragment-normal'}>
        {renderContent(codeFragment, text)}
      </span>
    </NodeViewWrapper>
  )
}
