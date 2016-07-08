class Post < ActiveRecord::Base
  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :user_comments, through: :comments, source: :user

  validates :text, :user_id, presence: true

  def self.ordered
    order(arel_table[:created_at].desc)
  end
end
