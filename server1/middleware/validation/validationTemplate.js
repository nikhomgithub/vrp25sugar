/*
const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
//2020-12-30
const patternISODate=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/gi
//2020-12-30T12:40:20.964Z
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi
*/

const any10={
    pattern:/^[^~<>{}%$&|!]{0,10}$/gi,
    message:"Invalid char or over limit of 10 chars"
}
const any20={
    pattern:/^[^~<>{}%$&|!]{0,20}$/gi,
    message:"Invalid char or over limit of 20 chars"
}
const any50={
    pattern:/^[^~<>{}%$&|!]{0,50}$/gi,
    message:"Invalid char or over limit of 50 chars"
}
const any100={
    pattern:/^[^~<>{}%$&|!]{0,100}$/gi,
    message:"Invalid char or over limit of 100 chars"
}
const any150={
    pattern:/^[^~<>{}%$&|!]{0,150}$/gi,
    message:"Invalid char or over limit of 150 chars"
}
const any200={
    pattern:/^[^~<>{}%$&|!]{0,150}$/gi,
    message:"Invalid char or over limit of 200 chars"
}

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

const shop={
    shopName:       {type:"string", validate:valBasic,  regex:any20},
    password:       {type:"string", validate:valBasic,  regex:any20},  
    ownerName:      {type:"string", validate:valBasic,  regex:any20},
    ownerPassword:  {type:"string", validate:valBasic,  regex:any20},
    ownerEmail:     {type:"string", validate:valBasic,  regex:any20},

}

const user={
    id:             {type:"number", validate:valBasic,  regex:any20},
    username:       {type:"string", validate:valBasic,  regex:any20},
    password:       {type:"string", validate:valBasic,  regex:any20},
    userLevel:      {type:"string", validate:valBasic,  regex:any20},
    name:           {type:"string", validate:valBasic,  regex:any20},
    surname:        {type:"string", validate:valBasic,  regex:any20},
}

const customer={
    id:             {type:"number", validate:valBasic,  regex:any20},
    title:          {type:"string", validate:valBasic,  regex:any20},
    name:           {type:"string", validate:valBasic,  regex:any20},
    surname:        {type:"string", validate:valBasic,  regex:any20},
    phone:          {type:"array", validate:valArray,  regex:any20},

    customerType:   {type:"string", validate:valBasic,  regex:any20},
    photoUrl1:      {type:"fileName",validate:valArray, regex:any100},
    remark:         {type:"string", validate:valBasic,  regex:any20},
    address:        {type:"arrayObject",children:{
                    number:{type:"string", validate:valBasic,  regex:any20},
                    tambon:{type:"string", validate:valBasic,  regex:any20},
                    district:{type:"string", validate:valBasic,  regex:any20},
                    province:{type:"string", validate:valBasic,  regex:any20},
                    postcode:{type:"string", validate:valBasic,  regex:any20}
                    }}
}

const job={
    id:           {type:"number", validate:valBasic,regex:any20},
    dateIn:       {type:"date", validate:valBasic,  regex:any100},
    dateTarget:   {type:"date", validate:valBasic,  regex:any100},
    dateOut:      {type:"date", validate:valBasic,  regex:any100},

    photoUrl1:    {type:"fileName",validate:valArray, regex:any100},
    photoUrl2:    {type:"fileName",validate:valArray, regex:any100},
    
    
    jobType:      {type:"string", validate:valBasic,regex:any20},
    jobStatus:    {type:"string", validate:valBasic,regex:any20},

    customerId:   {type:"number", validate:valBasic,  regex:any20},
    title:        {type:"string", validate:valBasic,  regex:any20},
    name:         {type:"string", validate:valBasic,  regex:any20},
    surname:      {type:"string", validate:valBasic,  regex:any20},
    phone:        {type:"array", validate:valArray,  regex:any20},
        
    remark:       {type:"string", validate:valBasic,regex:any20},
    jobValue:     {type:"number", validate:valBasic,regex:any20},
    progress:     {type:"number", validate:valBasic,regex:any20},
             
}

const basicData={
    id:          {type:"number", validate:valBasic,  regex:any20},
    title:       {type:"string", validate:valArray,  regex:any20},
    unit:        {type:"string", validate:valArray,  regex:any20},
    userLevel:   {type:"string", validate:valArray,  regex:any20},

    jobType:     {type:"string", validate:valBasic,  regex:any20},
    jobSttus:    {type:"string", validate:valArray,  regex:any20},
    pic:         {type:"string", validate:valArray,  regex:any20},
    customerType:{type:"string", validate:valArray,  regex:any20},

    routeAuth:   {type:"arrayObject",children:{
                id:{type:"number", validate:valBasic,  regex:any20},
                routeAddress:{type:"string", validate:valBasic,  regex:any100},
                routeName:{type:"string", validate:valBasic,  regex:any20},
                userLevel:{type:"string", validate:valArray,  regex:any20},
                 }}
}


const validationTemplate={
    shop,user,basicData,
    customer,job
}

module.exports = validationTemplate

