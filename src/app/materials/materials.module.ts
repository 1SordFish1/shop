import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ConvertCurrencyPipe } from '../shared/pipes/convert-currency.pipe';
import { SpacerDirective } from '../shared/directives/spacer.directive';

const materials = [
  AppRoutingModule,
  HttpClientModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatDividerModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  ConvertCurrencyPipe,
  SpacerDirective
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materials
  ],
  exports: [
    materials
  ]
})
export class MaterialsModule { }
