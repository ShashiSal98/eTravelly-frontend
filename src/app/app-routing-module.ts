import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './components/hotel/hotel.component';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { ContractComponent } from './components/contract/contract.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'hotels', component: HotelComponent },
  { path: 'room-types', component: RoomTypeComponent },
  { path: 'contracts', component: ContractComponent },
  { path: 'search', component: SearchComponent },


  { path: '', redirectTo: '/hotels', pathMatch: 'full' },  // default route
  { path: '**', redirectTo: '/hotels' }  // wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
