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
import { Artist } from 'libs/types/types';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException(ErrorCodes.NAME_AND_GRAMMY_ARE_REQUIRED);
    }

    return this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: Pick<Artist, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }

    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException(ErrorCodes.ARTIST_NOT_FOUND);
    }
    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  async updateTrack(
    @Param('id') id: Pick<Artist, 'id'>,
    @Body() artistData: UpdateArtistDto,
  ): Promise<Artist> {
    if (
      (artistData.name && typeof artistData.name !== 'string') ||
      (artistData.grammy && typeof artistData.grammy !== 'number')
    ) {
      throw new BadRequestException(ErrorCodes.INVALID_ARTIST_TYPES);
    }
    await this.findOne(id);

    return await this.artistsService.update(id, artistData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: Pick<Artist, 'id'>) {
    await this.findOne(id);
    await this.artistsService.remove(id);
    return 'Successfully removed';
  }
}
