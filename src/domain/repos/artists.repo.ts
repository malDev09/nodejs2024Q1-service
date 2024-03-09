import { Inject, Injectable } from '@nestjs/common';
import { Artist, Database } from 'libs/types/types';
import { UpdateArtistDto } from 'src/app/artists/dto/update-artist.dto';

@Injectable()
export class ArtistsRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async findAll(): Promise<Artist[]> {
    return this.inMemoryDB.artists;
  }

  async findOneById(id: Pick<Artist, 'id'>): Promise<Artist | undefined> {
    return this.inMemoryDB.artists.find((artist) => artist.id === String(id));
  }

  async create(artist: Artist): Promise<Artist> {
    this.inMemoryDB.artists.push(artist);
    return artist;
  }

  async update(id: Pick<Artist, 'id'>, updateArtistDto: UpdateArtistDto) {
    const artist = this.inMemoryDB.artists.find(
      (artist) => artist.id === String(id),
    );
    if (updateArtistDto.name !== undefined) {
      artist.name = updateArtistDto.name;
    }

    if (updateArtistDto.grammy !== undefined) {
      artist.grammy = updateArtistDto.grammy;
    }

    return artist;
  }

  async deleteOne(artist: Pick<Artist, 'id'>): Promise<Artist> {
    const index = this.inMemoryDB.artists.findIndex((u) => u.id === artist.id);
    const deletedArtist = this.inMemoryDB.artists.splice(index, 1)[0];

    return deletedArtist;
  }
}
