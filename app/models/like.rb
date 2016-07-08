class Like < ActiveRecord::Base
  belongs_to :post, counter_cache: true
  belongs_to :user

  validates :user_id, uniqueness: { scope: :post_id }
  validates :post_id, :user_id, presence: true
end
