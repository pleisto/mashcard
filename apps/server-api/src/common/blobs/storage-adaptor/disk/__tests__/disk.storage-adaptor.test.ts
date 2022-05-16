import { ReadStream } from 'fs'
import { finished } from 'stream/promises'
import { Test, TestingModule } from '@nestjs/testing'
import { DiskStorageAdaptor } from '../disk.storage-adaptor'
import { AppModule } from '../../../../../app.module'
import { STORAGE_BUCKETS } from '../../../blobs.interface'

describe('DiskStorageAdaptor', () => {
  let disk: DiskStorageAdaptor
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DiskStorageAdaptor]
    }).compile()
    disk = module.get<DiskStorageAdaptor>(DiskStorageAdaptor)
  })

  afterAll(async () => {
    await module?.close()
  })

  it('should signedUrl work', async () => {
    const publicDownloadUrl = new URL(await disk.directDownloadUrl(STORAGE_BUCKETS.PUBLIC, 'foo.txt', 60))
    // public download url should not be signed
    expect(publicDownloadUrl.search).toEqual('')
    const file = 'foo/bar.jpg'
    const uploadUrl = new URL(await disk.directUploadUrl(STORAGE_BUCKETS.PUBLIC, file, 60))
    expect(disk.authSignedRequest('put', STORAGE_BUCKETS.PUBLIC, file, uploadUrl.search)).toBeTruthy()
    expect(disk.authSignedRequest('get', STORAGE_BUCKETS.PUBLIC, file, uploadUrl.search)).toBeFalsy()
    expect(disk.authSignedRequest('put', STORAGE_BUCKETS.PUBLIC, 'bar.jpg', uploadUrl.search)).toBeFalsy()
    const mockDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    jest.useFakeTimers().setSystemTime(mockDate)
    expect(disk.authSignedRequest('put', STORAGE_BUCKETS.PUBLIC, file, uploadUrl.search)).toBeFalsy()
    // reset to real timer to ensure .afterAll() works
    jest.useRealTimers()
  })

  it('should fs work', async () => {
    const data = Buffer.from('blueberry', 'utf-8')
    const fileName = `zoo/foo${Date.now()}.txt`
    const put = await disk.put(STORAGE_BUCKETS.PUBLIC, fileName)
    put.write(data)
    put.end()
    await finished(put)
    const get = await disk.get(STORAGE_BUCKETS.PUBLIC, fileName)
    expect(get).toBeInstanceOf(ReadStream)
    let expected = ''
    get!.setEncoding('utf-8').on('data', s => {
      expected += s
    })
    await finished(get!)
    expect(expected).toEqual(data.toString())

    const stats = await disk.head(STORAGE_BUCKETS.PUBLIC, fileName)
    expect(stats?.size).toEqual(data.length)

    const deleteResult = await disk.delete(STORAGE_BUCKETS.PUBLIC, fileName)
    expect(deleteResult).toBeTruthy()
  })
})
