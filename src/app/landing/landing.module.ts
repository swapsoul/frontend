import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BodyUpperComponent } from './body-upper/body-upper.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { StoryComponent } from './story/story.component';
import { CorouselComponent } from './corousel/corousel.component';
import { GenderComponent } from './gender/gender.component';
import {CollectionComponent} from './collection/collection.component';
import {LandingComponent} from './landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyUpperComponent,
    BannerComponent,
    ContactComponent,
    FooterComponent,
    StoryComponent,
    CorouselComponent,
    GenderComponent,
    CollectionComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule
  ],
  bootstrap: [LandingComponent]
})
export class LandingModule { }
