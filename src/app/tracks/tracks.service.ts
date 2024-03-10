import { Injectable } from '@nestjs/common';
import { Track } from 'libs/types/types';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    private tracksRepo: TracksRepo,
    private readonly favoritesRepo: FavoritesRepo,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const newTrack: Track = {
      id,
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
      albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    };

    return await this.tracksRepo.create(newTrack);
  }

  async findAll() {
    return await this.tracksRepo.findAll();
  }

  async findOne(id: Pick<Track, 'id'>) {
    return await this.tracksRepo.findOneById(id);
  }

  async update(id: Pick<Track, 'id'>, updateTrackDto: UpdateTrackDto) {
    return await this.tracksRepo.update(id, updateTrackDto);
  }

  async remove(id: Pick<Track, 'id'>): Promise<Track> {
    const track = await this.tracksRepo.deleteOne(id);
    if (!track) {
      return null;
    }
    await this.favoritesRepo.deleteFavoriteTrack(id);
    return track;
  }
}
