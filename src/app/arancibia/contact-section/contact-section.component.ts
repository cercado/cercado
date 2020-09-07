import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  @Input() config;

  constructor() { }

  ngOnInit() {
  }

}
