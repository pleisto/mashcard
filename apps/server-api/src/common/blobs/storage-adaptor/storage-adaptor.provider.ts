import { Provider, Scope } from '@nestjs/common'
import { SettingsService } from '../../settings'
import { HooksExplorer, HookType } from '../../server-plugin'
import { BrickdocBaseError } from '../../errors'
import { DiskStorageAdaptor } from './disk/disk.storage-adaptor'
import { BLOB_STORAGE } from '../blobs.interface'
import { KMSService } from '../../kms'
/**
 * Create storage adaptor providers
 * @returns
 */
export const storageAdaptorProvider = (): Provider => ({
  provide: BLOB_STORAGE,
  scope: Scope.DEFAULT,
  inject: [SettingsService, HooksExplorer, KMSService],
  useFactory: async (settings: SettingsService, explorer: HooksExplorer, kms: KMSService) => {
    const adapterName = (await settings.get<string>('core.blobs.adaptor')).unwrapOr(undefined)

    // DiskBlobsAdaptor is built-in, so could be directly used
    if (adapterName === undefined || adapterName === 'DiskBlobsAdaptor') return new DiskStorageAdaptor(settings, kms)
    // Otherwise, try to load from server-plugin hooks
    const adapter = explorer
      .findByType(HookType.CORE_BLOBS_STORAGE_ADAPTOR)
      ?.find(d => d.constructor.name === adapterName)
    if (!adapter) throw new BrickdocBaseError('apiSrv.blobs.UNKNOWN_ADAPTOR', `Blob adaptor ${adapterName} not found`)
    return adapter
  }
})
