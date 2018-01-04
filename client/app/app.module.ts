import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { BrandprofileService } from './services/brandprofile.service';
import { ProfileService } from './services/profile.service';
import { CampaignService } from './services/campaign.service';
import { SearchService } from './services/search.service';
import { MessageService } from './services/message.service';
import { ContentService } from './services/content.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { InfluencerComponent } from './influencer/influencer.component';
import { BrandsComponent } from './brands/brands.component';
import { ForgotComponent } from './forgot/forgot.component';
import { InfluencerboardComponent } from './influencerboard/influencerboard.component';
import { BrandboardComponent } from './brandboard/brandboard.component';
import { BrandregisterComponent } from './brandregister/brandregister.component';
import { BrandloginComponent } from './brandlogin/brandlogin.component';
import { BrandlogoutComponent } from './brandlogout/brandlogout.component';
import { BrandcampComponent } from './brandcamp/brandcamp.component';
import { BrandmessagesComponent } from './brandmessages/brandmessages.component';
import { BrandsearchinfuComponent } from './brandsearchinfu/brandsearchinfu.component';
import { BrandcontentComponent } from './brandcontent/brandcontent.component';
import { InfluencerprofileComponent } from './influencerprofile/influencerprofile.component';
import { InfluencercampComponent } from './influencercamp/influencercamp.component';
import { InfluencermessagesComponent } from './influencermessages/influencermessages.component';
import { InfluencercontentComponent } from './influencercontent/influencercontent.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { MyDatePickerModule } from 'mydatepicker';
import { BrandprofileComponent } from './brandprofile/brandprofile.component';
import { InflusearchbrandComponent } from './influsearchbrand/influsearchbrand.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileUploadService } from './services/fileupload.service';
import { StripeService } from './services/stripe.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,

    InfluencerComponent,

    BrandsComponent,

    ForgotComponent,

    InfluencerboardComponent,

    BrandboardComponent,

    BrandregisterComponent,

    BrandloginComponent,

    BrandlogoutComponent,

    BrandcampComponent,

    BrandmessagesComponent,

    BrandsearchinfuComponent,

    BrandcontentComponent,

    InfluencerprofileComponent,

    InfluencercampComponent,

    InfluencermessagesComponent,

    InfluencercontentComponent,

    FaqComponent,

    PrivacyComponent,

    TermsComponent,

    BrandprofileComponent,

    InflusearchbrandComponent,

    FileuploadComponent
  ],
  imports: [  
    MyDatePickerModule,
    RoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    CampaignService,
    SearchService,
    ProfileService,
    MessageService,
    ContentService,
    BrandprofileService,
    FileUploadService,
    StripeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
