import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class TransactionsService {

  constructor(private httpClient:HttpClient) { }
  onSave(transactionToSave: any): Observable<void> {
    return this.httpClient.post<void>('http://localhost:8000/api/transaction', transactionToSave);
  }
  setLimitBuy(idtransaction: any): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8000/api/transactions/setlimitbuy/${idtransaction}`, {});
  }
  
  
  getLimitBuy(userID: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8000/api/transactions/limitbuy/${userID}`);
  }
  getQuantiteParActifEtTypeTransaction(userID: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8000/api/transactions/getQuantiteParActifEtTypeTransaction/${userID}`);
  }
  nbreTransactionLimitBuy():Observable<number>{
    return this.httpClient.get<number>(`http://localhost:8000/api/nbreTransactionLimitBuy`);
  }
  nbreTransactionMarketBuy():Observable<number>{
    return this.httpClient.get<number>(`http://localhost:8000/api/nbreTransactionMarketBuy`);
  }
  nbreTransaction():Observable<number>{
    return this.httpClient.get<number>(`http://localhost:8000/api/nbreTransaction`);
  }

}
