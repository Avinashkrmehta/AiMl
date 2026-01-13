class FrontendController < ApplicationController
  def index
    # Check if React build exists
    react_build_path = Rails.root.join('frontend', 'build', 'index.html')
    
    if File.exist?(react_build_path)
      # Serve the React app's index.html for all frontend routes
      render file: react_build_path, layout: false
    else
      # Fallback message when React app isn't built yet
      render html: <<~HTML.html_safe
        <!DOCTYPE html>
        <html>
          <head>
            <title>Rails + React App</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .status { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
              .success { background: #d4edda; border-color: #c3e6cb; }
              code { background: #f8f9fa; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🚀 Rails + React Integration</h1>
              <p>Your Rails server is running successfully!</p>
              
              <div class="status">
                <strong>⚠️ React App Not Built Yet</strong><br>
                To see the full React frontend, you need to build the React app first.
              </div>
              
              <h3>Quick Start:</h3>
              <ol>
                <li>Install React dependencies: <code>cd frontend && npm install</code></li>
                <li>Start development servers: <code>./bin/dev</code></li>
                <li>Or build for production: <code>cd frontend && npm run build</code></li>
              </ol>
              
              <div class="status success">
                <strong>✅ API Working:</strong> <a href="/api/health">/api/health</a>
              </div>
              
              <h3>Development URLs:</h3>
              <ul>
                <li><strong>Rails API:</strong> http://localhost:3000</li>
                <li><strong>React Dev Server:</strong> http://localhost:3001 (when running)</li>
              </ul>
            </div>
          </body>
        </html>
      HTML
    end
  end
end