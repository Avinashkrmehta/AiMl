# React Frontend

This is the React frontend for the Rails application. It's a separate React app that handles all frontend functionality while Rails serves as the API backend.

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start React development server (runs on port 3001)
npm start

# Or use the Rails development script to run both servers
cd .. && bin/dev
```

### Building for Production
```bash
# Build React app for production
npm run build

# Or use Rails rake task
cd .. && rake frontend:build
```

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── App.js        # Main App component
│   ├── App.css       # App styles
│   └── index.js      # Entry point
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## API Communication

The React app communicates with the Rails API using axios. The development server is configured to proxy API requests to the Rails server running on port 3000.

Example API call:
```javascript
import axios from 'axios';

// This will call http://localhost:3000/api/health in development
const response = await axios.get('/api/health');
```

## Routing

Client-side routing is handled by React Router. The Rails app is configured to serve the React app for all non-API routes, enabling proper client-side routing.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## Deployment

The React app is built and served by Rails in production. The build process is automatically triggered during Rails asset precompilation.