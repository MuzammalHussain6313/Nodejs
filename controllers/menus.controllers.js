
const Menus = require('../models/menus.model');
const jsonwebtoken =  require('jsonwebtoken');
menuController.addmenu = async (req, res) => {
    try {
  
        const body = req.body;
        const menu = new Menus(body);
      const result = await menu.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: 'Menu Successfully',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };
  module.exports = menuController;