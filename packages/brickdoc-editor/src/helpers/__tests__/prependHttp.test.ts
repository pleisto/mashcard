import { prependHttp } from '../prependHttp'

describe('prependHttp', () => {
  it('works correctly', () => {
    const httpUrl = 'http://brickdoc.com'
    const httpsUrl = 'https://brickdoc.com'

    expect(prependHttp('brickdoc.com')).toEqual(httpsUrl)
    expect(prependHttp('http://brickdoc.com')).toEqual(httpUrl)
    expect(prependHttp('https://brickdoc.com')).toEqual(httpsUrl)
    expect(prependHttp('//brickdoc.com')).toEqual('//brickdoc.com')
  })
})
