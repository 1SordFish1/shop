import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { mergeMap } from 'rxjs';
import { Currency } from 'src/app/shared/models/common.model';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  isChecked!: boolean;
  productId!: number;
  currency!: FormControl;

  currencies: Currency[] = [
    { value: 'USD', view: '$ - Doller' },
    { value: 'INR', view: '₹ - Rupee' },
    { value: 'EUR', view: '€ - Euro' },
    { value: 'GBP', view: '£ - Pound' }
  ]

  constructor(private http:HttpService) {}

  @ViewChild('drawer') drawer!: MatDrawer;

  ngOnInit(): void {
    this.http.openEdit.pipe(mergeMap((res: boolean) => {
      if(res !== undefined) {
        if (res) {
          return this.http.prodId;
        } else {
          return [];
        }
      }
      return [];
    })).subscribe((res: number) => {
      if (res) {
        this.productId = res;
        this.drawer.open()
      }
    });
    this.http.currency.subscribe((res: string) => {
      this.currency = new FormControl(res, [Validators.required]);
    })
  }

  currencyChange() {
    if (this.currency.valid) {
      this.http.currency.next(this.currency.value);
    }
  }

  openAdd(event: any) {
    this.isChecked = false;
    this.http.isEdit.next(this.isChecked);
    event.open();
  }

  closeEditor() :void {
    this.http.openEdit.next(false);
    this.drawer.close();
  }

  toggleSlide(event: any) {
    if (event) {
      this.isChecked = event?.checked
      this.http.isEdit.next(event?.checked);
    }
  }
}
