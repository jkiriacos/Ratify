import { Container, Title, Modal, Image, Button, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { AlbumSearchGrid } from './AlbumSearchGrid';
import { getSpotifyToken, searchAlbums } from '../../lib/spotify';

//component for searching and displaying albums
export default function AlbumGallery() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const results = await searchAlbums(search || "popular");
        setAlbums(results);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(fetchAlbums, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="xl" align="center">
        Discover Albums
      </Title>

      <AlbumSearchGrid
        albums={albums}
        search={search}
        setSearch={setSearch}
        onSelectAlbum={setSelectedAlbum}
        isLoading={isLoading}
      />

      <Modal 
        opened={!!selectedAlbum} 
        onClose={() => setSelectedAlbum(null)}
        title={selectedAlbum?.name}
        size="sm"
        centered
      >
        {selectedAlbum && (
          <div>
            <Image 
              src={selectedAlbum.image} 
              alt={selectedAlbum.name}
              radius="sm"
              mb="md"
            />
            <Text size="sm" mb="xs">
              <Text component="span" fw={500}>Artist:</Text> {selectedAlbum.artist}
            </Text>
            <Text size="sm" mb="md">
              <Text component="span" fw={500}>Released:</Text> {selectedAlbum.releaseYear}
            </Text>
            <Button 
              fullWidth 
              color="red"
              onClick={() => window.open(
                `https://open.spotify.com/search/${selectedAlbum.name}`,
                '_blank'
              )}
            >
              Listen on Spotify
            </Button>
          </div>
        )}
      </Modal>
    </Container>
  );
}