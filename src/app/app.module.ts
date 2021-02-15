import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyUpperComponent } from './body-upper/body-upper.component';
import { CollectionComponent } from './collection/collection.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { StoryComponent } from './story/story.component';
import {HttpClientModule} from '@angular/common/http';
import { CorouselComponent } from './corousel/corousel.component';
import { GenderComponent } from './gender/gender.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyUpperComponent,
    CollectionComponent,
    BannerComponent,
    ContactComponent,
    FooterComponent,
    StoryComponent,
    CorouselComponent,
    GenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
