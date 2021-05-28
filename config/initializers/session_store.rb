# frozen_string_literal: true

## 30 days
Rails.application.config.session_store :cookie_store,
                                       key: "__memex__", expire_after: 86_400 * 30
