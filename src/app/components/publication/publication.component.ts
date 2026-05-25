import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { PublicationItemComponent } from '../publication-item/publication-item.component';
import { NgFor, NgIf } from '@angular/common';
import { Publication } from '../../common/type';

@Component({
  selector: 'app-publication',
  imports: [PublicationItemComponent, NgIf, NgFor],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (response) => {
        this.publications = response;
      },
      error: (error) => {
        console.error('Error loading publications:', error);
      }
    });
  }

}
