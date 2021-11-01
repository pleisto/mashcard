# frozen_string_literal: true
Dir["#{Brickdoc::SaaS.root}/config/initializers/*.rb"].each { |f| require f } if Brickdoc.saas?
