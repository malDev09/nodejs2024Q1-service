import { Injectable } from '@nestjs/common';
import { Artist } from 'libs/types/types';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { ArtistsRepo } from 'src/domain/repos/artists.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsRepo: ArtistsRepo,
    private tracksRepo: TracksRepo,
    private albumsRepo: AlbumsRepo,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist: Artist = {
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    return await this.artistsRepo.create(newArtist);
  }

  async findAll() {
    return await this.artistsRepo.findAll();
  }

  async findOne(id: Pick<Artist, 'id'>) {
    return await this.artistsRepo.findOneById(id);
  }

  async update(id: Pick<Artist, 'id'>, updateArtistDto: UpdateArtistDto) {
    return await this.artistsRepo.update(id, updateArtistDto);
  }

  async remove(id: Pick<Artist, 'id'>) {
    const artist = await this.artistsRepo.deleteOne(id);
    if (!artist) {
      return null;
    }

    await Promise.all([
      this.tracksRepo.updateArtistId(artist.id, null),
      this.albumsRepo.updateArtistId(artist.id, null),
    ]);

    return artist;
  }
}
