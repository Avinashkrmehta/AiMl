class Api::HealthController < ApplicationController
  include ExceptionHandler
  
  skip_before_action :verify_authenticity_token
  before_action :set_default_response_format
  
  def show
    render json: {
      status: 'ok',
      timestamp: Time.current.iso8601,
      rails_version: Rails.version,
      environment: Rails.env,
      message: 'Rails API is running successfully!'
    }
  end
  
  private
  
  def set_default_response_format
    request.format = :json
  end
end