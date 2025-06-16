import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'convertCurrency',
  standalone: true,
  pure: false
})
export class ConvertCurrencyPipe implements PipeTransform {

  constructor(private currencyService: CurrencyService) {}

  private fallbackRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    INR: 83.06
  };

  private symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹'
  };

  transform(value: number | undefined | null, targetCurrency: string = 'USD'): string {
    if (!value || isNaN(value) || value === undefined || value === null ) {
      return '';
    }
    const stored = this.currencyService.getStoredRates();
    const rates = stored?.rates ?? this.fallbackRates;

    const convertedValue = value * (rates[targetCurrency] || 1);
    const symbol = this.symbols[targetCurrency] || '$';

    return `${symbol} ${convertedValue.toFixed(2)}`;
  }

}
