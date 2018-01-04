import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import Message from '../models/messageModel';
import BaseCtrl from './base';

export default class MessageCtrl extends BaseCtrl {

    model = Message;

    getreceived = (req, res) => {
        this.model.find({receiverid:req.params.id}, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        }).sort({messagedate:-1});
    }

    getsent = (req, res) => {
        this.model.find({senderid:req.params.id}, (err, obj) => {
          if (err) { return console.error(err); }
          res.json(obj);
        }).sort({messagedate:-1});
    }

     // Insert
  insert = (req, res) => {
      req.body.messagedate=Date.now();
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
    });
  }

}