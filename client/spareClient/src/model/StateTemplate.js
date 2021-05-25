const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}

const valArray= (pttn,array)=>{
    let tempResult=true

    for (let i=0; i<array.length;i++){
        tempResult= new RegExp(pttn).test(array[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}
const valNone=()=>{
  return true
}

const shopSignUpState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString},
  password:     {stType:"string", validate:valBasic,  pattern:patternString},
  ownerName:    {stType:"string", validate:valBasic,  pattern:patternString},
  ownerPassword:{stType:"string", validate:valBasic,  pattern:patternString},
  ownerEmail:   {stType:"string", validate:valBasic,  pattern:patternEmail},
}

const shopLogInState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString},
  password:     {stType:"string", validate:valBasic,  pattern:patternString},
}

const shopChangePasswordState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString},
  password:     {stType:"string", validate:valBasic,  pattern:patternString},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString},
}

const addUserState={
  id:       {stType:"string", validate:valBasic,  pattern:patternNumber},
  username: {stType:"string", validate:valBasic,  pattern:patternString},
  password: {stType:"string", validate:valBasic,  pattern:patternString},
  userLevel:{stType:"string", validate:valBasic,  pattern:patternString},
  name:     {stType:"string", validate:valBasic,  pattern:patternString},
  surname:  {stType:"string", validate:valBasic,  pattern:patternString},
}

const logInState={
  username: {stType:"string", validate:valBasic,  pattern:patternString},
  password: {stType:"string", validate:valBasic,  pattern:patternString},
}

const changePasswordState={
  username: {stType:"string", validate:valBasic,  pattern:patternString},
  password: {stType:"string", validate:valBasic,  pattern:patternString},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString},
}

const partnerGroupState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  children:{stType:"array",  validate:valArray,  pattern:patternNumber},
  parentId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  allDeleteId:{stType:"array",  validate:valArray,  pattern:patternNumber}
}

const partnerState={
  id: {stType:"number",  validate:valBasic,  pattern:patternNumber},
  title:{stType:"string", validate:valBasic,  pattern:patternString},
  name:{stType:"string", validate:valBasic,  pattern:patternString},

  phone:{stType:"array",  validate:valArray,  pattern:patternNumber},

  groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  //arrayNumber
  address:{stType:"arrayObject",stChildren:{
    number:{stType:"string", validate:valBasic,  pattern:patternString},
    tambon:{stType:"string", validate:valBasic,  pattern:patternString},
    district:{stType:"string", validate:valBasic,  pattern:patternString},
    province:{stType:"string", validate:valBasic,  pattern:patternString},
    postcode:{stType:"string", validate:valBasic,  pattern:patternString},
  }},

  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    patternFileName},
  //partnerType:{stType:"string",  validate:valBasic,     pattern:patternString},
  remark:{stType:"string",  validate:valBasic,     pattern:patternString},
}

const groupState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  children:{stType:"array",  validate:valArray,  pattern:patternNumber},
  parentId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  allDeleteId:{stType:"array",  validate:valArray,  pattern:patternNumber}
}

const transactionGroupState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  children:{stType:"array",  validate:valArray,  pattern:patternNumber},
  parentId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  allDeleteId:{stType:"array",  validate:valArray,  pattern:patternNumber},
  //transactionType:{stType:"string", validate:valBasic,  pattern:patternString},
  effectStock:{stType:"string", validate:valBasic,  pattern:patternString},
  effectOrder:{stType:"string", validate:valBasic,  pattern:patternString},
  effectPlan:{stType:"string", validate:valBasic,  pattern:patternString},

}


const productState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  barcode:{stType:"string", validate:valBasic,  pattern:patternString},
  name:{stType:"string", validate:valBasic,  pattern:patternString},
  
  groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString},

  unit:{stType:"string", validate:valBasic,  pattern:patternString},

  price:{stType:"number", validate:valBasic, pattern:patternNumber},

  remark:{stType:"string", validate:valBasic,  pattern:patternString},
  isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true},

  detail:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    barcode:{stType:"string", validate:valBasic, pattern:patternString},
    name:{stType:"string", validate:valBasic, pattern:patternString},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupName:{stType:"string", validate:valBasic, pattern:patternString},
    unit:{stType:"string", validate:valBasic, pattern:patternString},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    remark:{stType:"string",  validate:valBasic,  pattern:patternString},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true},
  }},

  stock:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  order:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  plan:{stType:"number",  validate:valBasic,  pattern:patternNumber},

  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName},
}

