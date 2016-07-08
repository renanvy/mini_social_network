class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text, :user_full_name, :created_at, :likes_count,
    :post_liked

  has_many :comments

  def user_full_name
    object.user.to_s
  end

  def post_liked
    if serialization_options[:current_user].present?
      serialization_options[:current_user].liked?(object)
    end
  end
end
