import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience, ExperienceCardComponent } from '../../../components/experience-card/experience-card.component';
import { Education, Skills } from '../../../common/type';
import { BioService } from '../../../services/bio.service';
import { EducationService } from '../../../services/education.service';
import { EducationCardComponent } from '../../../components/education-card/education-card.component';

export interface SkillDisplay {
  key: keyof Skills;
  title: string;
  tools: string[];
  icon: string;
  iconColor: string;
  badgeClasses: string;
}

@Component({
  selector: 'app-work-home',
  imports: [NgFor, NgIf, NgClass, ExperienceCardComponent, EducationCardComponent],
  templateUrl: './work-home.component.html',
  styleUrl: './work-home.component.scss'
})
export class WorkHomeComponent implements OnInit {
  experiences: Experience[] = [];
  skillCategories: SkillDisplay[] = [];
  researchVision: string = '';
  educaions: Education[] = [];

  private skillMeta: Record<keyof Skills, { icon: string; iconColor: string; badgeClasses: string }> = {
    ml: {
      icon: 'fa-solid fa-brain',
      iconColor: 'text-purple-500',
      badgeClasses: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/30'
    },
    programming: {
      icon: 'fa-solid fa-code',
      iconColor: 'text-blue-500',
      badgeClasses: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30'
    },
    frontend: {
      icon: 'fa-solid fa-desktop',
      iconColor: 'text-green-500',
      badgeClasses: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-200 dark:border-green-500/30'
    },
    backend: {
      icon: 'fa-solid fa-server',
      iconColor: 'text-orange-500',
      badgeClasses: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30'
    },
    database: {
      icon: 'fa-solid fa-database',
      iconColor: 'text-cyan-500',
      badgeClasses: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
    },
    devops_others: {
      icon: 'fa-solid fa-gears',
      iconColor: 'text-gray-500',
      badgeClasses: 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/80 border-gray-200 dark:border-white/20'
    }
  };

  constructor(
    private workService: ExperienceService,
    private bioService: BioService,
    private educationService: EducationService  
  ) {}

  ngOnInit(): void {

      this.educationService.getEducations().subscribe({
        next: (response : Education[] | null) => {
          console.log('Education response:', response);
          this.educaions = response || [];
      },
      error: (error) => {
        console.error('Error loading education:', error);
      }
    });

    this.workService.getAllExperiences().subscribe({
      next: (response: Experience[]) => {
        if (response.length > 0) {
          this.experiences = response;
        }
      },
      error: (error: Error) => {
        console.error('Error loading experience:', error);
      }
    });

    this.bioService.getSkills().subscribe((skills: Skills | null) => {
      if (skills) {
        this.skillCategories = (Object.keys(skills) as (keyof Skills)[]).map(key => ({
          key,
          title: skills[key].title,
          tools: skills[key].tool,
          ...this.skillMeta[key]
        }));
      }
    });

    this.bioService.getResearchVision().subscribe((vision: string) => {
      this.researchVision = vision;
    });

  

  }
}
