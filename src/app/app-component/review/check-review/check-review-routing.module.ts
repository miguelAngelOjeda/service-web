import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { CheckReviewComponent,
ViewCheckReviewComponent, ListCheckReviewComponent } from '../check-review';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCheckReviewComponent,
       canActivate: [UserService],
       data: {roles: ['my-review', 'listMyReview']}
    },
    { path: ':id', component: ViewCheckReviewComponent,
      canActivate: [UserService],
      data: {roles: ['my-review', 'viewMyReview']}
    },
    { path: ':id/review', component: CheckReviewComponent,
      canActivate: [UserService],
      data: {roles: ['my-review', 'editMyReview']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyReviewRoutingModule {}
