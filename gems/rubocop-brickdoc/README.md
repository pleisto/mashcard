# Brickdoc Rubocop

This gem provides rubocop configuration for use on Brickdoc open source and internal Ruby projects.

## How to use

### Gemfile

```ruby
gem "rubocop-brickdoc", require: false
```

### .rubocop.yml

```yaml
inherit_gem:
  rubocop-brickdoc:
    - rubocop.yml
```
