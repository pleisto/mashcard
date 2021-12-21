import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { imperativeUpload } from '@brickdoc/uploader'
import { linkStorage } from '../../../helpers/file'
import 'react-medium-image-zoom/dist/styles.css'
import './styles.less'
import { getBlobUrl } from '../../../helpers/getBlobUrl'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { UploaderMode } from '../modes/UploaderMode'
import { PreviewMode } from '../modes/PreviewMode'

export interface ImageBlockAttributes {
  width?: number
  ratio?: number
  key: string
  source: string
  type: string
}

// TODO: handle image load on error
export const ImageBlock: React.FC<NodeViewProps> = ({ node, deleteNode, updateAttributes }) => {
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
          __typename: 'BlockImage',
          ...node.attrs.image,
          ...latestImageAttributes.current,
          // remove defaultFile prop
          defaultFile: undefined
        }
      })
    },
    [node.attrs.image, updateAttributes]
  )

  // upload default file
  React.useEffect(() => {
    if (!node.attrs.defaultFile) return
    void imperativeUpload(node.attrs.defaultFile, {
      prepareFileUpload: editorDataSource.prepareFileUpload,
      blockId: node.attrs.uuid,
      fileType: 'image',
      onUploaded: (data): void => {
        linkStorage.set(node.attrs.uuid, data.viewUrl!)
        updateImageAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const url =
    getBlobUrl(node.attrs?.uuid, node.attrs?.image ?? {}, editorDataSource.blobs) ?? linkStorage.get(node.attrs.uuid)

  if (url) {
    return <PreviewMode node={node} deleteNode={deleteNode} updateImageAttributes={updateImageAttributes} url={url} />
  }

  return <UploaderMode node={node} deleteNode={deleteNode} updateImageAttributes={updateImageAttributes} />
}
