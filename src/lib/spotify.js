//A series of helper functions designed to interact with spotify
export const getSpotifyToken = async () => {
    const clientId = "ac63c75d2b4c49cd9168f0b2beaa01a8";
    const clientSecret = "f24e8eaa77124a95b86e9ce0c484e3c4";

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
};
  
export const searchAlbums = async (query, limit = 20) => {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=${limit}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    if (!response.ok) throw new Error('Search failed');
    
    const data = await response.json();
    return data.albums?.items?.map(album => ({
      id: album.id,
      name: album.name,
      artist: album.artists?.[0]?.name || 'Unknown Artist',
      releaseYear: album.release_date?.split('-')[0] || 'Unknown',
      image: album.images?.[0]?.url || '',
    })) || [];
  };
  
  export const getAlbumDetails = async (albumId) => {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (!response.ok) throw new Error('Failed to fetch album details');
  
    const data = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      artist: data.artists.map(a => a.name).join(', '),
      image: data.images[0]?.url,
      genres: data.genres || [],
      releaseDate: data.release_date,
      totalTracks: data.total_tracks,
      tracks: data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
        track_number: track.track_number
      }))
    };
  };