import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  @Input({ required: true })
  rating!: number;
}
