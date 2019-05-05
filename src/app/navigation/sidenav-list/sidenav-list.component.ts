import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { UserService } from '../../core/services';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public currentUser;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private userService: UserService,
    public menuItems: MenuItems
  ) {
    this.userService.getUser().subscribe((data) => {
        this.currentUser = data;
    });
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('service-web/login');
  }

}
