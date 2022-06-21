# MashCard Rust native extension

We use Rust FFI as a backend for the backend, to provide some features to the server.

## Methods

### `/ext/core_ext`

Core extension it's the MashCard Server component responsible for providing Ruby language extensions, like `ActiveSupport::CoreExt`.

#### String

```ruby
'📙'.to_ascii #=> ":orange_book:"
" ".blank? #=> true (fasted implementation for active_support blank?)
```

### `/ext/utils`

#### Encoding

```ruby
Encoding = Mashcard::Utils::Encoding

# Bitcoin Style Base58 Encoder
Encoding::Base58.encode("UTF-8 or Binary String") # or `Base58.decode("")`

# Faster Base64 Encoder. Same API as Ruby stdlib's Base64
Encoding::Base64.strict_encode64("UTF-8 or Binary String") # or `Base64.strict_decode64("")`
Encoding::Base64.urlsafe_encode64("UTF-8 or Binary String", padding: false) # or `Base64.urlsafe_decode64("")`

# Z85 Encoder.
Encoding::Z85.encode("UTF-8 or Binary String") # or `Z85.decode("")`

# UUID Generator and shortener
Encoding::UUID.gen_v4 #=> "f5a9e8e0-c8e0-4b1e-b9c6-a8d9c8b9c8b9"
Encoding::UUID.gen_short #=> "5ojXZhRTLRqnVkcV7DTTZh"
Encoding::UUID.shorten("f5a9e8e0-c8e0-4b1e-b9c6-a8d9c8b9c8b9") #=> "XLTy1sbhMFGQCKjPzpftsz"
Encoding::UUID.expand("XLTy1sbhMFGQCKjPzpftsz") #=> "f5a9e8e0-c8e0-4b1e-b9c6-a8d9c8b9c8b9"
```

#### Crypto

##### Low-level API

```ruby
Crypto = Mashcard::Utils::Crypto

# Present block cipher for integer encryption
# see http://www.lightweightcrypto.org/present/present_ches2007.pdf
Crypto::Present.encrypt(1, '32-bytes-length-key') #=> "BuyBBTuhp2u"
Crypto::Present.decrypt('BuyBBTuhp2u', '32-bytes-length-key') #=> 1

# Hash algorithm for password hashing
Crypto::Argon2id.hash_password('foo') # => "$argon2id$v=19$m=15000,t=2,p=1$WqvMPDFcwwomakXcPg8rVA$XhU1StkYIE/eqVjageswJDsPTLLKZoyVQMu0qC/2LA0"
Crypto::Argon2id.verify_password("$argon2id$v=19$m=15000,t=2,p=1$WqvMPDFcwwomakXcPg8rVA$XhU1StkYIE/eqVjageswJDsPTLLKZoyVQMu0qC/2LA0", 'foo') # => true

# Hash algorithm for non-password hashing
Crypto::Blake3.hash('data') #=> ....
Crypto::Blake3.salted_hash('data', '32-bytes-length-salt') #=> ...
Crypto::Blake3.generate_key() #=> Generate a 32-bytes key
Crypto::Blake3.derive_key('32-bytes-root-key', 1, 'context') #=> Derive a 32-bytes key from a root key. 1 is sub-key id.
```

#### Application-level API

```ruby
# Obfuscating sequential IDs based on application secret
Mashcard::Crypto.int_id_obfuscate(1) #=> "BuyBBTuhp2u"
Mashcard::Crypto.int_id_deobfuscate("BuyBBTuhp2u") #=> 1

# Generic hashing
Mashcard::Crypto.generic_hash('data') #=> ....
Mashcard::Crypto.generic_hash('data', 'any-length-salt') #=> ....
Mashcard::Crypto.derive_key(:hash_salt) #=> Derive a 32-bytes key from a root key
Mashcard::Crypto.derive_key(:hash_salt, 'userId=1') #=> Derive a 32-bytes key from a root key with context
Mashcard::Crypto.data_masking('some data') #=> Data masked with hash
```

#### UserAgent

```ruby
Mashcard::Utils::UserAgent.parser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36') #=> {name: foo, category: bar, version: 1.0, ...}
```

#### JSONSchema

JSONSchema Draft 7 validator. It also supports fetch schema from a Internet.

```ruby
Mashcard::Utils::JSONSchema.new(...schema).validate!(...json_str) #=> throws an exception if invalid
Mashcard::Utils::JSONSchema.new(...schema).valid?(...json_str) #=> Boolean
```

#### MJML

MJML is a markup language designed to reduce the pain of coding a responsive email.
See [MJML Guides](https://documentation.mjml.io/) for more details.

```ruby
template = '<mjml><mj-body>foo</mj-body></mjml>'
result = Mashcard::Utils::MJML.new template
result.title
result.preview
result.html
```

#### Pod

##### to_username

Generate a username from a given display name. Returns a array of `[preferred_username, alternative_username, unique_username]`. When creating a new user could try in sequence until a first available username is found.

```ruby
Mashcard::Utils::Pod.to_username "Öpik Oort" # => ["opikoort", "opikoort-558um2", "3dy7jij6z0fvgh3m1anlw26qw"]
```
