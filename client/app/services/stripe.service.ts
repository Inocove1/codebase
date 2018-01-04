import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StripeService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  finalizeAccount(code): Observable<any> {
      
    return this.http.get(`/api/stripe/finalizeaccount/${code}`).map(res => res.json());
    
    //  return this.http.post('/api/stripe/finalizeaccount', JSON.stringify(code), this.options).map(res => res.json());
    }

  payInfluencers(userid,searchconstraint): Observable<any> {
  
    return this.http.post(`/api/stripe/payinfluencers/${userid}`, JSON.stringify(searchconstraint), this.options).map(res => res.json());
  }

  chargeBrands(userid,searchconstraint): Observable<any> {
    
      return this.http.post(`/api/stripe/chargebrands/${userid}`, JSON.stringify(searchconstraint), this.options).map(res => res.json());
    }
}
