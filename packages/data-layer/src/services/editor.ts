import { map } from 'rxjs'
import { BaseDataService } from '../utils/baseDataService'

export class EditorDataService extends BaseDataService {
  isSaving = this.transientStore.pipe(map(state => state.isSaving))

  setIsSaving(isSaving: boolean): void {
    this.transientStore.update(draft => {
      draft.isSaving = isSaving
    })
  }
}

export const useEditorDataService = EditorDataService.toReactHook()
