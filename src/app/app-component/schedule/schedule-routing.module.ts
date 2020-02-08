import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { CalendarComponent } from './calendar';
import { ListScheduleComponent } from './list-schedule';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListScheduleComponent,
       canActivate: [UserService],
       data: {roles: ['subsidiary', 'listSubsidiary']}
    },
    { path: 'calendar', component: CalendarComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'addClient']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {}
