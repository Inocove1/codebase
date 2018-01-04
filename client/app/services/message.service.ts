import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  sendMessage(message): Observable<any> {
  
    return this.http.post('/api/message', JSON.stringify(message), this.options);
  }
  deleteMessage(msgid): Observable<any> {
    
      return this.http.get(`/api/message/delete/${msgid}`).map(res => res);
    }

  getMessagesAsReceiver(user): Observable<any> {

    return this.http.get(`/api/message/receive/${user._id}`).map(res => res.json());
  }

  getMessagesAsSender(user): Observable<any> {
    
    return this.http.get(`/api/message/sent/${user._id}`).map(res => res.json());
  }
  

}
