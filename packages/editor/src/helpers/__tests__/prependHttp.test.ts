import { prependHttp } from '../prependHttp'

describe('prependHttp', () => {
  it('works correctly', () => {
    const httpUrl = 'http://mashcard.cloud'
    const httpsUrl = 'https://mashcard.cloud'

    expect(prependHttp('mashcard.cloud')).toEqual(httpsUrl)
    expect(prependHttp('http://mashcard.cloud')).toEqual(httpUrl)
    expect(prependHttp('https://mashcard.cloud')).toEqual(httpsUrl)
    expect(prependHttp('//mashcard.cloud')).toEqual('//mashcard.cloud')
  })
})
