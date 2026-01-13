namespace :frontend do
  desc "Install frontend dependencies"
  task :install do
    sh "cd frontend && npm install"
  end

  desc "Build React app for production"
  task :build do
    sh "cd frontend && npm run build"
  end

  desc "Start React development server"
  task :dev do
    sh "cd frontend && npm start"
  end

  desc "Run React tests"
  task :test do
    sh "cd frontend && npm test"
  end

  desc "Clean React build files"
  task :clean do
    sh "rm -rf frontend/build"
  end

  desc "Setup frontend (install + build)"
  task setup: [:install, :build]
end

# Hook into Rails asset precompilation
if Rake::Task.task_defined?("assets:precompile")
  Rake::Task["assets:precompile"].enhance(["frontend:build"])
end