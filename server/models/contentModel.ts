import * as mongoose from 'mongoose';


const content = new mongoose.Schema({
  senderid: String,
  sendername: String,
  receiverid: String,
  receivername: String,
  approvedcontent:{type:Boolean,default:false},
  contenttype:String,
  campaignid: String,
  contentlink: String,
  submitdate:{type:Date,default:new Date().toISOString()}

});

const Content = mongoose.model('Content', content);

export default Content;
