import { Module } from '@nestjs/common';
import { InMemoryDBProvider } from 'libs/db/db.provider';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { ArtistsRepo } from 'src/domain/repos/artists.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsRepo,
    TracksRepo,
    AlbumsRepo,
    InMemoryDBProvider,
  ],
})
export class ArtistsModule {}
