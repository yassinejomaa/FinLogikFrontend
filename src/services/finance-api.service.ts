import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceApiService {
  private urlBeg = 'https://alpha-vantage.p.rapidapi.com/query?datatype=json&function=SYMBOL_SEARCH&keywords=';
  private dailyBeg = 'https://alpha-vantage.p.rapidapi.com/query?outputsize=full&function=TIME_SERIES_DAILY&symbol=';
  private apiKey = 'f919698659msh8ab755e83ecb71dp1d96ccjsn3e0f31000c4f';
  private apiYahooFinance='https://yahoo-finance-api-data.p.rapidapi.com/summary/option-price?symbol=';
  private yahooSearch='https://yahoo-finance-api-data.p.rapidapi.com/search/symbol?keyword=';

  constructor(private http: HttpClient) { }

  search(symbol: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });
    return this.http.get<any[]>(`${this.urlBeg}${symbol}`, { headers });
  }

  daily(symbol: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });
    return this.http.get<any[]>(`${this.dailyBeg}${symbol}`, { headers });
  }

  summary(symbol: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'yahoo-finance-api-data.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiYahooFinance}${symbol}`, { headers });
  }
  searchYahoo(symbol: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'yahoo-finance-api-data.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });
    return this.http.get<any[]>(`${this.yahooSearch}${symbol}&limit=10`, { headers });
  }
}
