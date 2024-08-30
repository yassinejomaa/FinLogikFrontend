import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

// User registration
register(user: Utilisateur): Observable<any> {
  return this.http.post('http://localhost:8000/api/register', user);
}

// Login
signin(user: Utilisateur): Observable<any> {
  return this.http.post<any>('http://localhost:8000/api/login', user);
}


// Logout
logout(token: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.post<any>('http://localhost:8000/api/logout', null, httpOptions);
}

}