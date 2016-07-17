require 'rails_helper'

feature 'Remove comment from post' do
  fixtures :users
  fixtures :posts
  fixtures :comments

  background do
    user = users(:john_doe)
    @post = posts(:post_1)
    @comment = comments(:comment_1)

    login_as(user, scope: :user)
    visit '/'
  end

  scenario 'with success', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Comentários'

      within "#comment_#{@comment.id}" do
        click_on 'Remover'
      end

      expect(page).to have_no_css("#comment_#{@comment.id}")
    end
  end
end