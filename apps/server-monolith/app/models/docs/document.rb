# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_documents
#
#  id         :uuid             not null, primary key
#  state      :binary
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  state_id   :uuid
#
module Docs
  class Document < ApplicationRecord
  end
end
