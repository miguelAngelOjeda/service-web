import { Component, OnInit} from '@angular/core';
import { ApiService} from '../../../core/services';
import { FormBuilder} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-cuotasWs',
  templateUrl: './cuotasWs.component.html',
  styleUrls: ['./cuotasWs.component.css']
})
export class UploadCuotasWsComponent implements OnInit{
  
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file);
        formData.append('dataType', '.txt');
        console.log(file);

        this.apiService.post('/pagoCuotaWs/upload', formData)
          .subscribe(res => {
            if(res.status == 200){
              console.log('Respuesta exitosa - Server Api');
            }
          });
        
    }
  }

}
