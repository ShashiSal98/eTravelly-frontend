// src/app/room-type/room-type.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomType, RoomTypeService } from '../../services/room-type.service';

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
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',  
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
export class RoomTypeComponent implements OnInit {
  roomTypes: RoomType[] = [];
  newRoomType: RoomType = {
    roomTypeName: '',
    pricePerPersonPerNight: 0,
    totalRooms: 0,
    maxAdults: 0,
    contractId: 0
  };
  message = '';

  displayedColumns: string[] = [
  'id', 
  'roomTypeName', 
  'pricePerPersonPerNight', 
  'totalRooms', 
  'maxAdults', 
  'contractId', 
  'actions'
];

constructor(
  private roomTypeService: RoomTypeService,
  private snackBar: MatSnackBar
) {}

  ngOnInit(): void {
    this.loadRoomTypes();
  }

  loadRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe((data) => {
      this.roomTypes = data;
    });
  }

 createRoomType(): void {
  const { roomTypeName, pricePerPersonPerNight, totalRooms, maxAdults, contractId } = this.newRoomType;

  // Simple validation check
  if (!roomTypeName || pricePerPersonPerNight <= 0 || totalRooms <= 0 || maxAdults <= 0 || contractId <= 0) {
    this.snackBar.open('Please fill all fields correctly before submitting.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    return;
  }

  this.roomTypeService.createRoomType(this.newRoomType).subscribe({
    next: () => {
      this.snackBar.open('✅ Room type created successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.newRoomType = {
        roomTypeName: '',
        pricePerPersonPerNight: 0,
        totalRooms: 0,
        maxAdults: 0,
        contractId: 0,
      };
      this.loadRoomTypes();
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('❌ Failed to create room type', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    },
  });
}

deleteRoomType(id: number): void {
  this.roomTypeService.deleteRoomType(id).subscribe({
    next: () => {
      this.snackBar.open('🗑️ Room type deleted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.loadRoomTypes();
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('❌ Failed to delete room type', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    },
  });
}

}
