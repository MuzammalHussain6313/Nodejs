const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Flat = new Schema({

    owner: {
        type: String
       
    },

     name: {
        type: String
    },
    number: {                                       
        type: String

    },
    star:
    {
        type: String
    },
    title:
    { 
        type: String

    },
     city: {
        type: String
    },
    Location:{
        type: String
    },
    Lat:{
        type: String
    },
    Lng:{
        type: String
    },
    image: {
        type: String
    },
    url: {
        type: Array
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Flat.plugin(mongoosePaginate);

module.exports = mongoose.model("Flat", Flat);

