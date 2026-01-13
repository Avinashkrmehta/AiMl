class Api::UsersController < Api::BaseController
  def profile
    render json: {
      user: current_user.as_json(except: [:password_digest, :encrypted_password]),
      message: 'Profile retrieved successfully'
    }
  end

  def update_profile
    if current_user.update(user_params)
      render json: {
        user: current_user.as_json(except: [:password_digest, :encrypted_password]),
        message: 'Profile updated successfully'
      }
    else
      render json: {
        errors: current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email)
  end
end