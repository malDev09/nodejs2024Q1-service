import { Inject, Injectable } from '@nestjs/common';
import { Album, Database } from 'libs/types/types';
import { UpdateAlbumDto } from 'src/app/albums/dto/update-album.dto';

@Injectable()
export class AlbumsRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async findAll(): Promise<Album[]> {
    return this.inMemoryDB.albums;
  }

  async findOneById(id: Pick<Album, 'id'>): Promise<Album | undefined> {
    return this.inMemoryDB.albums.find((album) => album.id === String(id));
  }

  async create(album: Album): Promise<Album> {
    this.inMemoryDB.albums.push(album);
    return album;
  }

  async update(
    id: Pick<Album, 'id'>,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const albumIndex = this.inMemoryDB.albums.findIndex(
      (album) => album.id === String(id),
    );
    if (albumIndex === -1) {
      return undefined;
    }

    const updatedAlbum = {
      ...this.inMemoryDB.albums[albumIndex],
      ...updateAlbumDto,
    };
    this.inMemoryDB.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  async deleteOne(album: Pick<Album, 'id'>): Promise<Album> {
    const index = this.inMemoryDB.albums.findIndex((u) => u.id === album.id);
    const deletedAlbum = this.inMemoryDB.albums.splice(index, 1)[0];
    return deletedAlbum;
  }

  async updateArtistId(artistId: string, newArtistId: string): Promise<void> {
    this.inMemoryDB.albums
      .filter((album) => album.artistId === artistId)
      .forEach((album) => {
        album.artistId = newArtistId;
      });
  }
}
