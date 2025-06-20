import { Contract } from './contract.model';

export class Hotel {
  id?: number;
  hotelName: string = '';
  contracts: Contract[] = [];
}
