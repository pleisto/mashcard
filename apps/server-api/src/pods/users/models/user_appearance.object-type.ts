import { Field, ObjectType } from '@nestjs/graphql'
import { type LocaleTagType } from '../../../core/locales'
import { type TimezoneType } from '../../../core/timezones'

@ObjectType({ description: 'User appearance object' })
export class UserAppearance {
  @Field(() => String, { description: 'locale' })
  locale: LocaleTagType

  @Field(() => String, { description: 'timezone' })
  timezone: TimezoneType
}
