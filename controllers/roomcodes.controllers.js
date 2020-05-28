
const roomcodeController = {};
const Roomcodes = require('../models/roomcodes.model');
const jsonwebtoken =  require('jsonwebtoken');
roomcodeController.addcode = async (req, res) => {
    try {
    
      const body = req.body;
   
      const roomcode= new Roomcodes(body);
      const result = await roomcode.save();
      res.status(200).send({
        code: 200,
        result,
        message: 'QRCode Added Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = roomcodeController;