import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../core/models';
import { ApiService } from '../../core/services';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  private model: Subsidiary;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new Subsidiary();
   }

   ngOnInit() {
     this.apiService.get('/sucursales/' + this.route.snapshot.params.id)
     .subscribe(res => {
        this.model = res.model as Subsidiary;
     });
   }

}
