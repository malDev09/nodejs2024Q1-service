export interface CreateAlbumDto {
  id: string;
  name: string;
  year: number;
  artistId?: string | null;
}
