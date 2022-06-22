import { EventType } from '@mashcard/schema'
import { BlockType, ColumnType, SpreadsheetType } from '../controls'
import { SpreadsheetUpdateNameViaId, SpreadsheetReloadViaId, SpreadsheetUpdateNamePayload } from '../events'
import { EventDependency, VariableInterface } from '../types'
import { CodeFragmentVisitor } from './codeFragment'
import { codeFragments2definition } from './convert'

type Visitor = CodeFragmentVisitor

/**
 * Track nameDependencies when parse name
 */
export const parseTrackName = (visitor: Visitor, name: string, namespaceId: string): void => {
  visitor.nameDependencies.push({ namespaceId, name })
}

export const parseTrackSpreadsheetLoad = (visitor: Visitor, namespaceId: string, spreadsheetId: string): void => {
  const spreadsheetReloadEventDependency: EventDependency<SpreadsheetUpdateNamePayload> = {
    eventId: `${namespaceId},${spreadsheetId}`,
    event: SpreadsheetReloadViaId,
    key: `Spreadsheet#${spreadsheetId}`,
    scope: {},
    kind: 'Spreadsheet'
  }

  visitor.eventDependencies.push(spreadsheetReloadEventDependency)
}

/**
 * Track blockDependencies when parse block
 */
export const parseTrackBlock = (visitor: Visitor, block: BlockType): void => {
  visitor.blockDependencies.push(block.id)
}

/**
 * Track eventDependencies when parse spreadsheet
 */
export const parseTrackSpreadsheet = (visitor: Visitor, spreadsheet: SpreadsheetType): void => {
  parseTrackName(visitor, spreadsheet.name(), spreadsheet.namespaceId)

  const spreadsheetNameEventDependency: EventDependency<
    typeof SpreadsheetUpdateNameViaId extends EventType<infer X> ? X : never
  > = {
    eventId: `${visitor.ctx.formulaContext.domain}#${spreadsheet.namespaceId},${spreadsheet.spreadsheetId}`,
    event: SpreadsheetUpdateNameViaId,
    kind: 'SpreadsheetName',
    key: `SpreadsheetName#${spreadsheet.spreadsheetId}`,
    scope: {},
    definitionHandler: (deps, variable, payload) => {
      const newCodeFragments = variable.t.variableParseResult.codeFragments.map(c => {
        if (c.code !== 'Spreadsheet') return c
        if (c.attrs.id !== payload.id) return c
        return { ...c, attrs: { ...c.attrs, name: payload.meta } }
      })
      return codeFragments2definition(newCodeFragments, variable.t.meta.namespaceId)
    }
  }

  visitor.eventDependencies.push(spreadsheetNameEventDependency, spreadsheet.eventDependency({}))
}

export const parseTrackColumn = (visitor: Visitor, column: ColumnType): void => {
  visitor.eventDependencies.push(column.eventDependency({}))
}

/**
 * Track variableDependencies and flattenVariableDependencies when parse variable
 */
export const parseTrackVariable = (visitor: Visitor, variable: VariableInterface, namespaceId: string): void => {
  if (variable.t.variableParseResult.async) {
    visitor.async = true
  }
  if (variable.t.variableParseResult.effect) {
    visitor.effect = true
  }
  if (variable.t.variableParseResult.persist) {
    visitor.persist = true
  }
  if (!variable.t.variableParseResult.pure) {
    visitor.pure = false
  }

  visitor.variableDependencies.push({ namespaceId, variableId: variable.t.meta.variableId })
  visitor.flattenVariableDependencies.push(...variable.t.variableParseResult.flattenVariableDependencies, {
    namespaceId,
    variableId: variable.t.meta.variableId
  })
}
