# @brickdoc/nestjs-slonik

## Table of contents

### Namespaces

- [assignment](modules/assignment.md)
- [identifiers](modules/identifiers.md)
- [values](modules/values.md)

### Classes

- [BackendTerminatedError](classes/BackendTerminatedError.md)
- [CheckIntegrityConstraintViolationError](classes/CheckIntegrityConstraintViolationError.md)
- [ConnectionError](classes/ConnectionError.md)
- [DataIntegrityError](classes/DataIntegrityError.md)
- [ForeignKeyIntegrityConstraintViolationError](classes/ForeignKeyIntegrityConstraintViolationError.md)
- [IntegrityConstraintViolationError](classes/IntegrityConstraintViolationError.md)
- [InvalidConfigurationError](classes/InvalidConfigurationError.md)
- [InvalidInputError](classes/InvalidInputError.md)
- [NotFoundError](classes/NotFoundError.md)
- [NotNullIntegrityConstraintViolationError](classes/NotNullIntegrityConstraintViolationError.md)
- [SlonikError](classes/SlonikError.md)
- [SlonikModule](classes/SlonikModule.md)
- [StatementCancelledError](classes/StatementCancelledError.md)
- [StatementTimeoutError](classes/StatementTimeoutError.md)
- [TupleMovedToAnotherPartitionError](classes/TupleMovedToAnotherPartitionError.md)
- [UnexpectedStateError](classes/UnexpectedStateError.md)
- [UniqueIntegrityConstraintViolationError](classes/UniqueIntegrityConstraintViolationError.md)

### Interfaces

- [SlonikModuleAsyncOptions](interfaces/SlonikModuleAsyncOptions.md)
- [SlonikModuleOptions](interfaces/SlonikModuleOptions.md)
- [SlonikOptions](interfaces/SlonikOptions.md)
- [SlonikOptionsFactory](interfaces/SlonikOptionsFactory.md)
- [TaggedTemplateLiteralInvocation](interfaces/TaggedTemplateLiteralInvocation.md)

### Type aliases

