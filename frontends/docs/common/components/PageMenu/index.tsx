import React, { useState } from 'react'
import { Dropdown, Menu, MenuProps } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { useBlockSoftDeleteMutation, BlockSoftDeleteInput, Scalars } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../graphql'
import { SubBlockModal } from '../SubBlockModal'
import { queryChildrenBlocks } from '@/docs/pages/graphql'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
}

export const PageMenu: React.FC<PageMenuProps> = props => {
  const [blockId, setBlockId] = useState<string | undefined>()
  const [createSubBlockModalVisible, setCreateSubBlockModalVisible] = useState<boolean>(false)

  const [blockSoftDelete] = useBlockSoftDeleteMutation({ refetchQueries: [queryPageBlocks, queryChildrenBlocks] })
  const deletePage = async (id: UUID): Promise<void> => {
    const input: BlockSoftDeleteInput = { id }
    await blockSoftDelete({ variables: { input } })
  }

  const createSubBlock = (id: UUID): void => {
    setBlockId(id)
    setCreateSubBlockModalVisible(true)
  }

  const { t } = useDocsI18n()

  const rollbackSnapshot = (version: number): void => {
    console.log(`rollback snapshot ${version}`)
  }

  const onClick = (id: UUID): MenuProps['onClick'] => {
    return ({ key }) => {
      switch (key) {
        case 'create_sub_block':
          void createSubBlock(id)
          break
        case 'delete':
          void deletePage(id)
          break
        default:
          if (key.startsWith('snapshot-')) {
            rollbackSnapshot(Number(key.replace('snapshot-', '')))
          } else {
            console.log(`unknown key ${key}`)
          }

          break
      }
    }
  }

  const menu = (
    <Menu onClick={onClick(props.id)}>
      <Menu.Item key="create_sub_block">{t('blocks.create_sub_block')}</Menu.Item>
      <Menu.Item danger key="delete">
        {t('blocks.delete')}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown trigger={['contextMenu']} overlay={menu}>
        <Link to={`/${props.webid}/p/${props.id}`}>{props.title}</Link>
      </Dropdown>
      <SubBlockModal
        title={t('blocks.create_sub_block')}
        blockId={blockId}
        visible={createSubBlockModalVisible}
        setVisible={setCreateSubBlockModalVisible}
      />
    </>
  )
}
