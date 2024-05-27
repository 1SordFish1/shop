import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/common.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { SnakService } from 'src/app/shared/services/snak.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-protucts',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  imageUrl = environment.imageUrl;
  isEditor: boolean = false;
  products!: Product[];
  currency: string = 'USD'

  subscriptionObj = new Subscription();

  constructor(
    private http: HttpService,
    private route: Router,
    private snack: SnakService,
  ) { }

  ngOnInit(): void {
    this.subscriptionObj.add(this.http.isEdit.subscribe((res: any) => {
      if (res !== undefined) {
        this.isEditor = res;
      }
    }));
    this.subscriptionObj.add(this.http.currency.subscribe((res: string) => {
      this.currency = res;
    }));
    this.getProducts();
  }

  getProducts(): void {
    this.subscriptionObj.add(this.http.getAllProducts().subscribe((prods: any) => {
      if (prods) {
        this.products = prods;
      }
    }));
  }

  goTo(id: number | undefined | null) {
    if (id !== undefined && id !== null) {
      this.route.navigate(['/app/products', id]);
    }
  }

  editProduct(id: number | undefined | null) {
    if (id !== undefined && id !== null) {
      this.http.prodId.next(id);
      this.http.openEdit.next(true);
    }
  }

  deleteProduct(id: number | undefined | null) {
    if (id !== undefined && id !== null) {
      this.subscriptionObj.add(this.http.deleteProduct(id).subscribe((res: any) => {
        if (res) {
          this.getProducts();
        } else {
          this.snack.showConfirmation('Failed to delete product', 'error');
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
