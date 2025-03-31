import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextInput, SimpleGrid, Loader, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { searchAlbums } from '../lib/spotify';
import { AlbumCard } from '../components/AlbumGallery/AlbumCard';

export default function SearchPage() {
  const [query, setQuery] = useState(''); // Search query state
  const [results, setResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      searchAlbums(query)
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Container size="xl" py="xl">
      <TextInput
        placeholder="Search for albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="lg"
        radius="xl"
        icon={<IconSearch size={18} />}
        mb="xl"
        autoFocus
      />

      {loading ? (
        <Loader size="xl" variant="dots" mx="auto" my="xl" />
      ) : results.length > 0 ? (
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'lg', cols: 3 },
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {results.map((album) => (
            <AlbumCard 
              key={album.id} 
              album={album}
              onClick={() => navigate(`/album/${album.id}`)}
            />
          ))}
        </SimpleGrid>
      ) : query ? (
        <Text align="center" color="dimmed" py="xl">
          No results found for "{query}"
        </Text>
      ) : (
        <Text align="center" color="dimmed" py="xl">
          Start typing to search albums
        </Text>
      )}
    </Container>
  );
}
