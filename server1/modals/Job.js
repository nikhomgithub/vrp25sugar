const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    id:{type:Number,required:true},
    dateIn:{type:Date},
    dateTarget:{type:Date},
    dateOut:{type:Date},
    //new Date().toISOString()
    //2020-12-30T12:40:20.964Z
    
    photoUrl1:{type:[String]},
    photoUrl2:{type:[String]},
    jobType:{type:String},
    jobStatus:{type:String},

    customerId:{type:Number},
    title:{type:String},
    name:{type:String},
    surname:{type:String},
    phone:{type:[String]},
   
    remark:{type:String},
    shopId:{type:String,required:true},

    jobValue:{type:Number},
    progress:{type:Number},

});

JobSchema.index({id:1,name:1,customerId:1})

module.exports = Job = mongoose.model('Job', JobSchema);