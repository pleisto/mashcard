# Ruby core extensions

It's the Brickdoc Server component responsible for providing Ruby language extensions.

## Methods

### String

```ruby
'📙'.to_ascii #=> ":orange_book:"
'a'.blank? #=> False (It's equivalent to `ActiveSupport::CoreExt::is_blank?` but fast)
```
