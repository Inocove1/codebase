import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import Content from '../models/contentModel';
import BaseCtrl from './base';

export default class ContentCtrl extends BaseCtrl {

    model = Content;

    getreceived = (req, res) => {
        this.model.find({receiverid:req.params.id}, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        }).sort({submitdate:-1});
    }

    getsent = (req, res) => {
        this.model.find({senderid:req.params.id}, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        }).sort({submitdate:-1});
    }

  getapprovedassender = (req, res) => {
      this.model.find({senderid:req.params.id,approvedcontent:true}, (err, obj) => {
        if (err) { return console.error(err); }
        res.json(obj);
      }).sort({submitdate:-1});
  }

  getpendingassender = (req, res) => {
    this.model.find({senderid:req.params.id,approvedcontent:false}, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).sort({submitdate:-1});
  }

  getapprovedasreceiver = (req, res) => {
    this.model.find({receiverid:req.params.id,approvedcontent:true}, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).sort({submitdate:-1});
  }

  getpendingasreceiver = (req, res) => {
    this.model.find({receiverid:req.params.id,approvedcontent:false}, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).sort({submitdate:-1});
  }

     // Insert
  insert = (req, res) => {
      req.body.submitdate=Date.now();
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
     // console.log(res);
     // console.log("item "+item);

    });
  }

  approve = (req, res) => {
   
    this.model.findOneAndUpdate({ _id: req.params.id }, {approvedcontent:true}, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

}