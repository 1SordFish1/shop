import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snak',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './snak.component.html',
  styleUrl: './snak.component.scss'
})
export class SnakComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any,){}
  snackBarRef = inject(MatSnackBarRef);
}
