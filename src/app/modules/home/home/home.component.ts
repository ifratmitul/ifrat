import { Component, HostListener, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AboutmeComponent } from "../../../components/aboutme/aboutme.component";
import { BioService } from '../../../services/bio.service';

@Component({
  selector: 'app-home',
  imports: [AboutmeComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showScrollIndicator = true;
  title_focus: string = '';
  single_liner: string = '';
  
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Hide indicator after scrolling 100px
    this.showScrollIndicator = window.scrollY < 100;
  }

  constructor(private bioService: BioService ) {}
  ngOnInit(): void {
    this.bioService.getRoleFocus().subscribe({
      next: (response) => {
        this.title_focus = response;
      },
      error: (error) => {
        console.error('Error loading role focus:', error);
      }
    });

  this.bioService.getSingleLinear().subscribe({
    next: (response) => {
      this.single_liner = response;
    },
    error: (error) => {
      console.error('Error loading single liner:', error);
    }
  });
  }


}
