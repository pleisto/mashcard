import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { User, UserCredentialInput, UserService } from '@brickdoc/server-api/src/pods/users'
import { withNamespace } from './google-auth.utils'

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(settingsService: SettingsService, private readonly userService: UserService) {
    const googleClientId = settingsService.getLocalSync<string>(withNamespace('googleClientId'))
    const googleClientSecret = settingsService.getLocalSync<string>(withNamespace('googleClientSecret'))
    const appUrl = settingsService.getLocalSync<string>('core.appUrl')
    if (googleClientId.isErr()) throw googleClientId.error
    if (googleClientSecret.isErr()) throw googleClientSecret.error
    if (appUrl.isErr()) throw appUrl.error

    super({
      clientID: googleClientId.value!,
      clientSecret: googleClientSecret.value!,
      callbackURL: `${appUrl.value!}/accounts/auth/google_oauth2/callback`,
      scope: ['email', 'profile']
    })
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<User> {
    // console.log('validate', { profile, _accessToken, _refreshToken })
    const userCredentials: UserCredentialInput = {
      meta: profile,
      provider: profile.provider,
      subject: profile.id,
      name: profile.displayName,
      bio: null,
      locale: profile._json.locale ?? null,
      avatarUrl: profile._json.picture ?? null
    }

    const result = await this.userService.findOrCreateUser(userCredentials)
    if (result.isErr()) throw result.error

    return result.value
  }
}
