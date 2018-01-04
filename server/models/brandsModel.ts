import * as mongoose from 'mongoose';


const brands = new mongoose.Schema({
    userid: String,
    username: String,
    creator: String,
    audiencesize:String,
    audiencegender: String,
    audienceage: String,               
    audiencecountry: String,                     
    brandscountry: String,                      
    productcategory: String,
    accountid:String      
});

const Brands = mongoose.model('Brands', brands);

export default Brands;
