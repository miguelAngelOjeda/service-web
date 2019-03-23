import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../core/models';
import { UserService } from '../core/services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    @Output()
    public sidenavToggle = new EventEmitter();

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }

    private loadAllUsers() {
      this.userService.get('/tokens_user').pipe(first()).subscribe(users => {
          this.users = users;
      });
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.users = users;
        // });
    }
}
