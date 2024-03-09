import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'libs/types/types';

@Injectable()
export class AlbumsRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async updateArtistId(artistId: string, newArtistId: string): Promise<void> {
    this.inMemoryDB.albums
      .filter((album) => album.artistId === artistId)
      .forEach((album) => {
        album.artistId = newArtistId;
      });
  }
}
