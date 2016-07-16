require 'rails_helper'

feature 'Unlike a post' do
  fixtures :users
  fixtures :posts

  background do
    user = users(:john_doe)
    @post = posts(:post_1)

    login_as(user, scope: :user)
    visit '/'
  end

  scenario 'with success', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Descurtir'

      expect(page).to have_content('Curtir')
    end
  end
end