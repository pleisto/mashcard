# @mashcard/active-support

A TypeScript utility library designed to optimize for programmer happiness.

> NOTES: If you want to add a new methods, make sure it will be used on both the client and the server side.
> Any methods that will only used in a browser or NodeJS environment should not be added here.

## Features

### Alternative to `lodash`

You could directly use `@mashcard/active-support` instead of `lodash` and `lodash-es`.

```ts
import { differenceBy, zip, isString } from '@mashcard/active-support'
```

If some of the methods in lodash do not exist in `@mashcard/active-support`, it is because
the are natively supported in modern ECMAScript. see [YOU MIGHT NOT NEED LODASH](https://youmightnotneed.com/lodash/) for more information.

### Unit Converter

#### Millisecond conversion

```ts
import { ms } from '@mashcard/active-support';
ms('2 days') // 172800000
ms('2.5 h') // 9000000
ms('-3 days) // -259200000
ms('-200') // -200
ms(60000) // '1m'
ms(ms('10 hours)) // '10h'
ms(6000, { long: true }) // '1 minute'
ms(2*6000, { long: true }) // '2 minutes'
```

see [vercel/ms](https://github.com/vercel/ms#readme) for more information.

#### ByteSize conversion

```ts
import { byteSize } from '@mashcard/active-support'
byteSize('3 mb') // 24_000_000
byteSize('2 Gigabytes') // 16_000_000_000
byteSize(32_000_000) // '4 MB'
```

> NOTICE:
>
> We use base 10 instead of base 2 for bit.
> See [IEC 60027-2 A.2 and ISO/IEC 80000](https://en.wikipedia.org/wiki/Binary_prefix#IEC_prefixes) for more information.

### Type Checking Utilities

You could use most of the type checking utilities in lodash directly, such as `isString`, `isEmpty` and `isBuffer`.
In addition we support methods such as `isUUID` nad `isBlack`. See `src/isType.ts` for more information.

#### isBlack

`isBlack` method could be used to check if any value is empty or undefined/null, just as it does in [Ruby on Rails](https://guides.rubyonrails.org/active_support_core_extensions.html#blank-questionmark-and-present-questionmark).

### Inflections

```ts
import { pluralize, singularize } from '@mashcard/active-support'

pluralize('word') // 'words'
pluralize('datum') // 'data'
singularize('quizzes') // 'quiz'
singularize('news') // 'news'
singularize('are') // 'is'
```

### Rust style error handling

```ts
import { ok, err } from '@mashcard/active-support'

// something awesome happend

const yesss = ok(someAesomeValue)

// moments later ...

const mappedYes = yesss.map(doingSuperUsefulStuff)

// neverthrow uses type-guards to differentiate between Ok and Err instances
// Mode info: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
if (mappedYes.isOk()) {
  // using type guards, we can access an Ok instance's `value` field
  doStuffWith(mappedYes.value)
} else {
  // because of type guards
  // typescript knows that mappedYes is an Err instance and thus has a `error` field
  doStuffWith(mappedYes.error)
}
```

See [neverthrow](https://github.com/supermacro/neverthrow/wiki) for more information.

### Utilities

#### array2Tree

Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`).

Se [Performant array to tree](https://github.com/philipstanislaus/performant-array-to-tree) for more information.
