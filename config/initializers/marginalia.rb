# frozen_string_literal: true

require 'marginalia'

Marginalia.application_name = "Brickdoc #{Brickdoc.full_version} #{Rails.env}"
Marginalia::Comment.prepend_comment = true if Rails.env.production?
Marginalia::Comment.components = [:application, :controller_with_namespace, :action, :pid, :job, :hostname]
Marginalia::Comment.components << :line if Rails.env.development?
