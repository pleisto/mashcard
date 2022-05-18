import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'User Model' })
export class User {
  /**
   * Masked id
   */
  @Directive('@idSlug')
  @Field(type => ID, { description: 'User ID' })
  id: number

  @Field({ description: 'User slug' })
  slug: string

  @Field({ description: 'User is initialized' })
  isInitialized: boolean

  @Field({ description: 'User name' })
  name: string

  @Field(type => String, { description: 'User bio', nullable: true })
  bio: string | null

  @Field(type => String, { description: 'User avatar URL', nullable: true })
  avatarUrl: string | null

  @Field(type => Date, { description: 'User locked at', nullable: true })
  lockedAt: number | null

  @Field(type => Date, { description: 'User created at' })
  createdAt: number

  @Field(type => Date, { description: 'User updated at' })
  updatedAt: number
}
