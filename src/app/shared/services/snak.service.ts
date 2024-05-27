import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakComponent } from '../components/snak/snak.component';

@Injectable({
  providedIn: 'root'
})
export class SnakService {

  constructor(private snak: MatSnackBar) {}
  showConfirmation(message: string, action: string) {
    return this.snak.openFromComponent(SnakComponent,{
      data: {
        content: message,
      },
      panelClass: action,
      verticalPosition: 'top'
    });
  }
}
