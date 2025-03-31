import { SimpleGrid, TextInput, Flex, Center, Loader, Text } from '@mantine/core';
import { AlbumCard } from './AlbumCard';

export const AlbumSearchGrid = ({ 
  albums, 
  search, 
  setSearch, 
  onSelectAlbum,
  isLoading 
}) => {
  return (
    <>
      <Flex justify="center" mb="xl">
        <TextInput
          placeholder="Search albums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="md"
          radius="md"
          w="100%"
          maw={500}
          icon={
            <span style={{ fontSize: '1rem' }}>🔍</span> // Magnifying glass emoji
          }
          rightSection={
            search && (
              <button 
                onClick={() => setSearch('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: '#868e96'
                }}
              >
                ×
              </button>
            )
          }
        />
      </Flex>

      {isLoading ? (
        <Center py="xl">
          <Loader />
        </Center>
      ) : albums.length === 0 ? (
        <Center py="xl">
          <Text color="dimmed">No albums found</Text>
        </Center>
      ) : (
        <SimpleGrid 
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'lg', cols: 3 },
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {albums.map((album) => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              onSelect={onSelectAlbum}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};