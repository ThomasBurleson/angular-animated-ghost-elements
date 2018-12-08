import { AsyncItem } from './async-item';

export interface User {
  id     : string;
  name   : string;
  email  : string;
  avatar?: string;

  company: {
    name : string;
  }
}

export type AsyncUserList = AsyncItem<User>[];