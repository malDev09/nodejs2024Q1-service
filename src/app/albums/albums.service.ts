import { Injectable } from '@nestjs/common';
import { Album } from 'libs/types/types';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private albumsRepo: AlbumsRepo,
    private tracksRepo: TracksRepo,
    private readonly favoritesRepo: FavoritesRepo,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const newAlbum: Album = {
      id,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    };

    return await this.albumsRepo.create(newAlbum);
  }

  async findAll() {
    return await this.albumsRepo.findAll();
  }

  async findOne(id: Pick<Album, 'id'>) {
    return await this.albumsRepo.findOneById(id);
  }

  async update(id: Pick<Album, 'id'>, updateAlbumDto: UpdateAlbumDto) {
    const existingAlbum = await this.albumsRepo.findOneById(id);
    if (!existingAlbum) {
      return null;
    }

    return await this.albumsRepo.update(id, updateAlbumDto);
  }

  async remove(id: Pick<Album, 'id'>) {
    const album = await this.albumsRepo.deleteOne(id);
    if (!album) {
      return null;
    }

    await this.tracksRepo.updateAlbumId(album.id, null);
    await this.favoritesRepo.deleteFavoriteAlbum(id);

    return album;
  }
}
