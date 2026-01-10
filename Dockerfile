FROM ruby:3.3

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  npm

# Install yarn via npm
RUN npm install -g yarn

# Set working directory
WORKDIR /app

# Install bundler and rails
RUN gem install bundler rails

# Copy Gemfiles if they exist (for existing apps)
COPY Gemfile* ./
RUN if [ -f "Gemfile" ]; then bundle install; fi

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
