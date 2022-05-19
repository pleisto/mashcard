import { Field, InterfaceType } from '@nestjs/graphql'
import { HashedID, URL } from '../common/scalars'

@InterfaceType({
  description:
    'In Brickdoc, Pod is an abstract table used to represent tenants, which can be either users or spaces. A data pod is a place for storing documents, with mechanisms for controlling who can access what.'
})
export abstract class Pod {
  @Field(type => HashedID, { description: 'Hashed Unique ID' })
  id: number

  @Field({ description: 'Slug is a unique name to identify the object, but users could customize it' })
  slug: string

  @Field({ description: 'Display Name' })
  name: string

  @Field(type => String, { description: 'BIO', nullable: true })
  bio: string | null

  @Field(type => URL, { description: 'Avatar URL', nullable: true })
  avatarUrl: string | null

  @Field(type => Date, { description: 'Identifies the date and time when the object was created.' })
  createdAt: number

  @Field(type => Date, { description: 'Identifies the date and time when the object was last updated.' })
  updatedAt: number
}
