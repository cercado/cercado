import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photos-section',
  templateUrl: './photos-section.component.html',
  styleUrls: ['./photos-section.component.scss']
})
export class PhotosSectionComponent implements OnInit {
  @Input() config;

  constructor() { }

  ngOnInit() {
  }

}
