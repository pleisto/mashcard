# frozen_string_literal: true

class RootQuery < BrickGraphQL::BaseObject
  field :block, resolver: Docs::Queries::Block
  field :block_info, resolver: Docs::Queries::BlockInfo
  field :block_new, resolver: Docs::Queries::BlockNew
  field :block_pins, resolver: Docs::Queries::BlockPins
  field :block_search, resolver: Docs::Queries::BlockSearch
  field :block_share_links, resolver: Docs::Queries::BlockShareLinks
  field :block_snapshots, resolver: Docs::Queries::BlockSnapshots
  field :children_blocks, resolver: Docs::Queries::ChildrenBlocks
  field :conversation_comments, resolver: Docs::Queries::ConversationComments
  field :document, resolver: Docs::Queries::Document
  field :document_histories, resolver: Docs::Queries::DocumentHistories
  field :domain_available, resolver: System::Queries::DomainAvailable
  field :email_available, resolver: System::Queries::EmailAvailable
  field :federated_identity_session, resolver: Accounts::Queries::FederatedIdentitySession
  field :formulas, resolver: Docs::Queries::Formulas
  field :metadata, resolver: System::Queries::Metadata
  field :page_blocks, resolver: Docs::Queries::PageBlocks
  field :password_available, resolver: System::Queries::PasswordAvailable
  field :preview_box, resolver: System::Queries::PreviewBox
  field :space, resolver: System::Queries::Space
  field :space_members, resolver: System::Queries::SpaceMembers
  field :space_search, resolver: System::Queries::SpaceSearch
  field :spaces, resolver: System::Queries::Spaces
  field :spreadsheet_children, resolver: Docs::Queries::SpreadsheetChildren
  field :trash_blocks, resolver: Docs::Queries::TrashBlocks
  field :unsplash_image, resolver: System::Queries::UnsplashImage
end
