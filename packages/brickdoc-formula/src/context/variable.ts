import {
  BackendActions,
  ContextInterface,
  interpret,
  VariableUpdateHandler,
  VariableData,
  VariableInterface,
  VariableMetadata
} from '..'

export class VariableClass implements VariableInterface {
  t: VariableData
  updateHandler: VariableUpdateHandler | undefined
  backendActions: BackendActions | undefined

  constructor({ t, backendActions }: { t: VariableData; backendActions?: BackendActions }) {
    this.t = t
    this.backendActions = backendActions
  }

  public meta = (): VariableMetadata => {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      input: this.t.definition
    }
  }

  public onUpdate = (handler: VariableUpdateHandler): void => {
    this.updateHandler = handler
  }

  public invokeBackendCreate = async (): Promise<void> => {
    if (this.backendActions) {
      await this.backendActions.createVariable(this)
    }
  }

  public invokeBackendUpdate = async (): Promise<void> => {
    if (this.backendActions) {
      await this.backendActions.updateVariable(this)
    }
  }

  public afterUpdate = (): void => {
    if (this.updateHandler) {
      this.updateHandler(this)
    }
  }

  public refresh = async (formulaContext: ContextInterface): Promise<void> => {
    const { variableValue } = await interpret({ cst: this.t.cst, formulaContext, meta: this.meta() })

    this.t = { ...this.t, variableValue }
    this.afterUpdate()
    await this.invokeBackendUpdate()
  }
}
