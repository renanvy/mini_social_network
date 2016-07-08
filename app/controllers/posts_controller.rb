class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    posts = Post.ordered

    render(
      json: posts.includes(:user, :user_likes, comments: :user),
      current_user: current_user
    )
  end

  def create
    post = current_user.posts.new(post_params)

    if post.save!
      render json: post, status: 200
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def update
    post = Post.find(params[:id])

    if post.update!(post_params)
      render json: post, status: 200
    end
  end

  def destroy
    post = Post.find(params[:id])

    if post.destroy!
      render nothing: true, status: 200
    end
  end

  def comments
    post = Post.find(params[:id])

    render json: post.comments.order(created_at: :asc).includes(:user)
  end

  private

  def post_params
    params.require(:post).permit(:text)
  end
end
