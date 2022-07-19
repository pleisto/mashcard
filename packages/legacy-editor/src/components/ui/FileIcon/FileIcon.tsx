import { FC } from 'react'
import { styled, theme } from '@mashcard/design-system'
import { FileType } from '../../../helpers'
import IconPdf from './assets/file-pdf.png'
import IconExcel from './assets/file-excel.png'
import IconPpt from './assets/file-ppt.png'
import IconWord from './assets/file-word.png'
import { Image, Link } from '@mashcard/design-icons'

export interface FileIconProps {
  fileType: FileType
  className?: string
}

const ImageIcon = styled('img', {
  width: '1.125rem'
})

const Icon = styled('span', {
  color: theme.colors.iconThirdary,
  fontSize: '1.125rem'
})

export const FileIcon: FC<FileIconProps> = ({ fileType, className }) => {
  if (fileType === 'image')
    return (
      <Icon>
        <Image className={className} />
      </Icon>
    )
  if (fileType === 'pdf') return <ImageIcon className={className} alt="" src={IconPdf} />
  if (fileType === 'excel') return <ImageIcon className={className} alt="" src={IconExcel} />
  if (fileType === 'ppt') return <ImageIcon className={className} alt="" src={IconPpt} />
  if (fileType === 'word') return <ImageIcon className={className} alt="" src={IconWord} />
  return (
    <Icon>
      <Link className={className} />
    </Icon>
  )
}
