import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { GENERAL_TAB_SELECTOR } from './generalTab.selector'

export class GeneralTabPage extends CommonPage {
  readonly titles = this.get('titles')
  readonly nameInput = this.get('nameInput')
  readonly bioInput = this.get('bioInput')
  readonly updateProfileButton = this.get('updateProfileButton')
  readonly avatar = this.get('avatarImg')
  readonly editAvatarButton = this.get('editAvatar')
  readonly dialogTab = this.get('dialogTab')
  readonly uploadAvatarButton = this.get('uploadAvatarButton')
  readonly domainInput = this.get('domainInput')
  readonly updateDomainButton = this.get('updateDomainButton')
  readonly learnMore = this.get('learnMore')
  readonly timezone = this.get('timezone')
  readonly language = this.get('language')
  readonly saveButton = this.get('saveButton')

  get(selector: keyof typeof GENERAL_TAB_SELECTOR): Locator {
    return this.locator(GENERAL_TAB_SELECTOR[selector])
  }

  async updateProfileName(name: string): Promise<void> {
    await this.nameInput.fill(name)
    await this.waitForResponseWithAction('createOrUpdatePod', this.updateProfileButton.click())
  }

  async updateProfileBio(bio: string): Promise<void> {
    await this.bioInput.fill(bio)
    await this.updateProfileButton.click()
  }

  async updateDomainName(name: string): Promise<void> {
    await this.domainInput.fill(name)
    await this.updateDomainButton.click()
  }

  async domainLearnMore(): Promise<void> {
    await this.learnMore.click()
  }

  async openUploadAvatarDialog(): Promise<void> {
    await this.editAvatarButton.click()
  }

  async updateAvatar(path: string): Promise<void> {
    await this.openUploadAvatarDialog()
    await this.waitForResponseWithAction('createDirectUpload', this.uploadAvatarButton.setInputFiles(path))
  }

  async updateTimezone(timezone: string): Promise<void> {
    await this.timezone.click()
    await this.listItems.locator(`text=${timezone}`).scrollIntoViewIfNeeded()
    await this.listItems.locator(`text=${timezone}`).click()
    await this.waitForResponseWithAction('UserAppearanceUpdate', this.saveButton.click())
  }

  async updateLanguage(language: string): Promise<void> {
    await this.language.click()
    await this.listItems.locator(`text=${language}`).click()
    await this.waitForResponseWithAction('UserAppearanceUpdate', this.saveButton.click())
  }
}
