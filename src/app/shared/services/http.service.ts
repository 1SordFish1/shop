import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  api = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAllProducts() {
    return this.http.get(this.api + 'products');
  }

  getSingleProduct(id: number) {
    return this.http.get(this.api + 'products/' + id);
  }

  addProduct(data: any) {
    return this.http.post(this.api + 'addProduct', data);
  }

  updateProduct(id: number,data: any) {
    return this.http.put(this.api + 'update/' + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.api + 'delete/' + id);
  }
}
