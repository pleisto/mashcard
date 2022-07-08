# @mashcard/active-support

## Table of contents

### Namespaces

- [Result](modules/Result.md)

### Classes

- [Err](classes/Err.md)
- [Ok](classes/Ok.md)
- [ResultAsync](classes/ResultAsync.md)

### Type Aliases

- [Cons](README.md#cons)
- [DeepPartial](README.md#deeppartial)
- [FixedLengthTuple](README.md#fixedlengthtuple)
- [PrependParameter](README.md#prependparameter)
- [Repeat](README.md#repeat)
- [RequireField](README.md#requirefield)
- [RequiredKeys](README.md#requiredkeys)
- [Result](README.md#result)

### Properties

- [partial](README.md#partial)
- [partialRight](README.md#partialright)

### Functions

- [after](README.md#after)
- [array2Tree](README.md#array2tree)
- [attempt](README.md#attempt)
- [before](README.md#before)
- [camelCase](README.md#camelcase)
- [capitalize](README.md#capitalize)
- [chunk](README.md#chunk)
- [clamp](README.md#clamp)
- [cloneDeep](README.md#clonedeep)
- [combine](README.md#combine)
- [combineWithAllErrors](README.md#combinewithallerrors)
- [compact](README.md#compact)
- [countBy](README.md#countby)
- [debounce](README.md#debounce)
- [defer](README.md#defer)
- [difference](README.md#difference)
- [differenceBy](README.md#differenceby)
- [drop](README.md#drop)
- [dropRight](README.md#dropright)
- [dropRightWhile](README.md#droprightwhile)
- [dropWhile](README.md#dropwhile)
- [err](README.md#err)
- [errAsync](README.md#errasync)
- [escape](README.md#escape)
- [findKey](README.md#findkey)
- [findLast](README.md#findlast)
- [findLastIndex](README.md#findlastindex)
- [flatMap](README.md#flatmap)
- [flatMapDeep](README.md#flatmapdeep)
- [flatMapDepth](README.md#flatmapdepth)
- [forEachRight](README.md#foreachright)
- [fromPromise](README.md#frompromise)
- [fromSafePromise](README.md#fromsafepromise)
- [fromThrowable](README.md#fromthrowable)
- [groupBy](README.md#groupby)
- [identity](README.md#identity)
- [initial](README.md#initial)
- [intersection](README.md#intersection)
- [intersectionBy](README.md#intersectionby)
- [intersectionWith](README.md#intersectionwith)
- [invokeMap](README.md#invokemap)
- [isArray](README.md#isarray)
- [isBlank](README.md#isblank)
- [isBoolean](README.md#isboolean)
- [isBuffer](README.md#isbuffer)
- [isDate](README.md#isdate)
- [isEmail](README.md#isemail)
- [isEmpty](README.md#isempty)
- [isEqual](README.md#isequal)
- [isError](README.md#iserror)
- [isFunction](README.md#isfunction)
- [isInteger](README.md#isinteger)
- [isMatch](README.md#ismatch)
- [isNaN](README.md#isnan)
- [isNil](README.md#isnil)
- [isNonEmptyArray](README.md#isnonemptyarray)
- [isNonEmptyString](README.md#isnonemptystring)
- [isNull](README.md#isnull)
- [isNullOrUndefined](README.md#isnullorundefined)
- [isNumber](README.md#isnumber)
- [isObject](README.md#isobject)
- [isPlainObject](README.md#isplainobject)
- [isRegExp](README.md#isregexp)
- [isSet](README.md#isset)
- [isString](README.md#isstring)
- [isSymbol](README.md#issymbol)
- [isUUID](README.md#isuuid)
- [isUrl](README.md#isurl)
- [isWeakMap](README.md#isweakmap)
- [isWeakSet](README.md#isweakset)
- [kebabCase](README.md#kebabcase)
- [keyBy](README.md#keyby)
- [last](README.md#last)
- [memoize](README.md#memoize)
- [ms](README.md#ms)
- [noop](README.md#noop)
- [nth](README.md#nth)
- [ok](README.md#ok)
- [okAsync](README.md#okasync)
- [omit](README.md#omit)
- [omitBy](README.md#omitby)
- [once](README.md#once)
- [orderBy](README.md#orderby)
- [over](README.md#over)
- [overArgs](README.md#overargs)
- [overEvery](README.md#overevery)
- [overSome](README.md#oversome)
- [pad](README.md#pad)
- [padEnd](README.md#padend)
- [padStart](README.md#padstart)
- [partition](README.md#partition)
- [pick](README.md#pick)
- [pluralize](README.md#pluralize)
- [prependUrlScheme](README.md#prependurlscheme)
- [pull](README.md#pull)
- [pullAll](README.md#pullall)
- [pullAllBy](README.md#pullallby)
- [pullAllWith](README.md#pullallwith)
- [pullAt](README.md#pullat)
- [range](README.md#range)
- [rangeRight](README.md#rangeright)
- [reject](README.md#reject)
- [remove](README.md#remove)
- [safeJsonParse](README.md#safejsonparse)
- [sample](README.md#sample)
- [sampleSize](README.md#samplesize)
- [set](README.md#set)
- [shuffle](README.md#shuffle)
- [singularize](README.md#singularize)
- [size](README.md#size)
- [slice](README.md#slice)
- [snakeCase](README.md#snakecase)
- [sortBy](README.md#sortby)
- [sortedIndex](README.md#sortedindex)
- [sortedIndexBy](README.md#sortedindexby)
- [sortedIndexOf](README.md#sortedindexof)
- [sortedLastIndex](README.md#sortedlastindex)
- [sortedLastIndexBy](README.md#sortedlastindexby)
- [sortedLastIndexOf](README.md#sortedlastindexof)
- [sortedUniq](README.md#sorteduniq)
- [sortedUniqBy](README.md#sorteduniqby)
- [startCase](README.md#startcase)
- [take](README.md#take)
- [takeRight](README.md#takeright)
- [takeRightWhile](README.md#takerightwhile)
- [takeWhile](README.md#takewhile)
- [throttle](README.md#throttle)
- [times](README.md#times)
- [trim](README.md#trim)
- [trimEnd](README.md#trimend)
- [trimStart](README.md#trimstart)
- [unary](README.md#unary)
- [union](README.md#union)
- [unionBy](README.md#unionby)
- [unionWith](README.md#unionwith)
- [uniq](README.md#uniq)
- [uniqBy](README.md#uniqby)
- [uniqWith](README.md#uniqwith)
- [unset](README.md#unset)
- [unzip](README.md#unzip)
- [unzipWith](README.md#unzipwith)
- [upperFirst](README.md#upperfirst)
- [uuid](README.md#uuid)
- [without](README.md#without)
- [wrap](README.md#wrap)
- [xor](README.md#xor)
- [xorBy](README.md#xorby)
- [xorWith](README.md#xorwith)
- [zip](README.md#zip)
- [zipObject](README.md#zipobject)
- [zipObjectDeep](README.md#zipobjectdeep)
- [zipWith](README.md#zipwith)

## Array

### <a id="intersectionby" name="intersectionby"></a> intersectionBy

▸ **intersectionBy**<`T1`, `T2`\>(`array`, `values`, `iteratee?`): `T1`[]

This method is like `_.intersection` except that it accepts `iteratee`
which is invoked for each element of each `arrays` to generate the criterion
by which uniqueness is computed. The iteratee is invoked with one argument: (value).

**`Example`**

\_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]

// using the `_.property` iteratee shorthand
\_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name        | Type                           | Description                       |
| :---------- | :----------------------------- | :-------------------------------- |
| `array`     | `null` \| `List`<`T1`\>        | -                                 |
| `values`    | `List`<`T2`\>                  | -                                 |
| `iteratee?` | `ValueIteratee`<`T1` \| `T2`\> | The iteratee invoked per element. |

#### Returns

`T1`[]

Returns the new array of shared values.

▸ **intersectionBy**<`T1`, `T2`, `T3`\>(`array`, `values1`, `values2`, `iteratee`): `T1`[]

**`See`**

\_.intersectionBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name       | Type                                   |
| :--------- | :------------------------------------- |
| `array`    | `null` \| `List`<`T1`\>                |
| `values1`  | `List`<`T2`\>                          |
| `values2`  | `List`<`T3`\>                          |
| `iteratee` | `ValueIteratee`<`T1` \| `T2` \| `T3`\> |

#### Returns

`T1`[]

▸ **intersectionBy**<`T1`, `T2`, `T3`, `T4`\>(`array`, `values1`, `values2`, ...`values`): `T1`[]

**`See`**

\_.intersectionBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name        | Type                                                                |
| :---------- | :------------------------------------------------------------------ |
| `array`     | `undefined` \| `null` \| `List`<`T1`\>                              |
| `values1`   | `List`<`T2`\>                                                       |
| `values2`   | `List`<`T3`\>                                                       |
| `...values` | (`List`<`T4`\> \| `ValueIteratee`<`T1` \| `T2` \| `T3` \| `T4`\>)[] |

#### Returns

`T1`[]

▸ **intersectionBy**<`T`\>(`array?`, ...`values`): `T`[]

**`See`**

\_.intersectionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                   |
| :---------- | :--------------------- |
| `array?`    | `null` \| `List`<`T`\> |
| `...values` | `List`<`T`\>[]         |

#### Returns

`T`[]

▸ **intersectionBy**<`T`\>(...`values`): `T`[]

**`See`**

\_.intersectionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `...values` | (`List`<`T`\> \| `ValueIteratee`<`T`\>)[] |

#### Returns

`T`[]

---

### <a id="intersectionwith" name="intersectionwith"></a> intersectionWith

▸ **intersectionWith**<`T1`, `T2`\>(`array`, `values?`, `comparator?`): `T1`[]

Creates an array of unique `array` values not included in the other
provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons.

**`Example`**

```ts
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 }
]
var others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 }
]

_.intersectionWith(objects, others, _.isEqual)
// => [{ 'x': 1, 'y': 2 }]
```

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name          | Type                                   | Description                         |
| :------------ | :------------------------------------- | :---------------------------------- |
| `array`       | `undefined` \| `null` \| `List`<`T1`\> | -                                   |
| `values?`     | `List`<`T2`\>                          | The arrays to inspect.              |
| `comparator?` | `Comparator2`<`T1`, `T2`\>             | The comparator invoked per element. |

#### Returns

`T1`[]

Returns the new array of filtered values.

▸ **intersectionWith**<`T1`, `T2`, `T3`\>(`array`, `values1`, `values2`, `comparator`): `T1`[]

**`See`**

\_.intersectionWith

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name         | Type                                   |
| :----------- | :------------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T1`\> |
| `values1`    | `List`<`T2`\>                          |
| `values2`    | `List`<`T3`\>                          |
| `comparator` | `Comparator2`<`T1`, `T2` \| `T3`\>     |

#### Returns

`T1`[]

▸ **intersectionWith**<`T1`, `T2`, `T3`, `T4`\>(`array`, `values1`, `values2`, ...`values`): `T1`[]

**`See`**

\_.intersectionWith

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name        | Type                                                            |
| :---------- | :-------------------------------------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T1`\>                          |
| `values1`   | `List`<`T2`\>                                                   |
| `values2`   | `List`<`T3`\>                                                   |
| `...values` | (`List`<`T4`\> \| `Comparator2`<`T1`, `T2` \| `T3` \| `T4`\>)[] |

#### Returns

`T1`[]

▸ **intersectionWith**<`T`\>(`array?`, ...`values`): `T`[]

**`See`**

\_.intersectionWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `array?`    | `null` \| `List`<`T`\>                           |
| `...values` | (`List`<`T`\> \| `Comparator2`<`T`, `never`\>)[] |

#### Returns

`T`[]

---

### <a id="pullall" name="pullall"></a> pullAll

▸ **pullAll**<`T`\>(`array`, `values?`): `T`[]

This method is like `_.pull` except that it accepts an array of values to remove.

**Note:** Unlike `_.difference`, this method mutates `array`.

**`Example`**

```ts
var array = [1, 2, 3, 1, 2, 3]

_.pull(array, [2, 3])
console.log(array)
// => [1, 1]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type         | Description           |
| :-------- | :----------- | :-------------------- |
| `array`   | `T`[]        | The array to modify.  |
| `values?` | `List`<`T`\> | The values to remove. |

#### Returns

`T`[]

Returns `array`.

▸ **pullAll**<`T`\>(`array`, `values?`): `List`<`T`\>

**`See`**

\_.pullAll

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `array`   | `List`<`T`\> |
| `values?` | `List`<`T`\> |

#### Returns

`List`<`T`\>

---

### <a id="pullallby" name="pullallby"></a> pullAllBy

▸ **pullAllBy**<`T`\>(`array`, `values?`, `iteratee?`): `T`[]

This method is like `_.pullAll` except that it accepts `iteratee` which is
invoked for each element of `array` and `values` to to generate the criterion
by which uniqueness is computed. The iteratee is invoked with one argument: (value).

**Note:** Unlike `_.differenceBy`, this method mutates `array`.

**`Example`**

```ts
var array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }]

_.pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x')
console.log(array)
// => [{ 'x': 2 }]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                  | Description                       |
| :---------- | :-------------------- | :-------------------------------- |
| `array`     | `T`[]                 | The array to modify.              |
| `values?`   | `List`<`T`\>          | The values to remove.             |
| `iteratee?` | `ValueIteratee`<`T`\> | The iteratee invoked per element. |

#### Returns

`T`[]

Returns `array`.

▸ **pullAllBy**<`T`\>(`array`, `values?`, `iteratee?`): `List`<`T`\>

**`See`**

\_.pullAllBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                  |
| :---------- | :-------------------- |
| `array`     | `List`<`T`\>          |
| `values?`   | `List`<`T`\>          |
| `iteratee?` | `ValueIteratee`<`T`\> |

#### Returns

`List`<`T`\>

▸ **pullAllBy**<`T1`, `T2`\>(`array`, `values`, `iteratee`): `T1`[]

**`See`**

\_.pullAllBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `array`    | `T1`[]                         |
| `values`   | `List`<`T2`\>                  |
| `iteratee` | `ValueIteratee`<`T1` \| `T2`\> |

#### Returns

`T1`[]

▸ **pullAllBy**<`T1`, `T2`\>(`array`, `values`, `iteratee`): `List`<`T1`\>

**`See`**

\_.pullAllBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `array`    | `List`<`T1`\>                  |
| `values`   | `List`<`T2`\>                  |
| `iteratee` | `ValueIteratee`<`T1` \| `T2`\> |

#### Returns

`List`<`T1`\>

---

### <a id="pullallwith" name="pullallwith"></a> pullAllWith

▸ **pullAllWith**<`T`\>(`array`, `values?`, `comparator?`): `T`[]

This method is like `_.pullAll` except that it accepts `comparator` which is
invoked to compare elements of array to values. The comparator is invoked with
two arguments: (arrVal, othVal).

**Note:** Unlike `_.differenceWith`, this method mutates `array`.

**`Example`**

```ts
var array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 }
]

_.pullAllWith(array, [{ x: 3, y: 4 }], _.isEqual)
console.log(array)
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type               | Description           |
| :------------ | :----------------- | :-------------------- |
| `array`       | `T`[]              | The array to modify.  |
| `values?`     | `List`<`T`\>       | The values to remove. |
| `comparator?` | `Comparator`<`T`\> | -                     |

#### Returns

`T`[]

Returns `array`.

▸ **pullAllWith**<`T`\>(`array`, `values?`, `comparator?`): `List`<`T`\>

**`See`**

\_.pullAllWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type               |
| :------------ | :----------------- |
| `array`       | `List`<`T`\>       |
| `values?`     | `List`<`T`\>       |
| `comparator?` | `Comparator`<`T`\> |

#### Returns

`List`<`T`\>

▸ **pullAllWith**<`T1`, `T2`\>(`array`, `values`, `comparator`): `T1`[]

**`See`**

\_.pullAllWith

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name         | Type                       |
| :----------- | :------------------------- |
| `array`      | `T1`[]                     |
| `values`     | `List`<`T2`\>              |
| `comparator` | `Comparator2`<`T1`, `T2`\> |

#### Returns

`T1`[]

▸ **pullAllWith**<`T1`, `T2`\>(`array`, `values`, `comparator`): `List`<`T1`\>

**`See`**

\_.pullAllWith

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name         | Type                       |
| :----------- | :------------------------- |
| `array`      | `List`<`T1`\>              |
| `values`     | `List`<`T2`\>              |
| `comparator` | `Comparator2`<`T1`, `T2`\> |

#### Returns

`List`<`T1`\>

---

### <a id="sortedindex" name="sortedindex"></a> sortedIndex

▸ **sortedIndex**<`T`\>(`array`, `value`): `number`

Uses a binary search to determine the lowest index at which `value` should
be inserted into `array` in order to maintain its sort order.

**`Example`**

```ts
_.sortedIndex([30, 50], 40)
// => 1

_.sortedIndex([4, 5], 4)
// => 0
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description                  |
| :------ | :------------------------------------ | :--------------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The sorted array to inspect. |
| `value` | `T`                                   | The value to evaluate.       |

#### Returns

`number`

Returns the index at which `value` should be inserted into `array`.

▸ **sortedIndex**<`T`\>(`array`, `value`): `number`

Uses a binary search to determine the lowest index at which `value` should
be inserted into `array` in order to maintain its sort order.

**`Example`**

```ts
_.sortedIndex([30, 50], 40)
// => 1

_.sortedIndex([4, 5], 4)
// => 0
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description                  |
| :------ | :------------------------------------ | :--------------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The sorted array to inspect. |
| `value` | `T`                                   | The value to evaluate.       |

#### Returns

`number`

Returns the index at which `value` should be inserted into `array`.

---

### <a id="sortedindexby" name="sortedindexby"></a> sortedIndexBy

▸ **sortedIndexBy**<`T`\>(`array`, `value`, `iteratee?`): `number`

This method is like `_.sortedIndex` except that it accepts `iteratee`
which is invoked for `value` and each element of `array` to compute their
sort ranking. The iteratee is invoked with one argument: (value).

**`Example`**

var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };

_.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));
// => 1

// using the `_.property` iteratee shorthand
\_.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
// => 0

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                       |
| :---------- | :------------------------------------ | :-------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The sorted array to inspect.      |
| `value`     | `T`                                   | The value to evaluate.            |
| `iteratee?` | `ValueIteratee`<`T`\>                 | The iteratee invoked per element. |

#### Returns

`number`

Returns the index at which `value` should be inserted into `array`.

---

### <a id="sortedindexof" name="sortedindexof"></a> sortedIndexOf

▸ **sortedIndexOf**<`T`\>(`array`, `value`): `number`

This method is like `_.indexOf` except that it performs a binary
search on a sorted `array`.

**`Example`**

```ts
_.sortedIndexOf([1, 1, 2, 2], 2)
// => 2
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description              |
| :------ | :------------------------------------ | :----------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to search.     |
| `value` | `T`                                   | The value to search for. |

#### Returns

`number`

Returns the index of the matched value, else `-1`.

---

### <a id="sortedlastindex" name="sortedlastindex"></a> sortedLastIndex

▸ **sortedLastIndex**<`T`\>(`array`, `value`): `number`

This method is like `_.sortedIndex` except that it returns the highest
index at which `value` should be inserted into `array` in order to
maintain its sort order.

**`Example`**

```ts
_.sortedLastIndex([4, 5], 4)
// => 1
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description                  |
| :------ | :------------------------------------ | :--------------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The sorted array to inspect. |
| `value` | `T`                                   | The value to evaluate.       |

#### Returns

`number`

Returns the index at which `value` should be inserted into `array`.

---

### <a id="sortedlastindexby" name="sortedlastindexby"></a> sortedLastIndexBy

▸ **sortedLastIndexBy**<`T`\>(`array`, `value`, `iteratee?`): `number`

This method is like `_.sortedLastIndex` except that it accepts `iteratee`
which is invoked for `value` and each element of `array` to compute their
sort ranking. The iteratee is invoked with one argument: (value).

**`Example`**

// using the `_.property` iteratee shorthand
\_.sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
// => 1

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                       |
| :---------- | :------------------------------------ | :-------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The sorted array to inspect.      |
| `value`     | `T`                                   | The value to evaluate.            |
| `iteratee?` | `ValueIteratee`<`T`\>                 | The iteratee invoked per element. |

#### Returns

`number`

Returns the index at which `value` should be inserted into `array`.

---

### <a id="sortedlastindexof" name="sortedlastindexof"></a> sortedLastIndexOf

▸ **sortedLastIndexOf**<`T`\>(`array`, `value`): `number`

This method is like `_.lastIndexOf` except that it performs a binary
search on a sorted `array`.

**`Example`**

```ts
_.sortedLastIndexOf([1, 1, 2, 2], 2)
// => 3
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description              |
| :------ | :------------------------------------ | :----------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to search.     |
| `value` | `T`                                   | The value to search for. |

#### Returns

`number`

Returns the index of the matched value, else `-1`.

---

### <a id="sorteduniq" name="sorteduniq"></a> sortedUniq

▸ **sortedUniq**<`T`\>(`array`): `T`[]

This method is like `_.uniq` except that it's designed and optimized
for sorted arrays.

**`Example`**

```ts
_.sortedUniq([1, 1, 2])
// => [1, 2]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description           |
| :------ | :------------------------------------ | :-------------------- |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to inspect. |

#### Returns

`T`[]

Returns the new duplicate free array.

---

### <a id="sorteduniqby" name="sorteduniqby"></a> sortedUniqBy

▸ **sortedUniqBy**<`T`\>(`array`, `iteratee?`): `T`[]

This method is like `_.uniqBy` except that it's designed and optimized
for sorted arrays.

**`Example`**

```ts
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor)
// => [1.1, 2.3]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                       |
| :---------- | :------------------------------------ | :-------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The array to inspect.             |
| `iteratee?` | `ValueIteratee`<`T`\>                 | The iteratee invoked per element. |

#### Returns

`T`[]

Returns the new duplicate free array.

---

### <a id="unionwith" name="unionwith"></a> unionWith

▸ **unionWith**<`T`\>(`arrays?`, `comparator?`): `T`[]

This method is like `_.union` except that it accepts `comparator` which
is invoked to compare elements of `arrays`. The comparator is invoked
with two arguments: (arrVal, othVal).

**`Example`**

```ts
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 }
]
var others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 }
]

_.unionWith(objects, others, _.isEqual)
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                   | Description                         |
| :------------ | :--------------------- | :---------------------------------- |
| `arrays?`     | `null` \| `List`<`T`\> | The arrays to inspect.              |
| `comparator?` | `Comparator`<`T`\>     | The comparator invoked per element. |

#### Returns

`T`[]

Returns the new array of combined values.

▸ **unionWith**<`T`\>(`arrays`, `arrays2`, `comparator?`): `T`[]

**`See`**

\_.unionWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                  |
| :------------ | :------------------------------------ |
| `arrays`      | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`     | `undefined` \| `null` \| `List`<`T`\> |
| `comparator?` | `Comparator`<`T`\>                    |

#### Returns

`T`[]

▸ **unionWith**<`T`\>(`arrays`, `arrays2`, `arrays3`, ...`comparator`): `T`[]

**`See`**

\_.unionWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                            |
| :-------------- | :-------------------------------------------------------------- |
| `arrays`        | `undefined` \| `null` \| `List`<`T`\>                           |
| `arrays2`       | `undefined` \| `null` \| `List`<`T`\>                           |
| `arrays3`       | `undefined` \| `null` \| `List`<`T`\>                           |
| `...comparator` | (`undefined` \| `null` \| `List`<`T`\> \| `Comparator`<`T`\>)[] |

#### Returns

`T`[]

---

### <a id="uniqby" name="uniqby"></a> uniqBy

▸ **uniqBy**<`T`\>(`array`, `iteratee?`): `T`[]

This method is like `_.uniq` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the criterion by which
uniqueness is computed. The iteratee is invoked with one argument: (value).

**`Example`**

\_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]

// using the `_.property` iteratee shorthand
\_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                       |
| :---------- | :------------------------------------ | :-------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The array to inspect.             |
| `iteratee?` | `ValueIteratee`<`T`\>                 | The iteratee invoked per element. |

#### Returns

`T`[]

Returns the new duplicate free array.

---

### <a id="uniqwith" name="uniqwith"></a> uniqWith

▸ **uniqWith**<`T`\>(`array`, `comparator?`): `T`[]

This method is like `_.uniq` except that it accepts `comparator` which
is invoked to compare elements of `array`. The comparator is invoked with
two arguments: (arrVal, othVal).

**`Example`**

```ts
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 }
]

_.uniqWith(objects, _.isEqual)
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                  | Description                         |
| :------------ | :------------------------------------ | :---------------------------------- |
| `array`       | `undefined` \| `null` \| `List`<`T`\> | The array to inspect.               |
| `comparator?` | `Comparator`<`T`\>                    | The comparator invoked per element. |

#### Returns

`T`[]

Returns the new duplicate free array.

---

### <a id="xorby" name="xorby"></a> xorBy

▸ **xorBy**<`T`\>(`arrays?`, `iteratee?`): `T`[]

This method is like `_.xor` except that it accepts `iteratee` which is
invoked for each element of each `arrays` to generate the criterion by which
uniqueness is computed. The iteratee is invoked with one argument: (value).

**`Example`**

\_.xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [1.2, 4.3]

// using the `_.property` iteratee shorthand
\_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                   | Description                       |
| :---------- | :--------------------- | :-------------------------------- |
| `arrays?`   | `null` \| `List`<`T`\> | The arrays to inspect.            |
| `iteratee?` | `ValueIteratee`<`T`\>  | The iteratee invoked per element. |

#### Returns

`T`[]

Returns the new array of values.

▸ **xorBy**<`T`\>(`arrays`, `arrays2`, `iteratee?`): `T`[]

**`See`**

\_.xorBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `arrays`    | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`   | `undefined` \| `null` \| `List`<`T`\> |
| `iteratee?` | `ValueIteratee`<`T`\>                 |

#### Returns

`T`[]

▸ **xorBy**<`T`\>(`arrays`, `arrays2`, `arrays3`, ...`iteratee`): `T`[]

**`See`**

\_.xorBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                                               |
| :------------ | :----------------------------------------------------------------- |
| `arrays`      | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays2`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays3`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `...iteratee` | (`undefined` \| `null` \| `List`<`T`\> \| `ValueIteratee`<`T`\>)[] |

#### Returns

`T`[]

---

### <a id="xorwith" name="xorwith"></a> xorWith

▸ **xorWith**<`T`\>(`arrays?`, `comparator?`): `T`[]

This method is like `_.xor` except that it accepts `comparator` which is
invoked to compare elements of `arrays`. The comparator is invoked with
two arguments: (arrVal, othVal).

**`Example`**

```ts
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 }
]
var others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 }
]

_.xorWith(objects, others, _.isEqual)
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                   | Description                         |
| :------------ | :--------------------- | :---------------------------------- |
| `arrays?`     | `null` \| `List`<`T`\> | The arrays to inspect.              |
| `comparator?` | `Comparator`<`T`\>     | The comparator invoked per element. |

#### Returns

`T`[]

Returns the new array of values.

▸ **xorWith**<`T`\>(`arrays`, `arrays2`, `comparator?`): `T`[]

**`See`**

\_.xorWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                  |
| :------------ | :------------------------------------ |
| `arrays`      | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`     | `undefined` \| `null` \| `List`<`T`\> |
| `comparator?` | `Comparator`<`T`\>                    |

#### Returns

`T`[]

▸ **xorWith**<`T`\>(`arrays`, `arrays2`, `arrays3`, ...`comparator`): `T`[]

**`See`**

\_.xorWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                            |
| :-------------- | :-------------------------------------------------------------- |
| `arrays`        | `undefined` \| `null` \| `List`<`T`\>                           |
| `arrays2`       | `undefined` \| `null` \| `List`<`T`\>                           |
| `arrays3`       | `undefined` \| `null` \| `List`<`T`\>                           |
| `...comparator` | (`undefined` \| `null` \| `List`<`T`\> \| `Comparator`<`T`\>)[] |

#### Returns

`T`[]

## Collection

### <a id="flatmapdeep" name="flatmapdeep"></a> flatMapDeep

▸ **flatMapDeep**<`T`\>(`collection`): `T`[]

This method is like `_.flatMap` except that it recursively flattens the
mapped results.

**`Since`**

4.7.0

**`Example`**

```ts
function duplicate(n) {
  return [[[n, n]]]
}

_.flatMapDeep([1, 2], duplicate)
// => [1, 1, 2, 2]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                                                                                                       | Description                     |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| `collection` | `undefined` \| `null` \| `Dictionary`<`T` \| `ListOfRecursiveArraysOrValues`<`T`\>\> \| `NumericDictionary`<`T` \| `ListOfRecursiveArraysOrValues`<`T`\>\> | The collection to iterate over. |

#### Returns

`T`[]

Returns the new flattened array.

▸ **flatMapDeep**<`T`, `TResult`\>(`collection`, `iteratee`): `TResult`[]

**`See`**

\_.flatMapDeep

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name         | Type                                                                           |
| :----------- | :----------------------------------------------------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\>                                          |
| `iteratee`   | `ListIterator`<`T`, `TResult` \| `ListOfRecursiveArraysOrValues`<`TResult`\>\> |

#### Returns

`TResult`[]

▸ **flatMapDeep**<`T`, `TResult`\>(`collection`, `iteratee`): `TResult`[]

**`See`**

\_.flatMapDeep

#### Type parameters

| Name      | Type             |
| :-------- | :--------------- |
| `T`       | extends `object` |
| `TResult` | `TResult`        |

#### Parameters

| Name         | Type                                                                             |
| :----------- | :------------------------------------------------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`                                                     |
| `iteratee`   | `ObjectIterator`<`T`, `TResult` \| `ListOfRecursiveArraysOrValues`<`TResult`\>\> |

#### Returns

`TResult`[]

▸ **flatMapDeep**(`collection`, `iteratee`): `any`[]

**`See`**

\_.flatMapDeep

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `string`                          |

#### Returns

`any`[]

▸ **flatMapDeep**(`collection`, `iteratee`): `boolean`[]

**`See`**

\_.flatMapDeep

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `object`                          |

#### Returns

`boolean`[]

---

### <a id="flatmapdepth" name="flatmapdepth"></a> flatMapDepth

▸ **flatMapDepth**<`T`\>(`collection`): `T`[]

This method is like `_.flatMap` except that it recursively flattens the
mapped results up to `depth` times.

**`Since`**

4.7.0

**`Example`**

```ts
function duplicate(n) {
  return [[[n, n]]]
}

_.flatMapDepth([1, 2], duplicate, 2)
// => [[1, 1], [2, 2]]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                                                                                                       | Description                     |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| `collection` | `undefined` \| `null` \| `Dictionary`<`T` \| `ListOfRecursiveArraysOrValues`<`T`\>\> \| `NumericDictionary`<`T` \| `ListOfRecursiveArraysOrValues`<`T`\>\> | The collection to iterate over. |

#### Returns

`T`[]

Returns the new flattened array.

▸ **flatMapDepth**<`T`, `TResult`\>(`collection`, `iteratee`, `depth?`): `TResult`[]

**`See`**

\_.flatMapDepth

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name         | Type                                                                           |
| :----------- | :----------------------------------------------------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\>                                          |
| `iteratee`   | `ListIterator`<`T`, `TResult` \| `ListOfRecursiveArraysOrValues`<`TResult`\>\> |
| `depth?`     | `number`                                                                       |

#### Returns

`TResult`[]

▸ **flatMapDepth**<`T`, `TResult`\>(`collection`, `iteratee`, `depth?`): `TResult`[]

**`See`**

\_.flatMapDepth

#### Type parameters

| Name      | Type             |
| :-------- | :--------------- |
| `T`       | extends `object` |
| `TResult` | `TResult`        |

#### Parameters

| Name         | Type                                                                             |
| :----------- | :------------------------------------------------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`                                                     |
| `iteratee`   | `ObjectIterator`<`T`, `TResult` \| `ListOfRecursiveArraysOrValues`<`TResult`\>\> |
| `depth?`     | `number`                                                                         |

#### Returns

`TResult`[]

▸ **flatMapDepth**(`collection`, `iteratee`, `depth?`): `any`[]

**`See`**

\_.flatMapDepth

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `string`                          |
| `depth?`     | `number`                          |

#### Returns

`any`[]

▸ **flatMapDepth**(`collection`, `iteratee`, `depth?`): `boolean`[]

**`See`**

\_.flatMapDepth

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `object`                          |
| `depth?`     | `number`                          |

#### Returns

`boolean`[]

---

### <a id="orderby" name="orderby"></a> orderBy

▸ **orderBy**<`T`\>(`collection`, `iteratees?`, `orders?`): `T`[]

This method is like `_.sortBy` except that it allows specifying the sort
orders of the iteratees to sort by. If `orders` is unspecified, all values
are sorted in ascending order. Otherwise, specify an order of "desc" for
descending or "asc" for ascending sort order of corresponding values.

**`Example`**

var users = [
{ 'user': 'fred', 'age': 48 },
{ 'user': 'barney', 'age': 34 },
{ 'user': 'fred', 'age': 42 },
{ 'user': 'barney', 'age': 36 }
];

// sort by `user` in ascending order and by `age` in descending order
\_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                      | Description                     |
| :----------- | :---------------------------------------- | :------------------------------ |
| `collection` | `undefined` \| `null` \| `List`<`T`\>     | The collection to iterate over. |
| `iteratees?` | `Many`<`ListIterator`<`T`, `unknown`\>\>  | The iteratees to sort by.       |
| `orders?`    | `Many`<`boolean` \| `"asc"` \| `"desc"`\> | The sort orders of `iteratees`. |

#### Returns

`T`[]

Returns the new sorted array.

▸ **orderBy**<`T`\>(`collection`, `iteratees?`, `orders?`): `T`[]

**`See`**

\_.orderBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                      |
| :----------- | :---------------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\>     |
| `iteratees?` | `Many`<`ListIteratee`<`T`\>\>             |
| `orders?`    | `Many`<`boolean` \| `"asc"` \| `"desc"`\> |

#### Returns

`T`[]

▸ **orderBy**<`T`\>(`collection`, `iteratees?`, `orders?`): `T`[keyof `T`][]

**`See`**

\_.orderBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                                       |
| :----------- | :----------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`               |
| `iteratees?` | `Many`<`ObjectIterator`<`T`, `unknown`\>\> |
| `orders?`    | `Many`<`boolean` \| `"asc"` \| `"desc"`\>  |

#### Returns

`T`[keyof `T`][]

▸ **orderBy**<`T`\>(`collection`, `iteratees?`, `orders?`): `T`[keyof `T`][]

**`See`**

\_.orderBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                                      |
| :----------- | :---------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`              |
| `iteratees?` | `Many`<`ObjectIteratee`<`T`\>\>           |
| `orders?`    | `Many`<`boolean` \| `"asc"` \| `"desc"`\> |

#### Returns

`T`[keyof `T`][]

---

### <a id="sortby" name="sortby"></a> sortBy

▸ **sortBy**<`T`\>(`collection`, ...`iteratees?`): `T`[]

Creates an array of elements, sorted in ascending order by the results of
running each element in a collection through each iteratee. This method
performs a stable sort, that is, it preserves the original sort order of
equal elements. The iteratees are invoked with one argument: (value).

**`Example`**

```ts
var users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 42 },
  { user: 'barney', age: 34 }
]

_.sortBy(users, function (o) {
  return o.user
})
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]

_.sortBy(users, ['user', 'age'])
// => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]

_.sortBy(users, 'user', function (o) {
  return Math.floor(o.age / 10)
})
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                  | Description                                                    |
| :-------------- | :------------------------------------ | :------------------------------------------------------------- |
| `collection`    | `undefined` \| `null` \| `List`<`T`\> | The collection to iterate over.                                |
| `...iteratees?` | `Many`<`ListIteratee`<`T`\>\>[]       | The iteratees to sort by, specified individually or in arrays. |

#### Returns

`T`[]

Returns the new sorted array.

▸ **sortBy**<`T`\>(`collection`, ...`iteratees`): `T`[keyof `T`][]

**`See`**

\_.sortBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name           | Type                              |
| :------------- | :-------------------------------- |
| `collection`   | `undefined` \| `null` \| `T`      |
| `...iteratees` | `Many`<`ObjectIteratee`<`T`\>\>[] |

#### Returns

`T`[keyof `T`][]

## Function

### <a id="unary" name="unary"></a> unary

▸ **unary**<`T`, `TResult`\>(`func`): (`arg1`: `T`) => `TResult`

Creates a function that accepts up to one argument, ignoring any
additional arguments.

**`Example`**

```ts
_.map(['6', '8', '10'], _.unary(parseInt))
// => [6, 8, 10]
```

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name   | Type                                           | Description                        |
| :----- | :--------------------------------------------- | :--------------------------------- |
| `func` | (`arg1`: `T`, ...`args`: `any`[]) => `TResult` | The function to cap arguments for. |

#### Returns

`fn`

Returns the new function.

▸ (`arg1`): `TResult`

Creates a function that accepts up to one argument, ignoring any
additional arguments.

**`Category`**

Function

**`Example`**

```ts
_.map(['6', '8', '10'], _.unary(parseInt))
// => [6, 8, 10]
```

##### Parameters

| Name   | Type |
| :----- | :--- |
| `arg1` | `T`  |

##### Returns

`TResult`

Returns the new function.

## Lang

### <a id="isequal" name="isequal"></a> isEqual

▸ **isEqual**(`value`, `other`): `boolean`

Performs a deep comparison between two values to determine if they are
equivalent.

**Note:** This method supports comparing arrays, array buffers, booleans,
date objects, error objects, maps, numbers, `Object` objects, regexes,
sets, strings, symbols, and typed arrays. `Object` objects are compared
by their own, not inherited, enumerable properties. Functions and DOM
nodes are **not** supported.

**`Example`**

```ts
var object = { user: 'fred' }
var other = { user: 'fred' }

_.isEqual(object, other)
// => true

object === other
// => false
```

#### Parameters

| Name    | Type  | Description                 |
| :------ | :---- | :-------------------------- |
| `value` | `any` | The value to compare.       |
| `other` | `any` | The other value to compare. |

#### Returns

`boolean`

Returns `true` if the values are equivalent, else `false`.

---

### <a id="isinteger" name="isinteger"></a> isInteger

▸ **isInteger**(`value?`): `boolean`

Checks if `value` is an integer.

**Note:** This method is based on [`Number.isInteger`](https://mdn.io/Number/isInteger).

**`Example`**

```ts
_.isInteger(3)
// => true

_.isInteger(Number.MIN_VALUE)
// => false

_.isInteger(Infinity)
// => false

_.isInteger('3')
// => false
```

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

`boolean`

Returns `true` if `value` is an integer, else `false`.

---

### <a id="ismatch" name="ismatch"></a> isMatch

▸ **isMatch**(`object`, `source`): `boolean`

Performs a deep comparison between `object` and `source` to determine if
`object` contains equivalent property values.

**Note:** This method supports comparing the same values as `_.isEqual`.

**`Example`**

```ts
var object = { user: 'fred', age: 40 }

_.isMatch(object, { age: 40 })
// => true

_.isMatch(object, { age: 36 })
// => false
```

#### Parameters

| Name     | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `object` | `object` | The object to inspect.                  |
| `source` | `object` | The object of property values to match. |

#### Returns

`boolean`

Returns `true` if `object` is a match, else `false`.

---

### <a id="isnil" name="isnil"></a> isNil

▸ **isNil**(`value`): value is undefined \| null

Checks if `value` is `null` or `undefined`.

**`Example`**

```ts
_.isNil(null)
// => true

_.isNil(void 0)
// => true

_.isNil(NaN)
// => false
```

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is undefined \| null

Returns `true` if `value` is nullish, else `false`.

---

### <a id="issymbol" name="issymbol"></a> isSymbol

▸ **isSymbol**(`value`): value is symbol

Checks if `value` is classified as a `Symbol` primitive or object.

**`Example`**

```ts
_.isSymbol(Symbol.iterator)
// => true

_.isSymbol('abc')
// => false
```

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is symbol

Returns `true` if `value` is correctly classified, else `false`.

## Number

### <a id="clamp" name="clamp"></a> clamp

▸ **clamp**(`number`, `lower?`, `upper`): `number`

Clamps `number` within the inclusive `lower` and `upper` bounds.

**`Example`**

\_.clamp(-10, -5, 5);
// => -5

\_.clamp(10, -5, 5);
// => 5
Clamps `number` within the inclusive `lower` and `upper` bounds.

**`Example`**

```ts
_.clamp(-10, -5, 5)
// => -5

_.clamp(10, -5, 5)
```

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `number` | `number` | The number to clamp. |
| `lower?` | `number` | The lower bound.     |
| `upper`  | `number` | The upper bound.     |

#### Returns

`number`

Returns the clamped number.

Returns the clamped number.

▸ **clamp**(`number`, `upper`): `number`

**`See`**

\_.clamp

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `number` | `number` |
| `upper`  | `number` |

#### Returns

`number`

## Object

### <a id="omit" name="omit"></a> omit

▸ **omit**<`T`, `K`\>(`object`, ...`paths?`): `Pick`<`T`, `Exclude`<keyof `T`, `K`[`number`]\>\>

The opposite of `_.pick`; this method creates an object composed of the
own and inherited enumerable properties of `object` that are not omitted.

**`Example`**

```ts
var object = { a: 1, b: '2', c: 3 }

_.omit(object, ['a', 'c'])
// => { 'b': '2' }
```

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `T`  | extends `object`         |
| `K`  | extends `PropertyName`[] |

#### Parameters

| Name        | Type                         | Description                                                       |
| :---------- | :--------------------------- | :---------------------------------------------------------------- |
| `object`    | `undefined` \| `null` \| `T` | The source object.                                                |
| `...paths?` | `K`                          | The property names to omit, specified individually or in arrays.. |

#### Returns

`Pick`<`T`, `Exclude`<keyof `T`, `K`[`number`]\>\>

Returns the new object.

▸ **omit**<`T`, `K`\>(`object`, ...`paths`): `Omit`<`T`, `K`\>

**`See`**

\_.omit

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `T`  | extends `object`                         |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `object`   | `undefined` \| `null` \| `T` |
| `...paths` | `Many`<`K`\>[]               |

#### Returns

`Omit`<`T`, `K`\>

▸ **omit**<`T`\>(`object`, ...`paths`): `Partial`<`T`\>

**`See`**

\_.omit

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `object`   | `undefined` \| `null` \| `T` |
| `...paths` | `Many`<`PropertyName`\>[]    |

#### Returns

`Partial`<`T`\>

---

### <a id="omitby" name="omitby"></a> omitBy

▸ **omitBy**<`T`\>(`object`, `predicate?`): `Dictionary`<`T`\>

The opposite of `_.pickBy`; this method creates an object composed of the
own and inherited enumerable properties of `object` that `predicate`
doesn't return truthy for.

**`Example`**

```ts
var object = { a: 1, b: '2', c: 3 }

_.omitBy(object, _.isNumber)
// => { 'b': '2' }
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                        | Description                        |
| :----------- | :------------------------------------------ | :--------------------------------- |
| `object`     | `undefined` \| `null` \| `Dictionary`<`T`\> | The source object.                 |
| `predicate?` | `ValueKeyIteratee`<`T`\>                    | The function invoked per property. |

#### Returns

`Dictionary`<`T`\>

Returns the new object.

▸ **omitBy**<`T`\>(`object`, `predicate?`): `NumericDictionary`<`T`\>

**`See`**

\_.omitBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                               |
| :----------- | :------------------------------------------------- |
| `object`     | `undefined` \| `null` \| `NumericDictionary`<`T`\> |
| `predicate?` | `ValueKeyIteratee`<`T`\>                           |

#### Returns

`NumericDictionary`<`T`\>

▸ **omitBy**<`T`\>(`object`, `predicate`): `Partial`<`T`\>

**`See`**

\_.omitBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `object`    | `undefined` \| `null` \| `T`        |
| `predicate` | `ValueKeyIteratee`<`T`[keyof `T`]\> |

#### Returns

`Partial`<`T`\>

---

### <a id="pick" name="pick"></a> pick

▸ **pick**<`T`, `U`\>(`object`, ...`props?`): `Pick`<`T`, `U`\>

Creates an object composed of the picked `object` properties.

**`Example`**

```ts
var object = { a: 1, b: '2', c: 3 }

_.pick(object, ['a', 'c'])
// => { 'a': 1, 'c': 3 }
```

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `T`  | extends `object`                         |
| `U`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name        | Type           | Description                                                      |
| :---------- | :------------- | :--------------------------------------------------------------- |
| `object`    | `T`            | The source object.                                               |
| `...props?` | `Many`<`U`\>[] | The property names to pick, specified individually or in arrays. |

#### Returns

`Pick`<`T`, `U`\>

Returns the new object.

▸ **pick**<`T`\>(`object`, ...`props`): `Partial`<`T`\>

**`See`**

\_.pick

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `object`   | `undefined` \| `null` \| `T` |
| `...props` | `PropertyPath`[]             |

#### Returns

`Partial`<`T`\>

## Other

### <a id="cons" name="cons"></a> Cons

Ƭ **Cons**<`H`, `T`\>: (`h`: `H`, ...`t`: `T`) => `void` extends (...`r`: infer R) => `void` ? `R` : `never`

Prepend tuple.

**`Example`**

```typescript
const const: Cons<1, [2, 3, 4]> = [1, 2, 3, 4]
```

**`Source`**

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `H`  | `H`                      |
| `T`  | extends readonly `any`[] |

#### Defined in

[packages/active-support/src/typescript.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L29)

---

### <a id="deeppartial" name="deeppartial"></a> DeepPartial

Ƭ **DeepPartial**<`T`\>: `T` extends `object` ? { [P in keyof T]?: DeepPartial<T[P]\> } : `T`

make all properties optional recursively.

**`Source`**

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[packages/active-support/src/typescript.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L6)

---

### <a id="fixedlengthtuple" name="fixedlengthtuple"></a> FixedLengthTuple

Ƭ **FixedLengthTuple**<`T`, `N`, `R`\>: `R`[``"length"``] extends `N` ? `R` : [`FixedLengthTuple`](README.md#fixedlengthtuple)<`T`, `N`, readonly [`T`, ...R]\>

Fixed length tuple.

**`Example`**

```typescript
const x: FixedLengthTuple<number, 3> = [1, 2, 3]
```

**`Source`**

#### Type parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `T`  | `T`                         |
| `N`  | extends `number`            |
| `R`  | extends readonly `T`[] = [] |

#### Defined in

[packages/active-support/src/typescript.ts:56](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L56)

---

### <a id="prependparameter" name="prependparameter"></a> PrependParameter

Ƭ **PrependParameter**<`Param`, `F`\>: (...`args`: `Extract`<[`Cons`](README.md#cons)<`Param`, `Parameters`<`F`\>\>, readonly `any`[]\>) => `ReturnType`<`F`\>

#### Type parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `Param` | `Param`                               |
| `F`     | extends (...`args`: `any`[]) => `any` |

#### Type declaration

▸ (...`args`): `ReturnType`<`F`\>

Prepend Parameter.

**`Example`**

```typescript
type F = (x: number) => boolean
type F2 = PrependParameter<string, F> // type F2 = (s: string, x: number) => boolean
```

**`Source`**

##### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `...args` | `Extract`<[`Cons`](README.md#cons)<`Param`, `Parameters`<`F`\>\>, readonly `any`[]\> |

##### Returns

`ReturnType`<`F`\>

#### Defined in

[packages/active-support/src/typescript.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L42)

---

### <a id="repeat" name="repeat"></a> Repeat

Ƭ **Repeat**<`Char`, `Count`, `Joined`, `Acc`\>: `Acc`[``"length"``] extends `Count` ? `Joined` : [`Repeat`](README.md#repeat)<`Char`, `Count`, \`${Joined}${Char}\`, [``0``, ...Acc]\>

Repeat string

**`Example`**

```typescript
const x: Repeat<'1' | '2', 4> = '1122'
```

**`Source`**

#### Type parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `Char`   | extends `string`        |
| `Count`  | extends `number`        |
| `Joined` | extends `string` = `""` |
| `Acc`    | extends `0`[] = []      |

#### Defined in

[packages/active-support/src/typescript.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L77)

---

### <a id="requirefield" name="requirefield"></a> RequireField

Ƭ **RequireField**<`T`, `K`\>: `T` & `Required`<`Pick`<`T`, `K`\>\>

Make some field required

**`Source`**

#### Type parameters

| Name | Type              |
| :--- | :---------------- |
| `T`  | `T`               |
| `K`  | extends keyof `T` |

#### Defined in

[packages/active-support/src/typescript.ts:65](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L65)

---

### <a id="requiredkeys" name="requiredkeys"></a> RequiredKeys

Ƭ **RequiredKeys**<`T`\>: { [K in keyof T]-?: Object extends Pick<T, K\> ? never : K }[keyof `T`]

pick all required properties from an object.

**`Source`**

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[packages/active-support/src/typescript.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/active-support/src/typescript.ts#L17)

---

### <a id="result" name="result"></a> Result

Ƭ **Result**<`T`, `E`\>: [`Ok`](classes/Ok.md)<`T`, `E`\> \| [`Err`](classes/Err.md)<`T`, `E`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

#### Defined in

node_modules/neverthrow/dist/index.d.ts:48

node_modules/neverthrow/dist/index.d.ts:58

---

### <a id="partial" name="partial"></a> partial

• **partial**: `Partial`

Creates a function that, when called, invokes func with any additional partial arguments
prepended to those provided to the new function. This method is similar to \_.bind except
it does not alter the this binding.

**`Param`**

The function to partially apply arguments to.

**`Param`**

Arguments to be partially applied.

#### Defined in

node_modules/@types/lodash/common/function.d.ts:640

---

### <a id="partialright" name="partialright"></a> partialRight

• **partialRight**: `PartialRight`

This method is like \_.partial except that partial arguments are appended to those provided
to the new function.

**`Param`**

The function to partially apply arguments to.

**`Param`**

Arguments to be partially applied.

#### Defined in

node_modules/@types/lodash/common/function.d.ts:913

---

### <a id="after" name="after"></a> after

▸ **after**<`TFunc`\>(`n`, `func`): `TFunc`

The opposite of \_.before; this method creates a function that invokes func once it’s called n or more times.

#### Type parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `TFunc` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name   | Type     | Description                                 |
| :----- | :------- | :------------------------------------------ |
| `n`    | `number` | The number of calls before func is invoked. |
| `func` | `TFunc`  | The function to restrict.                   |

#### Returns

`TFunc`

Returns the new restricted function.

---

### <a id="array2tree" name="array2tree"></a> array2Tree

▸ **array2Tree**<`TItem`\>(`items`, `config?`): `TItem` & { `children`: `TItem`[] }[]

Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`).

#### Type parameters

| Name    | Type           |
| :------ | :------------- |
| `TItem` | extends `Item` |

#### Parameters

| Name     | Type                 | Description                           |
| :------- | :------------------- | :------------------------------------ |
| `items`  | `TItem`[]            | array of items                        |
| `config` | `Partial`<`Config`\> | please see `performant-array-to-tree` |

#### Returns

`TItem` & { `children`: `TItem`[] }[]

---

### <a id="attempt" name="attempt"></a> attempt

▸ **attempt**<`TResult`\>(`func`, ...`args`): `Error` \| `TResult`

Attempts to invoke func, returning either the result or the caught error object. Any additional arguments
are provided to func when it’s invoked.

#### Type parameters

| Name      |
| :-------- |
| `TResult` |

#### Parameters

| Name      | Type                              | Description              |
| :-------- | :-------------------------------- | :----------------------- |
| `func`    | (...`args`: `any`[]) => `TResult` | The function to attempt. |
| `...args` | `any`[]                           | -                        |

#### Returns

`Error` \| `TResult`

Returns the func result or error object.

---

### <a id="before" name="before"></a> before

▸ **before**<`TFunc`\>(`n`, `func`): `TFunc`

Creates a function that invokes func, with the this binding and arguments of the created function, while
it’s called less than n times. Subsequent calls to the created function return the result of the last func
invocation.

#### Type parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `TFunc` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name   | Type     | Description                                             |
| :----- | :------- | :------------------------------------------------------ |
| `n`    | `number` | The number of calls at which func is no longer invoked. |
| `func` | `TFunc`  | The function to restrict.                               |

#### Returns

`TFunc`

Returns the new restricted function.

---

### <a id="camelcase" name="camelcase"></a> camelCase

▸ **camelCase**(`string?`): `string`

Converts string to camel case.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `string?` | `string` | The string to convert. |

#### Returns

`string`

Returns the camel cased string.

---

### <a id="capitalize" name="capitalize"></a> capitalize

▸ **capitalize**(`string?`): `string`

Converts the first character of string to upper case and the remaining to lower case.

#### Parameters

| Name      | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `string?` | `string` | The string to capitalize. |

#### Returns

`string`

Returns the capitalized string.

---

### <a id="chunk" name="chunk"></a> chunk

▸ **chunk**<`T`\>(`arr`, `size?`): `T`[][]

ES Version of `lodash.chunk`
Creates an array of elements split into groups the length of size.
If array can’t be split evenly, the final chunk will be the remaining elements.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type     | Default value | Description               |
| :----- | :------- | :------------ | :------------------------ |
| `arr`  | `T`[]    | `undefined`   | The array to process.     |
| `size` | `number` | `1`           | The length of each chunk. |

#### Returns

`T`[][]

Returns the new array of chunks.

---

### <a id="clonedeep" name="clonedeep"></a> cloneDeep

▸ **cloneDeep**(`value`): `any`

ES Version of `lodash.cloneDeep`
Creates a shallow clone of `value`. Assumes that the values of the object are primitive types.

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to clone. |

#### Returns

`any`

Returns the cloned value.

---

### <a id="combine" name="combine"></a> combine

▸ **combine**<`T`\>(`resultList`): [`Result`](README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`]\>

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `T`  | extends readonly [`Result`](README.md#result)<`unknown`, `unknown`\>[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `resultList` | `T`  |

#### Returns

[`Result`](README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`]\>

▸ **combine**<`T`\>(`asyncResultList`): [`ResultAsync`](classes/ResultAsync.md)<`ExtractOkAsyncTypes`<`T`\>, `ExtractErrAsyncTypes`<`T`\>[`number`]\>

#### Type parameters

| Name | Type                                                                              |
| :--- | :-------------------------------------------------------------------------------- |
| `T`  | extends readonly [`ResultAsync`](classes/ResultAsync.md)<`unknown`, `unknown`\>[] |

#### Parameters

| Name              | Type |
| :---------------- | :--- |
| `asyncResultList` | `T`  |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`ExtractOkAsyncTypes`<`T`\>, `ExtractErrAsyncTypes`<`T`\>[`number`]\>

---

### <a id="combinewithallerrors" name="combinewithallerrors"></a> combineWithAllErrors

▸ **combineWithAllErrors**<`T`\>(`resultList`): [`Result`](README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`][]\>

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `T`  | extends readonly [`Result`](README.md#result)<`unknown`, `unknown`\>[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `resultList` | `T`  |

#### Returns

[`Result`](README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`][]\>

▸ **combineWithAllErrors**<`T`\>(`asyncResultList`): [`ResultAsync`](classes/ResultAsync.md)<`ExtractOkAsyncTypes`<`T`\>, `ExtractErrAsyncTypes`<`T`\>[`number`][]\>

#### Type parameters

| Name | Type                                                                              |
| :--- | :-------------------------------------------------------------------------------- |
| `T`  | extends readonly [`ResultAsync`](classes/ResultAsync.md)<`unknown`, `unknown`\>[] |

#### Parameters

| Name              | Type |
| :---------------- | :--- |
| `asyncResultList` | `T`  |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`ExtractOkAsyncTypes`<`T`\>, `ExtractErrAsyncTypes`<`T`\>[`number`][]\>

---

### <a id="compact" name="compact"></a> compact

▸ **compact**<`T`\>(`arr`): `T`[]

ES Version of `lodash.compact`
Creates an array with all falsey values removed.
The values false, null, 0, "", undefined, and NaN are falsey.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type  | Description           |
| :---- | :---- | :-------------------- |
| `arr` | `T`[] | The array to compact. |

#### Returns

`T`[]

Returns the new array of filtered values.

---

### <a id="countby" name="countby"></a> countBy

▸ **countBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`number`\>

Creates an object composed of keys generated from the results of running each element of collection through
iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The
iteratee is invoked with one argument: (value).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\> | The collection to iterate over.     |
| `iteratee?`  | `ValueIteratee`<`T`\>                 | The function invoked per iteration. |

#### Returns

`Dictionary`<`number`\>

Returns the composed aggregate object.

▸ **countBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`number`\>

**`See`**

\_.countBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `collection` | `undefined` \| `null` \| `T`     |
| `iteratee?`  | `ValueIteratee`<`T`[keyof `T`]\> |

#### Returns

`Dictionary`<`number`\>

---

### <a id="debounce" name="debounce"></a> debounce

▸ **debounce**<`T`\>(`func`, `wait`, `options`): `DebouncedFuncLeading`<`T`\>

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since
the last time the debounced function was invoked. The debounced function comes with a cancel method to
cancel delayed invocations and a flush method to immediately invoke them. Provide an options object to
indicate that func should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent
calls to the debounced function return the result of the last func invocation.

Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only
if the the debounced function is invoked more than once during the wait timeout.

See David Corbacho’s article for details over the differences between _.debounce and _.throttle.

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends (...`args`: `any`) => `any` |

#### Parameters

| Name      | Type                      | Description                          |
| :-------- | :------------------------ | :----------------------------------- |
| `func`    | `T`                       | The function to debounce.            |
| `wait`    | `undefined` \| `number`   | The number of milliseconds to delay. |
| `options` | `DebounceSettingsLeading` | The options object.                  |

#### Returns

`DebouncedFuncLeading`<`T`\>

Returns the new debounced function.

▸ **debounce**<`T`\>(`func`, `wait?`, `options?`): `DebouncedFunc`<`T`\>

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends (...`args`: `any`) => `any` |

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `func`     | `T`                |
| `wait?`    | `number`           |
| `options?` | `DebounceSettings` |

#### Returns

`DebouncedFunc`<`T`\>

---

### <a id="defer" name="defer"></a> defer

▸ **defer**(`func`, ...`args`): `number`

Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to
func when it’s invoked.

#### Parameters

| Name      | Type                          | Description                                |
| :-------- | :---------------------------- | :----------------------------------------- |
| `func`    | (...`args`: `any`[]) => `any` | The function to defer.                     |
| `...args` | `any`[]                       | The arguments to invoke the function with. |

#### Returns

`number`

Returns the timer id.

---

### <a id="difference" name="difference"></a> difference

▸ **difference**<`T`\>(`array`, ...`values`): `T`[]

Creates an array of `array` values not included in the other provided arrays using SameValueZero for
equality comparisons. The order and references of result values are determined by the first array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                      |
| :---------- | :------------------------------------ | :------------------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The array to inspect.            |
| `...values` | `List`<`T`\>[]                        | The arrays of values to exclude. |

#### Returns

`T`[]

Returns the new array of filtered values.

---

### <a id="differenceby" name="differenceby"></a> differenceBy

▸ **differenceBy**<`T1`, `T2`\>(`array`, `values`, `iteratee`): `T1`[]

This method is like \_.difference except that it accepts iteratee which is invoked for each element
of array and values to generate the criterion by which they're compared. The order and references
of result values are determined by the first array. The iteratee is invoked with one argument: (value).

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name       | Type                                   | Description                       |
| :--------- | :------------------------------------- | :-------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`T1`\> | The array to inspect.             |
| `values`   | `List`<`T2`\>                          | The values to exclude.            |
| `iteratee` | `ValueIteratee`<`T1` \| `T2`\>         | The iteratee invoked per element. |

#### Returns

`T1`[]

Returns the new array of filtered values.

▸ **differenceBy**<`T1`, `T2`, `T3`\>(`array`, `values1`, `values2`, `iteratee`): `T1`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name       | Type                                   |
| :--------- | :------------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`T1`\> |
| `values1`  | `List`<`T2`\>                          |
| `values2`  | `List`<`T3`\>                          |
| `iteratee` | `ValueIteratee`<`T1` \| `T2` \| `T3`\> |

#### Returns

`T1`[]

▸ **differenceBy**<`T1`, `T2`, `T3`, `T4`\>(`array`, `values1`, `values2`, `values3`, `iteratee`): `T1`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`T1`\>         |
| `values1`  | `List`<`T2`\>                                  |
| `values2`  | `List`<`T3`\>                                  |
| `values3`  | `List`<`T4`\>                                  |
| `iteratee` | `ValueIteratee`<`T1` \| `T2` \| `T3` \| `T4`\> |

#### Returns

`T1`[]

▸ **differenceBy**<`T1`, `T2`, `T3`, `T4`, `T5`\>(`array`, `values1`, `values2`, `values3`, `values4`, `iteratee`): `T1`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

#### Parameters

| Name       | Type                                                   |
| :--------- | :----------------------------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`T1`\>                 |
| `values1`  | `List`<`T2`\>                                          |
| `values2`  | `List`<`T3`\>                                          |
| `values3`  | `List`<`T4`\>                                          |
| `values4`  | `List`<`T5`\>                                          |
| `iteratee` | `ValueIteratee`<`T1` \| `T2` \| `T3` \| `T4` \| `T5`\> |

#### Returns

`T1`[]

▸ **differenceBy**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`\>(`array`, `values1`, `values2`, `values3`, `values4`, `values5`, `iteratee`): `T1`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |

#### Parameters

| Name       | Type                                                           |
| :--------- | :------------------------------------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`T1`\>                         |
| `values1`  | `List`<`T2`\>                                                  |
| `values2`  | `List`<`T3`\>                                                  |
| `values3`  | `List`<`T4`\>                                                  |
| `values4`  | `List`<`T5`\>                                                  |
| `values5`  | `List`<`T6`\>                                                  |
| `iteratee` | `ValueIteratee`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6`\> |

#### Returns

`T1`[]

▸ **differenceBy**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`\>(`array`, `values1`, `values2`, `values3`, `values4`, `values5`, ...`values`): `T1`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |

#### Parameters

| Name        | Type                                                                                        |
| :---------- | :------------------------------------------------------------------------------------------ |
| `array`     | `undefined` \| `null` \| `List`<`T1`\>                                                      |
| `values1`   | `List`<`T2`\>                                                                               |
| `values2`   | `List`<`T3`\>                                                                               |
| `values3`   | `List`<`T4`\>                                                                               |
| `values4`   | `List`<`T5`\>                                                                               |
| `values5`   | `List`<`T6`\>                                                                               |
| `...values` | (`List`<`T7`\> \| `ValueIteratee`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7`\>)[] |

#### Returns

`T1`[]

▸ **differenceBy**<`T`\>(`array`, ...`values`): `T`[]

**`See`**

\_.differenceBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `array`     | `undefined` \| `null` \| `List`<`T`\> |
| `...values` | `List`<`T`\>[]                        |

#### Returns

`T`[]

---

### <a id="drop" name="drop"></a> drop

▸ **drop**<`T`\>(`arr`, `n?`): `T`[]

ES Version of `lodash.drop`
Creates a slice of array with n elements dropped from the beginning.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type     | Default value | Description                     |
| :---- | :------- | :------------ | :------------------------------ |
| `arr` | `T`[]    | `undefined`   | The array to query.             |
| `n`   | `number` | `1`           | The number of elements to drop. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="dropright" name="dropright"></a> dropRight

▸ **dropRight**<`T`\>(`arr`, `n?`): `T`[]

ES Version of `lodash.dropRight`
Creates a slice of array with n elements dropped from the end.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type     | Default value | Description                     |
| :---- | :------- | :------------ | :------------------------------ |
| `arr` | `T`[]    | `undefined`   | The array to query.             |
| `n`   | `number` | `1`           | The number of elements to drop. |

#### Returns

`T`[]

The slice of array.

---

### <a id="droprightwhile" name="droprightwhile"></a> dropRightWhile

▸ **dropRightWhile**<`T`\>(`array`, `predicate?`): `T`[]

Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate
returns falsey. The predicate is invoked with three arguments: (value, index, array).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T`\> | The array to query.                 |
| `predicate?` | `ListIteratee`<`T`\>                  | The function invoked per iteration. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="dropwhile" name="dropwhile"></a> dropWhile

▸ **dropWhile**<`T`\>(`array`, `predicate?`): `T`[]

Creates a slice of array excluding elements dropped from the beginning. Elements are dropped until predicate
returns falsey. The predicate is invoked with three arguments: (value, index, array).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T`\> | The array to query.                 |
| `predicate?` | `ListIteratee`<`T`\>                  | The function invoked per iteration. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="err" name="err"></a> err

▸ **err**<`T`, `E`\>(`err`): [`Err`](classes/Err.md)<`T`, `E`\>

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `never`   |
| `E`  | `unknown` |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `err` | `E`  |

#### Returns

[`Err`](classes/Err.md)<`T`, `E`\>

---

### <a id="errasync" name="errasync"></a> errAsync

▸ **errAsync**<`T`, `E`\>(`err`): [`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `never`   |
| `E`  | `unknown` |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `err` | `E`  |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

---

### <a id="escape" name="escape"></a> escape

▸ **escape**(`string?`): `string`

Converts the characters "&", "<", ">", '"', "'", and "`" in string to their corresponding HTML entities.

Note: No other characters are escaped. To escape additional characters use a third-party library like he.

hough the ">" character is escaped for symmetry, characters like ">" and "/" don’t need escaping in HTML
and have no special meaning unless they're part of a tag or unquoted attribute value. See Mathias Bynens’s
article (under "semi-related fun fact") for more details.

Backticks are escaped because in IE < 9, they can break out of attribute values or HTML comments. See #59,
#102, #108, and #133 of the HTML5 Security Cheatsheet for more details.

When working with HTML you should always quote attribute values to reduce XSS vectors.

#### Parameters

| Name      | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `string?` | `string` | The string to escape. |

#### Returns

`string`

Returns the escaped string.

---

### <a id="findkey" name="findkey"></a> findKey

▸ **findKey**<`T`\>(`object`, `predicate?`): `undefined` \| `string`

This method is like \_.find except that it returns the key of the first element predicate returns truthy for
instead of the element itself.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                         | Description                         |
| :----------- | :--------------------------- | :---------------------------------- |
| `object`     | `undefined` \| `null` \| `T` | The object to search.               |
| `predicate?` | `ObjectIteratee`<`T`\>       | The function invoked per iteration. |

#### Returns

`undefined` \| `string`

Returns the key of the matched element, else undefined.

---

### <a id="findlast" name="findlast"></a> findLast

▸ **findLast**<`T`, `S`\>(`collection`, `predicate`, `fromIndex?`): `undefined` \| `S`

This method is like \_.find except that it iterates over elements of a collection from
right to left.

#### Type parameters

| Name |
| :--- |
| `T`  |
| `S`  |

#### Parameters

| Name         | Type                                  | Description                        |
| :----------- | :------------------------------------ | :--------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\> | Searches for a value in this list. |
| `predicate`  | `ListIteratorTypeGuard`<`T`, `S`\>    | The function called per iteration. |
| `fromIndex?` | `number`                              | The index to search from.          |

#### Returns

`undefined` \| `S`

The found element, else undefined.

▸ **findLast**<`T`\>(`collection`, `predicate?`, `fromIndex?`): `undefined` \| `T`

**`See`**

\_.findLast

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  |
| :----------- | :------------------------------------ |
| `collection` | `undefined` \| `null` \| `List`<`T`\> |
| `predicate?` | `ListIterateeCustom`<`T`, `boolean`\> |
| `fromIndex?` | `number`                              |

#### Returns

`undefined` \| `T`

▸ **findLast**<`T`, `S`\>(`collection`, `predicate`, `fromIndex?`): `undefined` \| `S`

**`See`**

\_.findLast

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |
| `S`  | `S`              |

#### Parameters

| Name         | Type                                 |
| :----------- | :----------------------------------- |
| `collection` | `undefined` \| `null` \| `T`         |
| `predicate`  | `ObjectIteratorTypeGuard`<`T`, `S`\> |
| `fromIndex?` | `number`                             |

#### Returns

`undefined` \| `S`

▸ **findLast**<`T`\>(`collection`, `predicate?`, `fromIndex?`): `undefined` \| `T`[keyof `T`]

**`See`**

\_.findLast

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                                    |
| :----------- | :-------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`            |
| `predicate?` | `ObjectIterateeCustom`<`T`, `boolean`\> |
| `fromIndex?` | `number`                                |

#### Returns

`undefined` \| `T`[keyof `T`]

---

### <a id="findlastindex" name="findlastindex"></a> findLastIndex

▸ **findLastIndex**<`T`\>(`array`, `predicate?`, `fromIndex?`): `number`

This method is like \_.findIndex except that it iterates over elements of collection from right to left.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T`\> | The array to search.                |
| `predicate?` | `ListIterateeCustom`<`T`, `boolean`\> | The function invoked per iteration. |
| `fromIndex?` | `number`                              | The index to search from.           |

#### Returns

`number`

Returns the index of the found element, else -1.

---

### <a id="flatmap" name="flatmap"></a> flatMap

▸ **flatMap**<`T`\>(`collection`): `T`[]

Creates an array of flattened values by running each element in collection through iteratee
and concating its result to the other mapped values. The iteratee is invoked with three arguments:
(value, index|key, collection).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                                       | Description                     |
| :----------- | :----------------------------------------------------------------------------------------- | :------------------------------ |
| `collection` | `undefined` \| `null` \| `Dictionary`<`Many`<`T`\>\> \| `NumericDictionary`<`Many`<`T`\>\> | The collection to iterate over. |

#### Returns

`T`[]

Returns the new flattened array.

▸ **flatMap**(`collection`): `any`[]

**`See`**

\_.flatMap

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |

#### Returns

`any`[]

▸ **flatMap**<`T`, `TResult`\>(`collection`, `iteratee`): `TResult`[]

**`See`**

\_.flatMap

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name         | Type                                     |
| :----------- | :--------------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\>    |
| `iteratee`   | `ListIterator`<`T`, `Many`<`TResult`\>\> |

#### Returns

`TResult`[]

▸ **flatMap**<`T`, `TResult`\>(`collection`, `iteratee`): `TResult`[]

**`See`**

\_.flatMap

#### Type parameters

| Name      | Type             |
| :-------- | :--------------- |
| `T`       | extends `object` |
| `TResult` | `TResult`        |

#### Parameters

| Name         | Type                                       |
| :----------- | :----------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`               |
| `iteratee`   | `ObjectIterator`<`T`, `Many`<`TResult`\>\> |

#### Returns

`TResult`[]

▸ **flatMap**(`collection`, `iteratee`): `any`[]

**`See`**

\_.flatMap

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `string`                          |

#### Returns

`any`[]

▸ **flatMap**(`collection`, `iteratee`): `boolean`[]

**`See`**

\_.flatMap

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `iteratee`   | `object`                          |

#### Returns

`boolean`[]

---

### <a id="foreachright" name="foreachright"></a> forEachRight

▸ **forEachRight**<`T`\>(`collection`, `iteratee?`): `T`[]

This method is like \_.forEach except that it iterates over elements of collection from right to left.

**`Alias`**

\_.eachRight

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                         | Description                        |
| :----------- | :--------------------------- | :--------------------------------- |
| `collection` | `T`[]                        | The collection to iterate over.    |
| `iteratee?`  | `ArrayIterator`<`T`, `any`\> | The function called per iteration. |

#### Returns

`T`[]

▸ **forEachRight**(`collection`, `iteratee?`): `string`

**`See`**

\_.forEachRight

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `collection` | `string`                 |
| `iteratee?`  | `StringIterator`<`any`\> |

#### Returns

`string`

▸ **forEachRight**<`T`\>(`collection`, `iteratee?`): `List`<`T`\>

**`See`**

\_.forEachRight

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                        |
| :----------- | :-------------------------- |
| `collection` | `List`<`T`\>                |
| `iteratee?`  | `ListIterator`<`T`, `any`\> |

#### Returns

`List`<`T`\>

▸ **forEachRight**<`T`\>(`collection`, `iteratee?`): `T`

**`See`**

\_.forEachRight

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `collection` | `T`                           |
| `iteratee?`  | `ObjectIterator`<`T`, `any`\> |

#### Returns

`T`

▸ **forEachRight**<`T`, `TArray`\>(`collection`, `iteratee?`): `TArray`

**`See`**

\_.forEachRight

#### Type parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `T`      | `T`                                    |
| `TArray` | extends `undefined` \| `null` \| `T`[] |

#### Parameters

| Name         | Type                                                          |
| :----------- | :------------------------------------------------------------ |
| `collection` | `TArray` & `undefined` & `TArray` & `null` & `TArray` & `T`[] |
| `iteratee?`  | `ArrayIterator`<`T`, `any`\>                                  |

#### Returns

`TArray`

▸ **forEachRight**<`TString`\>(`collection`, `iteratee?`): `TString`

**`See`**

\_.forEachRight

#### Type parameters

| Name      | Type                                      |
| :-------- | :---------------------------------------- |
| `TString` | extends `undefined` \| `null` \| `string` |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `collection` | `TString`                |
| `iteratee?`  | `StringIterator`<`any`\> |

#### Returns

`TString`

▸ **forEachRight**<`T`, `TList`\>(`collection`, `iteratee?`): `TList`

**`See`**

\_.forEachRight

#### Type parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `T`     | `T`                                           |
| `TList` | extends `undefined` \| `null` \| `List`<`T`\> |

#### Parameters

| Name         | Type                                                              |
| :----------- | :---------------------------------------------------------------- |
| `collection` | `TList` & `undefined` & `TList` & `null` & `TList` & `List`<`T`\> |
| `iteratee?`  | `ListIterator`<`T`, `any`\>                                       |

#### Returns

`TList`

▸ **forEachRight**<`T`\>(`collection`, `iteratee?`): `undefined` \| `null` \| `T`

**`See`**

\_.forEachRight

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `collection` | `undefined` \| `null` \| `T`  |
| `iteratee?`  | `ObjectIterator`<`T`, `any`\> |

#### Returns

`undefined` \| `null` \| `T`

---

### <a id="frompromise" name="frompromise"></a> fromPromise

▸ **fromPromise**<`T`, `E`\>(`promise`, `errorFn`): [`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `promise` | `Promise`<`T`\>         |
| `errorFn` | (`e`: `unknown`) => `E` |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

---

### <a id="fromsafepromise" name="fromsafepromise"></a> fromSafePromise

▸ **fromSafePromise**<`T`, `E`\>(`promise`): [`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `promise` | `Promise`<`T`\> |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

---

### <a id="fromthrowable" name="fromthrowable"></a> fromThrowable

▸ **fromThrowable**<`Fn`, `E`\>(`fn`, `errorFn?`): (...`args`: `Parameters`<`Fn`\>) => [`Result`](README.md#result)<`ReturnType`<`Fn`\>, `E`\>

Wraps a function with a try catch, creating a new function with the same
arguments but returning `Ok` if successful, `Err` if the function throws

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `Fn` | extends (...`args`: readonly `any`[]) => `any` |
| `E`  | `E`                                            |

#### Parameters

| Name       | Type                    | Description                                                          |
| :--------- | :---------------------- | :------------------------------------------------------------------- |
| `fn`       | `Fn`                    | function to wrap with ok on success or err on failure                |
| `errorFn?` | (`e`: `unknown`) => `E` | when an error is thrown, this will wrap the error result if provided |

#### Returns

`fn`

▸ (...`args`): [`Result`](README.md#result)<`ReturnType`<`Fn`\>, `E`\>

##### Parameters

| Name      | Type                |
| :-------- | :------------------ |
| `...args` | `Parameters`<`Fn`\> |

##### Returns

[`Result`](README.md#result)<`ReturnType`<`Fn`\>, `E`\>

---

### <a id="groupby" name="groupby"></a> groupBy

▸ **groupBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`T`[]\>

Creates an object composed of keys generated from the results of running each element of collection through
iteratee. The corresponding value of each key is an array of the elements responsible for generating the
key. The iteratee is invoked with one argument: (value).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\> | The collection to iterate over.     |
| `iteratee?`  | `ValueIteratee`<`T`\>                 | The function invoked per iteration. |

#### Returns

`Dictionary`<`T`[]\>

Returns the composed aggregate object.

▸ **groupBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`T`[keyof `T`][]\>

**`See`**

\_.groupBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `collection` | `undefined` \| `null` \| `T`     |
| `iteratee?`  | `ValueIteratee`<`T`[keyof `T`]\> |

#### Returns

`Dictionary`<`T`[keyof `T`][]\>

---

### <a id="identity" name="identity"></a> identity

▸ **identity**<`T`\>(`value`): `T`

This method returns the first argument provided to it.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type | Description |
| :------ | :--- | :---------- |
| `value` | `T`  | Any value.  |

#### Returns

`T`

Returns value.

▸ **identity**(): `undefined`

**`See`**

\_.identity

#### Returns

`undefined`

---

### <a id="initial" name="initial"></a> initial

▸ **initial**<`T`\>(`arr`): `T`[]

ES Version of `lodash.initial`
Gets all but the last element of array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type  | Description         |
| :---- | :---- | :------------------ |
| `arr` | `T`[] | The array to query. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="intersection" name="intersection"></a> intersection

▸ **intersection**<`T`\>(...`arrays`): `T`[]

Creates an array of unique values that are included in all of the provided arrays using SameValueZero for
equality comparisons.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                      | Description            |
| :---------- | :---------------------------------------- | :--------------------- |
| `...arrays` | (`undefined` \| `null` \| `List`<`T`\>)[] | The arrays to inspect. |

#### Returns

`T`[]

Returns the new array of shared values.

---

### <a id="invokemap" name="invokemap"></a> invokeMap

▸ **invokeMap**(`collection`, `methodName`, ...`args`): `any`[]

Invokes the method named by methodName on each element in the collection returning
an array of the results of each invoked method. Additional arguments will be provided
to each invoked method. If methodName is a function it will be invoked for, and this
bound to, each element in the collection.

#### Parameters

| Name         | Type                              | Description                          |
| :----------- | :-------------------------------- | :----------------------------------- |
| `collection` | `undefined` \| `null` \| `object` | The collection to iterate over.      |
| `methodName` | `string`                          | The name of the method to invoke.    |
| `...args`    | `any`[]                           | Arguments to invoke the method with. |

#### Returns

`any`[]

▸ **invokeMap**<`TResult`\>(`collection`, `method`, ...`args`): `TResult`[]

**`See`**

\_.invokeMap

#### Type parameters

| Name      |
| :-------- |
| `TResult` |

#### Parameters

| Name         | Type                              |
| :----------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `object` |
| `method`     | (...`args`: `any`[]) => `TResult` |
| `...args`    | `any`[]                           |

#### Returns

`TResult`[]

---

### <a id="isarray" name="isarray"></a> isArray

▸ **isArray**(`value?`): value is any[]

Checks if value is classified as an Array object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is any[]

Returns true if value is correctly classified, else false.

▸ **isArray**<`T`\>(`value?`): value is any[]

**`See`**

\_.isArray

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `value?` | `any` |

#### Returns

value is any[]

---

### <a id="isblank" name="isblank"></a> isBlank

▸ **isBlank**(`value`): `boolean`

Checks if a given value is a empty like Ruby on Rails.

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

`boolean`

---

### <a id="isboolean" name="isboolean"></a> isBoolean

▸ **isBoolean**(`value?`): value is boolean

Checks if value is classified as a boolean primitive or object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is boolean

Returns true if value is correctly classified, else false.

---

### <a id="isbuffer" name="isbuffer"></a> isBuffer

▸ **isBuffer**(`value?`): `boolean`

Checks if value is a buffer.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

`boolean`

Returns true if value is a buffer, else false.

---

### <a id="isdate" name="isdate"></a> isDate

▸ **isDate**(`value?`): value is Date

Checks if value is classified as a Date object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is Date

Returns true if value is correctly classified, else false.

---

### <a id="isemail" name="isemail"></a> isEmail

▸ **isEmail**(`value`): `boolean`

Checks if a given value is a email

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`boolean`

true if the value is a email, false otherwise.

---

### <a id="isempty" name="isempty"></a> isEmpty

▸ **isEmpty**(`value?`): `boolean`

Checks if value is empty. A value is considered empty unless it’s an arguments object, array, string, or
jQuery-like collection with a length greater than 0 or an object with own enumerable properties.

#### Parameters

| Name     | Type  | Description           |
| :------- | :---- | :-------------------- |
| `value?` | `any` | The value to inspect. |

#### Returns

`boolean`

Returns true if value is empty, else false.

---

### <a id="iserror" name="iserror"></a> isError

▸ **isError**(`value`): value is Error

Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError
object.

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is Error

Returns true if value is an error object, else false.

---

### <a id="isfunction" name="isfunction"></a> isFunction

▸ **isFunction**(`value`): value is Function

Checks if value is a callable function.

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is Function

Returns true if value is correctly classified, else false.

---

### <a id="isnan" name="isnan"></a> isNaN

▸ **isNaN**(`value?`): `boolean`

Checks if value is NaN.

Note: This method is not the same as isNaN which returns true for undefined and other non-numeric values.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

`boolean`

Returns true if value is NaN, else false.

---

### <a id="isnonemptyarray" name="isnonemptyarray"></a> isNonEmptyArray

▸ **isNonEmptyArray**<`T`, `U`\>(`value`): value is T[]

Checks if a given value is non empty array.

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name    | Type         |
| :------ | :----------- |
| `value` | `U` \| `T`[] |

#### Returns

value is T[]

---

### <a id="isnonemptystring" name="isnonemptystring"></a> isNonEmptyString

▸ **isNonEmptyString**<`U`\>(`value`): value is string

Checks if a given value is a non empty string.

#### Type parameters

| Name |
| :--- |
| `U`  |

#### Parameters

| Name    | Type            |
| :------ | :-------------- |
| `value` | `string` \| `U` |

#### Returns

value is string

---

### <a id="isnull" name="isnull"></a> isNull

▸ **isNull**(`value`): value is null

Checks if value is null.

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is null

Returns true if value is null, else false.

---

### <a id="isnullorundefined" name="isnullorundefined"></a> isNullOrUndefined

▸ **isNullOrUndefined**(`value`): value is undefined \| null

Checks if a given value is a null or undefined.

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

value is undefined \| null

---

### <a id="isnumber" name="isnumber"></a> isNumber

▸ **isNumber**(`value`, `finiteness?`): value is number

Checks if a given value is a number.

#### Parameters

| Name         | Type      | Default value | Description                                      |
| :----------- | :-------- | :------------ | :----------------------------------------------- |
| `value`      | `unknown` | `undefined`   |                                                  |
| `finiteness` | `boolean` | `false`       | if true, checks if the value is a finite number. |

#### Returns

value is number

---

### <a id="isobject" name="isobject"></a> isObject

▸ **isObject**(`value?`): value is object

Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0),
and new String(''))

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is object

Returns true if value is an object, else false.

---

### <a id="isplainobject" name="isplainobject"></a> isPlainObject

▸ **isPlainObject**(`value?`): `boolean`

Checks if value is a plain object, that is, an object created by the Object constructor or one with a
Prototype of null.

Note: This method assumes objects created by the Object constructor have no inherited enumerable properties.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

`boolean`

Returns true if value is a plain object, else false.

---

### <a id="isregexp" name="isregexp"></a> isRegExp

▸ **isRegExp**(`value?`): value is RegExp

Checks if value is classified as a RegExp object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is RegExp

Returns true if value is correctly classified, else false.

---

### <a id="isset" name="isset"></a> isSet

▸ **isSet**(`value?`): value is Set<any\>

Checks if value is classified as a Set object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is Set<any\>

Returns true if value is correctly classified, else false.

---

### <a id="isstring" name="isstring"></a> isString

▸ **isString**(`value`): value is string

Checks if a given value is a string.

**`See`**

[https://bambielli.com/til/2017-06-18-typeof-vs-instanceof/](https://bambielli.com/til/2017-06-18-typeof-vs-instanceof/)

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

value is string

---

### <a id="isuuid" name="isuuid"></a> isUUID

▸ **isUUID**<`U`\>(`value`): value is string

Checks if a given value is a uuid.

#### Type parameters

| Name |
| :--- |
| `U`  |

#### Parameters

| Name    | Type            |
| :------ | :-------------- |
| `value` | `string` \| `U` |

#### Returns

value is string

---

### <a id="isurl" name="isurl"></a> isUrl

▸ **isUrl**(`value`, `schema?`): `boolean`

Checks if a given value is a url.

#### Parameters

| Name      | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `value`   | `string` |                                                                |
| `schema?` | `string` | if not null, checks if the uri is valid with the given schema. |

#### Returns

`boolean`

true if the value is a url, false otherwise.

---

### <a id="isweakmap" name="isweakmap"></a> isWeakMap

▸ **isWeakMap**(`value?`): value is WeakMap<object, any\>

Checks if value is classified as a WeakMap object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is WeakMap<object, any\>

Returns true if value is correctly classified, else false.

---

### <a id="isweakset" name="isweakset"></a> isWeakSet

▸ **isWeakSet**(`value?`): value is WeakSet<object\>

Checks if value is classified as a WeakSet object.

#### Parameters

| Name     | Type  | Description         |
| :------- | :---- | :------------------ |
| `value?` | `any` | The value to check. |

#### Returns

value is WeakSet<object\>

Returns true if value is correctly classified, else false.

---

### <a id="kebabcase" name="kebabcase"></a> kebabCase

▸ **kebabCase**(`string?`): `string`

Converts string to kebab case.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `string?` | `string` | The string to convert. |

#### Returns

`string`

Returns the kebab cased string.

---

### <a id="keyby" name="keyby"></a> keyBy

▸ **keyBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`T`\>

Creates an object composed of keys generated from the results of running each element of collection through
iteratee. The corresponding value of each key is the last element responsible for generating the key. The
iteratee function is invoked with one argument: (value).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                        | Description                         |
| :----------- | :------------------------------------------ | :---------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\>       | The collection to iterate over.     |
| `iteratee?`  | `ValueIterateeCustom`<`T`, `PropertyName`\> | The function invoked per iteration. |

#### Returns

`Dictionary`<`T`\>

Returns the composed aggregate object.

▸ **keyBy**<`T`\>(`collection`, `iteratee?`): `Dictionary`<`T`[keyof `T`]\>

**`See`**

\_.keyBy

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                                                   |
| :----------- | :----------------------------------------------------- |
| `collection` | `undefined` \| `null` \| `T`                           |
| `iteratee?`  | `ValueIterateeCustom`<`T`[keyof `T`], `PropertyName`\> |

#### Returns

`Dictionary`<`T`[keyof `T`]\>

---

### <a id="last" name="last"></a> last

▸ **last**<`T`\>(`array`): `undefined` \| `T`

Gets the last element of array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description         |
| :------ | :------------------------------------ | :------------------ |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to query. |

#### Returns

`undefined` \| `T`

Returns the last element of array.

---

### <a id="memoize" name="memoize"></a> memoize

▸ **memoize**<`Fn`\>(`fn`): `Moized`<`Fn`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\>

#### Type parameters

| Name | Type                |
| :--- | :------------------ |
| `Fn` | extends `Moizeable` |

#### Parameters

| Name | Type |
| :--- | :--- |
| `fn` | `Fn` |

#### Returns

`Moized`<`Fn`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\>

▸ **memoize**<`Fn`, `PassedOptions`\>(`fn`, `options`): `Moized`<`Fn`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> & `PassedOptions`\>

#### Type parameters

| Name            | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Fn`            | extends `Moizeable`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `PassedOptions` | extends `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> |

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `fn`      | `Fn`            |
| `options` | `PassedOptions` |

#### Returns

`Moized`<`Fn`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> & `PassedOptions`\>

▸ **memoize**<`Fn`\>(`fn`): `Moized`<`Fn`[``"fn"``], `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\>

#### Type parameters

| Name | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Fn` | extends `Moized`<`Moizeable`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\> |

#### Parameters

| Name | Type |
| :--- | :--- |
| `fn` | `Fn` |

#### Returns

`Moized`<`Fn`[``"fn"``], `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\>

▸ **memoize**<`Fn`, `PassedOptions`\>(`fn`, `options`): `Moized`<`Fn`[``"fn"``], `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> & `PassedOptions`\>

#### Type parameters

| Name            | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Fn`            | extends `Moized`<`Moizeable`, `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>\> |
| `PassedOptions` | extends `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\>                         |

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `fn`      | `Fn`            |
| `options` | `PassedOptions` |

#### Returns

`Moized`<`Fn`[``"fn"``], `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> & `PassedOptions`\>

▸ **memoize**<`PassedOptions`\>(`options`): `Moize`<`PassedOptions`\>

#### Type parameters

| Name            | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PassedOptions` | extends `Partial`<{ `isDeepEqual`: `boolean` ; `isPromise`: `boolean` ; `isReact`: `boolean` ; `isSerialized`: `boolean` ; `isShallowEqual`: `boolean` ; `matchesArg`: `IsEqual` ; `matchesKey`: `IsMatchingKey` ; `maxAge`: `number` ; `maxArgs`: `number` ; `maxSize`: `number` ; `onCacheAdd`: `OnCacheOperation` ; `onCacheChange`: `OnCacheOperation` ; `onCacheHit`: `OnCacheOperation` ; `onExpire`: `OnExpire` ; `profileName`: `string` ; `serializer`: `Serialize` ; `transformArgs`: `TransformKey` ; `updateCacheForKey`: `UpdateCacheForKey` ; `updateExpire`: `boolean` }\> |

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `options` | `PassedOptions` |

#### Returns

`Moize`<`PassedOptions`\>

---

### <a id="ms" name="ms"></a> ms

▸ **ms**(`value`, `options?`): `number`

Parse or format the given `val`.

**`Throws`**

Error if `value` is not a non-empty string or a number

#### Parameters

| Name       | Type          | Description                     |
| :--------- | :------------ | :------------------------------ |
| `value`    | `StringValue` | The string or number to convert |
| `options?` | `Options`     | Options for the conversion      |

#### Returns

`number`

▸ **ms**(`value`, `options?`): `string`

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `value`    | `number`  |
| `options?` | `Options` |

#### Returns

`string`

---

### <a id="noop" name="noop"></a> noop

▸ **noop**(...`args`): `void`

A no-operation function that returns undefined regardless of the arguments it receives.

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`void`

undefined

---

### <a id="nth" name="nth"></a> nth

▸ **nth**<`T`\>(`array`, `n?`): `undefined` \| `T`

Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description               |
| :------ | :------------------------------------ | :------------------------ |
| `array` | `undefined` \| `null` \| `List`<`T`\> | array The array to query. |
| `n?`    | `number`                              | -                         |

#### Returns

`undefined` \| `T`

Returns the nth element of `array`.

---

### <a id="ok" name="ok"></a> ok

▸ **ok**<`T`, `E`\>(`value`): [`Ok`](classes/Ok.md)<`T`, `E`\>

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `T`     |
| `E`  | `never` |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `T`  |

#### Returns

[`Ok`](classes/Ok.md)<`T`, `E`\>

---

### <a id="okasync" name="okasync"></a> okAsync

▸ **okAsync**<`T`, `E`\>(`value`): [`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `T`  | `T`     |
| `E`  | `never` |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `T`  |

#### Returns

[`ResultAsync`](classes/ResultAsync.md)<`T`, `E`\>

---

### <a id="once" name="once"></a> once

▸ **once**<`T`\>(`func`): `T`

Creates a function that is restricted to invoking func once. Repeat calls to the function return the value
of the first call. The func is invoked with the this binding and arguments of the created function.

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends (...`args`: `any`) => `any` |

#### Parameters

| Name   | Type | Description               |
| :----- | :--- | :------------------------ |
| `func` | `T`  | The function to restrict. |

#### Returns

`T`

Returns the new restricted function.

---

### <a id="over" name="over"></a> over

▸ **over**<`TResult`\>(...`iteratees`): (...`args`: `any`[]) => `TResult`[]

Creates a function that invokes iteratees with the arguments provided to the created function and returns
their results.

#### Type parameters

| Name      |
| :-------- |
| `TResult` |

#### Parameters

| Name           | Type                                         | Description              |
| :------------- | :------------------------------------------- | :----------------------- |
| `...iteratees` | `Many`<(...`args`: `any`[]) => `TResult`\>[] | The iteratees to invoke. |

#### Returns

`fn`

Returns the new function.

▸ (...`args`): `TResult`[]

Creates a function that invokes iteratees with the arguments provided to the created function and returns
their results.

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`TResult`[]

Returns the new function.

---

### <a id="overargs" name="overargs"></a> overArgs

▸ **overArgs**(`func`, ...`transforms`): (...`args`: `any`[]) => `any`

Creates a function that runs each argument through a corresponding transform function.

#### Parameters

| Name            | Type                                     | Description                                                                                     |
| :-------------- | :--------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `func`          | (...`args`: `any`[]) => `any`            | The function to wrap.                                                                           |
| `...transforms` | `Many`<(...`args`: `any`[]) => `any`\>[] | The functions to transform arguments, specified as individual functions or arrays of functions. |

#### Returns

`fn`

Returns the new function.

▸ (...`args`): `any`

Creates a function that runs each argument through a corresponding transform function.

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`any`

Returns the new function.

---

### <a id="overevery" name="overevery"></a> overEvery

▸ **overEvery**<`T`, `Result1`, `Result2`\>(...`predicates`): (`arg`: `T`) => arg is Result1 & Result2

Creates a function that checks if all of the predicates return truthy when invoked with the arguments
provided to the created function.

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `Result1` |
| `Result2` |

#### Parameters

| Name            | Type                                                             | Description              |
| :-------------- | :--------------------------------------------------------------- | :----------------------- |
| `...predicates` | [(`arg`: `T`) => arg is Result1, (`arg`: `T`) => arg is Result2] | The predicates to check. |

#### Returns

`fn`

Returns the new function.

▸ (`arg`): arg is Result1 & Result2

Creates a function that checks if all of the predicates return truthy when invoked with the arguments
provided to the created function.

##### Parameters

| Name  | Type |
| :---- | :--- |
| `arg` | `T`  |

##### Returns

arg is Result1 & Result2

Returns the new function.

▸ **overEvery**<`T`\>(...`predicates`): (...`args`: `T`[]) => `boolean`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `...predicates` | `Many`<(...`args`: `T`[]) => `boolean`\>[] |

#### Returns

`fn`

▸ (...`args`): `boolean`

##### Parameters

| Name      | Type  |
| :-------- | :---- |
| `...args` | `T`[] |

##### Returns

`boolean`

---

### <a id="oversome" name="oversome"></a> overSome

▸ **overSome**<`T`, `Result1`, `Result2`\>(...`predicates`): (`arg`: `T`) => arg is Result1 \| Result2

Creates a function that checks if any of the predicates return truthy when invoked with the arguments
provided to the created function.

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `Result1` |
| `Result2` |

#### Parameters

| Name            | Type                                                             | Description              |
| :-------------- | :--------------------------------------------------------------- | :----------------------- |
| `...predicates` | [(`arg`: `T`) => arg is Result1, (`arg`: `T`) => arg is Result2] | The predicates to check. |

#### Returns

`fn`

Returns the new function.

▸ (`arg`): arg is Result1 \| Result2

Creates a function that checks if any of the predicates return truthy when invoked with the arguments
provided to the created function.

##### Parameters

| Name  | Type |
| :---- | :--- |
| `arg` | `T`  |

##### Returns

arg is Result1 \| Result2

Returns the new function.

▸ **overSome**<`T`\>(...`predicates`): (...`args`: `T`[]) => `boolean`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `...predicates` | `Many`<(...`args`: `T`[]) => `boolean`\>[] |

#### Returns

`fn`

▸ (...`args`): `boolean`

##### Parameters

| Name      | Type  |
| :-------- | :---- |
| `...args` | `T`[] |

##### Returns

`boolean`

---

### <a id="pad" name="pad"></a> pad

▸ **pad**(`string?`, `length?`, `chars?`): `string`

Pads string on the left and right sides if it’s shorter than length. Padding characters are truncated if
they can’t be evenly divided by length.

#### Parameters

| Name      | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `string?` | `string` | The string to pad.          |
| `length?` | `number` | The padding length.         |
| `chars?`  | `string` | The string used as padding. |

#### Returns

`string`

Returns the padded string.

---

### <a id="padend" name="padend"></a> padEnd

▸ **padEnd**(`string?`, `length?`, `chars?`): `string`

Pads string on the right side if it’s shorter than length. Padding characters are truncated if they exceed
length.

#### Parameters

| Name      | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `string?` | `string` | The string to pad.          |
| `length?` | `number` | The padding length.         |
| `chars?`  | `string` | The string used as padding. |

#### Returns

`string`

Returns the padded string.

---

### <a id="padstart" name="padstart"></a> padStart

▸ **padStart**(`string?`, `length?`, `chars?`): `string`

Pads string on the left side if it’s shorter than length. Padding characters are truncated if they exceed
length.

#### Parameters

| Name      | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `string?` | `string` | The string to pad.          |
| `length?` | `number` | The padding length.         |
| `chars?`  | `string` | The string used as padding. |

#### Returns

`string`

Returns the padded string.

---

### <a id="partition" name="partition"></a> partition

▸ **partition**<`T`, `U`\>(`collection`, `callback`): [`U`[], `Exclude`<`T`, `U`\>[]]

Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for,
while the second of which contains elements predicate returns falsey for.
The predicate is invoked with three arguments: (value, index|key, collection).

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name         | Type                                  | Description                        |
| :----------- | :------------------------------------ | :--------------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\> | The collection to iterate over.    |
| `callback`   | `ValueIteratorTypeGuard`<`T`, `U`\>   | The function called per iteration. |

#### Returns

[`U`[], `Exclude`<`T`, `U`\>[]]

Returns the array of grouped elements.

▸ **partition**<`T`\>(`collection`, `callback`): [`T`[], `T`[]]

**`See`**

\_.partition

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  |
| :----------- | :------------------------------------ |
| `collection` | `undefined` \| `null` \| `List`<`T`\> |
| `callback`   | `ValueIteratee`<`T`\>                 |

#### Returns

[`T`[], `T`[]]

▸ **partition**<`T`\>(`collection`, `callback`): [`T`[keyof `T`][], `T`[keyof `T`][]]

**`See`**

\_.partition

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `collection` | `undefined` \| `null` \| `T`     |
| `callback`   | `ValueIteratee`<`T`[keyof `T`]\> |

#### Returns

[`T`[keyof `T`][], `T`[keyof `T`][]]

---

### <a id="pluralize" name="pluralize"></a> pluralize

▸ **pluralize**(`word`, `isKnownToBePlural?`): `string`

Pluralizes the provided input considering irregular words

#### Parameters

| Name                | Type      | Default value | Description                                                                            |
| :------------------ | :-------- | :------------ | :------------------------------------------------------------------------------------- |
| `word`              | `string`  | `undefined`   |                                                                                        |
| `isKnownToBePlural` | `boolean` | `true`        | Normally you call Pluralize on singular words; but if you're unsure call it with false |

#### Returns

`string`

the plural form of the word in the string

---

### <a id="prependurlscheme" name="prependurlscheme"></a> prependUrlScheme

▸ **prependUrlScheme**(`url`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

#### Returns

`string`

---

### <a id="pull" name="pull"></a> pull

▸ **pull**<`T`\>(`array`, ...`values`): `T`[]

Removes all provided values from array using SameValueZero for equality comparisons.

Note: Unlike \_.without, this method mutates array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type  | Description           |
| :---------- | :---- | :-------------------- |
| `array`     | `T`[] | The array to modify.  |
| `...values` | `T`[] | The values to remove. |

#### Returns

`T`[]

Returns array.

▸ **pull**<`T`\>(`array`, ...`values`): `List`<`T`\>

**`See`**

\_.pull

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `array`     | `List`<`T`\> |
| `...values` | `T`[]        |

#### Returns

`List`<`T`\>

---

### <a id="pullat" name="pullat"></a> pullAt

▸ **pullAt**<`T`\>(`array`, ...`indexes`): `T`[]

Removes elements from array corresponding to the given indexes and returns an array of the removed elements.
Indexes may be specified as an array of indexes or as individual arguments.

Note: Unlike \_.at, this method mutates array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                | Description                                                                              |
| :----------- | :------------------ | :--------------------------------------------------------------------------------------- |
| `array`      | `T`[]               | The array to modify.                                                                     |
| `...indexes` | `Many`<`number`\>[] | The indexes of elements to remove, specified as individual indexes or arrays of indexes. |

#### Returns

`T`[]

Returns the new array of removed elements.

▸ **pullAt**<`T`\>(`array`, ...`indexes`): `List`<`T`\>

**`See`**

\_.pullAt

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                |
| :----------- | :------------------ |
| `array`      | `List`<`T`\>        |
| `...indexes` | `Many`<`number`\>[] |

#### Returns

`List`<`T`\>

---

### <a id="range" name="range"></a> range

▸ **range**(`start`, `end?`, `step?`): `number`[]

Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.
If end is not specified it’s set to start with start then set to 0. If end is less than start a zero-length
range is created unless a negative step is specified.

#### Parameters

| Name    | Type     | Description                             |
| :------ | :------- | :-------------------------------------- |
| `start` | `number` | The start of the range.                 |
| `end?`  | `number` | The end of the range.                   |
| `step?` | `number` | The value to increment or decrement by. |

#### Returns

`number`[]

Returns a new range array.

▸ **range**(`end`, `index`, `guard`): `number`[]

**`See`**

\_.range

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `end`   | `number`             |
| `index` | `string` \| `number` |
| `guard` | `object`             |

#### Returns

`number`[]

---

### <a id="reject" name="reject"></a> reject

▸ **reject**<`T`\>(`arr`, `predicate`): `T`[]

ES Version of `lodash.reject`
The opposite of `filter`; this method returns the elements of collection that predicate does not return truthy for.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                                           | Description                         |
| :---------- | :------------------------------------------------------------- | :---------------------------------- |
| `arr`       | `T`[]                                                          | The array to iterate over.          |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `boolean` | The function invoked per iteration. |

#### Returns

`T`[]

Returns the new filtered array.

---

### <a id="remove" name="remove"></a> remove

▸ **remove**<`T`\>(`array`, `predicate?`): `T`[]

Removes all elements from array that predicate returns truthy for and returns an array of the removed
elements. The predicate is invoked with three arguments: (value, index, array).

Note: Unlike \_.filter, this method mutates array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                 | Description                         |
| :----------- | :------------------- | :---------------------------------- |
| `array`      | `List`<`T`\>         | The array to modify.                |
| `predicate?` | `ListIteratee`<`T`\> | The function invoked per iteration. |

#### Returns

`T`[]

Returns the new array of removed elements.

---

### <a id="safejsonparse" name="safejsonparse"></a> safeJsonParse

▸ **safeJsonParse**(...`args`): [`Result`](README.md#result)<`any`, `unknown`\>

Wraps a function with a try catch, creating a new function with the same
arguments but returning `Ok` if successful, `Err` if the function throws

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `...args` | [text: string, reviver?: Function] |

#### Returns

[`Result`](README.md#result)<`any`, `unknown`\>

---

### <a id="sample" name="sample"></a> sample

▸ **sample**<`T`\>(`collection`): `undefined` \| `T`

Gets a random element from collection.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                     | Description               |
| :----------- | :----------------------------------------------------------------------- | :------------------------ |
| `collection` | `undefined` \| `null` \| `Dictionary`<`T`\> \| `NumericDictionary`<`T`\> | The collection to sample. |

#### Returns

`undefined` \| `T`

Returns the random element.

▸ **sample**<`T`\>(`collection`): `undefined` \| `T`[keyof `T`]

**`See`**

\_.sample

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                         |
| :----------- | :--------------------------- |
| `collection` | `undefined` \| `null` \| `T` |

#### Returns

`undefined` \| `T`[keyof `T`]

---

### <a id="samplesize" name="samplesize"></a> sampleSize

▸ **sampleSize**<`T`\>(`collection`, `n?`): `T`[]

Gets n random elements at unique keys from collection up to the size of collection.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                     | Description                       |
| :----------- | :----------------------------------------------------------------------- | :-------------------------------- |
| `collection` | `undefined` \| `null` \| `Dictionary`<`T`\> \| `NumericDictionary`<`T`\> | The collection to sample.         |
| `n?`         | `number`                                                                 | The number of elements to sample. |

#### Returns

`T`[]

Returns the random elements.

▸ **sampleSize**<`T`\>(`collection`, `n?`): `T`[keyof `T`][]

**`See`**

\_.sampleSize

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                         |
| :----------- | :--------------------------- |
| `collection` | `undefined` \| `null` \| `T` |
| `n?`         | `number`                     |

#### Returns

`T`[keyof `T`][]

---

### <a id="set" name="set"></a> set

▸ **set**<`T`\>(`object`, `path`, `value`): `T`

Sets the value at path of object. If a portion of path doesn’t exist it’s created. Arrays are created for
missing index properties while objects are created for all other missing properties. Use \_.setWith to
customize path creation.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name     | Type           | Description                      |
| :------- | :------------- | :------------------------------- |
| `object` | `T`            | The object to modify.            |
| `path`   | `PropertyPath` | The path of the property to set. |
| `value`  | `any`          | The value to set.                |

#### Returns

`T`

Returns object.

▸ **set**<`TResult`\>(`object`, `path`, `value`): `TResult`

**`See`**

\_.set

#### Type parameters

| Name      |
| :-------- |
| `TResult` |

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `object` | `object`       |
| `path`   | `PropertyPath` |
| `value`  | `any`          |

#### Returns

`TResult`

---

### <a id="shuffle" name="shuffle"></a> shuffle

▸ **shuffle**<`T`\>(`collection`): `T`[]

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                |
| :----------- | :------------------------------------ | :------------------------- |
| `collection` | `undefined` \| `null` \| `List`<`T`\> | The collection to shuffle. |

#### Returns

`T`[]

Returns the new shuffled array.

▸ **shuffle**<`T`\>(`collection`): `T`[keyof `T`][]

**`See`**

\_.shuffle

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                         |
| :----------- | :--------------------------- |
| `collection` | `undefined` \| `null` \| `T` |

#### Returns

`T`[keyof `T`][]

---

### <a id="singularize" name="singularize"></a> singularize

▸ **singularize**(`word`, `isKnownToBePlural?`, `skipSimpleWords?`): `string`

Singularizes the provided input considering irregular words

#### Parameters

| Name                | Type      | Default value | Description                                                 |
| :------------------ | :-------- | :------------ | :---------------------------------------------------------- |
| `word`              | `string`  | `undefined`   |                                                             |
| `isKnownToBePlural` | `boolean` | `true`        | -                                                           |
| `skipSimpleWords`   | `boolean` | `false`       | Skip singularizing single words that have an 's' on the end |

#### Returns

`string`

the singular form of the word in the string

---

### <a id="size" name="size"></a> size

▸ **size**(`collection`): `number`

Gets the size of collection by returning its length for array-like values or the number of own enumerable
properties for objects.

#### Parameters

| Name         | Type                                          | Description                |
| :----------- | :-------------------------------------------- | :------------------------- |
| `collection` | `undefined` \| `null` \| `string` \| `object` | The collection to inspect. |

#### Returns

`number`

Returns the size of collection.

---

### <a id="slice" name="slice"></a> slice

▸ **slice**<`T`\>(`array`, `start?`, `end?`): `T`[]

Creates a slice of array from start up to, but not including, end.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                                  | Description         |
| :------- | :------------------------------------ | :------------------ |
| `array`  | `undefined` \| `null` \| `List`<`T`\> | The array to slice. |
| `start?` | `number`                              | The start position. |
| `end?`   | `number`                              | The end position.   |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="snakecase" name="snakecase"></a> snakeCase

▸ **snakeCase**(`string?`): `string`

Converts string to snake case.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `string?` | `string` | The string to convert. |

#### Returns

`string`

Returns the snake cased string.

---

### <a id="startcase" name="startcase"></a> startCase

▸ **startCase**(`string?`): `string`

Converts string to start case.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `string?` | `string` | The string to convert. |

#### Returns

`string`

Returns the start cased string.

---

### <a id="take" name="take"></a> take

▸ **take**<`T`\>(`array`, `n?`): `T`[]

Creates a slice of array with n elements taken from the beginning.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description                     |
| :------ | :------------------------------------ | :------------------------------ |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to query.             |
| `n?`    | `number`                              | The number of elements to take. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="takeright" name="takeright"></a> takeRight

▸ **takeRight**<`T`\>(`array`, `n?`): `T`[]

Creates a slice of array with n elements taken from the end.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                  | Description                     |
| :------ | :------------------------------------ | :------------------------------ |
| `array` | `undefined` \| `null` \| `List`<`T`\> | The array to query.             |
| `n?`    | `number`                              | The number of elements to take. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="takerightwhile" name="takerightwhile"></a> takeRightWhile

▸ **takeRightWhile**<`T`\>(`array`, `predicate?`): `T`[]

Creates a slice of array with elements taken from the end. Elements are taken until predicate returns
falsey. The predicate is invoked with three arguments: (value, index, array).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T`\> | The array to query.                 |
| `predicate?` | `ListIteratee`<`T`\>                  | The function invoked per iteration. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="takewhile" name="takewhile"></a> takeWhile

▸ **takeWhile**<`T`\>(`array`, `predicate?`): `T`[]

Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns
falsey. The predicate is invoked with three arguments: (value, index, array).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                  | Description                         |
| :----------- | :------------------------------------ | :---------------------------------- |
| `array`      | `undefined` \| `null` \| `List`<`T`\> | The array to query.                 |
| `predicate?` | `ListIteratee`<`T`\>                  | The function invoked per iteration. |

#### Returns

`T`[]

Returns the slice of array.

---

### <a id="throttle" name="throttle"></a> throttle

▸ **throttle**<`T`\>(`func`, `wait?`, `options?`): `DebouncedFunc`<`T`\>

Creates a throttled function that only invokes func at most once per every wait milliseconds. The throttled
function comes with a cancel method to cancel delayed invocations and a flush method to immediately invoke
them. Provide an options object to indicate that func should be invoked on the leading and/or trailing edge
of the wait timeout. Subsequent calls to the throttled function return the result of the last func call.

Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if
the the throttled function is invoked more than once during the wait timeout.

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends (...`args`: `any`) => `any` |

#### Parameters

| Name       | Type               | Description                                            |
| :--------- | :----------------- | :----------------------------------------------------- |
| `func`     | `T`                | The function to throttle.                              |
| `wait?`    | `number`           | The number of milliseconds to throttle invocations to. |
| `options?` | `ThrottleSettings` | The options object.                                    |

#### Returns

`DebouncedFunc`<`T`\>

Returns the new throttled function.

---

### <a id="times" name="times"></a> times

▸ **times**<`TResult`\>(`n`, `iteratee`): `TResult`[]

Invokes the iteratee function n times, returning an array of the results of each invocation. The iteratee
is invoked with one argument; (index).

#### Type parameters

| Name      |
| :-------- |
| `TResult` |

#### Parameters

| Name       | Type                           | Description                             |
| :--------- | :----------------------------- | :-------------------------------------- |
| `n`        | `number`                       | The number of times to invoke iteratee. |
| `iteratee` | (`num`: `number`) => `TResult` | The function invoked per iteration.     |

#### Returns

`TResult`[]

Returns the array of results.

▸ **times**(`n`): `number`[]

**`See`**

\_.times

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`number`[]

---

### <a id="trim" name="trim"></a> trim

▸ **trim**(`string?`, `chars?`): `string`

Removes leading and trailing whitespace or specified characters from string.

#### Parameters

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `string?` | `string` | The string to trim.     |
| `chars?`  | `string` | The characters to trim. |

#### Returns

`string`

Returns the trimmed string.

▸ **trim**(`string`, `index`, `guard`): `string`

**`See`**

\_.trim

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `string` | `string`             |
| `index`  | `string` \| `number` |
| `guard`  | `object`             |

#### Returns

`string`

---

### <a id="trimend" name="trimend"></a> trimEnd

▸ **trimEnd**(`string?`, `chars?`): `string`

Removes trailing whitespace or specified characters from string.

#### Parameters

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `string?` | `string` | The string to trim.     |
| `chars?`  | `string` | The characters to trim. |

#### Returns

`string`

Returns the trimmed string.

▸ **trimEnd**(`string`, `index`, `guard`): `string`

**`See`**

\_.trimEnd

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `string` | `string`             |
| `index`  | `string` \| `number` |
| `guard`  | `object`             |

#### Returns

`string`

---

### <a id="trimstart" name="trimstart"></a> trimStart

▸ **trimStart**(`string?`, `chars?`): `string`

Removes leading whitespace or specified characters from string.

#### Parameters

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `string?` | `string` | The string to trim.     |
| `chars?`  | `string` | The characters to trim. |

#### Returns

`string`

Returns the trimmed string.

▸ **trimStart**(`string`, `index`, `guard`): `string`

**`See`**

\_.trimStart

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `string` | `string`             |
| `index`  | `string` \| `number` |
| `guard`  | `object`             |

#### Returns

`string`

---

### <a id="union" name="union"></a> union

▸ **union**<`T`\>(...`arrays`): `T`[]

Creates an array of unique values, in order, from all of the provided arrays using SameValueZero for
equality comparisons.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                      | Description            |
| :---------- | :---------------------------------------- | :--------------------- |
| `...arrays` | (`undefined` \| `null` \| `List`<`T`\>)[] | The arrays to inspect. |

#### Returns

`T`[]

Returns the new array of combined values.

---

### <a id="unionby" name="unionby"></a> unionBy

▸ **unionBy**<`T`\>(`arrays`, `iteratee?`): `T`[]

This method is like `_.union` except that it accepts `iteratee` which is
invoked for each element of each `arrays` to generate the criterion by which
uniqueness is computed. The iteratee is invoked with one argument: (value).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description                       |
| :---------- | :------------------------------------ | :-------------------------------- |
| `arrays`    | `undefined` \| `null` \| `List`<`T`\> | The arrays to inspect.            |
| `iteratee?` | `ValueIteratee`<`T`\>                 | The iteratee invoked per element. |

#### Returns

`T`[]

Returns the new array of combined values.

▸ **unionBy**<`T`\>(`arrays1`, `arrays2`, `iteratee?`): `T`[]

**`See`**

\_.unionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `arrays1`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`   | `undefined` \| `null` \| `List`<`T`\> |
| `iteratee?` | `ValueIteratee`<`T`\>                 |

#### Returns

`T`[]

▸ **unionBy**<`T`\>(`arrays1`, `arrays2`, `arrays3`, `iteratee?`): `T`[]

**`See`**

\_.unionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `arrays1`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays3`   | `undefined` \| `null` \| `List`<`T`\> |
| `iteratee?` | `ValueIteratee`<`T`\>                 |

#### Returns

`T`[]

▸ **unionBy**<`T`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`, `iteratee?`): `T`[]

**`See`**

\_.unionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `arrays1`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays2`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays3`   | `undefined` \| `null` \| `List`<`T`\> |
| `arrays4`   | `undefined` \| `null` \| `List`<`T`\> |
| `iteratee?` | `ValueIteratee`<`T`\>                 |

#### Returns

`T`[]

▸ **unionBy**<`T`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`, `arrays5`, ...`iteratee`): `T`[]

**`See`**

\_.unionBy

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                                               |
| :------------ | :----------------------------------------------------------------- |
| `arrays1`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays2`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays3`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays4`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `arrays5`     | `undefined` \| `null` \| `List`<`T`\>                              |
| `...iteratee` | (`undefined` \| `null` \| `List`<`T`\> \| `ValueIteratee`<`T`\>)[] |

#### Returns

`T`[]

---

### <a id="uniq" name="uniq"></a> uniq

▸ **uniq**<`T`\>(`arr`): `T`[]

ES Version of `lodash.uniq`
Creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
The order of result values is determined by the order they occur in the array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type  | Description           |
| :---- | :---- | :-------------------- |
| `arr` | `T`[] | The array to inspect. |

#### Returns

`T`[]

Returns the new duplicate free array.

---

### <a id="unset" name="unset"></a> unset

▸ **unset**(`object`, `path`): `boolean`

Removes the property at path of object.

Note: This method mutates object.

#### Parameters

| Name     | Type           | Description                        |
| :------- | :------------- | :--------------------------------- |
| `object` | `any`          | The object to modify.              |
| `path`   | `PropertyPath` | The path of the property to unset. |

#### Returns

`boolean`

Returns true if the property is deleted, else false.

---

### <a id="unzip" name="unzip"></a> unzip

▸ **unzip**<`T`\>(`array`): `T`[][]

This method is like \_.zip except that it accepts an array of grouped elements and creates an array
regrouping the elements to their pre-zip configuration.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                                      | Description                               |
| :------ | :-------------------------------------------------------- | :---------------------------------------- |
| `array` | `undefined` \| `null` \| `T`[][] \| `List`<`List`<`T`\>\> | The array of grouped elements to process. |

#### Returns

`T`[][]

Returns the new array of regrouped elements.

---

### <a id="unzipwith" name="unzipwith"></a> unzipWith

▸ **unzipWith**<`T`, `TResult`\>(`array`, `iteratee`): `TResult`[]

This method is like \_.unzip except that it accepts an iteratee to specify how regrouped values should be
combined. The iteratee is invoked with four arguments: (accumulator, value, index, group).

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name       | Type                                           | Description                               |
| :--------- | :--------------------------------------------- | :---------------------------------------- |
| `array`    | `undefined` \| `null` \| `List`<`List`<`T`\>\> | The array of grouped elements to process. |
| `iteratee` | (...`values`: `T`[]) => `TResult`              | The function to combine regrouped values. |

#### Returns

`TResult`[]

Returns the new array of regrouped elements.

▸ **unzipWith**<`T`\>(`array`): `T`[][]

**`See`**

\_.unzipWith

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                           |
| :------ | :--------------------------------------------- |
| `array` | `undefined` \| `null` \| `List`<`List`<`T`\>\> |

#### Returns

`T`[][]

---

### <a id="upperfirst" name="upperfirst"></a> upperFirst

▸ **upperFirst**(`string?`): `string`

Converts the first character of `string` to upper case.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `string?` | `string` | The string to convert. |

#### Returns

`string`

Returns the converted string.

---

### <a id="uuid" name="uuid"></a> uuid

▸ **uuid**(): `string`

#### Returns

`string`

---

### <a id="without" name="without"></a> without

▸ **without**<`T`\>(`array`, ...`values`): `T`[]

Creates an array excluding all provided values using SameValueZero for equality comparisons.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                  | Description            |
| :---------- | :------------------------------------ | :--------------------- |
| `array`     | `undefined` \| `null` \| `List`<`T`\> | The array to filter.   |
| `...values` | `T`[]                                 | The values to exclude. |

#### Returns

`T`[]

Returns the new array of filtered values.

---

### <a id="wrap" name="wrap"></a> wrap

▸ **wrap**<`T`, `TArgs`, `TResult`\>(`value`, `wrapper`): (...`args`: `TArgs`[]) => `TResult`

Creates a function that provides value to the wrapper function as its first argument. Any additional
arguments provided to the function are appended to those provided to the wrapper function. The wrapper is
invoked with the this binding of the created function.

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TArgs`   |
| `TResult` |

#### Parameters

| Name      | Type                                              | Description           |
| :-------- | :------------------------------------------------ | :-------------------- |
| `value`   | `T`                                               | The value to wrap.    |
| `wrapper` | (`value`: `T`, ...`args`: `TArgs`[]) => `TResult` | The wrapper function. |

#### Returns

`fn`

Returns the new function.

▸ (...`args`): `TResult`

Creates a function that provides value to the wrapper function as its first argument. Any additional
arguments provided to the function are appended to those provided to the wrapper function. The wrapper is
invoked with the this binding of the created function.

##### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `...args` | `TArgs`[] |

##### Returns

`TResult`

Returns the new function.

---

### <a id="xor" name="xor"></a> xor

▸ **xor**<`T`\>(...`arrays`): `T`[]

Creates an array of unique values that is the symmetric difference of the provided arrays.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                      | Description            |
| :---------- | :---------------------------------------- | :--------------------- |
| `...arrays` | (`undefined` \| `null` \| `List`<`T`\>)[] | The arrays to inspect. |

#### Returns

`T`[]

Returns the new array of values.

---

### <a id="zip" name="zip"></a> zip

▸ **zip**<`T1`, `T2`\>(`arrays1`, `arrays2`): [`undefined` \| `T1`, `undefined` \| `T2`][]

Creates an array of grouped elements, the first of which contains the first elements of the given arrays,
the second of which contains the second elements of the given arrays, and so on.

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `arrays1` | `List`<`T1`\> |
| `arrays2` | `List`<`T2`\> |

#### Returns

[`undefined` \| `T1`, `undefined` \| `T2`][]

Returns the new array of grouped elements.

▸ **zip**<`T1`, `T2`, `T3`\>(`arrays1`, `arrays2`, `arrays3`): [`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`][]

**`See`**

\_.zip

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `arrays1` | `List`<`T1`\> |
| `arrays2` | `List`<`T2`\> |
| `arrays3` | `List`<`T3`\> |

#### Returns

[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`][]

▸ **zip**<`T1`, `T2`, `T3`, `T4`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`): [`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`][]

**`See`**

\_.zip

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `arrays1` | `List`<`T1`\> |
| `arrays2` | `List`<`T2`\> |
| `arrays3` | `List`<`T3`\> |
| `arrays4` | `List`<`T4`\> |

#### Returns

[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`][]

▸ **zip**<`T1`, `T2`, `T3`, `T4`, `T5`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`, `arrays5`): [`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`, `undefined` \| `T5`][]

**`See`**

\_.zip

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `arrays1` | `List`<`T1`\> |
| `arrays2` | `List`<`T2`\> |
| `arrays3` | `List`<`T3`\> |
| `arrays4` | `List`<`T4`\> |
| `arrays5` | `List`<`T5`\> |

#### Returns

[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`, `undefined` \| `T5`][]

▸ **zip**<`T`\>(...`arrays`): (`undefined` \| `T`)[][]

**`See`**

\_.zip

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `...arrays` | (`undefined` \| `null` \| `List`<`T`\>)[] |

#### Returns

(`undefined` \| `T`)[][]

---

### <a id="zipobject" name="zipobject"></a> zipObject

▸ **zipObject**<`T`\>(`props`, `values`): `Dictionary`<`T`\>

This method is like \_.fromPairs except that it accepts two arrays, one of property
identifiers and one of corresponding values.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                    | Description          |
| :------- | :---------------------- | :------------------- |
| `props`  | `List`<`PropertyName`\> | The property names.  |
| `values` | `List`<`T`\>            | The property values. |

#### Returns

`Dictionary`<`T`\>

Returns the new object.

▸ **zipObject**(`props?`): `Dictionary`<`undefined`\>

**`See`**

\_.zipObject

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `props?` | `List`<`PropertyName`\> |

#### Returns

`Dictionary`<`undefined`\>

---

### <a id="zipobjectdeep" name="zipobjectdeep"></a> zipObjectDeep

▸ **zipObjectDeep**(`paths?`, `values?`): `object`

This method is like \_.zipObject except that it supports property paths.

#### Parameters

| Name      | Type                    | Description          |
| :-------- | :---------------------- | :------------------- |
| `paths?`  | `List`<`PropertyPath`\> | The property names.  |
| `values?` | `List`<`any`\>          | The property values. |

#### Returns

`object`

Returns the new object.

---

### <a id="zipwith" name="zipwith"></a> zipWith

▸ **zipWith**<`T`, `TResult`\>(`arrays`, `iteratee`): `TResult`[]

This method is like \_.zip except that it accepts an iteratee to specify how grouped values should be
combined. The iteratee is invoked with four arguments: (accumulator, value, index,
group).

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name       | Type                         | Description                             |
| :--------- | :--------------------------- | :-------------------------------------- |
| `arrays`   | `List`<`T`\>                 | The arrays to process.                  |
| `iteratee` | (`value1`: `T`) => `TResult` | The function to combine grouped values. |

#### Returns

`TResult`[]

Returns the new array of grouped elements.

▸ **zipWith**<`T1`, `T2`, `TResult`\>(`arrays1`, `arrays2`, `iteratee`): `TResult`[]

**`See`**

\_.zipWith

#### Type parameters

| Name      |
| :-------- |
| `T1`      |
| `T2`      |
| `TResult` |

#### Parameters

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `arrays1`  | `List`<`T1`\>                                 |
| `arrays2`  | `List`<`T2`\>                                 |
| `iteratee` | (`value1`: `T1`, `value2`: `T2`) => `TResult` |

#### Returns

`TResult`[]

▸ **zipWith**<`T1`, `T2`, `T3`, `TResult`\>(`arrays1`, `arrays2`, `arrays3`, `iteratee`): `TResult`[]

**`See`**

\_.zipWith

#### Type parameters

| Name      |
| :-------- |
| `T1`      |
| `T2`      |
| `T3`      |
| `TResult` |

#### Parameters

| Name       | Type                                                          |
| :--------- | :------------------------------------------------------------ |
| `arrays1`  | `List`<`T1`\>                                                 |
| `arrays2`  | `List`<`T2`\>                                                 |
| `arrays3`  | `List`<`T3`\>                                                 |
| `iteratee` | (`value1`: `T1`, `value2`: `T2`, `value3`: `T3`) => `TResult` |

#### Returns

`TResult`[]

▸ **zipWith**<`T1`, `T2`, `T3`, `T4`, `TResult`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`, `iteratee`): `TResult`[]

**`See`**

\_.zipWith

#### Type parameters

| Name      |
| :-------- |
| `T1`      |
| `T2`      |
| `T3`      |
| `T4`      |
| `TResult` |

#### Parameters

| Name       | Type                                                                          |
| :--------- | :---------------------------------------------------------------------------- |
| `arrays1`  | `List`<`T1`\>                                                                 |
| `arrays2`  | `List`<`T2`\>                                                                 |
| `arrays3`  | `List`<`T3`\>                                                                 |
| `arrays4`  | `List`<`T4`\>                                                                 |
| `iteratee` | (`value1`: `T1`, `value2`: `T2`, `value3`: `T3`, `value4`: `T4`) => `TResult` |

#### Returns

`TResult`[]

▸ **zipWith**<`T1`, `T2`, `T3`, `T4`, `T5`, `TResult`\>(`arrays1`, `arrays2`, `arrays3`, `arrays4`, `arrays5`, `iteratee`): `TResult`[]

**`See`**

\_.zipWith

#### Type parameters

| Name      |
| :-------- |
| `T1`      |
| `T2`      |
| `T3`      |
| `T4`      |
| `T5`      |
| `TResult` |

#### Parameters

| Name       | Type                                                                                          |
| :--------- | :-------------------------------------------------------------------------------------------- |
| `arrays1`  | `List`<`T1`\>                                                                                 |
| `arrays2`  | `List`<`T2`\>                                                                                 |
| `arrays3`  | `List`<`T3`\>                                                                                 |
| `arrays4`  | `List`<`T4`\>                                                                                 |
| `arrays5`  | `List`<`T5`\>                                                                                 |
| `iteratee` | (`value1`: `T1`, `value2`: `T2`, `value3`: `T3`, `value4`: `T4`, `value5`: `T5`) => `TResult` |

#### Returns

`TResult`[]

▸ **zipWith**<`T`, `TResult`\>(...`iteratee`): `TResult`[]

**`See`**

\_.zipWith

#### Type parameters

| Name      |
| :-------- |
| `T`       |
| `TResult` |

#### Parameters

| Name          | Type                                                                          |
| :------------ | :---------------------------------------------------------------------------- |
| `...iteratee` | (`undefined` \| `null` \| (...`group`: `T`[]) => `TResult` \| `List`<`T`\>)[] |

#### Returns

`TResult`[]

## Util

### <a id="rangeright" name="rangeright"></a> rangeRight

▸ **rangeRight**(`start`, `end?`, `step?`): `number`[]

This method is like `_.range` except that it populates values in
descending order.

**`Example`**

```ts
_.rangeRight(4)
// => [3, 2, 1, 0]

_.rangeRight(-4)
// => [-3, -2, -1, 0]

_.rangeRight(1, 5)
// => [4, 3, 2, 1]

_.rangeRight(0, 20, 5)
// => [15, 10, 5, 0]

_.rangeRight(0, -4, -1)
// => [-3, -2, -1, 0]

_.rangeRight(1, 4, 0)
// => [1, 1, 1]

_.rangeRight(0)
// => []
```

#### Parameters

| Name    | Type     | Description                             |
| :------ | :------- | :-------------------------------------- |
| `start` | `number` | The start of the range.                 |
| `end?`  | `number` | The end of the range.                   |
| `step?` | `number` | The value to increment or decrement by. |

#### Returns

`number`[]

Returns the new array of numbers.

▸ **rangeRight**(`end`, `index`, `guard`): `number`[]

**`See`**

\_.rangeRight

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `end`   | `number`             |
| `index` | `string` \| `number` |
| `guard` | `object`             |

#### Returns

`number`[]
