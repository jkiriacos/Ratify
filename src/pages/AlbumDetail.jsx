import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Title, Text, Group, Table, Badge } from '@mantine/core';
import { getAlbumDetails } from '../lib/spotify';

//Page for displaying album information
export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await getAlbumDetails(id);
        setAlbum(albumData);
      } catch (error) {
        console.error('Error fetching album:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!album) return <div>Album not found</div>;

  return (
    <Container size="lg" py="xl">
      <Group align="flex-start" gap="xl" mb="xl">
        <Image 
          src={album.image} 
          alt={album.name} 
          width={300}
          height={300}
          radius="md"
        />
        <div>
          <Title order={1}>{album.name}</Title>
          <Title order={2} size="h4" c="dimmed" mb="md">
            {album.artist}
          </Title>
          <Group gap="xs" mb="md">
            {album.genres.map(genre => (
              <Badge key={genre} variant="light" color="gray">
                {genre}
              </Badge>
            ))}
          </Group>
          <Text c="dimmed">Release Date: {album.releaseDate}</Text>
          <Text c="dimmed">Total Tracks: {album.totalTracks}</Text>
        </div>
      </Group>

      <Title order={3} mb="md">Tracks</Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Duration</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {album.tracks.map((track, index) => (
            <Table.Tr key={track.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{track.name}</Table.Td>
              <Table.Td>
                {Math.floor(track.duration_ms / 60000)}:
                {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}