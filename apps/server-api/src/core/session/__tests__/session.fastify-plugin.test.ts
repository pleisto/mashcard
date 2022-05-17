import Fastify from 'fastify'
import { fastifyCookie } from '@fastify/cookie'
import { SessionPlugin } from '../session.fastify-plugin'
import { generateKey } from '@brickdoc/server-api-crate'

describe('SessionFastifyPlugin', () => {
  it('should access', () => {
    const server = Fastify()
    // session plugin requires cookie plugin
    void server.register(fastifyCookie)
    void server.register(SessionPlugin, {
      key: generateKey()
    })

    server.post('/', (req, res) => {
      req.session.set('data1', req.body)
      req.session.data2 = req.body
      void res.send('hoo')
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

    server.inject(
      {
        method: 'POST',
        url: '/',
        payload: {
          some: 'data'
        }
      },
      (err, res) => {
        expect(err).toBeNull()
        expect(res.statusCode).toBe(200)
        expect(res.headers['set-cookie']).not.toBeUndefined()

        server.inject(
          {
            method: 'GET',
            url: '/',
            headers: {
              cookie: res.headers['set-cookie']
            }
          },
          (err, res) => {
            expect(err).toBeNull()
            expect(res.body).toEqual(
              JSON.stringify({
                data1: { some: 'data' },
                data2: { some: 'data' },
                data3: { some: 'data' },
                data4: { some: 'data' }
              })
            )
          }
        )
      }
    )
  })
})
