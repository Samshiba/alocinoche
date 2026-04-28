import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  @Input({ required: true }) title! : string

  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');
  }
}
