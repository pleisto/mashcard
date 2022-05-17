import { allServerPlugins, serverPluginModules } from '../server-plugin.utils'

describe('ServerPluginUtils', () => {
  it('should get some plugin', async () => {
    const allPlugins = await allServerPlugins()
    expect(allPlugins.length > 0).toBeTruthy()
  })

  it('should find dynamicModule by addonsId', async () => {
    const filterPlugin = await serverPluginModules(['brickdoc.gcloud'])
    expect(filterPlugin[0].module.name).toBe('GcloudPluginModule')
  })
})
