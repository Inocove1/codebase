import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandprofileService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  updateBrands(userprofile): Observable<any> {
  
    return this.http.post('/api/brands', JSON.stringify(userprofile), this.options);
  }

  updateBrandAccount(user, userprofile): Observable<any> {
    
      return this.http.post(`/api/brands/updateaccount/${user._id}`, JSON.stringify(userprofile), this.options);
  }

  getBrand(user): Observable<any> {

    return this.http.get(`/api/brands/${user._id}`).map(res => res.json());
  }
  

}
