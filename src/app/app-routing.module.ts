import { NgModule } from '@angular/core';
import { Routes, RouterModule , CanActivate} from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MenComponent } from './routes/men/men.component';
import { WomenComponent } from './routes/women/women.component';
import { EssentialsComponent } from './routes/essentials/essentials.component';
import {SingleproductpagesampleComponent} from './routes/singleproductpagesample/singleproductpagesample.component';
import {AboutComponent} from './routes/about/about.component';
import { ProductComponent} from './routes/product/product.component';
import {TcComponent} from './routes/tc/tc.component';
import {PrivacyComponent} from './routes/privacy/privacy.component';
import {ResetpwdComponent} from './routes/resetpwd/resetpwd.component';
import { EmailVerifiedComponent} from './routes/email-verified/email-verified.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'men', component: MenComponent},
  { path: 'women', component: WomenComponent},
  { path: 'essentials', component: EssentialsComponent},
  { path: 'products/:id', component: SingleproductpagesampleComponent},
  { path: 'about', component: AboutComponent},
  { path: 'product', component: ProductComponent ,canActivate: [AuthGuard] },
  {path :'terms', component: TcComponent},
  {path :'privacy', component: PrivacyComponent},
  {path :'reset_password', component: ResetpwdComponent},
  {path :'email_verified', component: EmailVerifiedComponent},
  { path : 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
