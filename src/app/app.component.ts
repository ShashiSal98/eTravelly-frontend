import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
 constructor(private router: Router) {}

  goToSearch(): void {
    this.router.navigate(['/search']);
  }
}