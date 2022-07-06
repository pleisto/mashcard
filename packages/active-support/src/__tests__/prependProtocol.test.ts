import { prependUrlScheme } from '../prependUrlScheme'

describe('prependUrlScheme', () => {
  it('keeps it as custom protocol correctly', () => {
    const link1 = 'some-custom-protocol://send/abc@example.org'
    expect(prependUrlScheme(link1)).toEqual(link1)

    const link2 = 'some-custom-protocol://example.org'
    expect(prependUrlScheme(link2)).toEqual(link2)
  })

  it('prepends http correctly', () => {
    const httpUrl = 'http://mashcard.cloud'
    const httpsUrl = 'https://mashcard.cloud'

    expect(prependUrlScheme('mashcard.cloud')).toEqual(httpUrl)
    expect(prependUrlScheme('http://mashcard.cloud')).toEqual(httpUrl)
    expect(prependUrlScheme('http://mashcard.cloud?id=123')).toEqual(`${httpUrl}?id=123`)
    expect(prependUrlScheme('https://mashcard.cloud')).toEqual(httpsUrl)
    expect(prependUrlScheme('//mashcard.cloud')).toEqual('//mashcard.cloud')
  })

  it('prepends mail correctly', () => {
    const mailUrl = 'mailto:people@mashcard.cloud'

    expect(prependUrlScheme('people@mashcard.cloud')).toEqual(mailUrl)
    expect(prependUrlScheme('mailto:people@mashcard.cloud')).toEqual(mailUrl)
  })
})
