# frozen_string_literal: true

Lockbox.master_key = Rails.application.secret_key_base[64..-1]
