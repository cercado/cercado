import { Component, OnInit, Input, HostListener } from '@angular/core';

import config from '../../assets/model/arancibia.json';

@Component({
  selector: 'app-arancibia',
  templateUrl: './arancibia.component.html',
  styleUrls: ['./arancibia.component.scss']
})
export class ArancibiaComponent implements OnInit {
  active = 1;
  config: any;
  scrolled: boolean = false;

  constructor() {
  };

  ngOnInit() {
    this.config = config;
  }

  onNavbarClickedOutside(e: Event) {
    const navbar = document.querySelector('.navbar-collapse');
    navbar.classList.remove('show');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
      const scrollY = document.documentElement.scrollTop;
      this.scrolled = scrollY > 0;
  }
}
