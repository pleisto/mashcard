import React from 'react'
import cx from 'classnames'
import { Icon } from '@brickdoc/design-system'
import { FileType } from '../../helpers/file'
import IconPdf from '../../../assets/file-pdf.png'
import IconExcel from '../../../assets/file-excel.png'
import IconPpt from '../../../assets/file-ppt.png'
import IconWord from '../../../assets/file-word.png'

interface FileIconProps {
  fileType: FileType
  className?: string
}

export const FileIcon: React.FC<FileIconProps> = ({ fileType, className }) => {
  if (fileType === 'image') return <Icon.Image className={cx('brickdoc-link-block-attachment-cion', className)} />
  if (fileType === 'pdf') return <img className={cx('brickdoc-link-block-attachment-img-icon', className)} alt="" src={IconPdf} />
  if (fileType === 'excel') return <img className={cx('brickdoc-link-block-attachment-img-icon', className)} alt="" src={IconExcel} />
  if (fileType === 'ppt') return <img className={cx('brickdoc-link-block-attachment-img-icon', className)} alt="" src={IconPpt} />
  if (fileType === 'word') return <img className={cx('brickdoc-link-block-attachment-img-icon', className)} alt="" src={IconWord} />
  return <Icon.PaperClip className={cx('brickdoc-link-block-attachment-icon', className)} />
}
