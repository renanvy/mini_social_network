class User < ActiveRecord::Base
  normalize :email, with: :downcase

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :first_name, :last_name, presence: true

  def to_s
    "#{first_name} #{last_name}"
  end

  def liked?(post)
    post.user_likes.include?(self)
  end

  def commented?(post)
    post.user_comments.include?(self)
  end
end
