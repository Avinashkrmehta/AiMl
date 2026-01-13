Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    get 'health', to: 'health#show'
    
    # Authentication routes
    post 'auth/login', to: 'auth#login'
    post 'auth/register', to: 'auth#register'
    
    # User routes
    get 'users/profile', to: 'users#profile'
    put 'users/profile', to: 'users#update_profile'
  end

  # Serve React app static files in production
  if Rails.env.production?
    # Serve static assets from React build
    get '/static/*path', to: proc { |env|
      path = env['PATH_INFO'].sub('/static/', '')
      file_path = Rails.root.join('frontend', 'build', 'static', path)
      if File.exist?(file_path)
        [200, { 'Content-Type' => Rack::Mime.mime_type(File.extname(path)) }, [File.read(file_path)]]
      else
        [404, {}, ['Not Found']]
      end
    }
  end

  # Catch-all route for React Router (must be last)
  # This ensures that React Router handles client-side routing
  get '*path', to: 'frontend#index', constraints: lambda { |req|
    # Don't catch API routes or Rails admin routes
    !req.path.start_with?('/api') && 
    !req.path.start_with?('/rails') && 
    !req.path.start_with?('/up') &&
    req.format.html?
  }

  # Root route serves React app
  root 'frontend#index'
end
