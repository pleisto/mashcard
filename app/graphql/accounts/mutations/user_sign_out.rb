# frozen_string_literal: true
module Accounts
  class Mutations::UserSignOut < BrickGraphQL::BaseMutation
    requires_entrypoint_to_be :internal

    ## https://github.com/heartcombo/devise/blob/master/lib/devise/controllers/sign_in_out.rb#L80
    ## TODO
    def resolve
      return {} if context[:current_user].nil?

      context[:warden].logout
      {}
    end
  end
end
