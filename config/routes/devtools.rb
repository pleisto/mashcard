# frozen_string_literal: true

scope(module: 'devtools') do
  post '__cypress__/session_mock', to: 'cypress#session_mock' if ENV['CYPRESS'].present?
end
