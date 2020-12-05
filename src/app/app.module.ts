import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { Angular2ImageGalleryModule } from 'angular2-image-gallery'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArancibiaComponent } from './arancibia/arancibia.component';

import { ClickOutsideModule } from 'ng-click-outside';
import { SafePipeModule } from 'safe-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';

import { ContactFormComponent } from './arancibia/contact-form/contact-form.component';
import { HomeSliderComponent } from './arancibia/home-slider/home-slider.component';
import { FeaturesSectionComponent } from './arancibia/features-section/features-section.component';
import { LocationSectionComponent } from './arancibia/location-section/location-section.component';
import { LegalSectionComponent } from './arancibia/legal-section/legal-section.component';
import { FooterComponent } from './arancibia/footer/footer.component';
import { ContactSectionComponent } from './arancibia/contact-section/contact-section.component';
import { PhotosSectionComponent } from './arancibia/photos-section/photos-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArancibiaComponent,
    ContactFormComponent,
    HomeSliderComponent,
    FeaturesSectionComponent,
    LocationSectionComponent,
    PhotosSectionComponent,
    LegalSectionComponent,
    FooterComponent,
    ContactSectionComponent
  ],
  imports: [
    Angular2ImageGalleryModule,
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // The only project is Arancibia for now.
      // { path: '', component: HomeComponent },
      { path: '', component: ArancibiaComponent },
      { path: 'arancibia', component: ArancibiaComponent },
    ], {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      onSameUrlNavigation: 'reload',
    }),
    NgbModule,
    FormsModule,
    SafePipeModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
