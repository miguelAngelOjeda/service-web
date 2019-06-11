import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, People} from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  public model = new Users;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
     this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
     .subscribe(res => {
       if(res.status == 200){
         this.model = res.model;
       }
     });
   }

}
