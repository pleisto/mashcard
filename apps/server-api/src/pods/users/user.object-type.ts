import { Field, ObjectType } from '@nestjs/graphql'
import { Pod } from '../pod.interface-type'

@ObjectType({
  description: "A user is an individual's account on Brickdoc that owns spaces and can make new content.",
  implements: () => [Pod]
})
export class User {
  // implements from PodInterfaceType
  id: number
  slug: string
  name: string
  bio: string | null
  createdAt: number
  updatedAt: number
  avatarUrl: string | null

  @Field({ description: 'User is initialized' })
  isInitialized: boolean

  @Field(type => Date, { description: 'User locked at', nullable: true })
  lockedAt: number | null
}
