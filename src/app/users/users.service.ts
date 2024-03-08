/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from 'libs/types/types';
import { UsersRepo } from 'src/domain/repos/users.repo';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo) {}

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();

    const newUser: User = {
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const { password, ...userWithoutPassword } = await this.usersRepo.create(
      newUser,
    );

    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.usersRepo.findAll();
    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async findOne(id: Pick<User, 'id'>) {
    const user = await this.usersRepo.findOneById(id);
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updatePassword(id: Pick<User, 'id'>, passwords: UpdatePasswordDto) {
    const passwordIsCompare = await this.usersRepo.comparePassword(
      id,
      passwords,
    );
    if (!passwordIsCompare) {
      return null;
    }
    const { password, ...userWithoutPassword } =
      await this.usersRepo.updatePassword(id, passwords);
    return userWithoutPassword;
  }

  async remove(id: Pick<User, 'id'>) {
    const user = await this.usersRepo.deleteOne(id);
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
