import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  datos: any;
  login = false;
  constructor() { }
}
