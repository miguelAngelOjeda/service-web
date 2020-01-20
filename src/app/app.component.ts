import { Component , OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from './core';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    var path = location;
    if(path.toString().includes('/member-solicitude/add-request/')){
      this.solicitudeService(path.toString());
    }else{
      this.userService.populate();
    }
  }

  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 2000,
      });
   }

   public solicitudeService(path:string){
     try {
       var token = path.split('/member-solicitude/add-request/')[1];
       window.localStorage.setItem('type_token', 'X-Token');
       window.localStorage['jwtToken'] = token;
       if(this.jwtHelper.isTokenExpired()){
         //Retornar un mensaje de que su session expiro
         this.snackbar.openSnackBar('Servicio ha caducado.','Close','red-snackbar');
         window.localStorage.removeItem('jwtToken');
         window.localStorage.removeItem('type_token');
         window.localStorage.removeItem('user');
         //window.location.href = "https://www.coomecipar.coop.py/";
         //window.open("https://www.coomecipar.coop.py/");
         //window.close();
         //this.router.navigateByUrl('service-web/login');
       }

     }
     catch (error) {
       //window.location.href = "https://www.coomecipar.coop.py/";
       //window.open("https://www.coomecipar.coop.py/");
       //window.close();
       //this.router.navigateByUrl('service-web/login');
     }
   }

}
