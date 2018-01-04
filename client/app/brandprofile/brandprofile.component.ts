import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrandprofileService } from '../services/brandprofile.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadService } from '../services/fileupload.service';
import { StripeService } from '../services/stripe.service';
import {Location} from '@angular/common';
import {URLSearchParams, Http, Headers, HttpModule, RequestOptions,Request} from '@angular/http';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-brandprofile',
  templateUrl: './brandprofile.component.html',
  styleUrls: ['./brandprofile.component.scss']
})
export class BrandprofileComponent implements OnInit {
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
  brandscountry   =new FormControl('', []);                     
  productcategory  =new FormControl('', []);
  accountid =new FormControl('', []);

  accountForm:FormGroup;

  fileForm:FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private profileService: BrandprofileService,
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
      brandscountry: this.brandscountry,                      
      productcategory: this.productcategory      
    });

    this.accountForm = this.formBuilder.group({
      accountid: this.accountid
    });
      
    this.profileService.getBrand(this.auth.currentUser).subscribe(res => {
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
    
    this.profileService.updateBrandAccount(this.auth.currentUser,{'accountid':acctid}).subscribe( res => {
      this.toast.setMessage('stripe account details updated successfully!', 'success');
      this.router.navigate(['/brandboard']);
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

  setBrandsCountry() {
    return { 'has-danger':  !this.brandscountry.valid };
  }

  setAudienceAge() {
    return { 'has-danger':  !this.audienceage.valid };
  }

  setProductCategory() {
    return { 'has-danger':  !this.productcategory.valid };
  }



  updateProfile() {
    console.log( "sortby"+ this.sortby.value);
    console.log( "creator"+  this.creator.value);
    console.log( "audiencesize"+  this.audiencesize.value);
    console.log( "audiencegender"+  this.audiencegender.value);
    console.log( "audienceage"+  this.audienceage.value);               
    console.log( "audiencecountry"+  this.audiencecountry.value);                     
    console.log( "brandscountry"+  this.brandscountry.value);                      
    console.log( "productcategory"+  this.productcategory.value);
    console.log("inside update profile");
    this.profileService.updateBrands(this.updateProfileForm.value).subscribe(
      res => {
        this.toast.setMessage('profile updated successfully!', 'success');
        this.router.navigate(['/brandboard']);
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
    debugger;
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
