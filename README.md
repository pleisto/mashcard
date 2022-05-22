# Brickdoc

[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![crowdin](https://badges.crowdin.net/brickdoc/localized.svg)](https://crowdin.com/project/brickdoc)

> :warning: **Note:** This software is currently under active development. Some features may be available in the future, and the API and interface may change.

Brickdoc is an all-in-one workspace and low-code platform with Compound Document at its core. It's not only an open source alternative to Coda and Notion,
but also a web3-ready [linked-data](https://www.w3.org/standards/semanticweb/data) storage for improving the productivity of your life and work.

![Brickdoc Screenshot](https://pub.us-edge.brickdocusercontent.com/corp/github-growthing/screenshot.png)

## Highlights

- **Renaissance of the [mashup](<https://en.wikipedia.org/wiki/Mashup_(web_application_hybrid)>)** - Brickdoc can connect data from multiple sources; it provides not only human-and-human collaboration, but also human-and-machine collaboration.
- **Use web3 in the present, not wait for the future** - Brickdoc progressively embraces the web3 ecosystem. You can import any web2.0 data that supports open API into Brickdoc and then provide it to DApp for use.
- **First-class formula and spreadsheet support** - Most similar software is built on an airtable-like database metaphor. Still, Brickdoc thinks a spreadsheet is a choice that best fits the citizen developer's mental model.
- **Plugin architecture** - Brickdoc is built on a plugin architecture like WordPress, and it provides a way to extend Brickdoc's functionality freely.

## Demo

> Early access to Brickdoc.com will be available soon.

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

> TLDR; Brickdoc Application uses GPL3 with "Classpath Exception", other packages in this monorepo are licensed as listed in the "License" file in their folder (most are Apache-2.0).

### Brickdoc Application

Copyright 2022 Brickdoc, Inc.

Brickdoc Software Licensed under the [GNU General Public License Version 3.0 (or later) **with a “Classpath Exception” making it safe for commercial use**](./LICENSE); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

<https://www.gnu.org/licenses/>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Linking this library statically or dynamically with other modules is making a combined work based on this library. Thus, the terms and conditions of the GNU General Public License cover the whole combination.

As a special exception, the copyright holders of this library give you permission to link this library with independent modules to produce an executable, regardless of the license terms of these independent modules, and to copy and distribute the resulting executable under terms of your choice, provided that you also meet, for each linked independent module, the terms and conditions of the license of that module. An independent module is a module which is not derived from or based on this library. If you modify this library, you may extend this exception to your version of the library, but you are not obligated to do so. If you do not wish to do so, delete this exception statement from your version.

### Other packages in thi Monorepo

- All content residing under the "docs/" directory of this repository is licensed under "Creative Commons: CC BY-SA 4.0 license".
- All third party components incorporated into the Brickdoc Software are licensed under the original license provided by the owner of the applicable component.
- All content that resides under the "packages/_", "gems/_" or "plugins/\*" directory of this repository, if that directory exists, is licensed under the license defined in "/LICENSE" in the corresponding directory.
