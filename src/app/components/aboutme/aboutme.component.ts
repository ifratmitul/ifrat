import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Experience, ExperienceCardComponent } from '../experience-card/experience-card.component';
import { ExperienceService } from '../../services/experience.service';
import { PublicationService } from '../../services/publication.service';
import { PublicationItemComponent } from '../publication-item/publication-item.component';
import { BioService } from '../../services/bio.service';
import { EducationService } from '../../services/education.service';
import { Education } from '../../common/type';
import { EducationCardComponent } from '../education-card/education-card.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-aboutme',
  imports: [ExperienceCardComponent, PublicationItemComponent, EducationCardComponent, ContactComponent, NgIf, NgFor, RouterLink],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent implements OnInit {
  experience: Experience[] = []; 
  recent_publications: any[] = [];
  educaions: Education[] = [];
  about_me: string = '';
  constructor(private experienceService: ExperienceService,
    private publicationService: PublicationService,
    private bioService: BioService,
    private educationService: EducationService
  ) {

  }

  ngOnInit(): void {
    this.experienceService.get_n_Experience(2).subscribe({
      next: (response: Experience[]) => {

        if (response.length > 0) {
          this.experience = response;
        }
      },
      error: (error: Error) => {
        console.error('Error loading experience:', error);
      }
    });

    this.publicationService.getTopPublications(3).subscribe({
        next: (response) => {
          
          this.recent_publications = response;
        },
        error: (error) => {
          console.error('Error loading publications:', error);
        }
      });

    this.bioService.getAboutMe().subscribe({
      next: (response) => {
        console.log('About Me response:', response);
        this.about_me = response;
      },
      error: (error) => {
        console.error('Error loading about me:', error);
      }
    });

    this.educationService.get_n_Education(2).subscribe({
      next: (response) => {
        console.log('Education response:', response);
        this.educaions = response || [];
      },
      error: (error) => {
        console.error('Error loading education:', error);
      }
    });
  }




}
