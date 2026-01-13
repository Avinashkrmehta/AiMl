class Api::AuthController < ApplicationController
  include ExceptionHandler
  
  skip_before_action :verify_authenticity_token
  before_action :set_default_response_format
  
  def login
    auth_token = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    user = User.find_by(email: auth_params[:email])
    
    render json: {
      auth_token: auth_token,
      user: user.as_json(except: [:password_digest, :encrypted_password]),
      message: 'Login successful'
    }
  end

  def register
    user = User.create!(user_params)
    auth_token = JwtService.encode(user_id: user.id)
    
    render json: {
      auth_token: auth_token,
      user: user.as_json(except: [:password_digest, :encrypted_password]),
      message: Message.account_created
    }, status: :created
  end

  private

  def auth_params
    params.permit(:email, :password)
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
  
  def set_default_response_format
    request.format = :json
  end
end