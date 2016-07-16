require 'rails_helper'

feature 'Edit a post' do
  fixtures :users
  fixtures :posts

  background do
    user = users(:john_doe)
    @post = posts(:post_1)

    login_as(user, scope: :user)
    visit '/'
  end

  scenario 'with valid information', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Editar'

      fill_in 'post_text', with: 'Text changed!'

      click_on 'Atualizar'

      expect(page).to have_content('Text changed!')
    end
  end

  scenario 'with invalid information', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Editar'

      fill_in 'post_text', with: ''

      click_on 'Atualizar'

      expect(page).to have_content('Não pode ficar em branco.')
    end
  end
end