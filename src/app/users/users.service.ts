import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of} from 'rxjs';
import { delay, map, tap, startWith } from 'rxjs/operators';

import { AVATARS } from '../utils/svg-icon/svg-icon.component';
import { User } from './user';

const URL_MOCK_USERS = 'https://jsonplaceholder.typicode.com/users';
const RESPONSE_DELAY = 1750;

@Injectable()
export class UsersService {

  users$ : Observable<User[]>;

  constructor(private http: HttpClient) { }

  loadUsers() {
    return this.http
      .get(URL_MOCK_USERS)
      .pipe(
        delay(RESPONSE_DELAY),        // Simulating network latency 
        map(injectAvatars),           // add cartoon avatars 
        map(simulatePartialLoads),
        startWith(new Array(8))
      );    
  }

}


function wrapAsAsyncItems(list) {
  return injectAvatars(list.map(it => {
    
    return it;
  }));
}

/**
 * The JsonPlaceHolder service does not provide avatar icons
 * so let's inject token avatars
 */
function injectAvatars(users) {
  const addAvatar = (it, i) => it.avatar = AVATARS[i % AVATARS.length];
  users.forEach(addAvatar);
  return users;
}

function simulatePartialLoads(list) {
  return list.map((it, i) => i % 3 ? null : it);
}