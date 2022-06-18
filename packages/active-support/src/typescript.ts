/**
 * make all properties optional recursively.
 *
 * @source
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * pick all required properties from an object.
 *
 * @source
 */
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]

/**
 * Prepend tuple.
 *
 * @example
 * ```typescript
 * const const: Cons<1, [2, 3, 4]> = [1, 2, 3, 4]
 * ```
 *
 * @source
 */
export type Cons<H, T extends readonly any[]> = ((h: H, ...t: T) => void) extends (...r: infer R) => void ? R : never

/**
 * Prepend Parameter.
 *
 * @example
 * ```typescript
 * type F = (x: number) => boolean
 * type F2 = PrependParameter<string, F> // type F2 = (s: string, x: number) => boolean
 * ```
 *
 * @source
 */
export type PrependParameter<Param, F extends (...args: any[]) => any> = (
  ...args: Extract<Cons<Param, Parameters<F>>, readonly any[]>
) => ReturnType<F>

/**
 * Fixed length tuple.
 *
 * @example
 * ```typescript
 * const x: FixedLengthTuple<number, 3> = [1, 2, 3]
 * ```
 *
 * @source
 */
export type FixedLengthTuple<T, N extends number, R extends readonly T[] = []> = R['length'] extends N
  ? R
  : FixedLengthTuple<T, N, readonly [T, ...R]>

/**
 * Make some field required
 *
 * @source
 */
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Repeat string
 *
 * @example
 * ```typescript
 * const x: Repeat<'1' | '2', 4> = '1122'
 * ```
 *
 * @source
 */
export type Repeat<
  Char extends string,
  Count extends number,
  Joined extends string = ``,
  Acc extends Array<0> = []
> = Acc['length'] extends Count ? Joined : Repeat<Char, Count, `${Joined}${Char}`, [0, ...Acc]>
