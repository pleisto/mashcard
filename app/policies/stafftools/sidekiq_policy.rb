# frozen_string_literal: true

class Stafftools::SidekiqPolicy < Stafftools::ApplicationPolicy
  def write?
    required_permission 'sidekiq.write'
  end
end
