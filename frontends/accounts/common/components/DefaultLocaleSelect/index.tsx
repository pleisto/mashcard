import { Select } from '@brickdoc/design-system'
import { International } from '@brickdoc/design-system/components/icon'
import React from 'react'
import { useCookieState } from 'ahooks'
import { useGetAvailableLocalesFromWsQuery } from '@/BrickdocGraphQL'
import styles from './styles.module.less'

interface DefaultLocaleSelectProps {
  currentLocale: string
}

export const DefaultLocaleSelect: React.FC<DefaultLocaleSelectProps> = props => {
  // Skipping first value in array destructuring assignment
  // x= [1,2]; const [,y] = x; y === 2
  const [, setDefaultLocale] = useCookieState('default_locale')

  const { loading, data } = useGetAvailableLocalesFromWsQuery()

  if (loading) {
    return <></>
  }
  return (
    <div className={styles.root}>
      <International />
      <Select
        defaultValue={props.currentLocale}
        virtual={false}
        defaultActiveFirstOption={false}
        size="small"
        loading={loading}
        dropdownStyle={{ minWidth: '100px' }}
        dropdownMatchSelectWidth={false}
        onChange={key => {
          setDefaultLocale(key)
          window.location.reload()
        }}
        bordered={false}
        options={data?.metadata.availableLocales}
      />
    </div>
  )
}
