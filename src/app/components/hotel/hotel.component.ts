import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HotelService, Hotel, Contract } from '../../services/hotel.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
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
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];

  newHotel: Hotel = { hotelName: '', contracts: [] };
  editingHotel: Hotel | null = null;

  newContract: Contract = {
    validFrom: '',
    validTo: ''
  };

  message: string = '';

displayedColumns: string[] = ['id', 'hotelName', 'actions'];
  constructor(private hotelService: HotelService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data;
    });
  }

  addContract(): void {
    if (!this.newHotel.contracts) {
      this.newHotel.contracts = [];
    }
    this.newHotel.contracts.push({ ...this.newContract });
    this.newContract = { validFrom: '', validTo: '' };
  }


  createHotel(form: NgForm): void {
    if (form.invalid || !this.newHotel.hotelName.trim()) {
      this.snackBar.open('Please enter a hotel name before creating.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    this.hotelService.createHotel(this.newHotel).subscribe({
      next: () => {
        this.snackBar.open('✅ Hotel created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.newHotel = { hotelName: '', contracts: [] };
        this.loadHotels();
        form.resetForm();
      },
      error: (err) => {
        this.snackBar.open('❌ Failed to create hotel. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error(err);
      },
    });
  }


  editHotel(hotel: Hotel): void {
    this.editingHotel = {
      id: hotel.id, // Keep the ID intact
      hotelName: hotel.hotelName,
      // Deep copy contracts to avoid reference issues
      contracts: hotel.contracts.map(c => ({ ...c }))
    };
  }

  updateHotel(): void {
    if (!this.editingHotel || this.editingHotel.id == null) {
      this.message = 'Invalid hotel data. Cannot update.';
      return;
    }

    this.hotelService.updateHotel(this.editingHotel.id, this.editingHotel).subscribe({
      next: () => {
        this.message = 'Hotel updated successfully';
        this.editingHotel = null;
        this.loadHotels();
      },
      error: (err) => {
        this.message = 'Failed to update hotel';
        console.error(err);
      }
    });
  }

  cancelEdit(): void {
    this.editingHotel = null;
  }

deleteHotel(id: number): void {
  this.hotelService.deleteHotel(id).subscribe({
    next: () => {
      this.snackBar.open('🗑️ Hotel deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.loadHotels();
    },
    error: (err) => {
      this.snackBar.open('❌ Failed to delete hotel. Try again.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.error(err);
    },
  });
}

}
