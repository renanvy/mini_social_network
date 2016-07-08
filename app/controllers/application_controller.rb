require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html, :json
  layout :layout_for_devise

  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
    )}

    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
      :current_password,
    )}
  end

  def layout_for_devise
    if devise_controller? && !current_user
      "devise"
    else
      "application"
    end
  end
end
