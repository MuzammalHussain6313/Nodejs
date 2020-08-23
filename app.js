const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
var mkdirp = require('mkdirp');
const flatsController = {};
const Flats = require("./models/flats.model");
const path = require('path');
const paypal = require('paypal-rest-sdk');
let flats;
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(cors());
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(cookieParser());
  
    
// Requiring Routes




const UsersRoutes = require('./routes/users.routes');
const FlatsRoutes = require('./routes/flats.routes');
const ClientsRoutes = require('./routes/clients.routes');
const HotelsRoutes = require('./routes/hotels.routes');
const RoomsRoutes = require('./routes/rooms.routes');
const ReservedroomsRoutes = require('./routes/reservedrooms.routes');
const ResturantsRoutes = require('./routes/resturants.routes');
const RoomcodesRoutes = require('./routes/roomcodes.routes');
const RatingsRoutes = require('./routes/ratings.routes');
const  ResturantratingsRoutes = require('./routes/resturantratings.routes');
const MenusRoutes = require('./routes/menus.routes');
const BookedtablesRoutes = require('./routes/bookedtables.routes');
    /////////// HEROKU Live URL
const mongoCon = process.env.mongoCon;
//mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://dbadmin:xxxxxxxx8@cluster0-whpqa.mongodb.net/bookyapp?retryWrites=true&w=majority',{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });



const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file);
});

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ad04wzJvD03g7X-8NqhY1Y1ugTTmM1zGlcVXzhSwLO1KYvKv2beXcLNF4xGtYUDZBLc4YL7vLxuBsl_C',
  'client_secret': 'ENMsXcoSSYxHePu52msgQBRRKoyFJsLZaTbFd3OvC0QCJH1t3NG-XirK98nKv0hkYfRKhUyPxAacOv5d'
});

app.globalAmount = 0
app.post('/createpayment', function (req, res)  {
  app.globalAmount = req.body.amount;
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://locahost:3000/executepayment",
        "cancel_url": "http://locahost:3000/cancelpayment"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": req.body.amount,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.body.amount
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
})

//app.use(express.static("public"));
app.use('/images', express.static(path.join(__dirname, 'upload')));
app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
});

app.set('port', (process.env.PORT));
//app.set('port', (process.env.PORT));
app.use(accessControls);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path =   'upload';
    mkdirp(path, err =>{
      if(err){
        console.log('err',err);
        cb(err, path)
      }
    })
    cb(null,path)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // only pdf files accepted
  //   if (!file.originalname.match(/\.csv$/)) {
  //     return cb(new Error('Only csv files are allowed!'), false);
  //   }
  //   else{
    cb(null, true);
  //  }
   }
  //  ,
  // limits: { fileSize: maxSize }
});
    app.post("/upload", upload.array('files',12), async (req, res, next) => {
      
      try{
        var array = [];
      const files = req.files;
      // for(let i of files){
      //   console.log(i.originalname);
        for (var i = 0; i < files.length; i++) {
               array.push(files[i].originalname);
          
      }
     console.log(array);
    
        
        // formData.append('ID', this.flatid);
      
      
    //   console.log(files);
    //  const pathh = files[0].path;
    //  console.log(pathh);


      // const body = JSON.parse(JSON.stringify(req.body));
      // const flatid = body.ID;
  
      
      // console.log(body);
      // console.log(req.body);
      // console.log(flatid);
      // body.url = `${flatid}/${pathh}`;
      // body.city = "";
      // const flat= new Flats(body);
      // const result = await flat.save();
    
     
    // const result = await flat.save();
    //   console.log(file.fieldname);
      if(!files)
      {
        const error =new Error('plsx');
        error.httpStatusCode=400
        return next (error)


      }
  
      res.send({sttus:  'ok',
        array
    });
    }
      catch (ex) {
        console.log('ex', ex);
    }
      });
  
// Routes which should handle requests

app.use("/users", UsersRoutes);
app.use("/flats", FlatsRoutes);
app.use("/clients", ClientsRoutes);
app.use("/hotels", HotelsRoutes);
app.use("/rooms", RoomsRoutes);
app.use("/reservedrooms", ReservedroomsRoutes);
app.use("/resturants", ResturantsRoutes);
app.use("/roomcodes", RoomcodesRoutes);
app.use("/ratings", RatingsRoutes);
app.use("/menus", MenusRoutes);
app.use("/resturantratings", ResturantratingsRoutes);
app.use("/bookedtables", BookedtablesRoutes);
app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));