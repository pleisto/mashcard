# Interface: BackendActions

## Table of contents

### Properties

- [commit](BackendActions.md#commit)

## Properties

### <a id="commit" name="commit"></a> commit

• **commit**: (`commitFormulas`: [`Formula`](../README.md#formula)[], `deleteFormulas`: [`DeleteFormula`](DeleteFormula.md)[]) => `Promise`<{ `success`: `boolean` }\>

#### Type declaration

▸ (`commitFormulas`, `deleteFormulas`): `Promise`<{ `success`: `boolean` }\>

##### Parameters

| Name             | Type                                  |
| :--------------- | :------------------------------------ |
| `commitFormulas` | [`Formula`](../README.md#formula)[]   |
| `deleteFormulas` | [`DeleteFormula`](DeleteFormula.md)[] |

##### Returns

`Promise`<{ `success`: `boolean` }\>

#### Defined in

[packages/formula/src/type/index.ts:784](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L784)
