import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { ReviewComponent,
ViewMyReviewComponent, ListMyReviewComponent } from '../my-review';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListMyReviewComponent,
       canActivate: [UserService],
       data: {roles: ['my-review', 'listMyReview']}
    },
    { path: ':id', component: ViewMyReviewComponent,
      canActivate: [UserService],
      data: {roles: ['my-review', 'viewMyReview']}
    },
    { path: ':id/review', component: ReviewComponent,
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
