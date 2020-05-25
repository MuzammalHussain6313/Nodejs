const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Resturant = new Schema({

    owner: {
        type: String
       
    },
    
     name: {
        type: String
    },
    number: {                                       
        type: String,

    },
     city: {
        type: String
    },
    Location:{
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

Resturant.plugin(mongoosePaginate);

module.exports = mongoose.model("Resturant", Resturant);

