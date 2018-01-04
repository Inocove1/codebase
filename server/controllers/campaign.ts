import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import Campaign from '../models/campaignModel';
import BaseCtrl from './base';

export default class CampaignCtrl extends BaseCtrl {


  userid= '';
  channel= '';
  contenttype= '';
  secchannel= '';
  campaignname= '';
  productcategory​= '';
  noofinfu= '';
  audiencegender= '';
  audienceage= '';
 

    model = Campaign;

    getByUserId = (req, res) => {
        this.model.find({ userid: req.params.id }, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        });
      }

      getAssignedCampaigns = (req, res) => {
        this.model.find({ assignedto: req.params.id }, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        });
      }
      getUnassignedCampaigns = (req, res) => {
        this.model.find({ assignedto:''}, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        });
      }

      updateapprovedamount = (req, res) => {
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
            if (err) { return console.error(err); }
            res.sendStatus(200);
        });
      } 
      search = (req, res) => {
        
        this.channel= req.body.channel;
        this.contenttype= req.body.contenttype1;
        this.secchannel= req.body.secchannel;
        this.campaignname= req.body.campaignname;
        this.productcategory​= req.body.productcategory​;
        this.noofinfu= req.body.noofinfu;
        this.audiencegender=req.body.audiencegender;
        this.audienceage=req.body.audienceage;

       /* console.log("  this.channel "+this.channel+ 
        "  this.contenttype "+this.contenttype+
        "  this.secchannel " + req.body.secchannel+
        "  this.campaignname " +this.campaignname+
        "  this.productcategory​ " +this.productcategory+
        "  this.noofinfu " +this.noofinfu+
        "  this.audiencegender " +this.audiencegender+
        "  this.audienceage " +this.audienceage);*/

        var query = this.model.find({ assignedto:''});
        if(this.channel!= ''){query.where('channel').equals(this.channel);}
        if(this.contenttype!= ''){query.where('contenttype').equals(this.contenttype);}
        if(this.campaignname!= ''){query.where('campaignname').equals(this.campaignname);}
        if(this.secchannel!= ''){query.where('secchannel').equals(this.secchannel);}
        if(this.noofinfu!= ''){query.where('noofinfu').equals(this.noofinfu);}
        if(this.productcategory!= ''){query.where('productcategory').equals(this.productcategory);}
        if(this.audiencegender!= ''){query.where('audiencegender').equals(this.audiencegender);}
        if(this.audienceage!= ''){query.where('audienceage').equals(this.audienceage);}
        
        query.exec(function(err, obj) {
            //,audienceage:this.audienceage,audiencecountry:this.audiencecountry,influencercountry:this.influencercountry,productcategory:this.productcategory 
          if (err) { return console.error(err); }
          
          res.json(obj);
          console.log(" returning Json: "+res.json());
        });
       
    }


      approve = (req, res) => {
        console.log("inside approve in backend :"+ req.body.campaignid+ "    "+req.body.senderid)
        this.model.findOneAndUpdate({ _id: req.body.campaignid }, {"assignedto":req.body.senderid,"approvedamount":req.body.approvedamount}, (err) => {
          if (err) { return console.error(err); }
          res.sendStatus(200);
        });
      }

}