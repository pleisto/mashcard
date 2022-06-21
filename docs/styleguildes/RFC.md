# RFC based workflow

## Problem

The MashCard team is composed of full-time members @ Ningbo and some full/part-time remote members located around the world. It's not always easy to efficiently discuss our product/tech designing ideas across our members.

MashCard is planned to be open-sourced later this year. But our internal docs hosted @ Feishu cannot be easily shared outside considering permission difficulties. Besides, they are written only in Chinese which violates our ambitions to reach the world. We need to find a better way to communicate our designing ideas with the OSS community.

## Goals

- Build a better async communication mechanism that fits better with our "onsite/remote mixed" organization.
- Expose our designing ideas as sharable documents, from the early stage of the MashCard product. These documents can be shared with the OSS community later without worrying about permission issues.
- Write all our important future documents in English.

## Solution

Inspired by [how IETF uses RFC to communicate with the world](https://en.wikipedia.org/wiki/Request_for_Comments), we want to adopt a similar simplified RFC-document based workflow.

### RFC-document based workflow

When developers start a new feature, they must create a GitHub discussion thread under [mashcard/rfcs](https://github.com/mashcard/rfcs/discussions) following [the RFC template](https://raw.githubusercontent.com/mashcard/rfcs/master/0000-template.md). Other team members may later leave feedbacks & suggestions in the discussion thread. The author must pick a 4-digit sequence number as the RFC number, which must not conflict with other existing RFCs.

Once the designing ideas are finalized, we must mark the corresponding RFC as `Finalized` and lock the discussion conversation. The finalized RFC must be submitted into the [mashcard/rfcs](https://github.com/mashcard/rfcs) repo via a pull request.

Finalized RFCs don't accept new edits anymore (but minor changes like typo/link fixes are allowed). If we later want to improve an existing finalized RFC, we should create another RFC instead of modifying the original one.

When finalizing RFCs, any meaningful questions & answers should be noted in the `# Questions` section.

If the designing ideas are dropped, we must mark the corresponding RFC as `Abandoned`. Abandoned RFCs still accept new feedbacks, but the author may not invest in the abandoned RFC anymore. We may convert abandoned RFCs back into the `Draft` state, once we find it still valuable and have time to achieve that.

If a new RFC invalidates some of the existing RFCs, we must mark the existing RFCs as `Retired` and add a link to the new RFC.

All PRs that implement an RFC must reference a link to the GitHub discussion thread in the PR description.

### Keywords used in RFCs

We follow the same keyword definitions as described in [IETF RFC2119](https://datatracker.ietf.org/doc/html/rfc2119), which include the following keywords:

- MUST
- MUST NOT
- REQUIRED
- SHALL
- SHALL NOT
- SHOULD
- SHOULD NOT
- RECOMMENDED
- MAY
- OPTIONAL

### Diagrams

- If a business object has more than 4 states, MUST use a [State Diagram](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/about-state-diagrams/) to represent and specify the trigger conditions for each state change.
- If more than 4 models are added to a requirement and there are dependencies, REQUIRED use [Entity Relationship Diagram](https://www.visual-paradigm.com/guide/data-modeling/what-is-entity-relationship-diagram/) to clarify the relationships between classes.
- [User case Diagram](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/) and [Timing Diagram](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-timing-diagram/) are RECOMMENDED to be used as needed.

## Questions

- How can non-native english speakers participate in the RFC discussion?
  - [Grammarly](https://grammarly.com/) / [LanguageTool](https://languagetool.org/) / [DeepL](https://deepl.com/) can make it easier for ESL(English as a Second Language) developers to use American English as a standard written language.
- Is this a big burden for our development process? We may consume a lot of time on documentation works.
  - Asynchronous communication is very important for remote teams, and documentation is a good way to communicate asynchronously, so it should be worthwhile to spend some time on documentation.
  - To make life easier, we temporarily allow to create a Slack channel for each RFC. But we must leave any important details in English in the GitHub discussion threads.
