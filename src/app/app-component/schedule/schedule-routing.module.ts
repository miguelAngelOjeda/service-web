import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { CalendarComponent } from './calendar';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: CalendarComponent,
       canActivate: [UserService],
       data: {roles: ['subsidiary', 'listSubsidiary']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {}
