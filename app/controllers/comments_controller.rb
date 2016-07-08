class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    comment = Comment.new(comment_params)

    if comment.save!
      render json: comment
    end
  end

  def update
    comment = Comment.find(params[:id])

    if comment.update!(comment_params)
      render json: comment
    end
  end

  def destroy
    comment = Comment.find(params[:id])

    comment.destroy!

    render nothing: true, status: 200
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :text, :user_id)
  end
end
