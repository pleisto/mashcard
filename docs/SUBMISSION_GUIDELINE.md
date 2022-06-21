# Submission Guideline

## Preparation for Commits

- Write tests
- Run all linting with auto fixing: `yarn lint:fix`
- Make sure the tests pass: `yarn spec`

## Committing

> This repo demonstrates git hooks integration with [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog).

### Git Message Scope

- If the change is related to `packages/*` then the scope is the name of the package,
- And, if the change is related to a functional module with a namespace (e.g. :accounts, :admin) then the scope is namespace,
- Else the scope name is empty.

---

- **Use `yarn commit` and not `git commit`**
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- Push to your fork and [Submit a pull request](https://github.com/mashcard/mashcard/compare/)
- Wait for us. We try to at least comment on pull requests within one business day.
- We may suggest changes.
- Please, squash your commits to a single one if you introduced a new changes or pushed more than
  one commit. Let's keep the history clean.

## Revert commits

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.

The content of the commit message body should contain:

- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.

## Legal Stuff: Sign the Contributor License Agreement

> Apologies in advance for the extra work required here - this is necessary to comply with the Pleisto's strict open source IP policy.

Before we can use your code, you must sign the [Pleisto Open Source Contributor License Agreement (CLA)](https://cla-assistant.io/brickdoc/brickdoc), which you can do online.
The CLA is necessary mainly because you own the copyright to your changes, even after your contribution becomes part of our codebase, so we need your permission to use and distribute your code.

It can be signed now, or right after raising a Pull Request (Credits to CLA-Assistant for their cool, automated CLA form, integrated into the pull request)
