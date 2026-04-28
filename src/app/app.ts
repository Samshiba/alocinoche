import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar'
import {RouterOutlet} from '@angular/router';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TakimaCiné');
}
