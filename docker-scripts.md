# Docker Commands for Rails + React App

## Development (with hot reloading)
```bash
# Start all services
docker-compose -f docker-dev.yml up --build

# Start in background
docker-compose -f docker-dev.yml up -d --build

# Stop all services
docker-compose -f docker-dev.yml down

# View logs
docker-compose -f docker-dev.yml logs -f

# View specific service logs
docker-compose -f docker-dev.yml logs -f backend
docker-compose -f docker-dev.yml logs -f frontend
```

## Production
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop all services
docker-compose down
```

## Database Operations
```bash
# Run Rails migrations
docker-compose -f docker-dev.yml exec backend rails db:migrate

# Create database
docker-compose -f docker-dev.yml exec backend rails db:create

# Seed database
docker-compose -f docker-dev.yml exec backend rails db:seed

# Rails console
docker-compose -f docker-dev.yml exec backend rails console

# Reset database
docker-compose -f docker-dev.yml exec backend rails db:drop db:create db:migrate db:seed
```

## Useful Commands
```bash
# Rebuild specific service
docker-compose -f docker-dev.yml build backend
docker-compose -f docker-dev.yml build frontend

# Shell into containers
docker-compose -f docker-dev.yml exec backend bash
docker-compose -f docker-dev.yml exec frontend sh

# Install new gems (Rails)
docker-compose -f docker-dev.yml exec backend bundle install

# Install new packages (React)
docker-compose -f docker-dev.yml exec frontend npm install

# Clean up
docker-compose -f docker-dev.yml down -v --remove-orphans
docker system prune -a
```

## Access URLs
- Frontend (React): http://localhost:3001
- Backend (Rails API): http://localhost:3000
- Database: localhost:5432