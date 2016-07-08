class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    post = Post.find(params[:like][:post_id])

    like = current_user.likes.new(post_id: post.id)

    if like.save!
      render json: like
    end
  end

  def destroy
    post = Post.find(params[:id])

    like = current_user.likes.find_by(post_id: params[:id])

    if like.destroy!
      render nothing: true, status: 200
    end
  end
end
