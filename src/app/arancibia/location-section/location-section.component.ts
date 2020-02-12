import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location-section',
  templateUrl: './location-section.component.html',
  styleUrls: ['./location-section.component.scss']
})
export class LocationSectionComponent implements OnInit {
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  @Input() config;
  position: google.maps.LatLng;
  path: any[];
  key: any;
  targetData: any;
  referenceData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const mapsSettings = this.config.settings.googlemaps;

    this.key = mapsSettings.key;
    this.targetData = this.config.location.path.slice(-1)[0];
    this.referenceData = this.config.location.path[0];

    this.position = new google.maps.LatLng(
        this.targetData.position.latitude, this.targetData.position.longitude);

    const mapProperties = {
      center: new google.maps.LatLng(mapsSettings.center.position.latitude, mapsSettings.center.position.longitude),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.markLocationFromData(this.targetData, true, false, false);
    this.markLocationFromData(this.referenceData, false, true, false);
    this.config.location.historicalPlaces.forEach(locationData => {
      console.log(locationData);
      this.markLocationFromData(locationData, false, false, true);
    });

    this.drawPath();
  }

  createMarkerIcon(url) {
    return {
      url,
      scaledSize: new google.maps.Size(50, 50),
    };
  }

  markLocationFromData(locationData, drawCircle=false, drawInfo=false, drawInfoOnClick=true) {
    const position = new google.maps.LatLng(locationData.position.latitude,
        locationData.position.longitude);
    const marker = new google.maps.Marker({
      map: this.map,
      icon: this.createMarkerIcon(locationData.icon),
      position: position,
      draggable: false,
    });

    if (drawCircle) {
      const circle = new google.maps.Circle({
        map: this.map,
        radius: 400,
        strokeColor: '#1565c0',
        fillColor: '#5e92f3',
        strokeWeight: 3,  
      });
      circle.bindTo('center', marker, 'position');
    }

    const infowindow = new google.maps.InfoWindow({
      content: this._createInfoWindowContent(locationData)
    });

    if (drawInfo) {
      infowindow.open(this.map, marker);
    }
    if (drawInfoOnClick) {
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });
    }
  }

  _createInfoWindowContent(locationData) {
    if (!locationData.description || !locationData.image)
      return locationData.title;

    return (
      `<div style="display: flex"><div><img src="${locationData.image}" height=120></div>` +
      '<div style="padding: 10px; max-width=80px">' +
      `<b>${locationData.title}</b><br/>` +
      `${locationData.description}<br/>` +
      '</div>'
    );
  }

  drawPath() {
    this.getSnappedPathPoints().then(snappedPoints => {
      const snappedCoordinates = [];
      snappedPoints.forEach(snappedPoint => {
        const latlng = new google.maps.LatLng(
            snappedPoint.location.latitude, snappedPoint.location.longitude);
        snappedCoordinates.push(latlng);
      });

      new google.maps.Polyline({
        map: this.map,
        path: snappedCoordinates,
        strokeColor: '#A84748',
        strokeWeight: 3,
        strokeOpacity: 0.9,
      });
    });
  }

  _getUnsnappedPathPoints() {
    const unsnappedPoints = [];
    this.config.location.path.forEach(item => {
      unsnappedPoints.push(`${item.position.latitude},${item.position.longitude}`);
    });
    return unsnappedPoints.join('|');
  }

  async getSnappedPathPoints() {
    const unsnappedPoints = this._getUnsnappedPathPoints();
    const requestURLBase = 'https://roads.googleapis.com/v1/snapToRoads';
    const requestURL = `${requestURLBase}?path=${unsnappedPoints}&interpolate=true&key=${this.key}`;
    console.log(requestURL);
    return this.http.get<any>(requestURL).toPromise().then(response => {
      return response.snappedPoints;
    });
  }
}
