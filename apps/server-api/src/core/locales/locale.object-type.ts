import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Locale' })
export class Locale {
  @Field({ description: 'Locale tag' })
  tag: string

  @Field({ description: 'English name of Language' })
  language: string

  @Field({ description: "Locale language's description of local" })
  describe: string
}
