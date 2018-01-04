import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-brandcamp',
  templateUrl: './brandcamp.component.html',
  styleUrls: ['./brandcamp.component.scss']
})
export class BrandcampComponent implements OnInit {
  campaigns: Object[];
  createCampaignForm: FormGroup;
  channel = new FormControl('', [Validators.required,
                                       Validators.minLength(1),
                                       Validators.maxLength(100)]);
  details = new FormControl('', [Validators.required, Validators.minLength(1)]);
  contenttype = new FormControl('', [Validators.required, Validators.minLength(1)]);
  secchannel = new FormControl('', [Validators.required, Validators.minLength(1)]);
  campaignname = new FormControl('', [Validators.required, Validators.minLength(1)]);
  websiteurl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  producturl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  shippingproducts = new FormControl('', [Validators.required, Validators.minLength(1)]);
  productcategory = new FormControl('', [Validators.required, Validators.minLength(1)]);
  budget = new FormControl('', [Validators.required, Validators.minLength(1)]);
  deadline = new FormControl('', [Validators.required, Validators.minLength(1)]);
  noofinfu = new FormControl('', [Validators.required, Validators.minLength(1)]);
  audiencegender = new FormControl('', [Validators.required, Validators.minLength(1)]);
  audienceage = new FormControl('', [Validators.required, Validators.minLength(1)]);

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
};

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private campaignService: CampaignService) { }

  ngOnInit() {
    console.log(this.auth.loggedIn);
    if (this.auth.loggedIn) {
      
    }else{
      this.router.navigate(['/brandlogin']);
    }
    this.createCampaignForm = this.formBuilder.group({
      userid: this.auth.currentUser._id,
      channel: this.channel,
      details: this.details,
      contenttype:this.contenttype,
      secchannel:this.secchannel,
      campaignname:this.campaignname,
      websiteurl:this.websiteurl,
      producturl:this.producturl,
      shippingproducts:this.shippingproducts,
      productcategory :this.productcategory,
      budget:this.budget,
      deadline:this.deadline,
      noofinfu:this.noofinfu,
      audiencegender:this.audiencegender,
      audienceage:this.audienceage
      
    });
    

    this.campaignService.getCampaign(this.auth.currentUser).subscribe(res => {
     
     this.campaigns=res;
      /*console.log(response); 
      console.log(response[0].userid);
      console.log(response[0].channel);
      console.log(response[0].details);
      console.log(response[0].contenttype);
      console.log(response[0].producttype);
      console.log(response[0].campaignname);
      console.log(response[0].websiteurl);
      console.log(response[0].producturl);
      console.log(response[0].shippingproducts);
      console.log(response[0].productcategory);
      console.log(response[0].budget);
      console.log(response[0].deadline);
      console.log(response[0].noofinfu);
      console.log(response[0].audiencegender);
      console.log(response[0].audienceage);*/
  });

  }

  onDateChanged(event: IMyDateModel) {
    this.deadline.setValue(event.formatted,{});
    console.log("onDateChange:"); 
    this.setDeadline();
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  setChannel() {
  //console.log("Channel "+this.channel.value);
   return { 'has-danger': !this.channel.pristine && !this.channel.valid };
  }

  setDetails() {
  //  console.log("Details "+this.details.value);
    return { 'has-danger': !this.details.pristine && !this.details.valid };
  }

  setContentType(){
  //  console.log("ContentType "+this.contenttype.value);
    return { 'has-danger': !this.contenttype.pristine && !this.contenttype.valid };
  }
  setSecchannel(){
  //  console.log("ProductType "+this.producttype.value);
    return { 'has-danger': !this.secchannel.pristine && !this.secchannel.valid };
  }
  setCampaignName(){
  //  console.log("campaignname "+this.campaignname.value);
    return { 'has-danger': !this.campaignname.pristine && !this.campaignname.valid };
  }

  setWebsiteUrl(){
  //  console.log("websiteurl "+this.websiteurl.value);
    return { 'has-danger': !this.websiteurl.pristine && !this.websiteurl.valid };
  }
  setProductUrl(){
  //  console.log("producturl "+this.producturl.value);
    return { 'has-danger': !this.producturl.pristine && !this.producturl.valid };
  }
  setShippingProducts(){
  //  console.log("shippingproducts "+this.shippingproducts.value);
    return { 'has-danger': !this.shippingproducts.pristine && !this.shippingproducts.valid };
  }
  setProductCategory(){
  //  console.log("productcategory "+this.productcategory.value);
    return { 'has-danger': !this.productcategory.pristine && !this.productcategory.valid };
  }
  setBudget(){
  //  console.log("budget "+this.budget.value);
    return { 'has-danger': !this.budget.pristine && !this.budget.valid };
  }
  setDeadline(){
  //  console.log("deadline "+this.deadline.value);
    return { 'has-danger': !this.deadline.pristine && !this.deadline.valid };
  }
  setNoofInfu(){
  //  console.log("noofinfu "+this.noofinfu.value);
    return { 'has-danger': !this.noofinfu.pristine && !this.noofinfu.valid };
  }
  setAudienceGender(){
  //  console.log("audiencegender "+this.audiencegender.value);

    return { 'has-danger': !this.audiencegender.pristine && !this.audiencegender.valid };
  }
  setAudienceAge(){
   // console.log("audienceage "+this.audienceage.value);
    
  //  console.log("fomr valid "+this.createCampaignForm.valid);
  /*  console.log(

      " channel " + this.channel.valid+ 
     
      " details " +  this.details.valid+  
      " contenttype " + this.contenttype.valid+  
      " producttype " + this.producttype.valid+  
      " campaignname " + this.campaignname.valid+  
      " websiteurl " + this.websiteurl.valid+  
      " producturl " + this.producturl.valid+  
      " shippingproducts " + this.shippingproducts.valid+  
      " productcategory  " + this.productcategory.valid+  
      " budget " + this.budget.valid+  
      " deadline " + this.deadline.valid+  
      " noofinfu " + this.noofinfu.valid+  
      " audiencegender " + this.audiencegender.valid+  
      " audienceage " + this.audienceage.valid

    )*/
    return { 'has-danger': !this.audienceage.pristine && !this.audienceage.valid };
    
  }


  createCampaign() {
    console.log("inside create campaign");
    this.campaignService.createCampaign(this.createCampaignForm.value).subscribe(
      res => {
        this.toast.setMessage('campaign created successfully!', 'success');
        this.router.navigate(['/brandcamp']);
      },
      error => this.toast.setMessage('You do not have permission to create campaign.', 'danger')
    );

  }
}
