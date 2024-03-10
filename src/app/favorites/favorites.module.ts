import { Module } from '@nestjs/common';
import { InMemoryDBProvider } from 'libs/db/db.provider';
import { AlbumsRepo } from 'src/domain/repos/albums.repo';
import { ArtistsRepo } from 'src/domain/repos/artists.repo';
import { FavoritesRepo } from 'src/domain/repos/favorites.repo';
import { TracksRepo } from 'src/domain/repos/tracks.repo';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesRepo,
    TracksRepo,
    AlbumsRepo,
    ArtistsRepo,
    InMemoryDBProvider,
  ],
})
export class FavoritesModule {}
