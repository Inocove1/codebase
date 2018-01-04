import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InfluencerComponent }   from './influencer/influencer.component';
import { BrandsComponent } from './brands/brands.component';
import { InfluencerboardComponent }   from './influencerboard/influencerboard.component';
import { BrandboardComponent } from './brandboard/brandboard.component';
import { BrandregisterComponent } from './brandregister/brandregister.component';
import { BrandloginComponent } from './brandlogin/brandlogin.component';
import { BrandlogoutComponent } from './brandlogout/brandlogout.component';
import { BrandcampComponent } from './brandcamp/brandcamp.component';
import { BrandmessagesComponent } from './brandmessages/brandmessages.component';
import { BrandsearchinfuComponent } from './brandsearchinfu/brandsearchinfu.component';
import { BrandcontentComponent } from './brandcontent/brandcontent.component';
import { BrandprofileComponent } from './brandprofile/brandprofile.component';
import { InfluencerprofileComponent } from './influencerprofile/influencerprofile.component';
import { InfluencercampComponent } from './influencercamp/influencercamp.component';
import { InflusearchbrandComponent } from './influsearchbrand/influsearchbrand.component';
import { InfluencermessagesComponent } from './influencermessages/influencermessages.component';
import { InfluencercontentComponent } from './influencercontent/influencercontent.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { ForgotComponent } from './forgot/forgot.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

const routes: Routes = [
  { path: 'influencercamp', component:InfluencercampComponent },
  { path: 'influencermessages', component:InfluencermessagesComponent },
  { path: 'influencercontent', component:InfluencercontentComponent },
  { path: 'influencerprofile', component:InfluencerprofileComponent },
  { path: 'influencer', component:InfluencerComponent },
  { path: 'influsearchbrand', component:InflusearchbrandComponent },
  { path: 'brands', component:BrandsComponent },
  { path: 'influencerboard', component:InfluencerboardComponent },
  { path: 'brandboard', component:BrandboardComponent },
  { path: 'brandregister', component:BrandregisterComponent },
  { path: 'brandlogin', component:BrandloginComponent },
  { path: 'brandlogout', component:BrandlogoutComponent },
  { path: 'brandcamp', component:BrandcampComponent },
  { path: 'brandmessages', component:BrandmessagesComponent },
  { path: 'brandsearchinfu', component:BrandsearchinfuComponent },
  { path: 'brandcontent', component:BrandcontentComponent },
  { path: 'brandprofile', component:BrandprofileComponent },
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'faqs', component: FaqComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'fileupload', component: FileuploadComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
