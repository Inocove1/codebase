import * as mongoose from 'mongoose';


const profile = new mongoose.Schema({
    userid: String,
    username: String,
    creator: String,
    audiencesize:String,
    audiencegender: String,
    audienceage: String,               
    audiencecountry: String,                     
    influencercountry: String,                      
    productcategory: String,
    workexamples:String,
    accountid:String      
});

const Profile = mongoose.model('Profile', profile);

export default Profile;
