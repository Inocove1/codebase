import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  sendContent(message): Observable<any> {
  
    return this.http.post('/api/content', JSON.stringify(message), this.options);
  }
 
  getApprovedContentAsReceiver(user): Observable<any> {
    
    return this.http.get(`/api/content/approvedreceiver/${user._id}`).map(res => res.json());
  }

  getPendingContentAsReceiver(user): Observable<any> {
    
    return this.http.get(`/api/content/pendingreceiver/${user._id}`).map(res => res.json());
  }

  getApprovedContentAsSender(user): Observable<any> {
    
    return this.http.get(`/api/content/approvedsender/${user._id}`).map(res => res.json());
  }

  getPendingContentAsSender(user): Observable<any> {
    
    return this.http.get(`/api/content/pendingsender/${user._id}`).map(res => res.json());
  }

  approveContent(content,contentid): Observable<any> {
    
    return this.http.post(`/api/content/approve/${contentid}`,JSON.stringify(content), this.options);
  }
  

}
