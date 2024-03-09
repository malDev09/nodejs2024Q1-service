import { Module } from '@nestjs/common';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { InMemoryDBProvider } from 'libs/db/db.provider';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepo, InMemoryDBProvider],
})
export class TracksModule {}
