import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { MessageService } from '../services/message.service';
import { ContentService } from '../services/content.service';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadService } from '../services/fileupload.service';

@Component({
  selector: 'app-influencercamp',
  templateUrl: './influencercamp.component.html',
  styleUrls: ['./influencercamp.component.scss']
})
export class InfluencercampComponent implements OnInit {

    assignedcampaigns: Object[];
    campaigns: Object[];

    sendMessageForm:FormGroup;
    submitContentForm:FormGroup;

    contenttype = new FormControl('', []);
    contentlink = new FormControl('', []);

    campaignid=new FormControl('', []);
    rcvrid = new FormControl('', []);
    rcvrname = new FormControl('', []);
   
    messagedetails = new FormControl('', []);
    isproposal = new FormControl('', []);

    upFile:FileList;

    searchCampaignForm: FormGroup;
    channel = new FormControl('', []);
    //contenttype = new FormControl('', [Validators.required, Validators.minLength(1)]);
    secchannel = new FormControl('', []);
    campaignname =new FormControl('', []);
  //  shippingproducts = new FormControl('', [Validators.required, Validators.minLength(1)]);
    productcategory = new FormControl('', []);
    noofinfu = new FormControl('', []);
    audiencegender = new FormControl('', []);
    audienceage = new FormControl('', []);
    contenttype1 = new FormControl('', []);
  

    constructor(private auth: AuthService,
                private formBuilder: FormBuilder,
                private router: Router,
                public toast: ToastComponent,
                private campaignService: CampaignService,
                private messageService: MessageService,
                private contentService: ContentService,
                private _svc: FileUploadService,
              ) { 
                this.reset();
              }
  
    ngOnInit() {
      console.log(this.auth.loggedIn);
      if (this.auth.loggedIn) {
        
      }else{
        this.router.navigate(['/influencerlogin']);
      }
      
      this.sendMessageForm = this.formBuilder.group({
        campaignid:this.campaignid,
        senderid: this.auth.currentUser._id,
        sendername:this.auth.currentUser.username,
        receiverid: this.rcvrid,
        receivername:this.rcvrname,
        messagedetails: this.messagedetails,
        isproposal:true
      });

      this.submitContentForm = this.formBuilder.group({
        campaignid:this.campaignid,
        senderid: this.auth.currentUser._id,
        sendername:this.auth.currentUser.username,
        receiverid: this.rcvrid,
        receivername:this.rcvrname,
        contentlink: this.contentlink,
        contenttype:this.contenttype
      });

      this.searchCampaignForm = this.formBuilder.group({
        userid: this.auth.currentUser._id,
        channel: this.channel,
        contenttype1:this.contenttype1,
        secchannel:this.secchannel,
        campaignname:this.campaignname,
      //  shippingproducts:this.shippingproducts,
        productcategory :this.productcategory,
        noofinfu:this.noofinfu,
        audiencegender:this.audiencegender,
        audienceage:this.audienceage
        
      });

      this.campaignService.getAssignedCampaigns(this.auth.currentUser).subscribe(res => {
        console.log("inside assigned camps message "+ res);
       this.assignedcampaigns=res;
       
    });

      this.campaigns=[];
   // this.campaignService.getUnassignedCampaigns().subscribe(res => {
   //   console.log("inside assigned camps message "+ res);
   //  this.campaigns=res;
     
  //});

   
  
    }
  
  
    
    setMessageDetails() {
      return { 'has-danger':  !this.messagedetails.valid };
    }

    setContentLink() {
      return { 'has-danger':  !this.contentlink.valid };
    }

    setContentType() {
      return { 'has-danger':  !this.contenttype.valid };
    }

    setChannel() {
      //console.log("Channel "+this.channel.value);
       return { 'has-danger': !this.channel.pristine && !this.channel.valid };
      }
    
      setContentType1(){
      //  console.log("ContentType "+this.contenttype.value);
        return { 'has-danger': !this.contenttype1.pristine && !this.contenttype1.valid };
      }
      setSecchannel(){
      //  console.log("ProductType "+this.producttype.value);
        return { 'has-danger': !this.secchannel.pristine && !this.secchannel.valid };
      }
      setCampaignName(){
      //  console.log("campaignname "+this.campaignname.value);
        return { 'has-danger': !this.campaignname.pristine && !this.campaignname.valid };
      }
    
