import { Module } from '@nestjs/common';
import { InMemoryDBProvider } from 'libs/db/db.provider';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepo, FavoritesRepo, InMemoryDBProvider],
})
export class TracksModule {}
