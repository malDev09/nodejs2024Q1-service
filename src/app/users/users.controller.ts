import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorCodes } from 'libs/error-codes.enum';
import { isUuid } from 'libs/helpers';
import { User } from 'libs/types/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException(ErrorCodes.USER_AND_PASSWORD_ARE_REQUIRED);
    }

    if (createUserDto.login.length < 3 || createUserDto.password.length < 6) {
      throw new BadRequestException(ErrorCodes.INVALID_LOGIN_OR_PASSWORD);
    }

    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: Pick<User, 'id'>) {
    if (!isUuid(String(id))) {
      throw new BadRequestException(ErrorCodes.INVALID_UUID_ERROR_MESSAGE);
    }

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(ErrorCodes.USER_NOT_FOUND);
    }

    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Put(':id')
  @HttpCode(200)
  async updatePassword(
    @Param('id') id: Pick<User, 'id'>,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (
      !updatePasswordDto ||
      !updatePasswordDto.oldPassword ||
      !updatePasswordDto.newPassword
    ) {
      throw new BadRequestException(ErrorCodes.INVALID_DTO);
    }
    await this.findOne(id);
    const userUpdated = await this.usersService.updatePassword(
      id,
      updatePasswordDto,
    );
    if (!userUpdated) {
      throw new ForbiddenException(ErrorCodes.INCORRECT_OLD_PASSWORD);
    }
    return userUpdated;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: Pick<User, 'id'>) {
    await this.findOne(id);
    await this.usersService.remove(id);
    return 'Successfully removed';
  }
}
