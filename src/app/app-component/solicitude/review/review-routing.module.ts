import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddReviewComponent , EditReviewComponent, ListReviewComponent,
ViewReviewComponent } from '../review';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListReviewComponent,
       canActivate: [UserService],
       data: {roles: ['review', 'listReview']}
    },
    { path: 'new', component: AddReviewComponent,
      canActivate: [UserService],
      data: {roles: ['review', 'addReview']}
    },
    { path: ':id', component: ViewReviewComponent,
      canActivate: [UserService],
      data: {roles: ['review', 'viewReview']}
    },
    { path: ':id/edit', component: EditReviewComponent,
      canActivate: [UserService],
      data: {roles: ['review', 'editReview']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
