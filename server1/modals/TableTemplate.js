const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableTemplateSchema = new Schema({
    //id:{type:Number,required:true}, //ไอดีกลุ่ม
    tableName:{type:String},
    id:{type:Number,required:true},//userId
    shopId:{type:String,required:true},
    template:{
        type:[
            {
                colName:{type:String},
                lb:{type:String}, // 
                type:{type:String}, //  
                width:{type:String}, //  
                showCol:{type:Boolean}, // 
                showColHead:{type:Boolean}, // 
                showSum:{type:Boolean}
            }
        ]
       
    },        
});

TableTemplateSchema.index({id:1})

module.exports = TableTemplate = mongoose.model('TableTemplate', TableTemplateSchema);