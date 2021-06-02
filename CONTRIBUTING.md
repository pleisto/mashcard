# Contribute to Brickdoc Community Edition

> #### **Did you find a bug?**
>
> * **Do not open up a GitHub issue if the bug is a security vulnerability in Brickdoc**, and instead to refer to our [security policy](SECURITY.md).
>
> * **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/brickdoc/brickdoc/issues).
>
> * If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/brickdoc/brickdoc/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.


Welcome and thank you for your interest in contributing to Brickdoc Community Edition. Brickdoc is developed in the open and continually improved by our users, contributors, and maintainers. It is because of you that we can bring great software to the community.

This guide provides information on filing issues and guidelines for open source contributors. Please leave comments/suggestions if you find something is missing or incorrect.

> _P.S._ In addition to Open Source Development, there are also Documentation, Translation, and UX Design tracks. Documentation, Translation, and UX Design are all just as important as code.


## Legal Stuff: Sign the Contributor License Agreement

> Apologies in advance for the extra work required here - this is necessary to comply with the Brickdoc's strict open source IP policy.

Before we can use your code, you must sign the [Brickdoc Open Source Contributor License Agreement (CLA)](https://cla-assistant.io/brickdoc/brickdoc), which you can do online. 
The CLA is necessary mainly because you own the copyright to your changes, even after your contribution becomes part of our codebase, so we need your permission to use and distribute your code.

**It can be signed now, or right after raising a Pull Request (Credits to CLA-Assistant for their cool, automated CLA form, integrated into the pull request)**

## Workflow
> Brickdoc Uses this [GitHub flow](https://guides.github.com/introduction/flow/) model.

### Setup Development Environment

> If you want to install Ruby and NodeJS development environment in macOS, please refer to: https://github.com/brickdoc/macos-init/blob/master/init.sh

```bash
git clone git@github.com:brickdoc/brickdoc.git && cd brickdoc/
# Install dependencies
yarn install && bundle install
# Configure
cp .env.local.template .evn.local && vim .env.local
# Setup Database
rake db:setup
# Start Development Server
./bin/webpack-dev-server && \
rails s -b 0.0.0.0
```

### Preparation for Commits

* Write tests
* Run all linting with auto fixing: `yarn lint:fix`
* Make sure the tests pass: `yarn spec`

### Committing

> This repo demonstrates git hooks integration with [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog).

#### Git Message Scope

* If the change is related to `packages/*` then the scope is the name of the package, 
* And, if the change is related to a functional module with a namespace (e.g. :accounts, :admin) then the scope is namespace, 
* Else the scope name is empty.
---
* **use `yarn commit` and not `git commit`**
* Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
* Push to your fork and [Submit a pull request](https://github.com/brickdoc/brickdoc/compare/)
* Wait for us. We try to at least comment on pull requests within one business day.
* We may suggest changes.
* Please, squash your commits to a single one if you introduced a new changes or pushed more than
  one commit. Let's keep the history clean.

Thank you for your contribution! :handshake:
