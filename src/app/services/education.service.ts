import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Education } from '../common/type';


interface EducationResponse {
  data: Education[];
}

@Injectable({
  providedIn: 'root'
})

export class EducationService {

  private eduSubject = new BehaviorSubject<Education[] | null>(null);
  public bio$ = this.eduSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {
    this.loadEdu();
  }

  private loadEdu(): void {
    if (this.loaded) return;

    this.http.get<EducationResponse>('/assets/data/education.json').subscribe({
      next: (response: EducationResponse) => {
        this.eduSubject.next(response.data);
        this.loaded = true;
      },
      error: (error: Error) => {
        console.error('Error loading education data:', error);
      }
    });
  }

    getEducation(): Observable<Education[] | null> {
      return this.eduSubject.asObservable();
    }

    getEducations(): Observable<Education[] | null> {
      return this.eduSubject.asObservable();
    }

    get_n_Education(n: number): Observable<Education[] | null> {
      return this.eduSubject.asObservable().pipe(
        map(edu => edu ? edu.slice(0, n) : null)
      );
    }
}
