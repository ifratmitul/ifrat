import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Publication } from '../common/type';


interface PublicationResponse {
  data: Publication[];
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publicationsSubject = new BehaviorSubject<Publication[]>([]);
  public publications$ = this.publicationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPublications();
  }

  private loadPublications(): void {
    this.http.get<PublicationResponse>('assets/data/publication.json')
      .subscribe({
        next: (response) => {
          const sortedPublications = response.data.sort((a, b) => a.order - b.order);
          this.publicationsSubject.next(sortedPublications);
        },
        error: (error) => {
          console.error('Error loading publications:', error);
        }
      });
  }

  getAllPublications(): Observable<Publication[]> {
    return this.publications$;
  }

  getTopPublications(n: number): Observable<Publication[]> {
    return this.publications$.pipe(
      map(publications => publications.slice(0, n))
    );
  }
}
