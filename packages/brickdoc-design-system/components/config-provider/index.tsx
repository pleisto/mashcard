import * as React from 'react'
import { IconProvider, IIconConfig } from '../icon'
import { FormProvider as RcFormProvider } from 'rc-field-form'
import { ValidateMessages } from 'rc-field-form/lib/interface'
import useMemo from 'rc-util/lib/hooks/useMemo'
import { RenderEmptyHandler } from './renderEmpty'
import LocaleProvider, { ANT_MARK, Locale } from '../locale-provider'
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import {
  ConfigConsumer,
  ConfigContext,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
} from './context'
import SizeContext, { SizeContextProvider, SizeType } from './SizeContext'
import message from '../message'
import notification from '../notification'
import { RequiredMark } from '../form/Form'

export {
  ConfigContext,
  ConfigConsumer,
}

export type {
  RenderEmptyHandler,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
}

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
]

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Array<Exclude<keyof ConfigConsumerProps, 'rootPrefixCls' | 'getPrefixCls'>> = [
  'getTargetContainer',
  'getPopupContainer',
  'renderEmpty',
  'pageHeader',
  'input',
  'form',
]

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: {
    validateMessages?: ValidateMessages;
    requiredMark?: RequiredMark;
  };
  input?: {
    autoComplete?: string;
  };
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
  componentSize?: SizeType;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
  icon?: IIconConfig;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
  legacyLocale: Locale;
}

export const defaultPrefixCls = 'brk'
let globalPrefixCls: string

const setGlobalConfig = (params: Pick<ConfigProviderProps, 'prefixCls'>) => {
  if (params.prefixCls !== undefined) {
    globalPrefixCls = params.prefixCls
  }
}

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls
}

function getIconDefaultConfig(rtl: boolean):IIconConfig {
  return {
    size: '1em',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    rtl,
    theme: 'outline',
    colors: {
      outline: {
        fill: 'currentColor',
        background: 'transparent'
      },
      filled: {
        fill: 'currentColor',
        background: 'transparent'
      },
      twoTone: {
        fill: 'currentColor',
        twoTone: '--primary-color'
      },
      multiColor: {
        outStrokeColor: '#333',
        outFillColor: '--primary-color',
        innerStrokeColor: '#FFF',
        innerFillColor: '#43CCF8'
      }
    },
    prefix: getGlobalPrefixCls()
  }
}


export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls()
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls
    }

    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1')
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls()
  },
  getIconDefaultConfig
})


const ProviderChildren: React.FC<ProviderChildrenProps> = props => {
  const {
    children,
    csp,
    autoInsertSpaceInButton,
    form,
    locale,
    componentSize,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    legacyLocale,
    parentContext,
    icon
  } = props

  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props

      if (customizePrefixCls) return customizePrefixCls

      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('')

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [parentContext.getPrefixCls, props.prefixCls],
  )

  const config = {
    ...parentContext,
    csp,
    autoInsertSpaceInButton,
    locale: locale || legacyLocale,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    getPrefixCls,
  }

  // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.
  PASSED_PROPS.forEach(propName => {
    // @ts-ignore
    const propValue: any = props[propName]
    if (propValue) {
      (config as any)[propName] = propValue
    }
  })

  // https://github.com/ant-design/ant-design/issues/27617
  const memoedConfig = useMemo(
    () => config,
    config,
    (prevConfig: Record<string, any>, currentConfig) => {
      const prevKeys = Object.keys(prevConfig)
      const currentKeys = Object.keys(currentConfig)
      return (
        prevKeys.length !== currentKeys.length ||
        prevKeys.some(key => prevConfig[key] !== currentConfig[key])
      )
    },
  )


  let childNode = children
  // Additional Form provider
  let validateMessages: ValidateMessages = {}

  if (locale && locale.Form && locale.Form.defaultValidateMessages) {
    validateMessages = locale.Form.defaultValidateMessages
  }
  if (form && form.validateMessages) {
    validateMessages = { ...validateMessages, ...form.validateMessages }
  }

  if (Object.keys(validateMessages).length > 0) {
    childNode = <RcFormProvider validateMessages={validateMessages}>{children}</RcFormProvider>
  }

  if (locale) {
    childNode = (
      <LocaleProvider locale={locale} _ANT_MARK__={ANT_MARK}>
        {childNode}
      </LocaleProvider>
    )
  }
  // IconPark
  const IconConfig = {...(icon ?? getIconDefaultConfig(props.direction === 'rtl'))}
  childNode = (
    <IconProvider value={IconConfig}>{childNode}</IconProvider>
  )

  if (componentSize) {
    childNode = <SizeContextProvider size={componentSize}>{childNode}</SizeContextProvider>
  }

  return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
  SizeContext: typeof SizeContext;
  config: typeof setGlobalConfig;
} = props => {
  React.useEffect(() => {
    if (props.direction) {
      message.config({
        rtl: props.direction === 'rtl',
      })
      notification.config({
        rtl: props.direction === 'rtl',
      })
    }
  }, [props.direction])

  return (
    <LocaleReceiver>
      {(_, __, legacyLocale) => (
        <ConfigConsumer>
          {context => (
            <ProviderChildren
              parentContext={context}
              legacyLocale={legacyLocale as Locale}
              {...props}
            />
          )}
        </ConfigConsumer>
      )}
    </LocaleReceiver>
  )
}

/** @private internal Usage. do not use in your production */
ConfigProvider.ConfigContext = ConfigContext
ConfigProvider.SizeContext = SizeContext
ConfigProvider.config = setGlobalConfig

export default ConfigProvider
