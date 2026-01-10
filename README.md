# 🚀 Rails Docker Development Setup

A complete Rails application setup using Docker and PostgreSQL for streamlined development.

## 📋 Prerequisites

Make sure you have Docker installed on your system:

```bash
docker --version
docker compose version
```

## 🛠️ Quick Start

### 1️⃣ Create Project Structure

```bash
mkdir AiMl
cd AiMl
```

### 2️⃣ Create Environment File

Create a `.env` file with your database configuration:

```env
DATABASE_HOST=db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
```

### 3️⃣ Setup Docker Configuration

**Dockerfile:**
```dockerfile
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
```

**docker-compose.yml:**
```yaml
services:
  web:
    build: .
    volumes:
      - .:/app
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
    command: bash -c "rm -f tmp/pids/server.pid && rails server -b 0.0.0.0"

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${DATABASE_USERNAME}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}

volumes:
  postgres_data:
```

### 4️⃣ Generate Rails Application

```bash
docker compose run web rails new . --force --database=postgresql
```

### 5️⃣ Configure Database

Update `config/database.yml` to use environment variables:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  host: <%= ENV["DATABASE_HOST"] %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  pool: 5

development:
  <<: *default
  database: app_development

test:
  <<: *default
  database: app_test

production:
  <<: *default
  database: app_production
```

### 6️⃣ Build and Setup Database

```bash
# Build Docker images
docker compose build

# Create database
docker compose run web rails db:create

# Start the application
docker compose up
```

### 7️⃣ Access Your Application

🌐 Open your browser and navigate to: **http://localhost:3000**

## 🔧 Daily Development Commands

| Command | Description |
|---------|-------------|
| `docker compose up` | Start the application |
| `docker compose down` | Stop the application |
| `docker compose run web rails c` | Open Rails console |
| `docker compose run web rails g model User` | Generate a model |
| `docker compose run web rails db:migrate` | Run database migrations |
| `docker compose run web rails db:seed` | Seed the database |
| `docker compose run web bundle install` | Install new gems |
| `docker compose logs web` | View application logs |

## 🗂️ Project Structure

```
AiMl/
├── .env                    # Environment variables
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── Gemfile                 # Ruby dependencies
├── config/
│   └── database.yml        # Database configuration
└── ... (Rails app files)
```

## 🐛 Troubleshooting

- **Docker not running**: Make sure Docker Desktop is started
- **Port conflicts**: Change the port in docker-compose.yml if 3000 is occupied
- **Database connection issues**: Verify your `.env` file configuration
- **Permission issues**: Try running commands with `sudo` on Linux/Mac

## 📚 Tech Stack

- **Ruby**: 3.3
- **Rails**: Latest
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose
- **Package Manager**: Yarn

