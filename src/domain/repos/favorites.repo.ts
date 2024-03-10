import { Inject, Injectable } from '@nestjs/common';
import { Album, Artist, Database, Favorites, Track } from 'libs/types/types';

@Injectable()
export class FavoritesRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async getFavorites(): Promise<Favorites> {
    return this.inMemoryDB.favorites;
  }

  async addFavoriteTrack(track: Track) {
    this.inMemoryDB.favorites.tracks.push(track);
  }

  async addFavoriteArtist(artist: Artist) {
    this.inMemoryDB.favorites.artists.push(artist);
  }

  async addFavoriteAlbum(album: Album) {
    this.inMemoryDB.favorites.albums.push(album);
  }

  async deleteFavoriteTrack(id: Pick<Track, 'id'>): Promise<void> {
    const index = this.inMemoryDB.favorites.tracks.findIndex(
      (track) => track.id === String(id),
    );
    if (index !== -1) {
      this.inMemoryDB.favorites.tracks.splice(index, 1);
    }
  }

  async deleteFavoriteArtist(id: Pick<Artist, 'id'>): Promise<void> {
    const index = this.inMemoryDB.favorites.artists.findIndex(
      (artist) => artist.id === String(id),
    );
    if (index !== -1) {
      this.inMemoryDB.favorites.artists.splice(index, 1);
    }
  }

  async deleteFavoriteAlbum(id: Pick<Album, 'id'>): Promise<void> {
    const index = this.inMemoryDB.favorites.albums.findIndex(
      (album) => album.id === String(id),
    );
    if (index !== -1) {
      this.inMemoryDB.favorites.albums.splice(index, 1);
    }
  }
}
