import { merge } from 'lodash'
import { BlockViewProps } from '../../../../extensions/common'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export interface MockBlockViewPropsProps<Option, Attribute>
  extends Partial<Omit<BlockViewProps<Option, Attribute>, 'node' | 'extension' | 'editor'>> {
  editor?: DeepPartial<BlockViewProps<Option, Attribute>['editor']>
  node?: DeepPartial<BlockViewProps<Option, Attribute>['node']> & {
    uuid?: string
  }
  extension?: {
    options?: Partial<Option>
  }
  onUpdateAttributes?: () => void
}

export const mockBlockViewProps = <Option, Attribute>(
  props?: MockBlockViewPropsProps<Option, Attribute>
): BlockViewProps<Option, Attribute> => {
  const mockNode = {
    ...props?.node,
    attrs: {
      uuid: props?.node?.uuid ?? Number(new Date()).toString(),
      ...props?.node?.attrs
    },
    nodeSize: props?.node?.nodeSize ?? 1,
    isLeaf: props?.node?.isLeaf ?? false,
    childCount: props?.node?.childCount ?? 0
  }

  const mockExtension = {
    options: props?.extension?.options ?? {}
  }

  const mockEditor = new Proxy(
    {
      state: {
        doc: {},
        selection: {
          anchor: 1,
          from: 1,
          to: 1
        }
      }
    },
    {
      get(target, key: keyof MockBlockViewPropsProps<Option, Attribute>['editor']) {
        if (key === 'state') {
          return merge(target.state, props?.editor?.state)
        }

        if (key === 'view') {
          return new Proxy(
            {},
            {
              get(_target, _key) {
                return () => target
              }
            }
          )
        }

        const commandsProxy = new Proxy(props?.editor?.commands ?? {}, {
          get(_target, _key: keyof NonNullable<MockBlockViewPropsProps<Option, Attribute>['editor']>['commands']) {
            if (_key in _target) {
              return (...args: any): any => {
                ;(_target[_key] as Function)(...args)
                return commandsProxy
              }
            }

            return () => commandsProxy
          }
        })

        if (key === 'chain') {
          return () => commandsProxy
        }

        if (key === 'commands') {
          return commandsProxy
        }

        if (props?.editor?.[key]) {
          return props.editor[key]
        }

        return () => mockEditor
      }
    }
  )

  const mockUpdateAttributes: BlockViewProps<Option, Attribute>['updateAttributes'] = attrs => {
    mockNode.attrs = {
      ...mockNode.attrs,
      ...attrs
    }

    props?.onUpdateAttributes?.()
  }

  const mockDeleteNode = () => {}
  const mockGetPos = () => 1

  return {
    node: mockNode as BlockViewProps<Option, Attribute>['node'],
    updateAttributes: props?.updateAttributes ?? mockUpdateAttributes,
    deleteNode: props?.deleteNode ?? mockDeleteNode,
    extension: mockExtension as BlockViewProps<Option, Attribute>['extension'],
    editor: mockEditor as BlockViewProps<Option, Attribute>['editor'],
    decorations: props?.decorations ?? [],
    selected: props?.selected ?? false,
    getPos: props?.getPos ?? mockGetPos
  }
}
