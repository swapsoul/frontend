import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from './services/global/global.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './routes/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginSignUpDialogComponent } from './components/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { WomenComponent } from './routes/women/women.component';
import { MenComponent } from './routes/men/men.component';
import { EssentialsComponent } from './routes/essentials/essentials.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SingleproductpagesampleComponent } from './routes/singleproductpagesample/singleproductpagesample.component';
import { AboutComponent } from './routes/about/about.component';
import { ProductComponent } from './routes/product/product.component';
import { TcComponent } from './routes/tc/tc.component';
import { PrivacyComponent } from './routes/privacy/privacy.component';
import { RequestService } from './services/request/request.service';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { DatasharingService } from './services/datasharing/datasharing.service';
import { ResetpwdComponent } from './routes/resetpwd/resetpwd.component';
import { EmailVerifiedComponent } from './routes/email-verified/email-verified.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartComponent } from './routes/cart/cart.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WomenComponent,
    MenComponent,
    EssentialsComponent,
    LoginSignUpDialogComponent,
    SingleproductpagesampleComponent,
    AboutComponent,
    ProductComponent,
    TcComponent,
    PrivacyComponent,
    ResetpwdComponent,
    EmailVerifiedComponent,
    ProfileComponent,
    CartComponent,
    NotfoundComponent
  ],
  imports: [

    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    HttpClientModule,
    MatTabsModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    NgbCollapseModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [ GlobalService, RequestService, CookieService, DatasharingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
