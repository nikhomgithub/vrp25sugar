const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    id:{type:Number,required:true},
    title:{type:String},
    name:{type:String},
    surname:{type:String},
    phone:{type:[String]},
    customerType:{type:String},
    address:{
        type: [{
            number:{type:String},
            tambon:{type:String},
            district:{type:String},
            province:{type:String},
            postcode:{type:String}
        }],        
    },
    photoUrl1:{type:[String]},
    remark:{type:String},
    shopId:{type:String,required:true},
});

CustomerSchema.index({id:1,name:1})

module.exports = Customer = mongoose.model('Customer', CustomerSchema);