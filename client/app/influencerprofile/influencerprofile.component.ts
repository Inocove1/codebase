import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadService } from '../services/fileupload.service';
import { StripeService } from '../services/stripe.service';
import {Location} from '@angular/common';
import {URLSearchParams, Http, Headers, HttpModule, RequestOptions,Request} from '@angular/http';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-influencerprofile',
  templateUrl: './influencerprofile.component.html',
  styleUrls: ['./influencerprofile.component.scss']
})
export class InfluencerprofileComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8','Access-Control-Allow-Origin': '*' });
  private options = new RequestOptions({ headers: this.headers });

    profile: Object[];
    updateProfileForm: FormGroup;
  
    sortby  =new FormControl('', []);
    creator  =new FormControl('', []);
    audiencesize  =new FormControl('', []);
    audiencegender  =new FormControl('', []);
    audienceage     =new FormControl('', []);                   
    audiencecountry   =new FormControl('', []);                     
    influencercountry   =new FormControl('', []);                     
    productcategory  =new FormControl('', []);
    workexamples  =new FormControl('', []);
    accountid =new FormControl('', []);
    
    accountForm:FormGroup;
  
    constructor(private auth: AuthService,
                private formBuilder: FormBuilder,
                private router: Router,
                public toast: ToastComponent,
                private profileService: ProfileService,
                private _svc: FileUploadService,
          //   private activatedRoute: ActivatedRoute,
                private http:Http,
                private stripesvc:StripeService
                ) { 
                  this.reset();
                }
  
    ngOnInit() {
      console.log(this.auth.loggedIn);
      if (this.auth.loggedIn) {
        
      }else{
        this.router.navigate(['/login']);
      }
      this.updateProfileForm = this.formBuilder.group({
        userid: this.auth.currentUser._id,
        username: this.auth.currentUser.username,
        sortby: this.sortby,
        creator: this.creator,
        audiencesize: this.audiencesize,
        audiencegender: this.audiencegender,
        audienceage: this.audienceage,               
        audiencecountry: this.audiencecountry,                     
        influencercountry: this.influencercountry,                      
        productcategory: this.productcategory,
        workexamples:this.workexamples      
      });
        
      this.profileService.getProfile(this.auth.currentUser).subscribe(res => {
        if(res[0]=== undefined){
          this.profile = [{userid: this.auth.currentUser._id,
            username: this.auth.currentUser.username,
            audiencesize: '',
            audiencegender: '',
            audienceage: '',               
            audiencecountry: '',                     
            brandscountry: '',                      
            productcategory: '',
            'accountid':''},{}];
    
              }else{
          this.profile=res;
          }
       
     });

     var urltree = this.router.parseUrl(this.router.url);
     var qp = urltree.queryParams;
     var code= qp['code'];
     console.log('code:'+code);
  
      if(code.length > -1||code!=''){
        console.log('inside if')
        this.stripesvc.finalizeAccount(code).subscribe(
          res => {
            var outJ = JSON.parse(res);
            var stripeuserid = outJ.stripe_user_id;
            console.log("output Json :"+JSON.stringify(outJ));
            console.log("stripeuserid :"+stripeuserid);
            this.saveAccountId(stripeuserid);
          },
          error => this.toast.setMessage('You do not have permission to perform this action.', 'danger')
        );
        
      }
    }

    saveAccountId(acctid){
      this.accountid=acctid;
      this.profileService.updateProfileAccount(this.auth.currentUser,{'accountid':acctid}).subscribe( res => {
        this.toast.setMessage('stripe account details updated successfully!', 'success');
        this.router.navigate(['/influencerboard']);
      },
      error => this.toast.setMessage('Failed to perform action. Contact administrator or try again later.', 'danger')
    );
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
  
    setInfluencerCountry() {
      return { 'has-danger':  !this.influencercountry.valid };
    }
  
    setAudienceAge() {
      return { 'has-danger':  !this.audienceage.valid };
    }
  
    setProductCategory() {
      return { 'has-danger':  !this.productcategory.valid };
    }

    setWorkExamples() {
      return { 'has-danger':  !this.workexamples.valid };
    }
  
  
  
    updateProfile() {
      console.log( "sortby"+ this.sortby.value);
      console.log( "creator"+  this.creator.value);
      console.log( "audiencesize"+  this.audiencesize.value);
      console.log( "audiencegender"+  this.audiencegender.value);
      console.log( "audienceage"+  this.audienceage.value);               
      console.log( "audiencecountry"+  this.audiencecountry.value);                     
      console.log( "influencercountry"+  this.influencercountry.value);                      
      console.log( "productcategory"+  this.productcategory.value);
      console.log( "productcategory"+  this.workexamples.value);
      console.log("inside update profile");
      this.profileService.updateProfile(this.updateProfileForm.value).subscribe(
        res => {
          this.toast.setMessage('profile updated successfully!', 'success');
          this.router.navigate(['/influencerboard']);
        },
        error => this.toast.setMessage('You do not have permission to update profile.', 'danger')
      );
  
    }


  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

 
  filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    var formData = new FormData();
    
    if (!fileList.length) return;

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append(fieldName, fileList[x], this.auth.currentUser._id+".png");
        console.log(fieldName +"   "+ fileList[x]+"    "+ fileList[x].name+"  "+fileList[x].type);
     
      });
      
    // save it
    this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData:FormData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
   console.log(formData.get('photos'));
   // console.log(formData.value.filedetails.name);
  
    this._svc.upload(formData) // DEV.filedetails ONLY: delay 1.5s to see the changes
      .subscribe(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      })
  }
  }
  