import { Module } from '@nestjs/common';
import { InMemoryDBProvider } from 'libs/db/db.provider';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    AlbumsRepo,
    FavoritesRepo,
    TracksRepo,
    InMemoryDBProvider,
  ],
})
export class AlbumsModule {}
