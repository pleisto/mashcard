# frozen_string_literal: true

module ExtendedEdition
  module PagesController
    extend ActiveSupport::Concern

    prepended do
      before_action :redrect_to_landing_page, only: :pwa
    end

    private

    # Redirect to landing page if the user is not signed in and visiting the root path.
    def redrect_to_landing_page
      redirect_to('https://mashcaed.io/') if request.path == '/' && current_user.blank?
    end
  end
end
