import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { ListReviewComponent, ViewReviewComponent } from '../review';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListReviewComponent,
       canActivate: [UserService],
       data: {roles: ['review', 'listReview']}
    },
    { path: ':id', component: ViewReviewComponent,
      canActivate: [UserService],
      data: {roles: ['review', 'viewReview']}
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
