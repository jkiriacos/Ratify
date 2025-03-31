import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('spotify_token') || null);
  const [user, setUser] = useState(null);

  // Function to handle Spotify login
  const login = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scopes = 'user-read-private user-read-email';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=token&show_dialog=true`;
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('spotify_token');
  };

  // Fetch user profile from Spotify API
  useEffect(() => {
    if (token) {
      fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            name: data.display_name,
            image: data.images?.[0]?.url || '/default-avatar.png',
          });
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
          logout();
        });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
