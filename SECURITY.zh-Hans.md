# Brickdoc 安全政策

Brickdoc 十分重视产品和在线服务的安全性，如果您发现了任何与我们相关的安全漏洞请参考下述流程向我们报告。

## 处于支持周期中的版本

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.x     | :white_check_mark: |

## 白帽子赏金计划

根据您报告的漏洞的严重程度，我们可能酌情给予 **50 - 1000 美元**不等的奖励。考虑到跨境支付的复杂性，如果 Brickdoc 公司在您所居住的国家或地区没有银行帐号，那么我们可能将以亚马逊礼品卡或其他储值卡形式发放奖励。

### 我们如何定义漏洞的严重程度

Brickdoc 保留对报告调查结果的严重性做出最终决定的权利。收到调查结果后，我们将进行内部调查，并通过考虑多种因素来确定调查结果的严重性，这些因素包括但不限于：

* [CVSS 评分](https://blog.csdn.net/u012063507/article/details/72081820)
* 受影响的用户或数据的数量
* 漏洞的利用难度
* 其他具体细节

虽然我们尽量保持奖励的一致性，但我们的计划也在不断发展，奖励可能会随着时间的推移而发生相应的变化。

## 报告安全漏洞

**请千万不要直接以 Github Issue 的形式发布安全漏洞**

您可以直接向我们的邮箱  `secure@brickdoc.com` 发送漏洞报告，如果方便的话尽量使用下方的 PGP 公钥[加密你的邮件正文](https://sspai.com/post/35592) 。

```base64
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=cPtA
-----END PGP PUBLIC KEY BLOCK-----
```

一般而言，你会在36小时内收到我们的回复。如果问题得到确认，我们会根据问题的复杂程度尽快发布补丁。

方便的话， 请在下面列出所要求的信息（尽可能多地提供），以帮助我们更好地了解可能问题的性质和范围：

* 问题类型（如缓冲区溢出、SQL 注入、跨站脚本等）
* 与问题的表现形式有关的源文件的完整路径
* 受影响的源代码的位置（tag /分支/ commit hash）
* 重现该问题所需的任何特殊配置
* 重现问题的步骤说明
* Proof-of-concept 示例代码 or exploit code (如果有的话)
* 问题的影响范围，包括攻击者可能会如何利用该问题。

这些信息将帮助我们更快地对您的报告进行分类处理。

## 工作语言

您可以使用汉语或英语与我们进行邮件沟通。


## Comments on this Policy

如果您对于我们的安全政策有任何建议，欢迎直接在 Github 创建1个 Issue 。
