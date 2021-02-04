import { Component, OnInit} from '@angular/core';
import { ApiService} from '../../../core/services';
import { FormBuilder} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss']
})
export class PropuestaComponent implements OnInit {

  url:string;
  constructor(private formBuilder: FormBuilder,
  private apiService: ApiService) {

  }
  ngOnInit() {
    this.url = environment.api_url + '/pagoCuotaWs'
    console.log(this.url);
    
  }

  onSubmit() {
    
  }

}
