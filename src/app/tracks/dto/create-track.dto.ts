export interface CreateTrackDto {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;
}