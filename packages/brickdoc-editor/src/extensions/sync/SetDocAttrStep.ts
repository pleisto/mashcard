import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Step, StepResult } from 'prosemirror-transform'

export class SetDocAttrStep extends Step {
  static fromJSON(schema, json): SetDocAttrStep {
    return new SetDocAttrStep(json.newAttrs)
  }

  private prevAttrs: Record<string, any>
  constructor(private readonly newAttrs: Record<string, any>) {
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

  toJSON(): Record<string, any> {
    return {
      newAttrs: this.newAttrs
    }
  }
}
