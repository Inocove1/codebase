import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  updateProfile(userprofile): Observable<any> {
  
    return this.http.post('/api/profile', JSON.stringify(userprofile), this.options);
  }

  updateProfileAccount(user, userprofile): Observable<any> {
    
      return this.http.post(`/api/profile/updateaccount/${user._id}`, JSON.stringify(userprofile), this.options);
  }
  getProfile(user): Observable<any> {

    return this.http.get(`/api/profile/${user._id}`).map(res => res.json());
  }
  

}
