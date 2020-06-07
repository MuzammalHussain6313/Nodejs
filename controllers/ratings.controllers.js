const ratingController = {};
const Ratings = require('../models/ratings.model');
const jsonwebtoken =  require('jsonwebtoken');
ratingController.addreview = async (req, res) => {
    try {
  
        const body = req.body;
        const rating = new Ratings(body);
      const result = await rating.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: 'Flat Added Successfully',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };


  ratingController.getrate = async (req, res) => {

    try {
  
      const body = req.body;
      console.log(body);
    // const result = await Ratings.find({ propertyid : owner});
      //console.log(flat);  this.flats = data.data;
      res.status(200).send({
        code: 200,
        message: 'Successful',
       //result
      });
  
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = ratingController;