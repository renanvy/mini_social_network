class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.order(first_name: :asc, last_name: :asc)

    respond_with @users
  end

  def show
    @user = User.find(params[:id])
  end
end
