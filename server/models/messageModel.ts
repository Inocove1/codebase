import * as mongoose from 'mongoose';


const message = new mongoose.Schema({
  senderid: String,
  sendername: String,
  receiverid: String,
  receivername: String,
  isproposal:{type:Boolean,default:false},
  campaignid: String,
  messagedetails: String,
  messagedate:{type:Date,default:new Date().toISOString()}
});

const Message = mongoose.model('Message', message);

export default Message;
