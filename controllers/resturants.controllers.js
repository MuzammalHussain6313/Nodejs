const resturantsController = {};
const Resturants = require('../models/resturants.model');
const Resturantratings = require('../models/resturantratings.model');
const jsonwebtoken =  require('jsonwebtoken');
resturantsController.addresturant = async (req, res) => {
    try {
    
      const body = req.body;
   
      const resturant= new Resturants(body);
      const result = await resturant.save();
      console.log(result);
      res.status(200).send({
        code: 200,
        result,
        message: 'resturant Added Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  resturantsController.getAll = async (req, res) => {
    let resturant;
    try {
      let merged = {};
      const start = 0;
      const length = 100;
      resturant = await Resturants.paginate(
        merged,
        {
          offset: parseInt(start),
          limit: parseInt(length)
        }
      );
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: resturant
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  resturantsController.getresturant = async (req, res) => {

    try {
    
      const owner = req.params.owner;
     
     let myresturants = await Resturants.find({ owner: owner});
     
     let resturants = JSON.parse(JSON.stringify(myresturants))
  
     for (let item of resturants){
  
      const id = item._id;
      const reviews = await Resturantratings.find({resturantid : id});
      let reviewsTotal = 0;
      if(reviews.length)
      {
             const adrom =[];
          for (let review of reviews)
          {
  
            adrom.push(review.rating)
            
          }
          var sumNumber = adrom.reduce((acc, cur) => acc + Number(cur), 0) ;
      reviewsTotal = Number( sumNumber / reviews.length);
  
      }
  
      item['reviewsTotal'] = reviewsTotal;
  
     }
  
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: resturants
          
      });
     
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  resturantsController.update = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
      const result = await Resturants.updateOne(
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
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };



  resturantsController.delete = async (req, res) => {
    if (!req.params.id) {
      Fu;
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
  
      const result = await Resturants.findOneAndDelete({
        _id: _id
      });
     
      res.status(200).send({
        code: 200,
        message: 'Deleted Successfully'
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  module.exports = resturantsController;