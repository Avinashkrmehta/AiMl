class Api::BaseController < ApplicationController
  include ExceptionHandler
  
  # Skip CSRF protection for API endpoints
  skip_before_action :verify_authenticity_token
  
  # Set JSON as default response format
  before_action :set_default_response_format
  before_action :authenticate_request
  
  attr_reader :current_user
  
  private
  
  def set_default_response_format
    request.format = :json
  end
  
  def authenticate_request
    @current_user = AuthorizeApiRequest.new(request.headers).call[:user]
  end
  
  def render_json_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
  
  def render_json_success(data = {}, message = nil)
    response = data
    response[:message] = message if message
    render json: response
  end
end