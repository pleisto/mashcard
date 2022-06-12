# Brickdoc Security Policy

Brickdoc takes the security of our software products and services seriously. If you believe you have found a security vulnerability in any Brickdoc-owned repository, please report it to us as described below.

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.x     | :white_check_mark: |


## Bug Bounty Program

If your vulnerability report affects our product or service, you may receive a bounty award according to the program descriptions.

Bounties generally range from **50-1,000 USD** depending on the severity of the bug. Due to the complexity of cross-border payments, if Brickdoc LTD does not have a bank account in the country or region where you live, we may use an Amazon Gift Card or other stored-value cards instead of a cash reward.

### How severity is determined

Brickdoc reserves the right to make a final decision regarding the severity of a reported finding. Upon receipt of the finding, we will conduct an internal investigation and determine the severity of the finding by considering multiple factors including but not limited to:

* Common Vulnerability Scoring System
* The quantity of affected users and data
* The difficulty in exploiting
* Other, if any, mitigating factors or exploit scenario requirements

While we try to be as consistent as possible with rewards, our program is also evolving, and rewards may change accordingly to how our program becomes with time.



## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them to   `secure@brickdoc.com` to report any security vulnerabilities.If possible, encrypt your message with our PGP key;

```base64
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=cPtA
-----END PGP PUBLIC KEY BLOCK-----
```

You should receive a response within 36 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English or Chinese.

## Comments on this Policy

If you have suggestions on how this process could be improved please submit a pull request.
