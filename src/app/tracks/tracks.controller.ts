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
import { Track } from 'libs/types/types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException(ErrorCodes.NAME_AND_DURATION_ARE_REQUIRED);
    }
    // if (
    //   !isUuid(String(createTrackDto.albumId)) ||
    //   !isUuid(String(createTrackDto.artistId))
    // ) {
    //   throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    // }
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: Pick<Track, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }

    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(ErrorCodes.TRACK_NOT_FOUND);
    }

    return track;
  }

  @Put(':id')
  @HttpCode(200)
  async updateTrack(
    @Param('id') id: Pick<Track, 'id'>,
    @Body() trackData: UpdateTrackDto,
  ): Promise<Track> {
    if (
      (trackData.name && typeof trackData.name !== 'string') ||
      (trackData.duration && typeof trackData.duration !== 'number')
    ) {
      throw new BadRequestException(ErrorCodes.INVALID_TYPES);
    }
    await this.findOne(id);

    return await this.tracksService.update(id, trackData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: Pick<Track, 'id'>) {
    await this.findOne(id);
    await this.tracksService.remove(id);
    return 'Successfully removed';
  }
}
