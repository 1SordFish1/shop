import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrency',
  standalone: true,
  pure: false
})
export class ConvertCurrencyPipe implements PipeTransform {

  private exchangeRates: { [key: string]: number } = {
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
    const convertedValue = value * (this.exchangeRates[targetCurrency] || 1);
    const symbol = this.symbols[targetCurrency] || '$';

    return `${symbol} ${convertedValue.toFixed(2)}`;
  }

}
