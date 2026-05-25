import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BioData, SkillCategory, Skills } from '../common/type';


interface BioResponse {
  data: BioData;
}

@Injectable({
  providedIn: 'root'
})
export class BioService {
  private bioSubject = new BehaviorSubject<BioData | null>(null);
  public bio$ = this.bioSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {
    this.loadBio();
  }

  private loadBio(): void {
    if (this.loaded) return;

    this.http.get<BioResponse>('/assets/data/bio.json').subscribe({
      next: (response: BioResponse) => {
        this.bioSubject.next(response.data);
        this.loaded = true;
      },
      error: (error: Error) => {
        console.error('Error loading bio data:', error);
      }
    });
  }

  getBio(): Observable<BioData | null> {
    return this.bio$;
  }

  getRoleFocus(): Observable<string> {
    return this.bio$.pipe(
      map(bio => bio?.role_focus ?? '')
    );
  }

  getSingleLinear(): Observable<string> {
    return this.bio$.pipe(
      map(bio => bio?.single_linear ?? '')
    );
  }

  getAboutMe(): Observable<string> {
    return this.bio$.pipe(
      map(bio => {
        console.log(bio);
        console.log('About Me value:', bio?.about_me);
        return bio?.about_me ?? ''
      })
    );
  }

  getResearchVision(): Observable<string> {
    return this.bio$.pipe(
      map(bio => bio?.research_vision ?? '')
    );
  }

  getSkills(): Observable<Skills | null> {
    return this.bio$.pipe(
      map(bio => bio?.skill ?? null)
    );
  }

  getSkillCategory(category: keyof Skills): Observable<SkillCategory | null> {
    return this.bio$.pipe(
      map(bio => bio?.skill?.[category] ?? null)
    );
  }
}
