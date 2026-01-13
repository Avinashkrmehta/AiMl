import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example API call to Rails backend
    const fetchData = async () => {
      try {
        // This will call your Rails API endpoint
        const response = await axios.get('/api/health');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data from Rails API');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Rails + React</h1>
        <p>
          This is your React frontend running inside your Rails application.
          The React app handles all frontend functionality while Rails serves as your API backend.
        </p>
        
        <div className="api-status">
          <h3>Rails API Status:</h3>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {data && (
            <div style={{ background: '#d4edda', padding: '10px', borderRadius: '4px' }}>
              <p>✅ Successfully connected to Rails API!</p>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Features:</h3>
          <ul>
            <li>✅ Separate React app with its own build process</li>
            <li>✅ React Router for client-side routing</li>
            <li>✅ Axios for API communication with Rails</li>
            <li>✅ Modern React with hooks and functional components</li>
            <li>✅ CSS modules and component styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;