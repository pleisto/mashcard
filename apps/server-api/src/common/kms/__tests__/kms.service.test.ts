import { KMSService } from '../kms.service'
import { SecretSubKey } from '../kms.interface'
import { faker } from '@faker-js/faker'
import { useAppInstance } from '../../testing'

describe('KMSService', () => {
  let kms: KMSService

  const createInstance = useAppInstance(async (_app, moduleRef) => {
    kms = moduleRef.get<KMSService>(KMSService)
  })

  beforeAll(async () => {
    await createInstance
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
})
