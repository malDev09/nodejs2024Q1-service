import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorCodes } from 'libs/error-codes.enum';
import { isUuid } from 'libs/helpers';
import { Album } from 'libs/types/types';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException(ErrorCodes.NAME_AND_YEAR_ARE_REQUIRED);
    }
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: Pick<Album, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }

    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException(ErrorCodes.ALBUM_NOT_FOUND);
    }

    return album;
  }

  @Put(':id')
  @HttpCode(200)
  async updateAlbum(
    @Param('id') id: Pick<Album, 'id'>,
    @Body() albumData: UpdateAlbumDto,
  ): Promise<Album> {
    if (
      (albumData.name && typeof albumData.name !== 'string') ||
      (albumData.year && typeof albumData.year !== 'number')
    ) {
      throw new BadRequestException(ErrorCodes.INVALID_TYPES);
    }
    await this.findOne(id);

    return await this.albumsService.update(id, albumData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: Pick<Album, 'id'>) {
    await this.findOne(id);
    await this.albumsService.remove(id);
    return 'Successfully removed';
  }
}
