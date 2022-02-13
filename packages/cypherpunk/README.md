# @brickdoc/cypherpunk

> Anyone, from the most clueless amateur to the best cryptographer, can create an algorithm that he himself can’t break. It’s not even hard. What is hard is creating an algorithm that no one else can break, even after years of analysis. And the only way to prove that is to subject the algorithm to years of analysis by the best cryptographers around.
>
> Schneier's Law

An omakase-style high-level wrapper for modern crypto libraries for NodeJS.

## Get Started

```bash
yarn add @brickdoc/cypherpunk
```

**See [TSDoc](src/index.ts) for more information.**

## Algorithm Details

### Generic Hashing

The generic hashing function set is implemented using [Blake3](https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf) that is as strong as `SHA-3` but faster then `BLAKE2b` and `MD5`.

### Password Hashing

The password hashing function set is implemented using [Argon2id](https://www.password-hashing.net/argon2-specs.pdf) to comply with the [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

### Authenticated Encryption with Additional Data

The symmetric-key encryption function set is implemented using [IETF XChaCha20-Poly1305](https://datatracker.ietf.org/doc/html/draft-arciszewski-xchacha-03) to avoid the [nonce collision problem](https://www.cryptologie.net/article/402/is-symmetric-security-solved)
that exists with `AES-GCM-SIV`. And, `XChaCha20-Poly1305` has a wider safety margin than `AES-GCM`

## License

Apache-2.0
