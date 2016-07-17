require 'rails_helper'

feature 'Edit comment from post' do
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
        click_on 'Editar'

        fill_in 'comment_text', with: 'Comment changed!'

        click_on 'Atualizar'

        expect(page).to have_content 'Comment changed!'
      end
    end
  end

  scenario 'without success', js: true do
    expect(page).to have_css("#post_#{@post.id}")

    within "#post_#{@post.id}" do
      click_on 'Comentários'

      within "#comment_#{@comment.id}" do
        click_on 'Editar'

        fill_in 'comment_text', with: ''

        click_on 'Atualizar'

        expect(page).to have_content 'Não pode ficar em branco.'
      end
    end
  end
end