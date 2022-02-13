import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from '../../common/config/application'

registerEnumType(AppEnv, {
  name: 'AppEnv',
  description: 'Available application environments'
})

@Injectable()
@ObjectType({ description: 'Brickdoc Server Instance Metadata' })
export class Metadata {
  @Field({
    description: 'The current application environment'
  })
  public appEnv: AppEnv

  constructor(private readonly configService: ConfigService) {
    this.appEnv = this.configService.get('application.env')!
  }
}
