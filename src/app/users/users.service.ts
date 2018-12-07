import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription, BehaviorSubject, of} from 'rxjs';
import { delay, map, withLatestFrom, filter } from 'rxjs/operators';

import { AVATARS } from '../utils/svg-icon/svg-icon.component';

import { AsyncItem, makeAsyncItem } from './model/async-item';
import { User } from './model/user';

const URL_MOCK_USERS = 'https://jsonplaceholder.typicode.com/users';
const RESPONSE_DELAY = 1750;

export type AsyncUserList = AsyncItem<User>[];

@Injectable()
export class UsersService {
  private request: Subscription;
  private announcer = new BehaviorSubject<AsyncUserList>(buildGhosts());
  
  users$ = this.announcer.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * 
   */
  loadUsers() : Observable<AsyncItem<User>[]> {   
    this.announcer.next(buildGhosts());
    this.queryServer();

    return this.users$;
  }


  refreshUser(item:AsyncItem<User>) {
      if ( !item.data ) return;

      const uid = item.data.email;   // save reference to uid

      item.isLoading = true;
      item.uid       = uid;
      item.data      = null;             // clear current data
     
      this.http.get(URL_MOCK_USERS).pipe(
        delay(RESPONSE_DELAY),    
        map(injectAvatars ),          // add cartoon avatars     
        map((list:User[]) => {
          const found = list.reduce((found, it) => {
            return found || ((it.email == uid) ? it : null);
          }, null);
          return found;
        }),
        withLatestFrom(this.users$)      
      ).subscribe(([user, items]) => {
        
        this.announcer.next(items.map(it => {
          return (it.uid == user.email) ? {
            ...it,
            isLoading: false,
            data: user
          } : it;
        }));
      })
  }

  // ***************************************************************
  // Private Methods
  // ***************************************************************

  private queryServer() {
    const response$ = this.http.get(URL_MOCK_USERS);

    this.request && this.request.unsubscribe();
    this.request = response$.pipe(
          delay(RESPONSE_DELAY),        // Simulating network latency 
          map(injectAvatars ),          // add cartoon avatars 
          map(wrapAsAsyncItems),        // add AsyncItem wrappers
          map(simulatePartialLoads)     // simulate partial response 
        )
        .subscribe(list => {
            this.announcer.next(list);
        });
  }

}

// ********************************************************
// ****************   Utils
// ********************************************************

/**
 * Build initial list of Ghost elements
 */
function buildGhosts(): AsyncUserList {
  const ghosts = new Array(10).fill(null);
  return wrapAsAsyncItems(ghosts);
}

/**
 * Inject avatar names for each user
 */
function injectAvatars(users) {
  const addAvatar = (it, i) => {
    it.avatar = AVATARS[i % AVATARS.length]; 
  };
  users.forEach(addAvatar);
  return users;
}

/**
 * Wrap `user` values for async presentation with ghosts
 */
function wrapAsAsyncItems(list) {
  return list.map((it:User) => makeAsyncItem<User>(it)); 
}

/**
 * Simulate only a partial load of users
 */
function simulatePartialLoads(list) {
  return list.map((it, i) =>{
     const hasData = !!it.data;
     const user = (hasData && ((i+1) % 3)) ? it.data : null; 
      
     return {
       ...it,
       isLoading: !user,
       data: user
     };
  }); 
}