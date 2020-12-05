import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { HostListener } from '@angular/core';


@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  DEFAULT_TRANSITION_INTERVAL = 5000;

  @Input() config;
  @Input() transitionInterval = this.DEFAULT_TRANSITION_INTERVAL;

  private _images: Array<string>;
  private _currentImage: number;
  scrolled: boolean = false;

  constructor(private _sanitizer: DomSanitizer, private _elem: ElementRef) {
  }

  ngOnInit() {
    try {
      this._images = this.config.home.carousel.images;
    } catch {
      this._images = [];
    }
    this._currentImage = 0;

    // Preload images.
    this._images.forEach(imageURL => {
      const img = new Image();
      img.src = imageURL;
    });

    if (this._images.length > 0) {
      this.updateSliderImage();
      setInterval(this.updateSliderImage.bind(this), this.transitionInterval);
    }
  }

  updateSliderImage() {
    this._currentImage = (this._currentImage + 1) % this._images.length;
    const imageURL = this._images[this._currentImage];
    const sectionElem = this._elem.nativeElement.children[0];

    sectionElem.style.backgroundImage = `url('${imageURL}')`;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
      const scrollY = document.documentElement.scrollTop;
      this.scrolled = scrollY > 0;
  }

}
