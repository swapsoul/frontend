import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MenComponent } from './routes/men/men.component';
import { WomenComponent } from './routes/women/women.component';
import { EssentialsComponent } from './routes/essentials/essentials.component';
import { SingleproductpagesampleComponent } from './routes/singleproductpagesample/singleproductpagesample.component';
import { AboutComponent } from './routes/about/about.component';
import { ProductComponent } from './routes/product/product.component';
import { TcComponent } from './routes/policies/tc/tc.component';
import { PrivacyComponent } from './routes/policies/privacy/privacy.component';
import { ResetpwdComponent } from './routes/resetpwd/resetpwd.component';
import { EmailVerifiedComponent } from './routes/email-verified/email-verified.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth.service';
import { CartComponent } from './routes/cart/cart.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';
import { OrdersPaymentsPolicyComponent } from './routes/policies/orders-payments-policy/orders-payments-policy.component';
import { ShippingDeliveryPolicyComponent } from './routes/policies/shipping-delivery-policy/shipping-delivery-policy.component';
import { ExchangeReturnPolicyComponent } from './routes/policies/exchange-return-policy/exchange-return-policy.component';
import { OrdersComponent } from './routes/orders/orders.component';
import { CampusAmbassadorComponent } from './routes/campus-ambassador/campus-ambassador.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'essentials', component: EssentialsComponent },
  { path: 'products/:id', component: SingleproductpagesampleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product', component: ProductComponent },
  { path: 'reset_password', component: ResetpwdComponent },
  { path: 'email_verified', component: EmailVerifiedComponent },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'policy', children: [
      { path: '', redirectTo: 'terms', pathMatch: 'full' },
      { path: 'terms', component: TcComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'orders-payments', component: OrdersPaymentsPolicyComponent },
      { path: 'shipping-delivery', component: ShippingDeliveryPolicyComponent },
      { path: 'exchange-return', component: ExchangeReturnPolicyComponent }
    ]
  },
  { path: 'campus-ambassador', component: CampusAmbassadorComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
