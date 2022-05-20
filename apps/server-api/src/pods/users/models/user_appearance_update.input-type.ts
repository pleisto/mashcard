import { Field, InputType } from '@nestjs/graphql'
import { type LocaleTagType } from '../../../core/locales'
import { type TimezoneType } from '../../../core/timezones'

@InputType({ description: 'User appearance update input' })
export class UserAppearanceUpdateInput {
  @Field(() => String, { description: 'locale' })
  locale: LocaleTagType

  @Field(() => String, { description: 'timezone' })
  timezone: TimezoneType
}
