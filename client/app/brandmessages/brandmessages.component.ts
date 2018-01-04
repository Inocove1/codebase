import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { CampaignService } from '../services/campaign.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { StripeService } from '../services/stripe.service';
import { BrandprofileService } from '../services/brandprofile.service';

@Component({
  selector: 'app-brandmessages',
  templateUrl: './brandmessages.component.html',
  styleUrls: ['./brandmessages.component.scss']
})
export class BrandmessagesComponent implements OnInit {
  receivedlist=[];
  sentlist=[];
  sendMessageForm:FormGroup;
  sendApprovalForm:FormGroup;
  messagedetails = new FormControl('', []);
  approvaldetails = new FormControl('', [Validators.required,Validators.minLength(10)]);
  approvalamount = new FormControl('', [Validators.required,Validators.pattern(new RegExp(/^\d*\.\d{2}$/g))]);
  campaignid =  new FormControl('', []);
  rcvrid = new FormControl('', []);
  rcvrname = new FormControl('', []);
  

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private messageService: MessageService,
    private campaignService: CampaignService,
    private stripesvc:StripeService,
    private profileService:BrandprofileService
  ) { }

  ngOnInit() {

    console.log(this.auth.loggedIn);
    if (this.auth.loggedIn) {
      
    }else{
      this.router.navigate(['/brandlogin']);
    }
    this.sendMessageForm = this.formBuilder.group({
      senderid: this.auth.currentUser._id,
      sendername:this.auth.currentUser.username,
      receiverid: this.rcvrid,
      receivername:this.rcvrname,
      messagedetails: this.messagedetails     
    });

    this.sendApprovalForm = this.formBuilder.group({
     // senderid: this.auth.currentUser._id,
     // sendername:this.auth.currentUser.username,
    //  receiverid: this.rcvrid,
     // receivername:this.rcvrname,
      approvaldetails: this.approvaldetails,
     // campaignid:this.campaignid,
      approvalamount:this.approvalamount     
    });

    this.messageService.getMessagesAsReceiver(this.auth.currentUser).subscribe(
      res => {
       
        this.receivedlist=res;
        console.log("responsereceive: "+res);
        console.log("receivedmessage :"+this.receivedlist[0].senderid+" "+this.receivedlist[0].messagedetails+" "+this.receivedlist[0].receiverid);
      },
      error => this.toast.setMessage('You do not have permission to send message.', 'danger')
    );

    this.messageService.getMessagesAsSender(this.auth.currentUser).subscribe(
      res => {
       
        this.sentlist=res;
        console.log("responsesend: "+res);
        console.log("sentmessage :"+this.sentlist[0].senderid+" "+this.sentlist[0].messagedetails+" "+this.sentlist[0].receiverid);
      },
      error => this.toast.setMessage('You do not have permission to send message.', 'danger')
    );

    
  }
 
  setMessageDetails() {
    return { 'has-danger':  !this.messagedetails.valid };
  }

  setApprovalDetails() {
    return { 'has-danger':  !this.approvaldetails.valid };
  }

  setApprovalAmount(){
    return { 'has-danger':  !this.approvalamount.valid };
  }

  setApproval(senderid,sendername,campaignid){

  var amount = this.approvalamount.value;
  console.log("inside approval  message "+senderid+"     "+sendername+ "  "+campaignid+"  "+amount);

  

  var obj={"campaignid":campaignid,"senderid":senderid,"approvedamount":amount};
    this.campaignService.setApproval(obj).subscribe(
      res => {
       
        console.log("response from set approval:"+res);
        this.toast.setMessage('Approval sent successfully!', 'success');
        this.sendMessageForm.value.receiverid=senderid;
        this.sendMessageForm.value.receivername=sendername;
        this.sendMessageForm.value.messagedetails=this.sendApprovalForm.value.approvaldetails;
        this.sendMessageForm.value.senderid=this.auth.currentUser._id;
        this.sendMessageForm.value.sendername=this.auth.currentUser.username;

        this.chargeBrands(this.auth.currentUser, campaignid);
        this.sendMessageToInfluencer(senderid,sendername);
      },
      error => this.toast.setMessage('You do not have permission to approve.', 'danger')
    );

    
  }
  

 chargeBrands(user, campaignid){

  this.profileService.getBrand(user).subscribe(
    res => {
      var accountid = res[0].accountid;
      console.log("accountid:"+res[0].accountid);
      this.stripesvc.chargeBrands(accountid,{"campid":campaignid,"amount":this.approvalamount.value}).subscribe(
        res => {
          this.toast.setMessage('Approval amount charged successfully!', 'success');
        },
        error => this.toast.setMessage('There was a problem with approving funds, please try again.', 'danger')
      );
         
    });

 }


  
 sendMessageToInfluencer(recvdid,recvdname){

    console.log("inside send  message "+this.sendMessageForm.value.senderid);
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

  deleteMessage(msgid){
    
           
        console.log("inside delete  message "+msgid);
        
        this.messageService.deleteMessage(msgid).subscribe(
          res => {
           
            console.log("response :"+res);
            this.toast.setMessage('Message deleted successfully!', 'success');
           // this.router.navigate(['/brandsearchinfu']);
          },
          error => this.toast.setMessage(error, 'danger')
        );
      }
}
