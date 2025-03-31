import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './AlbumCard.module.css';

//Card for displaying album info in the search page
export const AlbumCard = ({ album, onClick, showDetailsButton = true }) => {
  const handleSpotifyClick = (e) => {
    e.stopPropagation();
    window.open(`https://open.spotify.com/search/${album.name}`, '_blank');
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <Card 
      withBorder 
      radius="md" 
      p="md" 
      className={classes.card}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Card.Section>
        <Image 
          src={album.image} 
          alt={album.name} 
          height={180}
          className={classes.image}
          style={{ cursor: onClick ? 'pointer' : 'default' }}
        />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group justify="space-between">
          <Text fz="lg" fw={500} truncate>
            {album.name}
          </Text>
          <Badge color="red" variant="light">
            {album.releaseYear}
          </Badge>
        </Group>
        <Text fz="sm" c="dimmed" truncate>
          {album.artist}
        </Text>
      </Card.Section>

      <Group mt="xs" className={classes.actions}>
        {showDetailsButton && (
          <Button 
            radius="md" 
            style={{ flex: 1 }}
            variant="light"
            color="red"
            onClick={handleDetailsClick}
          >
            Details
          </Button>
        )}
        <ActionIcon 
          variant="default" 
          radius="md" 
          size={36}
          onClick={handleSpotifyClick}
        >
          ♫
        </ActionIcon>
      </Group>
    </Card>
  );
};