import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ErrorCodes } from 'libs/error-codes.enum';
import { isUuid } from 'libs/helpers';
import { Album, Artist, Favorites, Track } from 'libs/types/types';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(): Promise<Favorites> {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @HttpCode(201)
  async addFavoriteTrack(
    @Param('id') id: Pick<Track, 'id'>,
  ): Promise<Favorites> {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.addFavorite(id, 'track');
  }

  @Post('/artist/:id')
  @HttpCode(201)
  async addFavoriteArtist(
    @Param('id') id: Pick<Artist, 'id'>,
  ): Promise<Favorites> {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.addFavorite(id, 'artist');
  }

  @Post('/album/:id')
  @HttpCode(201)
  async addFavoriteAlbum(
    @Param('id') id: Pick<Album, 'id'>,
  ): Promise<Favorites> {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.addFavorite(id, 'album');
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteFavoriteTrack(@Param('id') id: Pick<Track, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.deleteFavorite(id, 'track');
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteFavoriteArtist(@Param('id') id: Pick<Artist, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.deleteFavorite(id, 'artist');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteFavoriteAlbum(@Param('id') id: Pick<Album, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }
    return await this.favoritesService.deleteFavorite(id, 'album');
  }
}
