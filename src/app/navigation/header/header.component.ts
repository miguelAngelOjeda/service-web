import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../core/services';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

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
