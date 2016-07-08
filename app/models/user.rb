class User < ActiveRecord::Base
  normalize :email, with: :downcase

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, :last_name, presence: true

  def to_s
    "#{first_name} #{last_name}"
  end
end
