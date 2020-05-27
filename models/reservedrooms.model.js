const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Reservedroom = new Schema({
    clientid:{
        type: String
       
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    Room: {
        type: Array   
    },
    checkout: {
        type: String
       
    },
    
});

Reservedroom.plugin(mongoosePaginate);

module.exports = mongoose.model("Reservedroom", Reservedroom);