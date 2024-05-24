import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-protucts',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  imageUrl = environment.imageUrl;
  products: any[] = [];
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.http.getAllProducts().subscribe((prods: any) => {
      this.products = prods;
      console.log('prods...', this.products);

    });
  }
}
