export const isValidImageUrl = async (link: string): Promise<Boolean> => {
  return await new Promise((resolve, reject) => {
    const ImgObj = new Image()
    ImgObj.src = link
    ImgObj.onload = () => {
      resolve(true)
    }
    ImgObj.onerror = () => {
      resolve(false)
    }
  })
}
