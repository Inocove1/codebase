import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { StripeService } from '../services/stripe.service';
import { ProfileService } from '../services/profile.service';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-brandcontent',
  templateUrl: './brandcontent.component.html',
  styleUrls: ['./brandcontent.component.scss']
})
export class BrandcontentComponent implements OnInit {
  approvedlist=[];
  pendlist=[];

  sendApprovalForm:FormGroup;
  messagedetails = new FormControl('', []);

  rcvrid = new FormControl('', []);
  rcvrname = new FormControl('', []);

 


  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private contentService: ContentService,
    private stripesvc:StripeService,
    private profileService:ProfileService,
    private messageService: MessageService,
    private campaignService: CampaignService
    
  ) { }

  ngOnInit() {

    console.log(this.auth.loggedIn);
    if (this.auth.loggedIn) {
      
    }else{
      this.router.navigate(['/influencerlogin']);
    }
    this.sendApprovalForm = this.formBuilder.group({
      senderid: this.auth.currentUser._id,
      sendername:this.auth.currentUser.username,
      receiverid: this.rcvrid,
      receivername:this.rcvrname,
      messagedetails: this.messagedetails
    });

   /* this.contentService.getContentAsReceiver(this.auth.currentUser).subscribe(
      res => {
       
        this.receivedlist=res;
        console.log("responsereceive: "+res);
        console.log("receivedmessage :"+this.receivedlist[0].senderid+" "+this.receivedlist[0].messagedetails+" "+this.receivedlist[0].receiverid);
      },
      error => this.toast.setMessage('You do not have permission to receive content.', 'danger')
    );*/

    this.contentService.getApprovedContentAsReceiver(this.auth.currentUser).subscribe(
      res => {
       
        this.approvedlist=res;
        console.log("responsesend: "+res);
       },
      error => this.toast.setMessage('You do not have permission to receive content.', 'danger')
    );

    this.contentService.getPendingContentAsReceiver(this.auth.currentUser).subscribe(
      res => {
       
        this.pendlist=res;
        console.log("responsesend: "+res);
       },
      error => this.toast.setMessage('You do not have permission to receive content.', 'danger')
    );

    
  }

 
 
  setMessageDetails() {
    return { 'has-danger':  !this.messagedetails.valid };
  }

 setContentApproval(recvdid,recvdname,contentid,campaignid){

  console.log("response : "+recvdid+"    "+recvdname+"    "+contentid);
  var obj = { "contentid":contentid};
  this.contentService.approveContent(obj,contentid).subscribe(
    res => {
     
      console.log("response :"+res);
      this.toast.setMessage('Content approved successfully!', 'success');
     // this.router.navigate(['/brandsearchinfu']);;
     this.sendMessage(recvdid,recvdname);
     this.payInfluencers(recvdid,campaignid);
    },
    error => this.toast.setMessage('You do not have permission to approve content.', 'danger')
  );
 // this.payInfluencers(recvdid,campaignid);
 }

 payInfluencers(userid, campaignid){
  console.log("userid:"+userid+"  "+campaignid);
    this.profileService.getProfile({_id:userid}).subscribe(
      res => {
        var accountid = res[0].accountid;
        console.log("accountid:"+res[0].accountid);
        this.campaignService.getByCampaignId(campaignid).subscribe(
          res => {
            console.log("camaign approval amount"+JSON.stringify(res));
            console.log("camaign approval amount"+res.approvedamount);
         
        this.stripesvc.payInfluencers(accountid,{"campid":campaignid,"amount":res.approvedamount}).subscribe(
          res => {
            this.toast.setMessage('Payment made to influencers successfully!', 'success');
          },
          error => this.toast.setMessage('There was a problem with paying influencers, contact administrator.', 'danger')
        );
      });
      });
  
   }

 sendMessage(recvdid,recvdname){

    console.log("inside send  message "+this.sendApprovalForm.value.senderid);
    console.log("inside send  message "+this.sendApprovalForm.value.messagedetails);
    
    console.log("inside send  message "+recvdid);
    
    this.sendApprovalForm.value.receiverid=recvdid;
    this.sendApprovalForm.value.receivername=recvdname;
   

    this.messageService.sendMessage(this.sendApprovalForm.value).subscribe(
      res => {
       
        console.log("response :"+res);
        this.toast.setMessage('Message sent successfully!', 'success');
       // this.router.navigate(['/brandsearchinfu']);
      },
      error => this.toast.setMessage('You do not have permission to send message.', 'danger')
    );
  }
}
