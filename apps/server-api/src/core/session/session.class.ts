import { CookieSerializeOptions } from '@fastify/cookie'
import { SessionData, kCookieOptions, kObj } from './session.interface'

export class Session {
  changed: boolean
  deleted: boolean;
  [kCookieOptions]: CookieSerializeOptions | null;
  [kObj]: Partial<SessionData>;
  [key: string]: any

  constructor(obj: Partial<SessionData>) {
    this[kObj] = obj
    this[kCookieOptions] = null
    this.changed = false
    this.deleted = false
  }

  get<Key extends keyof SessionData>(key: Key): SessionData[Key] | undefined {
    return this[kObj][key]
  }

  set<Key extends keyof SessionData>(key: Key, value: SessionData[Key] | undefined): void {
    this.changed = true
    this[kObj][key] = value
  }

  del<Key extends keyof SessionData>(key: Key): void {
    this.changed = true
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this[kObj][key]
  }

  delete(): void {
    this.changed = true
    this.deleted = true
  }

  options(opts: CookieSerializeOptions): void {
    this[kCookieOptions] = opts
  }

  data(): SessionData | undefined {
    const { changed, deleted, ...data } = this[kObj]
    return data
  }
}
