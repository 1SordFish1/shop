import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  api = environment.apiUrl;
  isEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  openEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  prodId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currency: BehaviorSubject<string> = new BehaviorSubject<string>('USD');
  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
