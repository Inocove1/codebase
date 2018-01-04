import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FileUploadService {
  
    constructor(private http: Http) { }
  
    upload(filedata:FormData): Observable<any> {
    
      return this.http.post('/api/upload', filedata);
    }

    uploadfile(filedata:FormData): Observable<any> {
        
          return this.http.post('/api/uploadfile', filedata);
        }

 /*   uploadold(formData) {
        const url = `/api/upload`;
        return this._http.post(url, formData)
            .map(x => x.json())
            .map((x: any[]) => x
                .map(item => Object
                    .assign({}, item, { url: `${this.baseUrl}/images/${item.id}` }))
            );
    }*/
}