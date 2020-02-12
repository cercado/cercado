import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent implements OnInit {
  DEFAULT_N_COLUMNS = 2;

  @Input() config;

  private _itemsMatrixList;
  private _active;

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._itemsMatrixList = this.config.features.pages.map(page => this._arrayToMatrix(page.items));
  }

  _arrayToMatrix(array: Array<any>) {
    const matrix = [];
    let arrayIndex = 0;

    while (array.length > 0 && arrayIndex < array.length) {
      const row = [];
      for (let i = 0; i < this.DEFAULT_N_COLUMNS && arrayIndex < array.length; i++, arrayIndex++)
        row.push(array[arrayIndex]);
      matrix.push(row);
    }

    return matrix;
  }

  _toSafeURL(url: string) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
}
