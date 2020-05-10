const clientsController = {};
const Clients = require('../models/clients.model');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

clientsController.registerUser = async (req, res) => {
    try {
      
    const body = req.body;
      const password = body.password;
  
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      body.password = hash;
  
       
       body.active= false;
      const client = new Clients(body);
     
      const result = await client.save();
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
               user: 'noumanafzaljbd@gmail.com',
               pass: 'xxxxxxxxx9'
           }
       }); 
       const token = jsonwebtoken.sign({
        data: result,
        role: 'Client'
     }, process.env.JWT_KEY, { expiresIn: '7d' });
       const mailOptions = {
        from :'noumanafzaljbd@gmail.com', // sender this is your email here
        to : `${req.body.email}`, // receiver email2
        subject: "Account Verification",
        html: `<h1>Hello Friend Please Click on this link<h1><br>Token
    <br><a href="https://mybookyap.herokuapp.com//clientverify?token=${token}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
      };
                                                            
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
      res.send({
        message: 'Signup successful'
      });
    } catch (ex) {
      console.log('ex', ex);
      if(ex.code===11000){
        res
        .send({
          message: 'This email has been registered already',
        })
        .status(500);
      }
      else {
      res
        .send({
          message: 'Error',
          detail: ex
        })
        .status(500);
    }
    }
  };


  clientsController.verifyUser = async (req, res) => {
    try {
      console.log("ndjnadkja"); 
      const body = req.body;
      console.log("ndjnadkja"); 
      const email = body.email;
      console.log("ndjnadkja"); 
      const result = await Clients.findOne({ email: email });
     
        if (!result) 
        {
          console.log(result); 
        }
             
      else {
        const email = body.email;
      const result = await Clients.updateOne({email: email}, {$set:{active:true}});
      }
      res.send({
        data: result
      });
    }
     catch (ex) {
     
      console.log('ex', ex);
    }
}; 
  

clientsController.loginUser = async (req, res) => {
  try {
      const body = req.body;
      const email = body.email;
      
      // lets check if email exists
      
      const result = await Clients.findOne({ email: email });
      if(result.active==true)
      {
        console.log("nn");
      if (!result) 
      {
                   
      }
           
    else {
        // email did exist
        // so lets match password
        
        if ( bcrypt.compareSync(body.password, result.password)) {
          // great, allow this user access
              
          result.password = undefined;
  
          const token = jsonwebtoken.sign({
             data: result,
             role: 'Client'
          }, process.env.JWT_KEY, { expiresIn: '7d' });
          
          res.send({ message: 'Successfully Logged in', token: token });
        } 
        
        
        else {
          console.log('password doesnot match');
  
          res.status(401).send({ message: 'Wrong email or Password' });
        }
      }
      
    
    }
    else
    {
       console.log("fuck you");
    } 
  }catch (ex) {
      console.log('ex', ex);
    }
};


  module.exports = clientsController;