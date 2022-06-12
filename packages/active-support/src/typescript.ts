/**
 * make all properties optional recursively.
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * pick all required properties from an object.
 */
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]

/**
 * Prepend tuple.
 *
 * type Cons<1, [2, 3, 4]> // [1, 2, 3, 4]
 */
export type Cons<H, T extends readonly any[]> = ((h: H, ...t: T) => void) extends (...r: infer R) => void ? R : never

/**
 * Prepend Parameter.
 *
 * type F = (x: number) => boolean
 * type F2 = PrependParameter<string, F> // type F2 = (s: string, x: number) => boolean
 */
export type PrependParameter<Param, F extends (...args: any[]) => any> = (
  ...args: Extract<Cons<Param, Parameters<F>>, readonly any[]>
) => ReturnType<F>

/**
 * Fixed length tuple.
 *
 * const x: FixedLengthTuple<number, 3> = [1, 2, 3]
 */
export type FixedLengthTuple<T, N extends number, R extends readonly T[] = []> = R['length'] extends N
  ? R
  : FixedLengthTuple<T, N, readonly [T, ...R]>

/**
 * Make some field required
 */
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Repeat string
 *
 * const x: Repeat<'1' | '2', 4> = '1122'
 */
export type Repeat<
  Char extends string,
  Count extends number,
  Joined extends string = ``,
  Acc extends Array<0> = []
> = Acc['length'] extends Count ? Joined : Repeat<Char, Count, `${Joined}${Char}`, [0, ...Acc]>
