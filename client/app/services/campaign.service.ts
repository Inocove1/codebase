import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CampaignService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  createCampaign(campaign): Observable<any> {
  
    return this.http.post('/api/campaign', JSON.stringify(campaign), this.options);
  }
  getCampaign(user): Observable<any> {

    return this.http.get(`/api/campaign/${user._id}`).map(res => res.json());
  }
  
  getByCampaignId(campaignid): Observable<any> {
    
        return this.http.get(`/api/campaign/getcampaign/${campaignid}`).map(res => res.json());
  }

  getAssignedCampaigns(user): Observable<any> {
    
    return this.http.get(`/api/campaign/assigned/${user._id}`).map(res => res.json());
  }

  getUnassignedCampaigns(): Observable<any> {
    
    return this.http.get(`/api/campaigns`).map(res => res.json());
  }

  searchCampaigns(campaign): Observable<any> {
    
    return this.http.post(`/api/campaigns/search`, JSON.stringify(campaign), this.options).map(res => res.json());
  }

  setApproval(obj){
    return this.http.post('/api/campaign/approve', JSON.stringify(obj), this.options);
   // return this.http.get(`/api/campaigns`).map(res => res.json());
  }

  

}
