import { Component, OnInit } from '@angular/core';
import { Subsidiary } from '../../core/models';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services';

@Component({
  selector: 'app-view-subsidiary',
  templateUrl: './view-subsidiary.component.html',
  styleUrls: ['./view-subsidiary.component.css']
})
export class ViewSubsidiaryComponent implements OnInit {
  private model: Subsidiary;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

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

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
