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

## ⚛️ React Frontend Integration

This Rails application includes a separate React frontend that handles all UI interactions while Rails serves as the API backend.

### Frontend Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── App.js        # Main App component
│   └── index.js      # Entry point
└── package.json      # Frontend dependencies
```

### Development with React

#### Option 1: Run Both Servers Separately
```bash
# Terminal 1: Start Rails API server
rails server

# Terminal 2: Start React development server
cd frontend && npm install && npm start
```

#### Option 2: Use Development Script
```bash
# Install frontend dependencies first
cd frontend && npm install

# Run both servers with one command
bin/dev
```

This will start:
- Rails API server on http://localhost:3000
- React development server on http://localhost:3001

### Frontend Development Commands

| Command | Description |
|---------|-------------|
| `cd frontend && npm install` | Install React dependencies |
| `cd frontend && npm start` | Start React dev server |
| `cd frontend && npm run build` | Build React for production |
| `rake frontend:setup` | Install deps + build React |
| `rake frontend:build` | Build React app |
| `bin/dev` | Start both Rails and React servers |

### API Communication

The React app communicates with Rails through API endpoints:

```javascript
// Example API call from React
import axios from 'axios';

const response = await axios.get('/api/health');
```

### Production Deployment

In production, Rails serves the built React app:

1. React app builds to `frontend/build/`
2. Rails serves static files and handles routing
3. API calls go to `/api/*` routes
4. All other routes serve the React app

### Architecture Benefits

- 🚀 Modern React development experience with hot reloading
- 🔧 Separate build processes and dependency management
- 📦 Single deployment unit (Rails app contains everything)
- ⚡ Optimized production builds
- 🔄 Clean separation between frontend and backend concerns