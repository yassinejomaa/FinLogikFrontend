import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register',
  };
  constructor() { }
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken(): boolean {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    }

    // If token doesn't exist or payload couldn't be extracted, return false
    return false;
  }
  payload(token: string): any {
    if (!token) {
      console.error('Token is undefined or empty');
      return null;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      console.error('Token is not a valid JWT (expected three parts)');
      return null;
    }

    const base64Url = parts[1];
    
    // Replace URL-safe characters with standard base64 characters
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if necessary
    const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');

    try {
      const jsonPayload = atob(paddedBase64);
      return JSON.parse(jsonPayload);
    } catch (e: any) {
      console.error('Error decoding JWT token:', e.message);
      return null;
    }
  }
  

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
 
  removeToken() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userName')
  }
}