     // setShippingProducts(){
      //  console.log("shippingproducts "+this.shippingproducts.value);
     //   return { 'has-danger': !this.shippingproducts.pristine && !this.shippingproducts.valid };
     // }
      setProductCategory(){
      //  console.log("productcategory "+this.productcategory.value);
        return { 'has-danger': !this.productcategory.pristine && !this.productcategory.valid };
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
      
        return { 'has-danger': !this.audienceage.pristine && !this.audienceage.valid };
        
      }
    
    
      searchCampaign() {
        console.log("inside search campaign");
        this.campaignService.searchCampaigns(this.searchCampaignForm.value).subscribe(
      
     //   this.campaignService.getUnassignedCampaigns(this.searchCampaignForm.value).subscribe(
          res => {
            this.campaigns=res;
            this.toast.setMessage('Campaign search successfull!', 'success');
            this.router.navigate(['/influencercamp']);
          },
          error => this.toast.setMessage('You do not have permission to create campaign.', 'danger')
        );
    
      }


    sendProposalToCampaign(recvdid,recvdname,campid){
      
        
          this.sendMessageForm.value.campaignid=campid;
          this.sendMessageForm.value.receiverid=recvdid;
          this.sendMessageForm.value.receivername=recvdname;
          this.sendMessageForm.value.isproposal=true;
          this.messageService.sendMessage(this.sendMessageForm.value).subscribe(
            res => {
             
              console.log("response :"+res);
              this.toast.setMessage('Proposal sent successfully!', 'success');
             // this.router.navigate(['/brandsearchinfu']);
            },
            error => this.toast.setMessage('You do not have permission to send proposal.', 'danger')
          );
        }

    submitContentToCampaign(recvdid,recvdname,campid){
      
          this.submitContentForm.value.campaignid=campid;
          this.submitContentForm.value.receiverid=recvdid;
          this.submitContentForm.value.receivername=recvdname;
          var filename = "";
          this.contentService.sendContent(this.submitContentForm.value).subscribe(
            res => {
              filename=JSON.parse(res._body)._id;
              console.log("response :"+res._body);
              console.log("response :"+JSON.parse(res._body)._id);
              this.toast.setMessage('Content submitted successfully!', 'success');
              // this.router.navigate(['/brandsearchinfu']);
              var formData = new FormData();
              if (!this.upFile.length) return;
              
                  // append the files to FormData
                  Array
                    .from(Array(this.upFile.length).keys())
                    .map(x => {
                      console.log( "filename :"+filename);
                      var ftype = this.upFile[x].type;
                      ftype=ftype.substr(ftype.lastIndexOf('/')+1);
                      var filen=filename+"."+ftype;
                      formData.append('file', this.upFile[x], filen);
                      console.log( this.upFile[x]+"    "+ filen+"  "+this.upFile[x].type);
                   
                    });
              this.save(formData);
            },
            error => this.toast.setMessage('You do not have permission to submit content.', 'danger')
          );
          
         /* var fl = this.formData.get('photos');
          var formD = new FormData();
          formD.append('files',fl[0],filename)
          this.save(formD);*/
          
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
          
            this.upFile=fileList;

            this.currentStatus = this.STATUS_SAVING;
          // save it
         // this.save( this.formData);
        }
      
        reset() {
          this.currentStatus = this.STATUS_INITIAL;
          this.uploadedFiles = [];
          this.uploadError = null;
        }
      
        save(formDat:FormData) {
          // upload data to the server
         // this.currentStatus = this.STATUS_SAVING;
        // console.log(formData.get('files'));
         // console.log(formData.value.filedetails.name);
         // debugger;
          this._svc.uploadfile(formDat) // DEV.filedetails ONLY: delay 1.5s to see the changes
            .subscribe(x => {
              this.uploadedFiles = [].concat(x);
              this.currentStatus = this.STATUS_SUCCESS;
            }, err => {
              this.uploadError = err;
              this.currentStatus = this.STATUS_FAILED;
            })
        }
      

  }
  