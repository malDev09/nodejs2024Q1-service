import { Inject, Injectable } from '@nestjs/common';
import { Database, User } from 'libs/types/types';
import { UpdatePasswordDto } from 'src/app/users/dto/update-password.dto';

@Injectable()
export class UsersRepo {
  constructor(@Inject('IN_MEMORY_DB') private readonly inMemoryDB: Database) {}

  async create(user: User): Promise<User> {
    this.inMemoryDB.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.inMemoryDB.users;
  }

  async findOneById(id: Pick<User, 'id'>): Promise<User | undefined> {
    return this.inMemoryDB.users.find((user) => user.id === String(id));
  }

  async updatePassword(
    id: Pick<User, 'id'>,
    passwords: UpdatePasswordDto,
  ): Promise<User> {
    const foundUser = this.inMemoryDB.users.find(
      (user) => user.id === String(id),
    );

    foundUser.password = passwords.newPassword;
    foundUser.version = foundUser.version + 1;
    foundUser.updatedAt = Date.now();

    return this.inMemoryDB.users.find((user) => user.id === String(id));
  }

  async comparePassword(
    id: Pick<User, 'id'>,
    passwords: UpdatePasswordDto,
  ): Promise<boolean> {
    const user = this.inMemoryDB.users.find((user) => user.id === String(id));
    return user ? user.password === String(passwords.oldPassword) : false;
  }

  async deleteOne(user: Pick<User, 'id'>): Promise<User> {
    const index = this.inMemoryDB.users.findIndex((u) => u.id === user.id);
    const deletedUser = this.inMemoryDB.users.splice(index, 1)[0];
    return deletedUser;
  }
}
