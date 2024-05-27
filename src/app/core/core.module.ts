import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PnfComponent } from './pnf/pnf.component';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    ProductsComponent,
    DetailsComponent,
    AddProductComponent,
    PnfComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    SharedModule
  ]
})
export class CoreModule { }
