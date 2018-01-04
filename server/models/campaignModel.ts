import * as mongoose from 'mongoose';


const campaign = new mongoose.Schema({
    userid: String,
    channel: String,
    contenttype: String,
    secchannel: String,
    campaignname: String,
    websiteurl: String,
    producturl: String,
    productcategory​: String,
    details: String,
    deadline: String,
    noofinfu: String,
    audiencegender: String,
    audienceage: String,
    budget: String,
    approvedamount: String,
    shippingproducts: String,
    status: String,
    assignedto:{type:String,default:''},
    
});

const Campaign = mongoose.model('Campaign', campaign);

export default Campaign;
