import { Directive, Input, OnInit, OnDestroy, TemplateRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject, throwError } from 'rxjs';
import { Subscription } from 'rxjs';
import { UserService } from '../core/services';

@Directive({ selector: '[appCanAccess]' })
export class CanAccessDirective  implements OnInit, OnDestroy{
    @Input('appCanAccess') appCanAccess: string | string[] = [' ',' '];
    private permission$: Subscription;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private userService: UserService) {
    }

    ngOnInit(): void {
      this.applyPermission();
    }

    private applyPermission(): void {
      this.permission$ = this.userService
                          .checkAuthorization(this.appCanAccess)
        .subscribe(authorized => {
          if (authorized) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        });
    }

    ngOnDestroy(): void {
      this.permission$.unsubscribe();
    }
  }
