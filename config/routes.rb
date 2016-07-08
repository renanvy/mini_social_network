Rails.application.routes.draw do
  devise_for :users

  resources :users, only: :show

  resources :home, only: :index

  root 'home#index'
end
