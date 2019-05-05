import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, People, Rol, Subsidiary, Business } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  private model: Users;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
      this.model = new Users;
      this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model;
         console.log(this.model );
      });
   }

   ngOnInit() {

   }

}
