import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger } from '@angular/animations';

import { Observable, of} from 'rxjs';
import { delay, map, tap, startWith } from 'rxjs/operators';

import { fadeIn, fadeOut } from '../utils/animations/fade-animations';
import { UsersService, User, AsyncItem, makeAsyncItem, AsyncItemState, queryState } from '../users';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html', 
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn()) 
  ],
  styleUrls: [
    './user-list.component.scss',
    './ghost/ghost-item.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  state = queryState;                   // access to determine async state
  users$ = this.service.loadUsers();    // users enclosed in AsyncItem wrappers

  constructor(private service: UsersService) { }

  /**
   * Use 'uid' if not a ghost... otherwise just create a number...
   */ 
  trackByFn(index:number, user: AsyncItem<User>) {
    return user.data ? user.data.id : 0; 
  }

}


