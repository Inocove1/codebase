import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-influencercontent',
  templateUrl: './influencercontent.component.html',
  styleUrls: ['./influencercontent.component.scss']
})
export class InfluencercontentComponent implements OnInit {
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
    private messageService: MessageService
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

    this.contentService.getApprovedContentAsSender(this.auth.currentUser).subscribe(
      res => {
       
        this.approvedlist=res;
        console.log("responsesend: "+res);
       },
      error => this.toast.setMessage('You do not have permission to receive content.', 'danger')
    );

    this.contentService.getPendingContentAsSender(this.auth.currentUser).subscribe(
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

/* setContentApproval(recvdid,recvdname,contentid){
  this.contentService.approveContent(contentid).subscribe(
    res => {
     
      console.log("response :"+res);
      this.toast.setMessage('Content approved successfully!', 'success');
     // this.router.navigate(['/brandsearchinfu']);;
     this.sendMessage(recvdid,recvdname);
    },
    error => this.toast.setMessage('You do not have permission to approve content.', 'danger')
  );
 
 }*/


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
