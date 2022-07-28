# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    graphql_name 'query'

    field :block, resolver: Resolvers::Block
    field :block_info, resolver: Resolvers::BlockInfo
    field :block_new, resolver: Resolvers::BlockNew
    field :block_pins, resolver: Resolvers::BlockPins
    field :block_search, resolver: Resolvers::BlockSearch
    field :block_share_links, resolver: Resolvers::BlockShareLinks
    field :conversation_comments, resolver: Resolvers::ConversationComments
    field :document_histories, resolver: Resolvers::DocumentHistories
    field :domain_available, resolver: Resolvers::DomainAvailable
    field :email_available, resolver: Resolvers::EmailAvailable
    field :federated_identity_session, resolver: Resolvers::FederatedIdentitySession
    field :formulas, resolver: Resolvers::Formulas
    field :metadata, resolver: Resolvers::Metadata
    field :page_blocks, resolver: Resolvers::PageBlocks
    field :password_available, resolver: Resolvers::PasswordAvailable
    field :pod, resolver: Resolvers::Pod
    field :pod_members, resolver: Resolvers::PodMembers
    field :pod_search, resolver: Resolvers::PodSearch
    field :pods, resolver: Resolvers::Pods
    field :preview_box, resolver: Resolvers::PreviewBox
    field :spreadsheet_children, resolver: Resolvers::SpreadsheetChildren
    field :trash_blocks, resolver: Resolvers::TrashBlocks
    field :unsplash_image, resolver: Resolvers::UnsplashImage
  end
end
