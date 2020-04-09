const usersController = {};
const Users = require('../models/users.model');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

////////VERIFY

  
usersController.getAll = async (req, res) => {
  let users;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    users = await Users.paginate(
      merged,
      { password: 0 },
      {
        password: 0,
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: users
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.getSingleUser = async (req, res) => {
  let user;
  try {
    const _id = req.params._id;
    user = await Users.findOne({ _id: _id });
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: user
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.registerUser = async (req, res) => {
  try {
    
  const body = req.body;
    const password = body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    body.password = hash;

     
     body.active= false;
    const user = new Users(body);
   
    const result = await user.save();
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
             user: 'noumanafzaljbd@gmail.com',
             pass: 'xxxxxxxxx9'
         }
     }); 
     const token = jsonwebtoken.sign({
      data: result,
      role: 'User'
   }, process.env.JWT_KEY, { expiresIn: '7d' });
     const mailOptions = {
      from :'noumanafzaljbd@gmail.com', // sender this is your email here
      to : `${req.body.email}`, // receiver email2
      subject: "Account Verification",
      html: `<h1>Hello Friend Please Click on this link<h1><br>Token
  <br><a href="http://localhost:8100/verify?token=${token}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
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


///// VERIFY USER
usersController.verifyUser = async (req, res) => {
    try {
      console.log("ndjnadkja"); 
      const body = req.body;
      console.log("ndjnadkja"); 
      const email = body.email;
     
      const result = await Users.findOne({ email: email });
        if (!result) 
        {
                      
        }
             
      else {
        const email = body.email;
      const result = await Users.updateOne({email: email}, {$set:{active:true}});
      }
    }
     catch (ex) {
      console.log('ex', ex);
    }
}; 


/////////// UPDATE PASSWORD
usersController.updatepass = async (req, res) => {
  try {
     
    const body = req.body;
     
    const email = body.email;
     
    const password = body.password;
     
   
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  body.password = hash;
    const result = await Users.findOne({ email: email });
      if (!result) 
      {
                   console.log("nnnnnnnnnnn"); 
      }
           
    else {
    
    const result = await Users.updateOne({email: email}, {$set:{password:body.password}});
     
   
    }
  }
   catch (ex) {
    console.log('ex', ex);
  }
};


usersController.loginUser = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        
        // lets check if email exists
        
        const result = await Users.findOne({ email: email });
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
               role: 'User'
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

usersController.getNextId = async (req, res) => {
  try {
    const max_result = await Users.aggregate([
      { $group: { _id: null, max: { $max: '$id' } } }
    ]);

    let nextId;
    if (max_result.length > 0) {
      nextId = max_result[0].max + 1;
    } else {
      nextId = 1;
    }

    var data = {
      code: 200,
      data: { id: nextId }
    };
    res.status(200).send(data);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.deleteUser = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;

    const result = await Users.findOneAndDelete({
      _id: _id
    });
    //   const result = await Inventory.updateOne({
    //         _id: _id
    //     }, {
    //         $set: {is_deleted: 1}
    //     }, {
    //         upsert: true,
    //         runValidators: true
    //     });
    res.status(200).send({
      code: 200,
      message: 'Deleted Successfully'
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
usersController.uploadAvatar = async (req, res) => {
  try {
    const filePath = `images/avatar/avatar-${req.params.id}`;
    const ext = path.extname(req.file.originalname);
    const updates = {
      avatar: filePath,
      avatar_ext: ext
    };
    runUpdateById(req.params.id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
usersController.updateUser = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;
    let updates = req.body;
    runUpdate(_id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

async function runUpdate(_id, updates, res) {
  try {
    const result = await Users.updateOne(
      {
        _id: _id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: 'Created Successfully'
        });
      } else {
        res.status(422).send({
          code: 422,
          message: 'Unprocessible Entity'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}
async function runUpdateById(id, updates, res) {
  try {
    const result = await Users.updateOne(
      {
        id: id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: 'Updated Successfully'
      });
    } else if (result.upserted) {
      res.status(200).send({
        code: 200,
        message: 'Created Successfully'
      });
    } else {
      {
        res.status(200).send({
          code: 200,
          message: 'Task completed successfully'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}

module.exports = usersController;
