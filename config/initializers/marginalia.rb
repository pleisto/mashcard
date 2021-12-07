# frozen_string_literal: true

require 'marginalia'

Marginalia.application_name = "Brickdoc #{Rails.env}"
Marginalia::Comment.prepend_comment = true if Rails.env.production?
Marginalia::Comment.components = [:application, :action, :pid]
Marginalia::Comment.components << :line if Rails.env.development?
