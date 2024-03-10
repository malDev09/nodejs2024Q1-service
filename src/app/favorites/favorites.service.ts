import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ErrorCodes } from 'libs/error-codes.enum';
import { Album, Artist, Favorites, Track } from 'libs/types/types';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { ArtistsRepo } from 'src/domain/repos/artists.repo';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepo: FavoritesRepo,
    private readonly tracksRepo: TracksRepo,
    private readonly albumsRepo: AlbumsRepo,
    private readonly artistsRepo: ArtistsRepo,
  ) {}

  async getFavorites(): Promise<Favorites> {
    return await this.favoritesRepo.getFavorites();
  }

  async addFavorite(
    id: Pick<Artist, 'id'> | Pick<Album, 'id'> | Pick<Track, 'id'>,
    entityType: string,
  ): Promise<Favorites> {
    switch (entityType) {
      case 'artist':
        const artist = await this.artistsRepo.findOneById(id);
        if (!artist) {
          throw new UnprocessableEntityException(ErrorCodes.ARTIST_NOT_FOUND);
        }
        await this.favoritesRepo.addFavoriteArtist(artist);
        break;
      case 'album':
        const album = await this.albumsRepo.findOneById(id);
        if (!album) {
          throw new UnprocessableEntityException(ErrorCodes.ALBUM_NOT_FOUND);
        }
        await this.favoritesRepo.addFavoriteAlbum(album);
        break;
      case 'track':
        const track = await this.tracksRepo.findOneById(id);
        if (!track) {
          throw new UnprocessableEntityException(ErrorCodes.TRACK_NOT_FOUND);
        }
        await this.favoritesRepo.addFavoriteTrack(track);
        break;
      default:
        throw new Error('Invalid entity type');
    }
    return await this.favoritesRepo.getFavorites();
  }

  async deleteFavorite(
    id: Pick<Artist, 'id'> | Pick<Album, 'id'> | Pick<Track, 'id'>,
    entityType: string,
  ): Promise<Favorites> {
    switch (entityType) {
      case 'artist':
        await this.favoritesRepo.deleteFavoriteArtist(id);
        break;
      case 'album':
        await this.favoritesRepo.deleteFavoriteAlbum(id);
        break;
      case 'track':
        await this.favoritesRepo.deleteFavoriteTrack(id);
        break;
      default:
        throw new Error('Invalid entity type');
    }
    return await this.favoritesRepo.getFavorites();
  }
}
