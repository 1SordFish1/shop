import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';
import { PnfComponent } from './core/pnf/pnf.component';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'', redirectTo: 'app/home', pathMatch: 'full'},
  {path: 'app', component: NavComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProductsComponent}
  ]},
  {path:'**', component: PnfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
