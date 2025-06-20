// src/app/contract/contract.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contract, ContractService } from '../../services/contract.service';

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
  selector: 'app-contract',
  templateUrl: './contract.component.html',
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
export class ContractComponent implements OnInit {
  contracts: Contract[] = [];
  newContract: Contract = {
    validFrom: '',
    validTo: '',
    hotelId: 0
  };
  message = '';

  displayedColumns: string[] = ['id', 'hotelId', 'validFrom', 'validTo', 'actions'];
  constructor(
    private contractService: ContractService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractService.getContracts().subscribe((data) => {
      this.contracts = data;
    });
  }

createContract(): void {
  if (!this.newContract.hotelId || !this.newContract.validFrom || !this.newContract.validTo) {
    this.snackBar.open('Please fill all fields to create a contract.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    return;
  }

  this.contractService.createContract(this.newContract).subscribe({
    next: () => {
      this.snackBar.open('✅ Contract created successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.newContract = { validFrom: '', validTo: '', hotelId: 0 };
      this.loadContracts();
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('❌ Failed to create contract', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    },
  });
}


deleteContract(id: number): void {
  this.contractService.deleteContract(id).subscribe({
    next: () => {
      this.snackBar.open('🗑️ Contract deleted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.loadContracts();
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('❌ Failed to delete contract', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    },
  });
}

}
