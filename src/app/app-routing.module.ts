import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ErrorComponent} from "./components/error/error.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: UserComponent},
  {path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
