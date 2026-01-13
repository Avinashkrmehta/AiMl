import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>About This Setup</h1>
        <p>
          This is a Rails application with an integrated React frontend. Here's how it works:
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Architecture:</h3>
          <ul>
            <li><strong>Rails Backend:</strong> Serves as API and handles data, authentication, and business logic</li>
            <li><strong>React Frontend:</strong> Handles all UI interactions and user experience</li>
            <li><strong>Integrated Deployment:</strong> Both apps deploy together as a single Rails application</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Development Workflow:</h3>
          <ol>
            <li>Run Rails server: <code>rails server</code> (port 3000)</li>
            <li>Run React dev server: <code>cd frontend && npm start</code> (port 3001)</li>
            <li>React proxies API calls to Rails automatically</li>
            <li>Build React for production: <code>cd frontend && npm run build</code></li>
          </ol>
        </div>

        <div>
          <h3>Benefits:</h3>
          <ul>
            <li>🚀 Modern React development experience</li>
            <li>🔧 Separate build processes and dependencies</li>
            <li>📦 Single deployment unit</li>
            <li>🔄 Hot reloading in development</li>
            <li>⚡ Optimized production builds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;