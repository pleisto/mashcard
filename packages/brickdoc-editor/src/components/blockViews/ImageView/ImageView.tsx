import { FC, useCallback, useRef } from 'react'
import { linkStorage } from '../../../helpers/file'
import 'react-medium-image-zoom/dist/styles.css'
import './styles.less'
import { getBlobUrl } from '../../../helpers/getBlobUrl'
import { UploaderMode } from './modes/UploaderMode'
import { PreviewMode } from './modes/PreviewMode'
import { ImageAttributes, ImageViewProps } from '../../../extensions/blocks/image/meta'
import { useEditorPropsContext } from '../../../hooks/useEditorPropsContext'

// TODO: handle image load on error
export const ImageView: FC<ImageViewProps> = ({ node, deleteNode, getPos, updateAttributes }) => {
  const editorProps = useEditorPropsContext()
  const latestImageAttributes = useRef<Partial<ImageAttributes['image']>>({})
  const updateImageAttributes = useCallback(
    (newAttributes: Partial<ImageAttributes['image']>): void => {
      latestImageAttributes.current = {
        ...latestImageAttributes.current,
        ...newAttributes
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
    getBlobUrl(editorProps.rootId, node.attrs?.image ?? {}, editorProps.blobs) ?? linkStorage.get(node.attrs.uuid)

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
