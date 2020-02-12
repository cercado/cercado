import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-section',
  templateUrl: './legal-section.component.html',
  styleUrls: ['./legal-section.component.scss']
})
export class LegalSectionComponent implements OnInit {
  @Input() config;
  public catVideoEmbed: string = `https://www.youtube.com/embed/QH2-TGUlwu4"`;

  constructor() { }

  ngOnInit() {
  }

}
