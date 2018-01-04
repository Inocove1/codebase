import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-influsearchbrand',
  templateUrl: './influsearchbrand.component.html',
  styleUrls: ['./influsearchbrand.component.scss']
})
export class InflusearchbrandComponent implements OnInit {
  brandslist=[];
  searchBrandsForm: FormGroup;

  sendMessageForm:FormGroup;

  sortby  =new FormControl('', []);
  creator  =new FormControl('', []);
  audiencesize  =new FormControl('', []);
  audiencegender  =new FormControl('', []);
  audienceage     =new FormControl('', []);                   
  audiencecountry   =new FormControl('', []);                     
  brandscountry   =new FormControl('', []);                     
  productcategory  =new FormControl('', []);

  rcvrid = new FormControl('', []);
  rcvrname = new FormControl('', []);
  messagedetails = new FormControl('', []);
  

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private searchService: SearchService,
              private messageService: MessageService
            ) { }

  ngOnInit() {
    console.log(this.auth.loggedIn);
    if (this.auth.loggedIn) {
      
    }else{
      this.router.navigate(['/brandlogin']);
    }
    this.searchBrandsForm = this.formBuilder.group({
      userid: this.auth.currentUser._id,
      sortby: this.sortby,
      creator: this.creator,
      audiencesize: this.audiencesize,
      audiencegender: this.audiencegender,
      audienceage: this.audienceage,               
      audiencecountry: this.audiencecountry,                     
      brandscountry: this.brandscountry,                      
      productcategory: this.productcategory      
    });

    this.sendMessageForm = this.formBuilder.group({
      senderid: this.auth.currentUser._id,
      sendername:this.auth.currentUser.username,
      receiverid: this.rcvrid,
      receivername:this.rcvrname,
      messagedetails: this.messagedetails     
    });
      
  }

  setSortBy() {
    return { 'has-danger':  !this.sortby.valid };
  }

  setCreator() {
    return { 'has-danger':  !this.creator.valid };
  }

  setAudienceSize() {
    return { 'has-danger':  !this.audiencesize.valid };
  }

  setAudienceGender() {
    return { 'has-danger':  !this.audiencegender.valid };
  }

  setAudienceCountry() {
    return { 'has-danger':  !this.audiencecountry.valid };
  }

  setBrandsCountry() {
    return { 'has-danger':  !this.brandscountry.valid };
  }

  setAudienceAge() {
    return { 'has-danger':  !this.audienceage.valid };
  }

  setProductCategory() {
    return { 'has-danger':  !this.productcategory.valid };
  }

 
  setMessageDetails() {
    return { 'has-danger':  !this.messagedetails.valid };
  }



  searchBrands() {
    console.log( "sortby"+ this.sortby.value);
    console.log( "creator"+  this.creator.value);
    console.log( "audiencesize"+  this.audiencesize.value);
    console.log( "audiencegender"+  this.audiencegender.value);
    console.log( "audienceage"+  this.audienceage.value);               
    console.log( "audiencecountry"+  this.audiencecountry.value);                     
    console.log( "brandscountry"+  this.brandscountry.value);                      
    console.log( "productcategory"+  this.productcategory.value);
    console.log("inside search influencers");
    this.searchService.searchBrands(this.searchBrandsForm.value).subscribe(
      res => {
        this.brandslist=res;
        console.log("response :"+res);
        this.toast.setMessage('Criteria matched successfully!', 'success');
        this.router.navigate(['/influsearchbrand']);
      },
      error => this.toast.setMessage('You do not have permission to perform search.', 'danger')
    );

  }

  sendMessageToBrand(recvdid,recvdname){

    console.log("inside send  message "+this.sendMessageForm.value.userid);
    console.log("inside send  message "+this.sendMessageForm.value.messagedetails);
    console.log("inside send  message "+recvdid);
    
    this.sendMessageForm.value.receiverid=recvdid;
    this.sendMessageForm.value.receivername=recvdname;

    this.messageService.sendMessage(this.sendMessageForm.value).subscribe(
      res => {
       
        console.log("response :"+res);
        this.toast.setMessage('Message sent successfully!', 'success');
       // this.router.navigate(['/brandsearchinfu']);
      },
      error => this.toast.setMessage('You do not have permission to send message.', 'danger')
    );
  }

}
