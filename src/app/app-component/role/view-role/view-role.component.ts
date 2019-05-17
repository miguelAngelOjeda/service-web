import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role, Authorities } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-role-types',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
    private model = new Role;
    private authorities: Array<Authorities> = [];
    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.apiService.get('/roles/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as Role;
      });
      this.apiService.getPageList('/roles/group',false)
      .subscribe(res => {
          this.authorities = res.rows;
          this.authorities.forEach(item => {
            item.authority = [];
             this.model.authorities.forEach(authModel=> {
               if(item.grupo === authModel.grupo){
                 item.authority.push(authModel);
               }
             });

          });
      });


    }


}
