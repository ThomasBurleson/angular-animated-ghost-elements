import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription, BehaviorSubject, of} from 'rxjs';
import { delay, map, withLatestFrom, filter } from 'rxjs/operators';

import { AVATARS } from '../utils/svg-icon/svg-icon.component';

import { AsyncItem, makeAsyncItem, AsyncItemState } from './model/async-item';
import { User, AsyncUserList } from './model/user';

const URL_MOCK_USERS = 'assets/users.json';
const RESPONSE_DELAY = 1750;


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

      const user = { ... item.data };
      const findUserInList = (list:User[]) => {
        const found = list.reduce((found, it) => {
          return found || ((it.email == user.email) ? it : null);
        }, null);
        return found;
      };
      const updateUserInList = (updated, items) => {
        return items.map(it => {
          if ( it.data && (it.data.email == user.email)) {
            it = makeAsyncItem(updated, AsyncItemState.LOADED);
          }
          return it;
        })
      }

      this.http.get(URL_MOCK_USERS).pipe(
        delay(RESPONSE_DELAY),    
        map(injectAvatars ),          // add cartoon avatars     
        map(findUserInList),
        withLatestFrom(this.users$)      
      ).subscribe(([updated, items]) => {        
        this.announcer.next(updateUserInList(updated, items));
      })
      
      // Set item state to 'polling'
      item.state = AsyncItemState.POLLING;
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
  return list.map((user:User) => makeAsyncItem<User>(user, AsyncItemState.LOADING)); 
}

/**
 * Simulate only a partial load of users
 */
function simulatePartialLoads(list) {
  return list.map((it, i) =>{
     const hasData = !!it.data;
     const state = (hasData && ((i+1) % 3)) ?  AsyncItemState.LOADED : AsyncItemState.LOADING; 
      
     return makeAsyncItem(state == AsyncItemState.LOADING ? null : it.data, state);
  }); 
}