import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Publication } from '../../common/type';


@Component({
  selector: 'app-publication-item',
  imports: [NgIf],
  templateUrl: './publication-item.component.html',
  styleUrl: './publication-item.component.scss'
})
export class PublicationItemComponent {
  @Input() publication!: Publication;
}
