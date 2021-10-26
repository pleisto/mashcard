# frozen_string_literal: true

# Load CE libs.
$LOAD_PATH.push File.expand_path("../../lib", __FILE__)

Gem::Specification.new do |spec|
  spec.name        = "brickdoc-saas"
  spec.version     = "0.1.0"
  spec.authors     = ["Brickdoc Inc."]
  spec.email       = ["engineering@brickdoc.com"]
  spec.summary     = "Brickdoc SaaS module"

  spec.files = Dir["{app,config,lib}/**/*", "README.md"]
end
