import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private url = 'assets/mock-data/solutions.json';

  constructor(private http: HttpClient) { }

  getSolutions(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(delay(2000));
  }
}
