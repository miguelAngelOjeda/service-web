import { Component, Input } from '@angular/core';

import { Errors } from '../models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    console.log(errorList);
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(
        key =>
        `${key} ${errorList[key]}`
      );
  }

  get errorList() { return this.formattedErrors; }


}
