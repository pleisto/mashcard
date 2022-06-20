# Interface: BlockType

## Table of contents

### Properties

- [\_formulaContext](BlockType.md#_formulacontext)
- [handleCodeFragments](BlockType.md#handlecodefragments)
- [handleInterpret](BlockType.md#handleinterpret)
- [id](BlockType.md#id)

### Methods

- [cleanup](BlockType.md#cleanup)
- [name](BlockType.md#name)
- [nameDependency](BlockType.md#namedependency)
- [persistence](BlockType.md#persistence)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L69)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L74)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:75](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L75)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:68](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L68)

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:72](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L72)

---

### <a id="name" name="name"></a> name

▸ **name**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L70)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L71)

---

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`BlockInitializer`](BlockInitializer.md)

#### Returns

[`BlockInitializer`](BlockInitializer.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:73](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L73)
