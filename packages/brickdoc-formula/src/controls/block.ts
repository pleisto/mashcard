import { BlockInitializer, BlockType } from './types'
import { AnyTypeResult, CodeFragment, ContextInterface, ErrorMessage, FormulaType, NamespaceId } from '../types'
import { CodeFragmentVisitor, variable2attrs, variableRenderText } from '../grammar'
import { fetchResult } from '../context/variable'

export class BlockClass implements BlockType {
  _formulaContext: ContextInterface
  name: (pageId: NamespaceId) => string
  id: NamespaceId

  constructor(_formulaContext: ContextInterface, { id }: BlockInitializer) {
    this._formulaContext = _formulaContext
    this.id = id
    this.name = (pageId: NamespaceId) => {
      // if (pageId === this.id) {
      //   return 'Current Page'
      // }
      const formulaName = this._formulaContext.formulaNames.find(n => n.key === id && n.kind === 'Block')
      if (formulaName) {
        return formulaName.name
      }

      return 'Unknown'
    }
  }

  persistence(): BlockInitializer {
    return {
      id: this.id
    }
  }

  async handleInterpret(name: string): Promise<AnyTypeResult> {
    const variable = this._formulaContext.findVariableByName(this.id, name)
    if (!variable || !variable.savedT) {
      return { type: 'Error', result: `Variable "${name}" not found`, errorKind: 'runtime' }
    }

    if (variable.savedT.task.async) {
      return (await variable.savedT.task.variableValue).result
    } else {
      return variable.savedT.task.variableValue.result
    }
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): { errors: ErrorMessage[]; firstArgumentType: FormulaType | undefined; codeFragments: CodeFragment[] } {
    const variable = this._formulaContext.findVariableByName(this.id, name)
    const errors: ErrorMessage[] = []

    visitor.variableNameDependencies = [
      ...new Map(
        [...visitor.variableNameDependencies, { namespaceId: this.id, name }].map(item => [
          `${item.namespaceId},${item.name}`,
          item
        ])
      ).values()
    ]

    if (!variable) {
      errors.push({ type: 'deps', message: `Variable "${name}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = fetchResult(variable.t).type

    if (variable.t.isAsync) {
      visitor.async = true
    }
    if (variable.t.isEffect) {
      visitor.effect = true
    }
    if (!variable.t.isPersist) {
      visitor.persist = false
    }
    if (!variable.t.isPure) {
      visitor.pure = false
    }

    let finalCodeFragments = codeFragments

    if (['StringLiteral', 'FunctionName'].includes(codeFragments[0].code)) {
      finalCodeFragments = [
        {
          ...codeFragments[0],
          display: name,
          code: 'Variable',
          attrs: variable2attrs(variable),
          renderText: variableRenderText(variable, visitor.ctx.meta.namespaceId)
        }
      ]
    }

    visitor.variableDependencies = [
      ...new Map(
        [...visitor.variableDependencies, { namespaceId: this.id, variableId: variable.t.variableId }].map(item => [
          item.variableId,
          item
        ])
      ).values()
    ]

    visitor.flattenVariableDependencies = [
      ...new Map(
        [
          ...visitor.flattenVariableDependencies,
          ...variable.t.flattenVariableDependencies,
          { namespaceId: this.id, variableId: variable.t.variableId }
        ].map(item => [item.variableId, item])
      ).values()
    ]

    return {
      errors,
      firstArgumentType,
      codeFragments: finalCodeFragments
    }
  }
}
