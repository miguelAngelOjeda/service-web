import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '@core/service';
import { CheckReviewComponent,
ViewCheckReviewComponent, ListCheckReviewComponent } from '../check-review';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCheckReviewComponent,
       canActivate: [UserService],
       data: {roles: ['check-review', 'listCheckReview']}
    },
    { path: ':id', component: ViewCheckReviewComponent,
      canActivate: [UserService],
      data: {roles: ['check-review', 'viewCheckReview']}
    },
    { path: ':id/review', component: CheckReviewComponent,
      canActivate: [UserService],
      data: {roles: ['check-review', 'editCheckReview']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckReviewRoutingModule {}
