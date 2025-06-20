// src/app/services/room-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoomType {
  id?: number;
  roomTypeName: string;
  pricePerPersonPerNight: number;
  totalRooms: number;
  maxAdults: number;
  contractId: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {
  private apiUrl = 'http://localhost:8080/api/roomtypes';

  constructor(private http: HttpClient) {}

  getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.apiUrl);
  }

  getRoomTypeById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(`${this.apiUrl}/${id}`);
  }

  createRoomType(roomType: RoomType): Observable<RoomType> {
    return this.http.post<RoomType>(this.apiUrl, roomType);
  }

  updateRoomType(id: number, roomType: RoomType): Observable<RoomType> {
    return this.http.put<RoomType>(`${this.apiUrl}/${id}`, roomType);
  }

  deleteRoomType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
