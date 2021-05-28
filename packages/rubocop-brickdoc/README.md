# RuboCop Brickdoc

This repository provides recommended RuboCop configuration and additional Cops for use on Brickdoc's open source
and internal Ruby projects. Based on [Shopify Ruby Style Guide](https://github.com/Shopify/ruby-style-guide).

## Usage

We offer a default RuboCop configuration you can inherit from and be in sync with this Style Guide.
To use it, you can add this to your `Gemfile`:

```ruby
gem 'rubocop-brickdoc', require: false
```

And add to the top of your project's RuboCop configuration file:

```yaml
inherit_gem:
  rubocop-brickdoc: rubocop.yml
```

For more information about inheriting configuration from a gem
please check [RuboCop's documentation](https://docs.rubocop.org/).
