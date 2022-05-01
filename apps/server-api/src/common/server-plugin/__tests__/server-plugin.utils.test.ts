import { allServerPlugins } from '../server-plugin.utils'

describe('ServerPluginUtils', () => {
  it('should get some plugin', async () => {
    expect((await allServerPlugins()).length > 0).toBeTruthy()
  })
})
