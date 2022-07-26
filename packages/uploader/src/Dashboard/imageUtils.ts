import { encode as blurHashEncode } from 'blurhash'

export async function isValidImageUrl(link: string): Promise<Boolean> {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.src = link
    img.onload = () => {
      resolve(true)
    }
    img.onerror = () => {
      resolve(false)
    }
  })
}

export async function calculateImageFileBlurHash(data: string | undefined): Promise<string | null> {
  if (!data) return null
  return await new Promise(resolve => {
    const img = new Image()
    img.src = data
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(null)
        return
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const imageData = ctx.getImageData(0, 0, img.width, img.height)
      const blurHash = blurHashEncode(imageData.data, imageData.width, imageData.height, 4, 3)
      resolve(blurHash)
    }
  })
}
