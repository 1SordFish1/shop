import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  initCurrencyRates(): void {
    const cached = sessionStorage.getItem('currencyRates');
    if (!cached) {
      this.http.get('https://api.exchangerate-api.com/v4/latest/USD')
        .subscribe((data) => {
          sessionStorage.setItem('currencyRates', JSON.stringify(data));
        });
    }
  }

  getStoredRates(): any {
    const data = sessionStorage.getItem('currencyRates');
    return data ? JSON.parse(data) : null;
  }
}
