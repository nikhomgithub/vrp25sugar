const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicDataSchema = new Schema({
    id:{type: Number,required:true}, // ไอดี
    title:{type:[String]}, // คำนำหน้า
    unit:{type:[String]}, // หน่วย
    userLevel:{type:[String]}, // ระดับผู้ใช้
    //transactionType:{type:[String]}, // ประเภทเอกสาร
    //transactionStatus:{type:[String]}, // สถานะเอกสาร
    jobType:{type:[String]},
    jobStatus:{type:[String]},
    pic:{type:[String]},
    customerType:{type:[String]},

    shopId:{type:String,required:true},
    routeAuth:{type:[{
        id:{type:Number},
        routeAddress:{type:String},
        routeName:{type:String},
        userLevel:{type:[String]}
    }],'default':[]}
});

BasicDataSchema.index({id:1})

module.exports = BasicData = mongoose.model('BasicData', BasicDataSchema);