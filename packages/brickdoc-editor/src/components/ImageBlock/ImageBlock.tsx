import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { linkStorage } from '../../helpers/file'
import 'react-medium-image-zoom/dist/styles.css'
import './styles.less'
import { getBlobUrl } from '../../helpers/getBlobUrl'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { UploaderMode } from './modes/UploaderMode'
import { PreviewMode } from './modes/PreviewMode'

export interface ImageBlockAttributes {
  width?: number
  ratio?: number
  key: string
  source: string
  type: string
}

// TODO: handle image load on error
export const ImageBlock: React.FC<NodeViewProps> = ({ node, deleteNode, getPos, updateAttributes }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const latestImageAttributes = React.useRef<Partial<ImageBlockAttributes>>({})
  const updateImageAttributes = React.useCallback(
    (newAttributes: Partial<ImageBlockAttributes>): void => {
      latestImageAttributes.current = {
        ...latestImageAttributes.current,
        ...newAttributes
      }

      if (!node.attrs.image?.source && !latestImageAttributes.current.source) {
        return
      }

      updateAttributes({
        image: {
          ...node.attrs.image,
          ...latestImageAttributes.current
        }
      })
    },
    [node.attrs.image, updateAttributes]
  )

  const url =
    getBlobUrl(node.attrs?.uuid, node.attrs?.image ?? {}, editorDataSource.blobs) ?? linkStorage.get(node.attrs.uuid)

  if (url) {
    return (
      <PreviewMode
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateImageAttributes={updateImageAttributes}
        url={url}
      />
    )
  }

  return (
    <UploaderMode node={node} deleteNode={deleteNode} getPos={getPos} updateImageAttributes={updateImageAttributes} />
  )
}
