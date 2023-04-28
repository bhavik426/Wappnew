import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { ChatlayoutComponent } from './chat/chatlayout/chatlayout.component';
import { ChattingComponent } from './chat/chatting/chatting.component';

const routes: Routes = [
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: '', redirectTo: '/signin', pathMatch: 'full'
  },
  {
    path: 'chat', component: ChatlayoutComponent,children:[
      {
        path:'name/:name', component:ChattingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