- [ArraySqlToken](README.md#arraysqltoken)
- [BinarySqlToken](README.md#binarysqltoken)
- [ClientConfiguration](README.md#clientconfiguration)
- [ClientConfigurationInput](README.md#clientconfigurationinput)
- [CommonQueryMethods](README.md#commonquerymethods)
- [Connection](README.md#connection)
- [ConnectionOptions](README.md#connectionoptions)
- [DatabaseConnection](README.md#databaseconnection)
- [DatabasePool](README.md#databasepool)
- [DatabasePoolConnection](README.md#databasepoolconnection)
- [DatabaseTransactionConnection](README.md#databasetransactionconnection)
- [Field](README.md#field)
- [IdentifierNormalizer](README.md#identifiernormalizer)
- [IdentifierSqlToken](README.md#identifiersqltoken)
- [Interceptor](README.md#interceptor)
- [JsonBinarySqlToken](README.md#jsonbinarysqltoken)
- [JsonSqlToken](README.md#jsonsqltoken)
- [ListSqlToken](README.md#listsqltoken)
- [MockPoolOverrides](README.md#mockpooloverrides)
- [Query](README.md#query-2)
- [QueryContext](README.md#querycontext)
- [QueryResult](README.md#queryresult)
- [QueryResultRow](README.md#queryresultrow)
- [QueryResultRowColumn](README.md#queryresultrowcolumn)
- [SerializableValue](README.md#serializablevalue)
- [SqlSqlToken](README.md#sqlsqltoken)
- [SqlTaggedTemplate](README.md#sqltaggedtemplate)
- [SqlToken](README.md#sqltoken)
- [TypeNameIdentifier](README.md#typenameidentifier)
- [TypeParser](README.md#typeparser)
- [UnnestSqlToken](README.md#unnestsqltoken)
- [ValueExpression](README.md#valueexpression)

### Variables

- [DEFAULT\_POOL\_NAME](README.md#default_pool_name)
- [LOGGER\_NAME](README.md#logger_name)
- [SLONIK\_MODULE\_ID](README.md#slonik_module_id)
- [SLONIK\_MODULE\_OPTIONS](README.md#slonik_module_options)
- [sql](README.md#sql-2)

### Functions

- [InjectPool](README.md#injectpool)
- [createBigintTypeParser](README.md#createbiginttypeparser)
- [createDateTypeParser](README.md#createdatetypeparser)
- [createIntervalTypeParser](README.md#createintervaltypeparser)
- [createMockPool](README.md#createmockpool)
- [createMockQueryResult](README.md#createmockqueryresult)
- [createNumericTypeParser](README.md#createnumerictypeparser)
- [createPool](README.md#createpool)
- [createSqlTag](README.md#createsqltag)
- [createSqlTokenSqlFragment](README.md#createsqltokensqlfragment)
- [createTimestampTypeParser](README.md#createtimestamptypeparser)
- [createTimestampWithTimeZoneTypeParser](README.md#createtimestampwithtimezonetypeparser)
- [createTypeParserPreset](README.md#createtypeparserpreset)
- [isSqlToken](README.md#issqltoken)
- [parseDsn](README.md#parsedsn)
- [stringifyDsn](README.md#stringifydsn)

## Type aliases

### <a id="arraysqltoken" name="arraysqltoken"></a> ArraySqlToken

Ƭ **ArraySqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `memberType` | [`SqlToken`](README.md#sqltoken) \| [`TypeNameIdentifier`](README.md#typenameidentifier) |
| `type` | typeof `tokens.ArrayToken` |
| `values` | readonly `PrimitiveValueExpression`[] |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:208

___

### <a id="binarysqltoken" name="binarysqltoken"></a> BinarySqlToken

Ƭ **BinarySqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Buffer` |
| `type` | typeof `tokens.BinaryToken` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:213

___

### <a id="clientconfiguration" name="clientconfiguration"></a> ClientConfiguration

Ƭ **ClientConfiguration**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `PgPool?` | (`poolConfig`: `PoolConfig`) => `PgPool` | Override the underlying PostgreSQL driver. * |
| `captureStackTrace` | `boolean` | Dictates whether to capture stack trace before executing query. Middlewares access stack trace through query execution context. (Default: true) |
| `connectionRetryLimit` | `number` | Number of times to retry establishing a new connection. (Default: 3) |
| `connectionTimeout` | `number` \| ``"DISABLE_TIMEOUT"`` | Timeout (in milliseconds) after which an error is raised if connection cannot cannot be established. (Default: 5000) |
| `idleInTransactionSessionTimeout` | `number` \| ``"DISABLE_TIMEOUT"`` | Timeout (in milliseconds) after which idle clients are closed. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 60000) |
| `idleTimeout` | `number` \| ``"DISABLE_TIMEOUT"`` | Timeout (in milliseconds) after which idle clients are closed. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 5000) |
| `interceptors` | readonly [`Interceptor`](README.md#interceptor)[] | An array of [Slonik interceptors](https://github.com/gajus/slonik#slonik-interceptors). |
| `maximumPoolSize` | `number` | Do not allow more than this many connections. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 10) |
| `queryRetryLimit` | `number` | Number of times a query failing with Transaction Rollback class error, that doesn't belong to a transaction, is retried. (Default: 5) |
| `ssl?` | `TlsConnectionOptions` | tls.connect options * |
| `statementTimeout` | `number` \| ``"DISABLE_TIMEOUT"`` | Timeout (in milliseconds) after which database is instructed to abort the query. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 60000) |
| `transactionRetryLimit` | `number` | Number of times a transaction failing with Transaction Rollback class error is retried. (Default: 5) |
| `typeParsers` | readonly [`TypeParser`](README.md#typeparser)[] | An array of [Slonik type parsers](https://github.com/gajus/slonik#slonik-type-parsers). |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:44

___

### <a id="clientconfigurationinput" name="clientconfigurationinput"></a> ClientConfigurationInput

Ƭ **ClientConfigurationInput**: `Partial`<[`ClientConfiguration`](README.md#clientconfiguration)\>

#### Defined in

node_modules/slonik/dist/src/types.d.ts:98

___

### <a id="commonquerymethods" name="commonquerymethods"></a> CommonQueryMethods

Ƭ **CommonQueryMethods**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `any` | `QueryAnyFunction` |
| `anyFirst` | `QueryAnyFirstFunction` |
| `exists` | `QueryExistsFunction` |
| `many` | `QueryManyFunction` |
| `manyFirst` | `QueryManyFirstFunction` |
| `maybeOne` | `QueryMaybeOneFunction` |
| `maybeOneFirst` | `QueryMaybeOneFirstFunction` |
| `one` | `QueryOneFunction` |
| `oneFirst` | `QueryOneFirstFunction` |
| `query` | `QueryFunction` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:104

___

### <a id="connection" name="connection"></a> Connection

Ƭ **Connection**: ``"EXPLICIT"`` \| ``"IMPLICIT_QUERY"`` \| ``"IMPLICIT_TRANSACTION"``

#### Defined in

node_modules/slonik/dist/src/types.d.ts:32

___

### <a id="connectionoptions" name="connectionoptions"></a> ConnectionOptions

Ƭ **ConnectionOptions**: `Object`

**`see`** https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PARAMKEYWORDS

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applicationName?` | `string` |
| `databaseName?` | `string` |
| `host?` | `string` |
| `password?` | `string` |
| `port?` | `number` |
| `sslMode?` | ``"disable"`` \| ``"no-verify"`` \| ``"require"`` |
| `username?` | `string` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:12

___

### <a id="databaseconnection" name="databaseconnection"></a> DatabaseConnection

Ƭ **DatabaseConnection**: [`DatabasePool`](README.md#databasepool) \| [`DatabasePoolConnection`](README.md#databasepoolconnection)

#### Defined in

node_modules/slonik/dist/src/types.d.ts:142

___

### <a id="databasepool" name="databasepool"></a> DatabasePool

Ƭ **DatabasePool**: [`CommonQueryMethods`](README.md#commonquerymethods) & { `configuration`: [`ClientConfiguration`](README.md#clientconfiguration) ; `copyFromBinary`: `QueryCopyFromBinaryFunction` ; `stream`: `StreamFunction` ; `connect`: <T\>(`connectionRoutine`: `ConnectionRoutine`<`T`\>) => `Promise`<`T`\> ; `end`: () => `Promise`<`void`\> ; `getPoolState`: () => `PoolState` ; `transaction`: <T\>(`handler`: `TransactionFunction`<`T`\>, `transactionRetryLimit?`: `number`) => `Promise`<`T`\>  }

#### Defined in

node_modules/slonik/dist/src/types.d.ts:133

___

### <a id="databasepoolconnection" name="databasepoolconnection"></a> DatabasePoolConnection

Ƭ **DatabasePoolConnection**: [`CommonQueryMethods`](README.md#commonquerymethods) & { `copyFromBinary`: `QueryCopyFromBinaryFunction` ; `stream`: `StreamFunction` ; `transaction`: <T\>(`handler`: `TransactionFunction`<`T`\>, `transactionRetryLimit?`: `number`) => `Promise`<`T`\>  }

#### Defined in

node_modules/slonik/dist/src/types.d.ts:121

___

### <a id="databasetransactionconnection" name="databasetransactionconnection"></a> DatabaseTransactionConnection

Ƭ **DatabaseTransactionConnection**: [`CommonQueryMethods`](README.md#commonquerymethods) & { `stream`: `StreamFunction` ; `transaction`: <T\>(`handler`: `TransactionFunction`<`T`\>, `transactionRetryLimit?`: `number`) => `Promise`<`T`\>  }

#### Defined in

node_modules/slonik/dist/src/types.d.ts:116

___

### <a id="field" name="field"></a> Field

Ƭ **Field**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataTypeId` | `number` |
| `name` | `string` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:33

___

### <a id="identifiernormalizer" name="identifiernormalizer"></a> IdentifierNormalizer

Ƭ **IdentifierNormalizer**: (`identifierName`: `string`) => `string`

#### Type declaration

▸ (`identifierName`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `identifierName` | `string` |

##### Returns

`string`

#### Defined in

node_modules/slonik/dist/src/types.d.ts:291

___

### <a id="identifiersqltoken" name="identifiersqltoken"></a> IdentifierSqlToken

Ƭ **IdentifierSqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `names` | readonly `string`[] |
| `type` | typeof `tokens.IdentifierToken` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:217

___

### <a id="interceptor" name="interceptor"></a> Interceptor

Ƭ **Interceptor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterPoolConnection?` | (`connectionContext`: `ConnectionContext`, `connection`: [`DatabasePoolConnection`](README.md#databasepoolconnection)) => `MaybePromise`<``null``\> |
| `afterQueryExecution?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2), `result`: [`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>) => `MaybePromise`<``null``\> |
| `beforePoolConnection?` | (`connectionContext`: `PoolContext`) => `MaybePromise`<`undefined` \| ``null`` \| [`DatabasePool`](README.md#databasepool)\> |
| `beforePoolConnectionRelease?` | (`connectionContext`: `ConnectionContext`, `connection`: [`DatabasePoolConnection`](README.md#databasepoolconnection)) => `MaybePromise`<``null``\> |
| `beforeQueryExecution?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2)) => `MaybePromise`<``null`` \| [`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>\> |
| `beforeQueryResult?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2), `result`: [`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>) => `MaybePromise`<``null``\> |
| `beforeTransformQuery?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2)) => `MaybePromise`<``null``\> |
| `queryExecutionError?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2), `error`: [`SlonikError`](classes/SlonikError.md), `notices`: readonly `NoticeMessage`[]) => `MaybePromise`<``null``\> |
| `transformQuery?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2)) => [`Query`](README.md#query-2) |
| `transformRow?` | (`queryContext`: [`QueryContext`](README.md#querycontext), `query`: [`Query`](README.md#query-2), `row`: [`QueryResultRow`](README.md#queryresultrow), `fields`: readonly [`Field`](README.md#field)[]) => [`QueryResultRow`](README.md#queryresultrow) |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:279

___

### <a id="jsonbinarysqltoken" name="jsonbinarysqltoken"></a> JsonBinarySqlToken

Ƭ **JsonBinarySqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | typeof `tokens.JsonBinaryToken` |
| `value` | [`SerializableValue`](README.md#serializablevalue) |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:226

___

### <a id="jsonsqltoken" name="jsonsqltoken"></a> JsonSqlToken

Ƭ **JsonSqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | typeof `tokens.JsonToken` |
| `value` | [`SerializableValue`](README.md#serializablevalue) |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:230

___

### <a id="listsqltoken" name="listsqltoken"></a> ListSqlToken

Ƭ **ListSqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `glue` | [`SqlSqlToken`](README.md#sqlsqltoken) |
| `members` | readonly [`ValueExpression`](README.md#valueexpression)[] |
| `type` | typeof `tokens.ListToken` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:221

___

### <a id="mockpooloverrides" name="mockpooloverrides"></a> MockPoolOverrides

Ƭ **MockPoolOverrides**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | (`sql`: `string`, `values`: readonly `PrimitiveValueExpression`[]) => `Promise`<[`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>\> |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:292

___

### <a id="query-2" name="query-2"></a> Query

Ƭ **Query**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `values` | readonly `PrimitiveValueExpression`[] |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:145

___

### <a id="querycontext" name="querycontext"></a> QueryContext

Ƭ **QueryContext**: `Object`

**`property`** connectionId Unique connection ID.

**`property`** log Instance of Roarr logger with bound query context parameters.

**`property`** originalQuery A copy of the query before `transformQuery` middleware.

**`property`** poolId Unique connection pool ID.

**`property`** queryId Unique query ID.

**`property`** queryInputTime `process.hrtime.bigint()` for when query was received.

**`property`** sandbox Object used by interceptors to assign interceptor-specific, query-specific context.

**`property`** transactionId Unique transaction ID.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connectionId` | `string` |
| `log` | `Logger` |
| `originalQuery` | [`Query`](README.md#query-2) |
| `poolId` | `string` |
| `queryId` | `QueryId` |
| `queryInputTime` | `bigint` \| `number` |
| `sandbox` | `Record`<`string`, `unknown`\> |
| `stackTrace` | readonly `CallSite`[] \| ``null`` |
| `transactionId` | `string` \| ``null`` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:197

___

### <a id="queryresult" name="queryresult"></a> QueryResult

Ƭ **QueryResult**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `command` | ``"COPY"`` \| ``"DELETE"`` \| ``"INSERT"`` \| ``"SELECT"`` \| ``"UPDATE"`` |
| `fields` | readonly [`Field`](README.md#field)[] |
| `notices` | readonly `Notice`[] |
| `rowCount` | `number` |
| `rows` | readonly `T`[] |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:37

___

### <a id="queryresultrow" name="queryresultrow"></a> QueryResultRow

Ƭ **QueryResultRow**: `Record`<`string`, [`QueryResultRowColumn`](README.md#queryresultrowcolumn)\>

#### Defined in

node_modules/slonik/dist/src/types.d.ts:144

___

### <a id="queryresultrowcolumn" name="queryresultrowcolumn"></a> QueryResultRowColumn

Ƭ **QueryResultRowColumn**: `PrimitiveValueExpression`

#### Defined in

node_modules/slonik/dist/src/types.d.ts:143

___

### <a id="serializablevalue" name="serializablevalue"></a> SerializableValue

Ƭ **SerializableValue**: `boolean` \| `number` \| `string` \| readonly [`SerializableValue`](README.md#serializablevalue)[] \| { `[key: string]`: [`SerializableValue`](README.md#serializablevalue) \| `undefined`;  } \| ``null``

#### Defined in

node_modules/slonik/dist/src/types.d.ts:26

___

### <a id="sqlsqltoken" name="sqlsqltoken"></a> SqlSqlToken

Ƭ **SqlSqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `type` | typeof `tokens.SqlToken` |
| `values` | readonly `PrimitiveValueExpression`[] |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:234

___

### <a id="sqltaggedtemplate" name="sqltaggedtemplate"></a> SqlTaggedTemplate

Ƭ **SqlTaggedTemplate**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `UserQueryResultRow` = [`QueryResultRow`](README.md#queryresultrow) |

#### Call signature

▸ <`U`\>(`template`, ...`values`): [`TaggedTemplateLiteralInvocation`](interfaces/TaggedTemplateLiteralInvocation.md)<`U`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `UserQueryResultRow` = `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `TemplateStringsArray` |
| `...values` | [`ValueExpression`](README.md#valueexpression)[] |

##### Returns

[`TaggedTemplateLiteralInvocation`](interfaces/TaggedTemplateLiteralInvocation.md)<`U`\>

#### Type declaration

| Name | Type |
| :------ | :------ |
| `array` | (`values`: readonly `PrimitiveValueExpression`[], `memberType`: `string` \| [`SqlToken`](README.md#sqltoken)) => [`ArraySqlToken`](README.md#arraysqltoken) |
| `binary` | (`data`: `Buffer`) => [`BinarySqlToken`](README.md#binarysqltoken) |
| `identifier` | (`names`: readonly `string`[]) => [`IdentifierSqlToken`](README.md#identifiersqltoken) |
| `join` | (`members`: readonly [`ValueExpression`](README.md#valueexpression)[], `glue`: [`SqlSqlToken`](README.md#sqlsqltoken)) => [`ListSqlToken`](README.md#listsqltoken) |
| `json` | (`value`: [`SerializableValue`](README.md#serializablevalue)) => [`JsonSqlToken`](README.md#jsonsqltoken) |
| `jsonb` | (`value`: [`SerializableValue`](README.md#serializablevalue)) => [`JsonBinarySqlToken`](README.md#jsonbinarysqltoken) |
| `literalValue` | (`value`: `string`) => [`SqlSqlToken`](README.md#sqlsqltoken) |
| `unnest` | (`tuples`: readonly readonly any[][], `columnTypes`: [...string[], `string`][] \| (`string` \| [`SqlSqlToken`](README.md#sqlsqltoken))[]) => [`UnnestSqlToken`](README.md#unnestsqltoken) |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:251

___

### <a id="sqltoken" name="sqltoken"></a> SqlToken

Ƭ **SqlToken**: [`ArraySqlToken`](README.md#arraysqltoken) \| [`BinarySqlToken`](README.md#binarysqltoken) \| [`IdentifierSqlToken`](README.md#identifiersqltoken) \| [`JsonBinarySqlToken`](README.md#jsonbinarysqltoken) \| [`JsonSqlToken`](README.md#jsonsqltoken) \| [`ListSqlToken`](README.md#listsqltoken) \| [`SqlSqlToken`](README.md#sqlsqltoken) \| [`UnnestSqlToken`](README.md#unnestsqltoken)

#### Defined in

node_modules/slonik/dist/src/types.d.ts:245

___

### <a id="typenameidentifier" name="typenameidentifier"></a> TypeNameIdentifier

Ƭ **TypeNameIdentifier**: `string` \| ``"bool"`` \| ``"bytea"`` \| ``"float4"`` \| ``"float8"`` \| ``"int2"`` \| ``"int4"`` \| ``"int8"`` \| ``"json"`` \| ``"text"`` \| ``"timestamptz"`` \| ``"uuid"``

"string" type covers all type name identifiers – the literal values are added only to assist developer
experience with auto suggestions for commonly used type name identifiers.

#### Defined in

node_modules/slonik/dist/src/types.d.ts:25

___

### <a id="typeparser" name="typeparser"></a> TypeParser

Ƭ **TypeParser**<`T`\>: `Object`

**`property`** name Value of "pg_type"."typname" (e.g. "int8", "timestamp", "timestamptz").

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `parse` | (`value`: `string`) => `T` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:156

___

### <a id="unnestsqltoken" name="unnestsqltoken"></a> UnnestSqlToken

Ƭ **UnnestSqlToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnTypes` | [...string[], [`TypeNameIdentifier`](README.md#typenameidentifier)][] \| ([`SqlSqlToken`](README.md#sqlsqltoken) \| [`TypeNameIdentifier`](README.md#typenameidentifier))[] |
| `tuples` | `ReadonlyArray`<readonly [`ValueExpression`](README.md#valueexpression)[]\> |
| `type` | typeof `tokens.UnnestToken` |

#### Defined in

node_modules/slonik/dist/src/types.d.ts:239

___

### <a id="valueexpression" name="valueexpression"></a> ValueExpression

Ƭ **ValueExpression**: `PrimitiveValueExpression` \| [`SqlToken`](README.md#sqltoken)

#### Defined in

node_modules/slonik/dist/src/types.d.ts:246

## Variables

### <a id="default_pool_name" name="default_pool_name"></a> DEFAULT\_POOL\_NAME

• `Const` **DEFAULT\_POOL\_NAME**: ``"default"``

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:6](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L6)

___

### <a id="logger_name" name="logger_name"></a> LOGGER\_NAME

• `Const` **LOGGER\_NAME**: ``"SlonikModule"``

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:7](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L7)

___

### <a id="slonik_module_id" name="slonik_module_id"></a> SLONIK\_MODULE\_ID

• `Const` **SLONIK\_MODULE\_ID**: typeof [`SLONIK_MODULE_ID`](README.md#slonik_module_id)

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:5](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L5)

___

### <a id="slonik_module_options" name="slonik_module_options"></a> SLONIK\_MODULE\_OPTIONS

• `Const` **SLONIK\_MODULE\_OPTIONS**: typeof [`SLONIK_MODULE_OPTIONS`](README.md#slonik_module_options)

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:4](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L4)

___

### <a id="sql-2" name="sql-2"></a> sql

• `Const` **sql**: `SqlTaggedTemplate`

#### Defined in

node_modules/slonik/dist/src/index.d.ts:1

## Functions

### <a id="injectpool" name="injectpool"></a> InjectPool

▸ **InjectPool**(`options?`): `ParameterDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `string` \| [`SlonikModuleOptions`](interfaces/SlonikModuleOptions.md) |

#### Returns

`ParameterDecorator`

#### Defined in

[packages/nestjs-slonik/src/slonik.decorator.ts:5](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.decorator.ts#L5)

___

### <a id="createbiginttypeparser" name="createbiginttypeparser"></a> createBigintTypeParser

▸ **createBigintTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createBigintTypeParser.d.ts:2

___

### <a id="createdatetypeparser" name="createdatetypeparser"></a> createDateTypeParser

▸ **createDateTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createDateTypeParser.d.ts:2

___

### <a id="createintervaltypeparser" name="createintervaltypeparser"></a> createIntervalTypeParser

▸ **createIntervalTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createIntervalTypeParser.d.ts:2

___

### <a id="createmockpool" name="createmockpool"></a> createMockPool

▸ **createMockPool**(`overrides`, `clientConfigurationInput?`): [`DatabasePool`](README.md#databasepool)

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides` | [`MockPoolOverrides`](README.md#mockpooloverrides) |
| `clientConfigurationInput?` | `Partial`<[`ClientConfiguration`](README.md#clientconfiguration)\> |

#### Returns

[`DatabasePool`](README.md#databasepool)

#### Defined in

node_modules/slonik/dist/src/factories/createMockPool.d.ts:2

___

### <a id="createmockqueryresult" name="createmockqueryresult"></a> createMockQueryResult

▸ **createMockQueryResult**(`rows`): [`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | readonly [`QueryResultRow`](README.md#queryresultrow)[] |

#### Returns

[`QueryResult`](README.md#queryresult)<[`QueryResultRow`](README.md#queryresultrow)\>

#### Defined in

node_modules/slonik/dist/src/factories/createMockQueryResult.d.ts:2

___

### <a id="createnumerictypeparser" name="createnumerictypeparser"></a> createNumericTypeParser

▸ **createNumericTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createNumericTypeParser.d.ts:2

___

### <a id="createpool" name="createpool"></a> createPool

▸ **createPool**(`connectionUri`, `clientConfigurationInput?`): [`DatabasePool`](README.md#databasepool)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connectionUri` | `string` | PostgreSQL [Connection URI](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING). |
| `clientConfigurationInput?` | `Partial`<[`ClientConfiguration`](README.md#clientconfiguration)\> | - |

#### Returns

[`DatabasePool`](README.md#databasepool)

#### Defined in

node_modules/slonik/dist/src/factories/createPool.d.ts:5

___

### <a id="createsqltag" name="createsqltag"></a> createSqlTag

▸ **createSqlTag**<`T`\>(): [`SqlTaggedTemplate`](README.md#sqltaggedtemplate)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`QueryResultRow`](README.md#queryresultrow) = [`QueryResultRow`](README.md#queryresultrow) |

#### Returns

[`SqlTaggedTemplate`](README.md#sqltaggedtemplate)<`T`\>

#### Defined in

node_modules/slonik/dist/src/factories/createSqlTag.d.ts:2

___

### <a id="createsqltokensqlfragment" name="createsqltokensqlfragment"></a> createSqlTokenSqlFragment

▸ **createSqlTokenSqlFragment**(`token`, `greatestParameterPosition`): `SqlFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`SqlToken`](README.md#sqltoken) |
| `greatestParameterPosition` | `number` |

#### Returns

`SqlFragment`

#### Defined in

node_modules/slonik/dist/src/factories/createSqlTokenSqlFragment.d.ts:2

___

### <a id="createtimestamptypeparser" name="createtimestamptypeparser"></a> createTimestampTypeParser

▸ **createTimestampTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createTimestampTypeParser.d.ts:2

___

### <a id="createtimestampwithtimezonetypeparser" name="createtimestampwithtimezonetypeparser"></a> createTimestampWithTimeZoneTypeParser

▸ **createTimestampWithTimeZoneTypeParser**(): [`TypeParser`](README.md#typeparser)<`unknown`\>

#### Returns

[`TypeParser`](README.md#typeparser)<`unknown`\>

#### Defined in

node_modules/slonik/dist/src/factories/typeParsers/createTimestampWithTimeZoneTypeParser.d.ts:2

___

### <a id="createtypeparserpreset" name="createtypeparserpreset"></a> createTypeParserPreset

▸ **createTypeParserPreset**(): readonly [`TypeParser`](README.md#typeparser)<`unknown`\>[]

#### Returns

readonly [`TypeParser`](README.md#typeparser)<`unknown`\>[]

#### Defined in

node_modules/slonik/dist/src/factories/createTypeParserPreset.d.ts:2

___

### <a id="issqltoken" name="issqltoken"></a> isSqlToken

▸ **isSqlToken**(`subject`): subject is SqlToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `unknown` |

#### Returns

subject is SqlToken

#### Defined in

node_modules/slonik/dist/src/utilities/isSqlToken.d.ts:2

___

### <a id="parsedsn" name="parsedsn"></a> parseDsn

▸ **parseDsn**(`dsn`): [`ConnectionOptions`](README.md#connectionoptions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dsn` | `string` |

#### Returns

[`ConnectionOptions`](README.md#connectionoptions)

#### Defined in

node_modules/slonik/dist/src/utilities/parseDsn.d.ts:2

___

### <a id="stringifydsn" name="stringifydsn"></a> stringifyDsn

▸ **stringifyDsn**(`connectionOptions`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionOptions` | [`ConnectionOptions`](README.md#connectionoptions) |

#### Returns

`string`

#### Defined in

node_modules/slonik/dist/src/utilities/stringifyDsn.d.ts:2
