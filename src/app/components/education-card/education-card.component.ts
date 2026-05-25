import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Education } from '../../common/type';

@Component({
  selector: 'app-education-card',
  imports: [NgIf],
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.scss'
})
export class EducationCardComponent {
  @Input() education!: Education;

// constructor(private educationService: EducationService) {}

  // ngOnInit(): void {
  //   this.educationService.getEducation().subscribe({
  //     next: (educations: Education[] | null) => {
  //       if (educations) {
  //         this.educations = educations;
  //       }
  //     }
  //   });
  // }

}
