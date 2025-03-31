import { useAuth } from '../contexts/SpotifyAuthContext';
import { LoginButton } from '../components/LoginButton';
import AlbumGallery from '../components/AlbumGallery/AlbumGallery';

//home page, currently just a copy of the search page. will update
export default function HomePage() {
  const { token } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      {token ? (
        <AlbumGallery />
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh'
        }}>
          <h1>Welcome to Album Explorer</h1>
          <p style={{ marginBottom: '2rem' }}>Login with Spotify to browse albums</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}