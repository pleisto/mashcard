import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Step, StepResult } from 'prosemirror-transform'

interface SetDocAttrStepJSON {
  newAttrs: Record<string, unknown>
}

export class SetDocAttrStep extends Step {
  static override fromJSON<S extends Schema = any>(schema: S, json: SetDocAttrStepJSON): SetDocAttrStep {
    return new SetDocAttrStep(json.newAttrs)
  }

  private prevAttrs: Record<string, unknown> = {}
  constructor(private readonly newAttrs: Record<string, unknown>) {
    super()
  }

  override apply(doc: ProsemirrorNode): StepResult {
    this.prevAttrs = doc.attrs
    // @ts-expect-error
    doc.attrs = this.newAttrs
    return StepResult.ok(doc)
  }

  override invert(): Step {
    return new SetDocAttrStep(this.prevAttrs)
  }

  override map(): Step {
    return this
  }

  override toJSON(): SetDocAttrStepJSON {
    return {
      newAttrs: this.newAttrs
    }
  }
}
