import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, People} from '../../../core/models';
import { ApiService } from '../../../core/services';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-view-userspb',
  templateUrl: './view-userspb.component.html',
  styleUrls: ['./view-userspb.component.scss']
})
export class ViewUserspbComponent implements OnInit {
  private model = new Users;
  urlImage = environment.api_url;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model;
    });
  }
}
