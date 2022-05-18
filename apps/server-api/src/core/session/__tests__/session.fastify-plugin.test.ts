import Fastify, { type FastifyInstance } from 'fastify'
import { fastifyCookie } from '@fastify/cookie'
import { SessionPlugin } from '../session.fastify-plugin'
import { generateKey } from '@brickdoc/server-api-crate'

describe('SessionFastifyPlugin', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await Fastify()
  })

  afterAll(async () => {
    await server.close()
  })

  it('should access', async () => {
    // session plugin requires cookie plugin
    await server.register(fastifyCookie)
    await server.register(SessionPlugin, {
      key: generateKey()
    })

    server.post('/', async (req, res) => {
      req.session.set('data1', req.body)
      req.session.data2 = req.body
      await res.send('hoo')
    })

    server.get('/', (req, res) => {
      const data1 = req.session.get('data1')
      const data2 = req.session.data1
      const data3 = req.session.data2
      const data4 = req.session.get('data2')

      if (!data1 || !data2 || !data3 || !data4) {
        void res.code(404).send()
        return
      }
      void res.send({ data1, data2, data3, data4 })
    })

    let res = await server.inject({
      method: 'POST',
      url: '/',
      payload: {
        some: 'data'
      }
    })

    expect(res.statusCode).toBe(200)

    res = await server.inject({
      method: 'GET',
      url: '/',
      headers: {
        cookie: res.headers['set-cookie']
      }
    })

    expect(res.body).toEqual(
      JSON.stringify({
        data1: { some: 'data' },
        data2: { some: 'data' },
        data3: { some: 'data' },
        data4: { some: 'data' }
      })
    )
  })
})
