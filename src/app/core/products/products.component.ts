import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/common.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-protucts',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  imageUrl = environment.imageUrl;
  isEditor: boolean = false;
  products!: Product[];
  currency: string = 'USD'

  constructor(
    private http: HttpService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.http.isEdit.subscribe((res: any) => {
      if (res !== undefined) {
        this.isEditor = res;
      }
    });
    this.http.currency.subscribe((res: string) => {
      this.currency = res;
    });
    this.getProducts();
  }

  getProducts(): void {
    this.http.getAllProducts().subscribe((prods: any) => {
      if(prods){
        this.products = prods;
        console.log('prods...', this.products);
      }

    });
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
      this.http.deleteProduct(id).subscribe((res: any) => {
        if (res) {
          this.getProducts();
        }
      });
    }
  }
}
