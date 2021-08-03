import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Step, StepResult } from 'prosemirror-transform'

interface SetDocTitleStepJSON {
  newTitle: string
}

export class SetDocTitleStep extends Step {
  static fromJSON<S extends Schema = any>(schema: S, json: SetDocTitleStepJSON): SetDocTitleStep {
    return new SetDocTitleStep(json.newTitle)
  }

  private prevTitle: string = ''
  constructor(private readonly newTitle: string) {
    super()
  }

  apply(doc: ProsemirrorNode): StepResult {
    this.prevTitle = doc.text ?? ''
    doc.text = this.newTitle
    return StepResult.ok(doc)
  }

  invert(): Step {
    return new SetDocTitleStep(this.prevTitle)
  }

  map(): Step {
    return this
  }

  toJSON(): SetDocTitleStepJSON {
    return {
      newTitle: this.newTitle
    }
  }
}
