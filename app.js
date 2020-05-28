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

    /////////// HEROKU Live URL
const mongoCon = process.env.mongoCon;
mongoose.connect('mongodb+srv://dbadmin:xxxxxxxx8@cluster0-whpqa.mongodb.net/bookyapp?retryWrites=true&w=majority',{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });



const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file);
});




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
app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));