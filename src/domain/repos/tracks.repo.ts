import { Inject, Injectable } from '@nestjs/common';
import { Database, Track } from 'libs/types/types';
import { UpdateTrackDto } from 'src/app/tracks/dto/update-track.dto';

@Injectable()
export class TracksRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async findAll(): Promise<Track[]> {
    return this.inMemoryDB.tracks;
  }

  async findOneById(id: Pick<Track, 'id'>): Promise<Track | undefined> {
    return this.inMemoryDB.tracks.find((track) => track.id === String(id));
  }

  async create(track: Track): Promise<Track> {
    this.inMemoryDB.tracks.push(track);
    return track;
  }

  async update(id: Pick<Track, 'id'>, updateTrackDto: UpdateTrackDto) {
    const track = this.inMemoryDB.tracks.find(
      (track) => track.id === String(id),
    );
    if (updateTrackDto.name !== undefined) {
      track.name = updateTrackDto.name;
    }

    if (updateTrackDto.duration !== undefined) {
      track.duration = updateTrackDto.duration;
    }

    return track;
  }

  async deleteOne(track: Pick<Track, 'id'>): Promise<Track> {
    const index = this.inMemoryDB.tracks.findIndex((u) => u.id === track.id);
    const deletedTrack = this.inMemoryDB.tracks.splice(index, 1)[0];
    return deletedTrack;
  }

  async updateArtistId(artistId: string, newArtistId: string): Promise<void> {
    this.inMemoryDB.tracks
      .filter((track) => track.artistId === artistId)
      .forEach((track) => {
        track.artistId = newArtistId;
    });
  }
  async updateAlbumId(albumId: string, newAlbumId: string): Promise<void> {
    this.inMemoryDB.tracks
      .filter((track) => track.albumId === albumId)
      .forEach((track) => {
        track.albumId = newAlbumId;
      });
  }
}
