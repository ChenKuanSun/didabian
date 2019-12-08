import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { AppComponent } from './app.component';
import { FollowOrderComponent } from './follow-order/follow-order.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { MainMenuComponent } from './main-menu/main-menu.component';


const routes: Routes = [
  {
    path: 'menu',
    component: MainMenuComponent,
  },
  {
    path: 'create-order',
    component: CreateOrderComponent,
  },
  {
    path: 'manage-order',
    component: ManageOrderComponent,
  },
  {
    path: 'follow-order',
    component: FollowOrderComponent,
  },
  {
    path: '**',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
