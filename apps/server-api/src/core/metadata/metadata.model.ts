import { Field, ObjectType } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Locale, supportLocales } from '../locales'
import { supportedTimezones } from '../timezones'

@Injectable()
@ObjectType({ description: 'Brickdoc Server Instance Metadata' })
export class Metadata {
  @Field(type => GraphQLJSONObject, {
    description: 'Some settings are exposed to the client.',
    nullable: true
  })
  public exposedSettings: { [key: string]: unknown }

  @Field(type => [String], {
    description: 'Supported IANA timezones'
  })
  public supportedTimezones: string[]

  @Field(type => [Locale], {
    description: 'Supported locales'
  })
  public supportedLocales: Locale[]

  constructor() {
    this.supportedTimezones = supportedTimezones
    this.supportedLocales = supportLocales
  }
}
