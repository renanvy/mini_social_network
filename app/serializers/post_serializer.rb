class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text, :user_full_name, :created_at, :likes_count

  has_many :comments

  def user_full_name
    object.user.to_s
  end
end
