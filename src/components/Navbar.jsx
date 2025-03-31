import { Box, Group, ActionIcon, Avatar, Text, Button } from '@mantine/core';
import { IconHome, IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/SpotifyAuthContext';

//Header bar, currently broken...
export function AppHeader() {
  const { user, login, logout } = useAuth();

  return (
    <Box
      sx={(theme) => ({
        height: 60,
        backgroundColor: theme.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        boxShadow: theme.shadows.sm,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      })}
    >
      {}
      <Group>
        <ActionIcon component={Link} to="/" size="lg" radius="xl" variant="subtle">
          <IconHome size={22} />
        </ActionIcon>
        <ActionIcon component={Link} to="/search" size="lg" radius="xl" variant="subtle">
          <IconSearch size={22} />
        </ActionIcon>
      </Group>

      {}
      <Group align="center" spacing="sm">
        {user ? (
          <>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
            <Avatar
              src={user.image}
              alt={user.name}a
              radius="xl"
              size={30}
            />
            <Button variant="outline" color="red" onClick={logout} size="xs">
              Logout
            </Button>
          </>
        ) : (
          <Button color="green" onClick={login} size="sm">
            Login with Spotify
          </Button>
        )}
      </Group>
    </Box>
  );
}
