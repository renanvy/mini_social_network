require 'rails_helper'

feature 'Comment a post' do
  fixtures :users
  fixtures :posts

  background do
    @user = users(:john_doe)
    @post = posts(:post_1)

    login_as(@user, scope: :user)
    visit '/'
  end

  scenario 'with success', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Comentários'

      fill_in 'comment_text', with: 'Some comment'

      click_on 'Comentar'

      expect(page).to have_content "Comentários (#{@post.reload.comments.count + 1})"

      within "#comment_#{Comment.last.id}" do
        expect(page).to have_content "John Doe"
        expect(page).to have_content "Some comment"
      end
    end
  end

  scenario 'without success', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Comentários'

      fill_in 'comment_text', with: ''

      click_on 'Comentar'

      expect(page).to have_content 'Não pode ficar em branco'
    end
  end
end