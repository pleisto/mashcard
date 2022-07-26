import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { GENERAL_TAB_SELECTOR } from './generalTab.selector'

export class GeneralTabPage extends CommonPage {
  getGeneralTabTitle(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.title)
  }

  getProfileNameInput(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.nameInput)
  }

  getProfileBioInput(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.bioInput)
  }

  getProfileUpdateButton(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.updateButton)
  }

  getAvatar(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.avatar.avatarImg)
  }

  getEditAvatarButton(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.avatar.editAvatar)
  }

  getUploadDashboard(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.avatar.dialogTab)
  }

  getUploadAvatarButton(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.profile.avatar.uploadButton)
  }

  getDomainInput(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.domain.input)
  }

  getDomainUpdateButton(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.domain.updateButton)
  }

  getDomainLearnMore(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.domain.learnMore)
  }

  getTimezoneInput(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.display.timezone)
  }

  getLanguageInput(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.display.language)
  }

  getDisplaySaveButton(): Locator {
    return this.page.locator(GENERAL_TAB_SELECTOR.display.saveButton)
  }

  async updateProfileName(name: string): Promise<void> {
    await this.getProfileNameInput().fill(name)
    await this.waitForResponseWithAction('createOrUpdatePod', this.getProfileUpdateButton().click())
  }

  async updateProfileBio(bio: string): Promise<void> {
    await this.getProfileBioInput().fill(bio)
    await this.getProfileUpdateButton().click()
  }

  async updateDomainName(name: string): Promise<void> {
    await this.getDomainInput().fill(name)
    await this.getDomainUpdateButton().click()
  }

  async domainLearnMore(): Promise<void> {
    await this.getDomainLearnMore().click()
  }

  async openUploadAvatarDialog(): Promise<void> {
    await this.getEditAvatarButton().click()
  }

  async updateAvatar(path: string): Promise<void> {
    await this.openUploadAvatarDialog()
    await this.waitForResponseWithAction('createDirectUpload', this.getUploadAvatarButton().setInputFiles(path))
  }

  async updateTimezone(timezone: string): Promise<void> {
    await this.getTimezoneInput().click()
    await this.getListItemByName(timezone).scrollIntoViewIfNeeded()
    await this.getListItemByName(timezone).click()
    await this.waitForResponseWithAction('UserAppearanceUpdate', this.getDisplaySaveButton().click())
  }

  async updateLanguage(language: string): Promise<void> {
    await this.getLanguageInput().click()
    await this.getListItemByName(language).click()
    await this.waitForResponseWithAction('UserAppearanceUpdate', this.getDisplaySaveButton().click())
  }
}
