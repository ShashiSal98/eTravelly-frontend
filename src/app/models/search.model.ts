// src/app/models/search.model.ts

export interface RoomRequest {
  numberOfAdults: number;
}

export interface SearchRequest {
  checkInDate: string; // e.g. '2025-07-01'
  nights: number;
  rooms: RoomRequest[];
}

export interface SearchResult {
  hotelName: string;
  roomType: string;
  price: number;
  availability: 'Available' | 'Not Available';
}
export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}