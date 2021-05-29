# frozen_string_literal: true

# Load common libs.
$LOAD_PATH.push File.expand_path("../lib", __FILE__)

Gem::Specification.new do |spec|
  spec.name        = "brickdoc-saas"
  spec.version     = "0.0.1"
  spec.authors     = ["Brickdoc (Ningbo) Cloud Computing Technology LTD"]
  spec.email       = ["engineering@brickdoc.com"]
  spec.summary     = "Brickdoc SaaS module"

  spec.files = Dir["{app,config,lib}/**/*", "README.md"]

  spec.add_dependency "rails", ">= 6.1.0"
end
