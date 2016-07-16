require 'rails_helper'

feature 'Create a new post' do
  fixtures :users

  background do
    user = users(:john_doe)
    login_as(user, scope: :user)
    visit '/'
  end

  scenario 'with correct informations', js: true do
    expect(page).to have_css('#new_post')

    within '#new_post' do
      fill_in 'post_text', with: 'Lorem ipsum...'
    end

    click_button 'Publicar'

    expect(page).to have_css('#post_list')

    within '#post_list' do
      expect(page).to have_content 'Lorem ipsum...'
    end
  end

  scenario 'with invalid informations', js: true do
    expect(page).to have_css('#new_post')

    within '#new_post' do
      fill_in 'post_text', with: ''
    end

    click_button 'Publicar'

    within '#new_post' do
      expect(page).to have_content('Não pode ficar em branco.')
    end
  end
end
