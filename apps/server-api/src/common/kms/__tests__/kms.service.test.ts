import { Test, TestingModule } from '@nestjs/testing'
import { env } from 'process'
import { KMSModule } from '../kms.module'
import { ServerPluginModule } from '../../server-plugin/server-plugin.module'
import { KMSService } from '../kms.service'
import { SecretSubKey } from '../kms.interface'
import { faker } from '@faker-js/faker'

describe('KMSService', () => {
  let kms: KMSService
  let module: TestingModule

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [KMSModule.forRoot({ seed: env.SECRET_KEY_SEED! }), ServerPluginModule]
    }).compile()
    kms = module.get<KMSService>(KMSService)
  })

  afterAll(async () => {
    await module?.close()
  })

  it('should get key', async () => {
    expect(kms.subKey(SecretSubKey.ROOT_KEY)).toBeTruthy()
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

  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  it('should obfuscateIntId work', async () => {
    const testData = [
      1,
      2,
      faker.datatype.number(speck4896MaxInt),
      faker.datatype.number(speck4896MaxInt),
      speck4896MaxInt
    ]
    testData.forEach(intId => {
      console.log(kms.obfuscateIntId(intId))
      expect(kms.deobfuscateIntId(kms.obfuscateIntId(intId))).toEqual(intId)
    })
  })
  */
})
