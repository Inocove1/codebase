import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import Brands from '../models/brandsModel';
import BaseCtrl from './base';

export default class ProfileCtrl extends BaseCtrl {
    uid = '';
    audiencegender= '';
    audienceage = '';
    audiencecountry = '';
    brandscountry = '';
    productcategory = '';
    model = Brands;
   teststring="";

    updatebrands = (req, res) => {
        console.log('request inside upateprofile: ' + req.body.userid );
        this.uid=req.body.userid;
        this.model.remove({userid:this.uid}, function(err,removed) {
            console.log("records removed :",removed);
        });
      return this.insert(req, res);
      }
    
    updateaccount = (req, res) => {
        console.log('request inside upateaccount: ' +req.params.id+" "+ req.body.accountid );
    this.model.findOneAndUpdate({ userid: req.params.id }, req.body, (err) => {

        if (err) { return console.error(err); }
        res.sendStatus(200);
    });
    }  


    get = (req, res) => {
        this.model.find({ userid: req.params.id }, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        });
    }

    search = (req, res) => {
        this.uid=req.body.userid;
        this.audiencegender=req.body.audiencegender;
        this.audienceage=req.body.audienceage;
        this.audiencecountry=req.body.audiencecountry;
        this.brandscountry=req.body.brandscountry;
        this.productcategory=req.body.productcategory;

        var query = this.model.find({});

        if(this.audiencegender!= ''){query.where('audiencegender').equals(this.audiencegender);}
        if(this.audienceage!= ''){query.where('audienceage').equals(this.audienceage);}
        if(this.audiencecountry!= ''){query.where('audiencecountry').equals(this.audiencecountry);}
        if(this.brandscountry!= ''){query.where('brandscountry').equals(this.brandscountry);}
        if(this.productcategory!= ''){query.where('productcategory').equals(this.productcategory);}
        
        query.exec(function(err, obj) {
            //,audienceage:this.audienceage,audiencecountry:this.audiencecountry,influencercountry:this.influencercountry,productcategory:this.productcategory 
          if (err) { return console.error(err); }
          
          res.json(obj);
          console.log(" returning Json: "+res.json());
        });
       
    }

}