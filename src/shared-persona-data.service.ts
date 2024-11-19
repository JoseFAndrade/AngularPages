import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPersonaDataService {
  private persona = new BehaviorSubject<any>(undefined);

  constructor() { }

  setData(data: any){
    this.persona.next(data);
  }

  getData$(): Observable<any>{
    return this.persona;
  }
}
