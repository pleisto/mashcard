import { UserModule } from '@brickdoc/server-api/src/pods/users'
import { AuthModule, UserSession } from '@brickdoc/server-api/src/pods/auth'
import { DynamicModule, Module } from '@nestjs/common'
import { GoogleAuthConfigMap } from './google-auth.config-map'
import { GoogleAuthController } from './google-auth.controller'
import { GoogleAuthStrategy } from './google-auth.strategy'
import { SettingsModule } from '@brickdoc/server-api/src/common/settings'

import { Session } from '@brickdoc/server-api/src/core/session/session.class'

declare module 'fastify' {
  interface FastifyRequest {
    session: Session
    user: UserSession
  }
}
@Module({
  imports: [UserModule, AuthModule, SettingsModule]
})
export class GoogleAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: GoogleAuthModule,
      controllers: [GoogleAuthController],
      providers: [GoogleAuthConfigMap, GoogleAuthStrategy]
    }
  }
}
