import { Module } from '@nestjs/common';
import { AlbumsModule } from './app/albums/albums.module';
import { ArtistsModule } from './app/artists/artists.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { TracksModule } from './app/tracks/tracks.module';
import { UsersModule } from './app/users/users.module';
import { InMemoryDBProvider } from 'libs/db/db.provider';

@Module({
  imports: [
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
  ],
  controllers: [],
  providers: [InMemoryDBProvider],
})
export class AppModule {}
