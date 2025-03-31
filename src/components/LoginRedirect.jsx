import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/SpotifyAuthContext';

//Redirects to spotify's login page
export default function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuth();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const token = hash.get('access_token');

    if (token) {
      setToken(token);
      localStorage.setItem('spotify_token', token);
      navigate(location.state?.from || '/');
    } else {
      console.error('No token found in URL hash');
      navigate('/');
    }
  }, [navigate, setToken, location.state]);

  return <div>Loading...</div>;
}
