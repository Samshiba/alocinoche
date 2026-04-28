import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-date',
  imports: [DatePipe],
  templateUrl: './date.html',
  styleUrl: './date.scss',
})
export class InfoDate {
  @Input({ required: true })
  date!: Date;
}
