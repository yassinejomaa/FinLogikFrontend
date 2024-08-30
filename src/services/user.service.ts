import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  constructor(private http:HttpClient) { }

  getNbreUser():Observable<number>{
    return this.http.get<number>('http://localhost:8000/api/nbreUser');
  }

}
