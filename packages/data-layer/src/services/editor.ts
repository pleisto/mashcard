import { select } from '@ngneat/elf'
import { BaseDataService } from '../utils/baseDataService'
import { write } from '../utils/write'

export class EditorDataService extends BaseDataService {
  isSaving = this.transientStore.pipe(select(state => state.isSaving))

  setIsSaving(isSaving: boolean): void {
    this.transientStore.update(
      write(draft => {
        draft.isSaving = isSaving
      })
    )
  }
}

export const useEditorDataService = EditorDataService.toReactHook()
