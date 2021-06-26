import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api/";

  verifyNews(news: String) {
    return this.http.post(this.url+"predictnews/", news);
  }

  verifySentiment(sentiment: String):Observable<any>{
    
    return this.http.post(this.url+"predictsentiment/", sentiment);

  }

}
