import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger } from '@angular/animations';

import { Observable, of} from 'rxjs';
import { delay, map, tap, startWith } from 'rxjs/operators';

import { fadeIn, fadeOut } from '../utils/animations/fade-animations';
import { UsersService } from '../users';


@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html', 
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styleUrls: [
    './user-list.component.scss',
    './ghost/ghost-item.component.scss'
  ],
})
export class UserListComponent {
  useSpinner = false;
  users$ = this.service.loadUsers();

  constructor(private service: UsersService) { }

  reloadList(useSpinner = false){
    this.useSpinner = useSpinner;
    this.users$ = this.service.loadUsers()
  }
  
}
