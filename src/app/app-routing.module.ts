import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { RecycleComponent } from './recycle.component';
import {ShareComponent} from './share.component';
import  {StoryComponent} from  './story.component';
import  {LoginComponent} from  './login.component';
import  {SignupComponent} from  './signup.component';
import  {ProfileComponent} from  './profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'signup',
      component: SignupComponent
  },
  {
      path: 'profile',
      component: ProfileComponent
  },
  {
    path: 'home/:id',
    component: HomeComponent
  },
  {
    path: 'recycle',
    component: RecycleComponent
  },
  {
    path: 'story/:id',
    component: StoryComponent
  },
  {
    path: 'share',
    component: ShareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent,RecycleComponent,ProfileComponent,SignupComponent,StoryComponent,LoginComponent,ShareComponent];