const basicDataState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  title:{stType:"array", validate:valArray, pattern:patternString},
  unit:{stType:"array", validate:valArray, pattern:patternString},
  userLevel:{stType:"array", validate:valArray, pattern:patternString},
  /*transactionStatus:{stType:"array", validate:valArray, pattern:patternString},*/
  effectStock:{stType:"array", validate:valArray, pattern:patternString},
  effectOrder:{stType:"array", validate:valArray, pattern:patternString},
  effectPlan:{stType:"array", validate:valArray, pattern:patternString},

  routeAuth:{stType:"arrayObject",stChildren:{
      id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      routeAddress:{stType:"string", validate:valBasic, pattern:patternString},
      routeName:{stType:"string", validate:valBasic, pattern:patternString},
      userLevel:{stType:"array", validate:valArray, pattern:patternString},
  }}

}

const routeAuthState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    routeAddress:{stType:"string", validate:valBasic, pattern:patternString},
    routeName:{stType:"string", validate:valBasic, pattern:patternString},
    userLevel:{stType:"array", validate:valArray, pattern:patternString},
}

const jobState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  dateIn:{stType:"number",  validate:valBasic,  pattern:patternDate},
  dateTarget:{stType:"number",  validate:valBasic,  pattern:patternDate},
  dateOut:{stType:"number",  validate:valBasic,  pattern:patternDate},

  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    patternFileName},
  
  file2:{stType:"file",validate:valNone,pattern:null},
  photoUrl2:{stType:"array",  validate:valArray,    patternFileName},

  jobType:{stType:"string", validate:valBasic,  pattern:patternString},
  jobStatus:{stType:"string", validate:valBasic,  pattern:patternString, stDefault:"ยังไม่ทำ"},

  customerId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  title:{stType:"string", validate:valBasic,  pattern:patternString},
  name:{stType:"string", validate:valBasic,  pattern:patternString},
  surname:{stType:"string", validate:valBasic,  pattern:patternString},
  phone:{stType:"array", validate:valArray, pattern:patternString},

  remark:{stType:"string", validate:valBasic,  pattern:patternString},

  /*
  jobValue:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  progress:{stType:"number",  validate:valBasic,  pattern:patternNumber,},
  progressByValue:{stType:"number",  validate:valBasic,  pattern:patternNumber},

   price:{stType:"object",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    price:{stType:"number", validate:valBasic, pattern:patternString},
    remark:{stType:"string", validate:valBasic, pattern:patternString}
  }},{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    productId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    barcode:{stType:"string", validate:valBasic,  pattern:patternString},
    name:{stType:"string", validate:valBasic,  pattern:patternString},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    unit:{stType:"string", validate:valBasic,  pattern:patternString},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    remark:{stType:"string", validate:valBasic,  pattern:patternString},
    pic:{stType:"string", validate:valBasic,  pattern:patternString},
    jobDetailStatus:{stType:"string", validate:valBasic,  pattern:patternString,stDefault:"ยังไม่ทำ"},

  }}
  */
}

const transactionState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  date:{stType:"number",  validate:valBasic,  pattern:patternDate},

  groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},

  /*
  transactionStatus:{stType:"string", validate:valBasic,  pattern:patternString},
  transactionType:{stType:"string", validate:valBasic,  pattern:patternString},
  */

  effectStock:{stType:"string", validate:valBasic,  pattern:patternString},
  effectOrder:{stType:"string", validate:valBasic,  pattern:patternString},
  effectPlan:{stType:"string", validate:valBasic,  pattern:patternString},

  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName},

  partnerId: {stType:"number",  validate:valBasic,  pattern:patternNumber},
  title:{stType:"string", validate:valBasic,  pattern:patternString},
  name:{stType:"string", validate:valBasic,  pattern:patternString},

  phone:{stType:"array",  validate:valArray,  pattern:patternNumber},

  //arrayNumber
  address:{stType:"arrayObject",stChildren:{
    number:{stType:"string", validate:valBasic,  pattern:patternString},
    tambon:{stType:"string", validate:valBasic,  pattern:patternString},
    district:{stType:"string", validate:valBasic,  pattern:patternString},
    province:{stType:"string", validate:valBasic,  pattern:patternString},
    postcode:{stType:"string", validate:valBasic,  pattern:patternString},
  }},

  remark:{stType:"string",  validate:valBasic,     pattern:patternString},

  total:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  reduction:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  grandTotal:{stType:"number",  validate:valBasic,  pattern:patternNumber},

  detail:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    barcode:{stType:"string", validate:valBasic, pattern:patternString},
    name:{stType:"string", validate:valBasic, pattern:patternString},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupName:{stType:"string", validate:valBasic, pattern:patternString},
    unit:{stType:"string", validate:valBasic, pattern:patternString},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    remark:{stType:"string",  validate:valBasic,  pattern:patternString},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true},
  }},


}

const transactionLogState={
  ...transactionState,
  status:{stType:"string", validate:valBasic,  pattern:patternString},
}

const StateTemplate={
  shopSignUpState,shopLogInState,shopChangePasswordState,
  addUserState,logInState,changePasswordState,
  partnerState,partnerGroupState,
  groupState,productState,
  basicDataState,routeAuthState,
  jobState,transactionState,transactionGroupState,
  transactionLogState
}

export default StateTemplate
