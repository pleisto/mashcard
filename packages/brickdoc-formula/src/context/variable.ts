import { BackendActions, ContextInterface, interpret, UpdateHandler, VariableData, VariableInterface, VariableMetadata } from '..'

export class VariableClass implements VariableInterface {
  t: VariableData
  updateHandler: UpdateHandler
  backendActions: BackendActions

  constructor({ t }: { t: VariableData }) {
    this.t = t
  }

  public meta = (): VariableMetadata => {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      input: this.t.definition
    }
  }

  public onUpdate = (handler: UpdateHandler): void => {
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
      this.updateHandler(this.t)
    }
  }

  public refresh = async (formulaContext: ContextInterface): Promise<void> => {
    const { result } = await interpret({ cst: this.t.cst, formulaContext, meta: this.meta() })

    this.t = { ...this.t, variableValue: result }
    this.afterUpdate()
    await this.invokeBackendUpdate()
  }
}
