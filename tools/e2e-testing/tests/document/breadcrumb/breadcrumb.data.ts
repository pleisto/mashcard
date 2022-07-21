import { PageBlock } from '@/helpers/types/data.types'

export const SUPER_LONG_TITLE_PAGE: PageBlock = {
  title: 'It is a Super Super Super Super Long breadcrumb which is more than 400px',
  icon: { name: 'face with tongue', emoji: '😛' },
  state:
    'AgKnxJbLDACoxoqxmAUAAXdISXQgaXMgYSBTdXBlciBTdXBlciBTdXBlciBTdXBlciBMb25nIGJyZWFkY3J1bWIgd2hpY2ggaXMgbW9yZSB0aGFuIDQwMHB4KAEEbWV0YQRpY29uAXYECl9fdHlwZW5hbWV3CkJsb2NrRW1vamkEdHlwZXcFRU1PSkkEbmFtZXcac3F1aW50aW5nIGZhY2Ugd2l0aCB0b25ndWUFZW1vaml3BPCfmJ0BxoqxmAUAIQEEbWV0YQV0aXRsZQEBxoqxmAUBAAE='
}

export const FIVE_LAYER_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    state: 'AQH9wou7BwAoAQRtZXRhBXRpdGxlAXcGcGFnZSAxAA==',
    children: [
      {
        title: 'page 1-1',
        state: 'AQL9wou7BwAhAQRtZXRhBXRpdGxlAaj9wou7BwABdwhwYWdlIDEtMQH9wou7BwEAAQ==',
        icon: { name: 'face with tongue', emoji: '😛' },
        children: [
          {
            title: 'page 1-1-1',
            state: 'AQL9wou7BwAhAQRtZXRhBXRpdGxlAqj9wou7BwEBdwpwYWdlIDEtMS0xAf3Ci7sHAQAC',
            children: [
              {
                title: 'page 1-1-1-1',
                state: 'AQL9wou7BwAhAQRtZXRhBXRpdGxlA6j9wou7BwIBdwxwYWdlIDEtMS0xLTEB/cKLuwcBAAM=',
                icon: { name: 'face with tongue', emoji: '😛' },
                children: [
                  {
                    title: 'page 1-1-1-1-1',
                    state: 'AQL9wou7BwAhAQRtZXRhBXRpdGxlBaj9wou7BwQBdw5wYWdlIDEtMS0xLTEtMQH9wou7BwEABQ=='
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
