import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000';


  generateTranscribeText(data:any) {
    const apiUrl = this.baseUrl + '/api/transcribe';
    return this.http.post(apiUrl, data);
  }


  generateKeyPoint(data:any) {
    const apiUrl = this.baseUrl + '/api/keyPoints';
    return this.http.post(apiUrl, data);
  }


}
