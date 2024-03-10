import { Module } from '@nestjs/common';
import { UsersRepo } from 'src/domain/repos/users.repo';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryDBProvider } from 'libs/db/db.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepo, InMemoryDBProvider],
})
export class UsersModule {}
