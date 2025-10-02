// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Extract access token from URL hash
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Fetch user profile data from Spotify
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserProfile(data);
      })
      .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grovet</h1>
        {!userProfile ? (
          // If no profile, show login button
          <a className="login-button" href="http://localhost:8888/login">
            Login with Spotify
          </a>
        ) : (
          // If profile exists, show user info
          <div>
            <h2>Welcome, {userProfile.display_name}</h2>
            {userProfile.images && userProfile.images.length > 0 && (
              <img
                src={userProfile.images[0].url}
                alt="Profile"
                style={{ width: '150px', borderRadius: '50%' }}
              />
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;