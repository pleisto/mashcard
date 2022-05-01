import { DynamicModule } from '@nestjs/common'
import { sync as globbySync } from 'globby'
import { posix } from 'path'
import { from, mergeMap, lastValueFrom, toArray, filter, distinct } from 'rxjs'
import { ServerPluginMeta } from './server-plugin.interface'
import { NotFoundError } from './server-plugin.errors'

/**
 * Return all enabled plugins's metadata
 * @returns
 */
export const allServerPlugins = async (): Promise<ServerPluginMeta[]> => {
  // all npm packages from plugins directory
  const $packages = from(
    globbySync(posix.join(__dirname, '../../../../..', 'plugins/*/package.json')).map(path => posix.dirname(path))
  )
  return await lastValueFrom(
    $packages.pipe(
      mergeMap(async dir => {
        // import package.json
        const pkgMeta = await import(posix.join(dir, 'package.json'))

        // filter not valid server plugin
        if (
          [pkgMeta?.engines?.brickdoc, pkgMeta?.addonsId].includes(undefined) ||
          pkgMeta?.addonsType !== 'serverPlugin'
        ) {
          return undefined
        }

        // return plugin metadata
        const { addonsId, activationEvents } = pkgMeta
        return {
          addonsId,
          activationEvents,
          dir
        }
      }),
      filter<any>(p => p !== undefined),
      distinct(), // remove duplicate name plugin
      toArray()
    )
  )
}

/**
 * Return plugins's entrypoint module
 */
export const serverPluginModules = async (enabledPluginIds: string[]): Promise<DynamicModule[]> => {
  const plugins = await allServerPlugins()
  return await lastValueFrom(
    from(enabledPluginIds).pipe(
      mergeMap(async id => {
        const plugin = plugins.find(p => p.addonsId === id)
        if (!plugin) throw new NotFoundError(id)
        const entrypoint = (await import(plugin.dir))?.ServerPluginEntrypoint
        if (!entrypoint) throw new NotFoundError(id, "It's not export ServerPluginEntrypoint")
        return entrypoint.forRoot() as DynamicModule
      }),
      toArray()
    )
  )
}
