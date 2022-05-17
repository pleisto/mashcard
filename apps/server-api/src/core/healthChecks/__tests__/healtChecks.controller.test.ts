import request from 'supertest'
import { HttpStatus } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { useAppInstanceWithHttp } from '../../../common/testing'

describe('HealtChecksController', () => {
  let app: NestFastifyApplication

  const instance = useAppInstanceWithHttp()

  beforeAll(async () => {
    app = (await instance)()
  })

  it('should return 200', async () => {
    let resp = await request(app.getHttpServer()).get('/.internal-apis/readyz')
    expect(resp.status).toBe(HttpStatus.OK)
    resp = await request(app.getHttpServer()).get('/.internal-apis/livez')
    expect(resp.status).toBe(HttpStatus.OK)
  })
})
