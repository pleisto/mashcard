# frozen_string_literal: true

class RootMutation < BrickGraphQL::BaseObject
  field :block_commit, mutation:  Docs::Mutations::BlockCommit
  field :block_create, mutation:  Docs::Mutations::BlockCreate
  field :block_create_share_link, mutation: Docs::Mutations::BlockCreateShareLink
  field :block_duplicate, mutation: Docs::Mutations::BlockDuplicate
  field :block_hard_delete, mutation: Docs::Mutations::BlockHardDelete
  field :block_move, mutation: Docs::Mutations::BlockMove
  field :block_pin_or_unpin, mutation: Docs::Mutations::BlockPinOrUnpin
  field :block_rename, mutation: Docs::Mutations::BlockRename
  field :block_restore, mutation: Docs::Mutations::BlockRestore
  field :block_soft_delete, mutation: Docs::Mutations::BlockSoftDelete
  field :block_sync_batch, mutation:  Docs::Mutations::BlockSyncBatch
  field :conversation_comment_append, mutation: Docs::Mutations::ConversationCommentAppend
  field :conversation_comment_create, mutation: Docs::Mutations::ConversationCommentCreate
  field :create_direct_upload, mutation: System::Mutations::CreateDirectUpload
  field :create_or_update_pod, mutation: System::Mutations::CreateOrUpdatePod
  field :formula_commit, mutation: Docs::Mutations::FormulaCommit
  field :join_pod, mutation: System::Mutations::JoinPod
  field :pod_destroy, mutation: System::Mutations::PodDestroy
  field :pod_leave, mutation: System::Mutations::PodLeave
  field :update_domain, mutation: System::Mutations::UpdateDomain
  field :update_member, mutation: System::Mutations::UpdateMember
  field :user_appearance_update, mutation: Accounts::Mutations::UserAppearanceUpdate
  field :user_confirmation_email_resend, mutation: Accounts::Mutations::UserConfirmationEmailResend
  field :user_create, mutation: Accounts::Mutations::UserCreate
  field :user_destroy, mutation: Accounts::Mutations::UserDestroy
  field :user_email_password_sign_in, mutation: Accounts::Mutations::UserEmailPasswordSignIn
  field :user_forget_password_mail_send, mutation: Accounts::Mutations::UserForgetPasswordMailSend
  field :user_password_reset, mutation: Accounts::Mutations::UserPasswordReset
  field :user_sign_out, mutation: Accounts::Mutations::UserSignOut
end
