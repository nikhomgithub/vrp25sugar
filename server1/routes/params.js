const validationTemplate =require('../middleware/validation/validationTemplate')
const initData = require('../data/initData/initData')
//const restoreData = require('../data/restoreData/restoreData')

const backupFolder='./data/backupData/'

const shop={
    modal:'../modals/Shop',
    initData:initData.shopInit,
    //restoreData:restoreData.shopRestore,
    backupFolder:backupFolder,
    addLimit:5,
    tokenName:"shopToken",
    routeName:"shop",
    folder:"upload/shop",
    valTemplate:validationTemplate.shop
}
const user={
    modal:'../modals/User',
    initData:initData.userInit,
    //restoreData:restoreData.userRestore,
    backupFolder:backupFolder,
    addLimit:5,
    tokenName:"userToken",
    routeName:"user",
    folder:"upload/user",
    valTemplate:validationTemplate.user
}
const basicData={
    modal:'../modals/BasicData',
    initData:initData.basicDataInit,
    //restoreData:restoreData.basicDataRestore,
    backupFolder:backupFolder,
    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"basicdata",
    folder:"upload/basicdata",
    valTemplate:validationTemplate.basicData
}
const tableTemplate={
    modal:'../modals/TableTemplate',
    initData:initData.tableTemplate,
    //restoreData:restoreData.tableTemplateRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"tabletemplate",
    folder:"upload/tabletemplate",
    valTemplate:null
}

const customer={
    modal:'../modals/Customer',
    initData:initData.customerInit,
    //restoreData:restoreData.partnerRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"customer",
    folder:"upload/customer",
    valTemplate:validationTemplate.customer
}

const job={
    modal:'../modals/Job',
    initData:initData.jobInit,
    //restoreData:restoreData.transactionRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"job",
    folder:"upload/job",
    valTemplate:validationTemplate.job
}



const params={shop,user,basicData,tableTemplate,
             customer,job
             }

module.exports=params