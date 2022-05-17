import { Readable, PassThrough } from 'node:stream'
import request from 'supertest'
import { HttpStatus } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { LocalBaseStorageAdaptor } from '../storage-adaptor/local-base.storage-adaptor'
import { BLOB_STORAGE, STORAGE_BUCKETS } from '../blobs.interface'
import { useAppInstanceWithHttp } from '../../testing'

describe('BlobsLocalEndpointController', () => {
  let app: NestFastifyApplication
  let getSpy: any
  let putSpy: any
  let storage: LocalBaseStorageAdaptor
  let getSignedQuery: (method: 'get' | 'put', key: string, bucket?: STORAGE_BUCKETS) => Promise<string>

  const instance = useAppInstanceWithHttp(
    /**
     * Before all
     */
    async (app, moduleRef) => {
      storage = moduleRef.get<LocalBaseStorageAdaptor>(BLOB_STORAGE)
      /**
       * Mock storage adaptor
       * do not actually use disk storage
       */
      getSpy = jest.spyOn(storage, 'get').mockImplementation(async (bucket: STORAGE_BUCKETS, key: string) => {
        return key === 'exist' ? Readable.from('exist-file') : undefined
      })
      putSpy = jest.spyOn(storage, 'put').mockImplementation(async (bucket: STORAGE_BUCKETS, key: string) => {
        const stream = new PassThrough()
        stream.end()
        stream.destroy()
        return stream
      })

      /**
       * Create signed query string helper
       * @param httpMethod - HTTP method
       * @param bucket - bucket name
       * @param key - key name
       */
      getSignedQuery = async (httpMethod, key, bucket = STORAGE_BUCKETS.PRIVATE) => {
        const expired = 3600
        const url =
          httpMethod === 'get'
            ? await storage.directDownloadUrl(bucket, key, expired)
            : await storage.directUploadUrl(bucket, key, expired)
        return new URL(url).search
      }
    },
    /**
     * After all
     */
    async app => {
      getSpy.mockRestore()
      putSpy.mockRestore()
    }
  )

  beforeAll(async () => {
    app = (await instance)()
  })

  it('findOne action should work', async () => {
    let resp = await request(app.getHttpServer()).get('/blobs/invalid-bucket/not')
    expect(resp.status).toBe(HttpStatus.BAD_REQUEST)

    resp = await request(app.getHttpServer()).get(`/blobs/${STORAGE_BUCKETS.PUBLIC}/exist`)
    expect(resp.status).toBe(HttpStatus.OK)

    resp = await request(app.getHttpServer()).get(`/blobs/${STORAGE_BUCKETS.PRIVATE}/exist`)
    expect(resp.status).toBe(HttpStatus.FORBIDDEN)

    resp = await request(app.getHttpServer()).get(
      `/blobs/${STORAGE_BUCKETS.PRIVATE}/exist?${await getSignedQuery('get', 'exist')}`
    )
    expect(resp.status).toBe(HttpStatus.OK)

    resp = await request(app.getHttpServer()).get(
      `/blobs/${STORAGE_BUCKETS.PRIVATE}/not-exist?${await getSignedQuery('get', 'not-exist')}`
    )
    expect(resp.status).toBe(HttpStatus.NOT_FOUND)

    resp = await request(app.getHttpServer()).get(
      `/blobs/${STORAGE_BUCKETS.PRIVATE}/exist?${await getSignedQuery('get', 'error')}`
    )
    expect(resp.status).toBe(HttpStatus.FORBIDDEN)
  })

  it('create action should work', async () => {
    let resp = await request(app.getHttpServer()).put(`/blobs/${STORAGE_BUCKETS.PUBLIC}/foo`)
    expect(resp.status).toBe(HttpStatus.FORBIDDEN)
    resp = await request(app.getHttpServer())
      .put(`/blobs/${STORAGE_BUCKETS.PUBLIC}/foo?${await getSignedQuery('put', 'foo', STORAGE_BUCKETS.PUBLIC)}`)
      .set('Content-type', 'image/png')
      .send(Buffer.from('fff', 'hex'))
    expect(resp.status).toBe(HttpStatus.NO_CONTENT)
  })
})
