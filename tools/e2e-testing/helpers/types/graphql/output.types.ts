export interface CreateBlockOutput {
  data: {
    blockCreate: {
      id: string
    }
  }
}

export interface PodOutput {
  id: string
  domain: string
  personal: boolean
}
