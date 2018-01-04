import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  searchInfluencers(searchconstraint): Observable<any> {
  
    return this.http.post('/api/profile/search', JSON.stringify(searchconstraint), this.options).map(res => res.json());
  }

  searchBrands(searchconstraint): Observable<any> {
    
      return this.http.post('/api/brands/search', JSON.stringify(searchconstraint), this.options).map(res => res.json());
    }
}
