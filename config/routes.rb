Rails.application.routes.draw do
  devise_for :users

  resources :users, only: :show

  resources :home, only: :index

  resources :posts do
    get :comments, on: :member
  end

  resources :comments, only: [:create, :update, :destroy]
  root 'home#index'
end
