// src/app/services/search.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RoomRequest {
  numberOfAdults: number;
}

export interface SearchRequest {
  checkInDate: string; // ISO date
  nights: number;
  rooms: RoomRequest[];
}

export interface SearchResult {
  hotelName: string;
  roomTypeName: string;
  totalPrice: number;
  availability: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/search';

  constructor(private http: HttpClient) {}

  searchRooms(request: SearchRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}
