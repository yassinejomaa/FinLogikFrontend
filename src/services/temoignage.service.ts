import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temoignage } from 'src/models/Temoignage';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Temoignage[]>{
    return this.http.get<Temoignage[]>(`http://localhost:8000/api/TemoiActive`);
  }
  envoyerTemoignage(temoi:any):Observable<void>{
    return this.http.post<void>(`http://localhost:8000/api/temoignages`,temoi);
  }
  getAlltemoi():Observable<Temoignage[]>{
    return this.http.get<Temoignage[]>(`http://localhost:8000/api/temoignages`);
  }
  deleteTemoi(id:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8000/api/temoignages/${id}`);

  }
  accepteTemoi(id:number):Observable<void>{
    return this.http.put<void>(`http://localhost:8000/api/accepteTem/${id}`,null);

  }
  refuserTemoi(id:number):Observable<void>{
    return this.http.put<void>(`http://localhost:8000/api/refuseTem/${id}`,null);

  }
  getNumberTemoi():Observable<number>{
    return this.http.get<number>(`http://localhost:8000/api/nbreTemoi`);
  }
  getNumberTemoiActive():Observable<number>{
    return this.http.get<number>(`http://localhost:8000/api/nbreTemoiActive`);
  }
  getNumberTemoiInActive():Observable<number>{
    return this.http.get<number>(`http://localhost:8000/api/nbreTemoiInactive`);
  }

}
