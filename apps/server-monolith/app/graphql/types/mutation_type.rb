# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :awareness_update, subscription: Mutations::Blocks::AwarenessUpdate
    field :block_commit, mutation:  Mutations::Blocks::Commit
    field :block_create, mutation:  Mutations::Blocks::Create
    field :block_create_share_link, mutation: Mutations::Blocks::CreateShareLink
    field :block_duplicate, mutation: Mutations::Blocks::Duplicate
    field :block_hard_delete, mutation: Mutations::Blocks::HardDelete
    field :block_move, mutation: Mutations::Blocks::Move
    field :block_pin_or_unpin, mutation: Mutations::Blocks::PinOrUnpin
    field :block_rename, mutation: Mutations::Blocks::Rename
    field :block_restore, mutation: Mutations::Blocks::Restore
    field :block_soft_delete, mutation: Mutations::Blocks::SoftDelete
    field :block_sync_batch, mutation:  Mutations::Blocks::SyncBatch
    field :conversation_comment_append, mutation: Mutations::ConversationCommentAppend
    field :conversation_comment_create, mutation: Mutations::ConversationCommentCreate
    field :conversation_delete, mutation: Mutations::ConversationDelete
    field :conversation_open, mutation: Mutations::ConversationOpen
    field :conversation_resolve, mutation: Mutations::ConversationResolve
    field :create_direct_upload, mutation: Mutations::CreateDirectUpload
    field :create_or_update_pod, mutation: Mutations::Pods::CreateOrUpdate
    field :formula_commit, mutation: Mutations::FormulaCommit
    field :join_pod, mutation: Mutations::Pods::Join
    field :pod_destroy, mutation: Mutations::Pods::Destroy
    field :pod_leave, mutation: Mutations::Pods::Leave
    field :update_domain, mutation: Mutations::Pods::UpdateDomain
    field :update_member, mutation: Mutations::Pods::UpdateMember
    field :user_appearance_update, mutation: Mutations::Users::AppearanceUpdate
    field :user_confirmation_email_resend, mutation: Mutations::Users::ConfirmationEmailResend
    field :user_create, mutation: Mutations::Users::Create
    field :user_destroy, mutation: Mutations::Users::Destroy
    field :user_email_password_sign_in, mutation: Mutations::Users::EmailPasswordSignIn
    field :user_forget_password_mail_send, mutation: Mutations::Users::ForgetPasswordMailSend
    field :user_password_reset, mutation: Mutations::Users::PasswordReset
    field :user_sign_out, mutation: Mutations::Users::SignOut
  end
end
