# Class: SettingsModule

[common/settings](../modules/common_settings.md).SettingsModule

Settings is a common configuration service with scope to support multi-tenant or plugin based configurations.
It's can read and write configurations from environment variables or database.

you could use @ConfigMap() decorator to distributed declare config map schema.
Then you can use SettingsService to read and write configurations.

**`example:`**

```ts
@ConfigMap('core.logger')
export class LoggerConfigMap {
  @Item({
    // LOCAL_STATIC means that config value is use static value and don't support modification.
    // see ScopeLookupStrategy for more details.
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    // could validate config value with yup schema.
    validation: yup.mixed().oneOf(['foo', 'bar']),
    // clientExposed means that config value is exposed to client.
    clientExposed: true
  })
  logger: string = env.LOGGER
}
```

## Table of contents

### Constructors

- [constructor](common_settings.SettingsModule.md#constructor)

### Methods

- [forRoot](common_settings.SettingsModule.md#forroot)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SettingsModule**()

## Methods

### <a id="forroot" name="forroot"></a> forRoot

▸ `Static` **forRoot**(): `DynamicModule`

#### Returns

`DynamicModule`

#### Defined in

[apps/server-api/src/common/settings/settings.module.ts:38](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.module.ts#L38)
