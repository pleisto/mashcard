import { Test } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { configOptions } from '../../config'
import { KMSModule } from '../kms.module'
import { KMSService } from '../kms.service'
import { faker } from '@faker-js/faker'

describe('KMSService', () => {
  let kms: KMSService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configOptions), KMSModule]
    }).compile()
    kms = moduleRef.get<KMSService>(KMSService)
  })

  it('should get rootSecret', async () => {
    expect(kms.rootSecret).toBeTruthy()
  })

  it('should dataMasking work and it is pure function', async () => {
    const text = faker.lorem.slug()
    const masked = kms.dataMasking(text)
    expect(masked).toMatch(/^[a-f0-9]{64}$/)

    // make sure dataMasking is pure function
    expect(masked).toEqual(kms.dataMasking(text))
  })

  it('should symmetricEncrypt work', async () => {
    const text = faker.lorem.slug()
    const context = '{userId: 1}'
    const encrypted = kms.symmetricEncrypt(text, context)
    expect(kms.symmetricDecrypt(encrypted, context)).toEqual(text)
  })
})
