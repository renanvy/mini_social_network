class CommentSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :user_id, :text, :user_full_name,
    :created_at

  def user_full_name
    object.user.to_s
  end
end
