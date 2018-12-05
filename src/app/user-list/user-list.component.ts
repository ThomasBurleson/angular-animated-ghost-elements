import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger } from '@angular/animations';

import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { AVATARS } from '../utils/svg-icon/svg-icon.component';
import { fadeIn, fadeOut } from '../utils/animations/fade-animations';

const URL_MOCK_USERS = 'https://jsonplaceholder.typicode.com/users';
const RESPONSE_DELAY = 1750;

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html', 
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styleUrls: [
    'user-list.component.scss'
  ],
})
export class UserListComponent {
  ghosts = [];
  useSpinner = false;

  users$ : Observable<any[]>

  constructor(private http: HttpClient) { 
    this.reloadList();
  }

  reloadList(useSpinner = false){
    this.useSpinner = useSpinner;

    this.ghosts = new Array(8);       // Mock Ghost items
    this.users$ = this.http
      .get(URL_MOCK_USERS)
      .pipe(
        delay(RESPONSE_DELAY),        // Simulating network latency 
        map(injectAvatars),           // add cartoon avatars 
        tap(() => this.ghosts = [])   // clear ghosts
      );    
  }
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
