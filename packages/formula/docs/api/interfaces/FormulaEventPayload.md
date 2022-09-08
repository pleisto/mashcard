# Interface: FormulaEventPayload<T\>

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Properties

- [id](FormulaEventPayload.md#id)
- [level](FormulaEventPayload.md#level)
- [meta](FormulaEventPayload.md#meta)
- [namespaceId](FormulaEventPayload.md#namespaceid)
- [scope](FormulaEventPayload.md#scope)
- [source](FormulaEventPayload.md#source)
- [username](FormulaEventPayload.md#username)

## Properties

### <a id="id" name="id"></a> id

• `Readonly` **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:703](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L703)

---

### <a id="level" name="level"></a> level

• `Optional` `Readonly` **level**: `number`

#### Defined in

[packages/formula/src/type/index.ts:700](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L700)

---

### <a id="meta" name="meta"></a> meta

• `Readonly` **meta**: `T`

#### Defined in

[packages/formula/src/type/index.ts:705](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L705)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Readonly` **namespaceId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:704](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L704)

---

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: `null` \| [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/type/index.ts:702](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L702)

---

### <a id="source" name="source"></a> source

• `Readonly` **source**: { `id`: `string` ; `type`: `"nameChange"` \| `"dynamic"` \| `"dependencyUpdate"` \| `"reload"` \| `"variableSave"` \| `"variableDelete"` \| `"nameDelete"` \| `"columnChange"` \| `"rowChange"` \| `"spreadsheetInitialize"` \| `"blockDelete"` \| `"cellUpdate"` }[]

#### Defined in

[packages/formula/src/type/index.ts:684](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L684)

---

### <a id="username" name="username"></a> username

• `Readonly` **username**: `string`

#### Defined in

[packages/formula/src/type/index.ts:701](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L701)
