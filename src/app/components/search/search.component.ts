// src/app/search/search.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService, SearchRequest, SearchResult } from '../../services/search.service';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SearchComponent {
  checkInDate: string = '';
  nights: number = 1;
  numberOfAdults: number = 1;

  results: SearchResult[] = [];
  message: string = '';
  submitted = false;

  availableColumns: string[] = ['hotelName', 'roomTypeName', 'totalPrice', 'availability'];

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) { }

  search(): void {
    this.submitted = true;
    this.message = '';
    this.results = [];

    const request: SearchRequest = {
      checkInDate: this.checkInDate,
      nights: this.nights,
      rooms: [{ numberOfAdults: this.numberOfAdults }],
    };

    this.searchService.searchRooms(request).subscribe(
      (res) => {
        if (Array.isArray(res) && res.length > 0) {
          this.results = res;
          this.snackBar.open('✅ Rooms found!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        } else {
          this.message = '❌ No available rooms found for the given criteria.';
          this.snackBar.open(this.message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      },
      (err) => {
        console.error(err);
        this.message = '❌ No available rooms found for the given criteria.';
        this.snackBar.open(this.message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
  }

}
