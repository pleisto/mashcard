import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Step, StepResult } from 'prosemirror-transform'

interface SetDocAttrStepJSON {
  newAttrs: Record<string, unknown>
}

export class SetDocAttrStep extends Step {
  static fromJSON<S extends Schema = any>(schema: S, json: SetDocAttrStepJSON): SetDocAttrStep {
    return new SetDocAttrStep(json.newAttrs)
  }

  private prevAttrs: Record<string, unknown> = {}
  constructor(private readonly newAttrs: Record<string, unknown>) {
    super()
  }

  apply(doc: ProsemirrorNode): StepResult {
    this.prevAttrs = doc.attrs
    doc.attrs = this.newAttrs
    return StepResult.ok(doc)
  }

  invert(): Step {
    return new SetDocAttrStep(this.prevAttrs)
  }

  map(): Step {
    return this
  }

  toJSON(): SetDocAttrStepJSON {
    return {
      newAttrs: this.newAttrs
    }
  }
}
