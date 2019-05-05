import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, People, Rol, Subsidiary, Business } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-profile-users',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  private model: Users;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
      this.model = new Users;
   }

   ngOnInit() {
     this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
     .subscribe(res => {
        this.model = res.model;
        console.log(this.model );
     });
   }

}
