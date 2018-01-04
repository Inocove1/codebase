import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
const stripe = require('stripe')("sk_test_hDif78tYPTHOzjPkFtThqk5N",'2016-03-07');
import * as request from 'request'
import * as url from 'url'
import * as querystring from 'querystring'

export default class StripeConnectCtrl{
 //  stripe = new stripe("ca_Bthk6coyu0mJ1o2jTrE0DQWBhGdS41R6",'2016-03-07');
  
     querystring = require('querystring');
     http = require('http');
     fs = require('fs');


    finalizeaccount = (req, res) =>  {
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'https://connect.stripe.com/oauth/token',
            form:   { client_secret:'sk_test_hDif78tYPTHOzjPkFtThqk5N', code: req.params.id, grant_type:'authorization_code'}
            },   
        function (error, response, body) {
            if (error) { return console.error(error); }
            var accessToken = JSON.parse(body).access_token;
            res.json(body);
            console.log(" returning Json: "+res.json());
        });
    
    }

    chargebrands =(req, res) => {

          stripe.charges.create({
            amount: parseFloat(req.body.amount)*100,
            currency: "usd",
            source: req.params.id,
            transfer_group:req.body.campid,
            
          }, function(err, charge) {
            if (err) { return console.error(err); }
            res.json(charge);
          });
     
    }

    payinfluencers=(req, res)  =>  {
        var traamount=  parseFloat(req.body.amount)*94;
        console.log("traamount "+traamount+"  destination "+req.params.id);

        stripe.transfers.create({
            amount:traamount,
            currency: "usd",
            destination: req.params.id,
            transfer_group: req.body.campid,
          }, function(err, charge) {
            if (err) { return console.error(err); }
            res.json(charge);
          });
    }

}