module 'selfsigned' {
  export interface Certificate {
    private: string
    public: string
    cert: string
  }

  export interface Options {
    keySize?: number
    days?: number
    algorithm?: 'sha256' | 'sha1'
    pcks7?: boolean
    clientCertificate?: boolean
    clientCertificateCN?: string
    extensions?: Array<{ [key: string]: any }>
  }

  export function generate(
    attrs: Array<{ name?: string; shortName?: string; value: string }>,
    opts: Options
  ): Certificate
}
