# Brickdoc Rust native extension

We use Rust FFI as a backend for the backend, to provide some features to the server.

## Methods

### `/ext/core_ext`

Core extension it's the Brickdoc Server component responsible for providing Ruby language extensions, like `ActiveSupport::CoreExt`.

#### String

```ruby
'📙'.to_ascii #=> ":orange_book:"
```

### `/ext/utils`

#### Encoding

```ruby
Encoding = Brickdoc::Utils::Encoding

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
