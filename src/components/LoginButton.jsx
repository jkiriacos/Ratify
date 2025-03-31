import { Button } from '@mantine/core';
import { useAuth } from '../contexts/SpotifyAuthContext';

//button for logging in with spotify
export const LoginButton = () => {
  const { login } = useAuth();

  return (
    <Button 
      color="green" 
      radius="xl" 
      size="md"
      onClick={login}
      styles={{
        root: {
          backgroundColor: '#1DB954',
          '&:hover': { backgroundColor: '#1ED760' }
        }
      }}
    >
      Login with Spotify
    </Button>
  );
};