import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from '../../common/config/application'
import { Locale, supportLocales } from '../locales'
import * as tzdata from 'tzdata'

registerEnumType(AppEnv, {
  name: 'AppEnv',
  description: 'Available application environments'
})

const supportedTimezones = Object.keys(tzdata.zones).filter(
  tz =>
    // only contains standard timezones
    tz === 'Etc/UTC' || tz.match(/^(Africa|America|Antarctica|Asia|Atlantic|Australia|Europe|Indian|Pacific)\/.*/)
)

@Injectable()
@ObjectType({ description: 'Brickdoc Server Instance Metadata' })
export class Metadata {
  @Field({
    description: 'The current application environment'
  })
  public appEnv: AppEnv

  @Field(type => [String], {
    description: 'Supported IANA timezones'
  })
  public supportedTimezones: string[]

  @Field(type => [Locale], {
    description: 'Supported locales'
  })
  public supportedLocales: Locale[]

  constructor(private readonly configService: ConfigService) {
    this.appEnv = this.configService.get('application.env')!
    this.supportedTimezones = supportedTimezones
    this.supportedLocales = supportLocales
  }
}
