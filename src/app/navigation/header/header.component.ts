import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../core/services';
import { Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlImage = environment.api_url;
  @Output() public sidenavToggle = new EventEmitter();
  public currentUser;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
      this.userService.getUser().subscribe((data) => {
          this.currentUser = data;
      });
   }

  ngOnInit() {
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('service-web/login');
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
