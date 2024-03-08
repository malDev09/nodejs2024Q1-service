import { Provider } from '@nestjs/common';
import { database } from './db';

export const InMemoryDBProvider: Provider = {
  provide: 'IN_MEMORY_DB',
  useValue: database,
};
