# Brickdoc

[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![crowdin](https://badges.crowdin.net/brickdoc/localized.svg)](https://crowdin.com/project/brickdoc)
[![linting](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml)
[![CI](https://github.com/brickdoc/brickdoc/actions/workflows/ci.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/ci.yml)
[![E2E Testing](https://github.com/brickdoc/brickdoc/actions/workflows/e2e.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/e2e.yml)
[![codecov](https://codecov.io/gh/brickdoc/brickdoc/branch/master/graph/badge.svg?token=BE6RWP2F9E)](https://codecov.io/gh/brickdoc/brickdoc)

Brickdoc is an open-source human intellect application and collaboration platform to Break the boundary between documents, spreadsheets, and software.

## Demo

You can request a free trial on our SaaS platform [here](https://brickdoc.com/).

## Installation

The only official way to install Brickdoc is to use [Docker](https://www.docker.io/). And we recommend to use [Helm](https://helm.sh/docs/intro/quickstart/) for installing Brickdoc on Kubernetes.

```bash
helm install ${release-name} ./tools/helm-charts/brickdoc --set-some-variable=some-value
```

Instructions on how to set up the environment for development are available [here](./docs/SETUP_DEV_ENV.md).

## Contributing

Brickdoc is an open source project and we are very happy to accept community contributions. To contribute to Brickdoc, you have to agree with the Brickdoc Contributor License Agreement.Please refer to [Contributing Documentation](CONTRIBUTING.md) for more details.

## Copyright/License

Copyright 2022 Brickdoc, Inc.

Licensed under the [GNU General Public License Version 3.0 (or later) **with a “Classpath Exception” making it safe for commercial use**](./LICENSE); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

<https://www.gnu.org/licenses/>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Linking this library statically or dynamically with other modules is making a combined work based on this library. Thus, the terms and conditions of the GNU General Public License cover the whole combination.

As a special exception, the copyright holders of this library give you permission to link this library with independent modules to produce an executable, regardless of the license terms of these independent modules, and to copy and distribute the resulting executable under terms of your choice, provided that you also meet, for each linked independent module, the terms and conditions of the license of that module. An independent module is a module which is not derived from or based on this library. If you modify this library, you may extend this exception to your version of the library, but you are not obligated to do so. If you do not wish to do so, delete this exception statement from your version.
