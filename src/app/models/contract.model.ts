import { RoomType } from './room-type.model';

export interface Contract {
  id: number;
  validFrom: string;
  validTo: string;
  hotelId: number;
}
