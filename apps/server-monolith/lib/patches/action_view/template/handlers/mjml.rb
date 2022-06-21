# frozen_string_literal: true

module ActionView
  class Template
    module Handlers
      # Intergration MRML into ActionView
      # based Mashcard::Utils::MJML
      class MJML
        def call(template, source)
          # erb compiled template
          compiled_template = template_handler.call(template, source)
          if /<mjml.*?>/i.match?(compiled_template)
            "Mashcard::Utils::MJML.new(begin;#{compiled_template};end).to_html.html_safe"
          else
            compiled_template
          end
        end

        protected

        def template_handler
          # Add erb support
          @template_handler ||= ActionView::Template.registered_template_handler(:erb)
        end
      end
    end
  end
end
