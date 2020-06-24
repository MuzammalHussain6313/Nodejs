
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Menu = new Schema({

    resturantid: {
        type: String
       
    },
    AvailableTime: {
        type: Array
    },
     Ta: {
        type: Array
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Menu.plugin(mongoosePaginate);

module.exports = mongoose.model("Menu", Menu);

