import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-influencermessages',
  templateUrl: './influencermessages.component.html',
  styleUrls: ['./influencermessages.component.scss']
})
export class InfluencermessagesComponent implements OnInit {
  receivedlist=[];
  sentlist=[];
  sendMessageForm:FormGroup;
  sendMessageForm1:FormGroup;
  messagedetails = new FormControl('', []);

  rcvrid = new FormControl('', []);
  rcvrname = new FormControl('', []);
 

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    console.log(this.auth.loggedIn);
    if (this.auth.loggedIn) {
      
    }else{
      this.router.navigate(['/influencerlogin']);
    }
    this.sendMessageForm = this.formBuilder.group({
      senderid: this.auth.currentUser._id,
      sendername:this.auth.currentUser.username,
      receiverid: this.rcvrid,
      receivername:this.rcvrname,
      messagedetails: this.messagedetails
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

 sendMessage(recvdid,recvdname){

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
