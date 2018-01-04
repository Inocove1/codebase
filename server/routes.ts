import * as express from 'express';


import UserCtrl from './controllers/user';
import MessageCtrl from './controllers/message';
import ContentCtrl from './controllers/content';
import CampaignCtrl from './controllers/campaign';
import ProfileCtrl from './controllers/profile';
import BrandsCtrl from './controllers/brands';
import User from './models/userModel';
import FileUploadCtrl from './controllers/fileupload';
import StripeConnectCtrl from './controllers/stripeconnect';

export default function setRoutes(app) {

  const router = express.Router();

  
  const userCtrl = new UserCtrl();
  const campaignCtrl = new CampaignCtrl();
  const profileCtrl = new ProfileCtrl();
  const brandsCtrl = new BrandsCtrl();
  const messageCtrl = new MessageCtrl();
  const contentCtrl = new ContentCtrl();
  const fileUploadCtrl = new FileUploadCtrl();
  const stripeConnectCtrl = new StripeConnectCtrl();
  


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);
  router.route('/forgot').post(userCtrl.forgot);

  router.route('/campaign/approve').post(campaignCtrl.approve);
  router.route('/campaign').post(campaignCtrl.insert);
  router.route('/campaign/:id').get(campaignCtrl.getByUserId);
  router.route('/campaigns').get(campaignCtrl.getUnassignedCampaigns);
  router.route('/campaigns/search').post(campaignCtrl.search);
  router.route('/campaign/assigned/:id').get(campaignCtrl.getAssignedCampaigns);
  router.route('/campaign/updateamount/:id').get(campaignCtrl.updateapprovedamount);
  router.route('/campaign/getcampaign/:id').get(campaignCtrl.get);
  
  router.route('/profile').post(profileCtrl.updateprofile);
  router.route('/profile/:id').get(profileCtrl.get);
  router.route('/profile/search').post(profileCtrl.search);
  router.route('/profile/updateaccount/:id').post(profileCtrl.updateaccount);

  router.route('/brands').post(brandsCtrl.updatebrands);
  router.route('/brands/:id').get(brandsCtrl.get);
  router.route('/brands/search').post(brandsCtrl.search);
  router.route('/brands/updateaccount/:id').post(brandsCtrl.updateaccount);

  router.route('/message').post(messageCtrl.insert);
  router.route('/message/sent/:id').get(messageCtrl.getsent);
  router.route('/message/receive/:id').get(messageCtrl.getreceived);
  router.route('/message/delete/:id').get(messageCtrl.delete);

  router.route('/content').post(contentCtrl.insert);
  router.route('/content/approve/:id').post(contentCtrl.approve);
  router.route('/content/approvedreceiver/:id').get(contentCtrl.getapprovedasreceiver);
  router.route('/content/pendingreceiver/:id').get(contentCtrl.getpendingasreceiver);
  router.route('/content/approvedsender/:id').get(contentCtrl.getapprovedassender);
  router.route('/content/pendingsender/:id').get(contentCtrl.getpendingassender);
  
  router.route('/upload').post(fileUploadCtrl.profileupload);
  router.route('/uploadfile').post(fileUploadCtrl.fileupload);

 // router.route('/upload').post(fileUploadCtrl.profileupload);
  router.route('/stripe/finalizeaccount/:id').get(stripeConnectCtrl.finalizeaccount);
  router.route('/stripe/chargebrands/:id').post(stripeConnectCtrl.chargebrands);
  router.route('/stripe/payinfluencers/:id').post(stripeConnectCtrl.payinfluencers);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
