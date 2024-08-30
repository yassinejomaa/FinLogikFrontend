import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorteFeuilleVirtuelleService {

  constructor(private httpClient:HttpClient) { }
  onSave(porteFeuilleToSave: any): Observable<void> {
    return this.httpClient.post<void>('http://localhost:8000/api/portefeuilleVirtuelle', porteFeuilleToSave);
  }



  setValeur(userID: any,val:any): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8000/api/porteFeuille/setValeur/${userID}/${val}`, {});
  }
  sell(userID: any,val:any): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8000/api/porteFeuille/sell/${userID}/${val}`, {});
  }
  
  
  getPortefeuilleUser(userID: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8000/api/porteFeuille/getPortefeuilleUser/${userID}`);
  }

  getPortefeuille(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8000/api/porteFeuille/getPortefeuille/${id}`);
  }
  

  
}
