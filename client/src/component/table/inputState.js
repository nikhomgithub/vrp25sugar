const customerInputState={
  id:{toCheck:false,min:0,max:0},
  title:{toCheck:false,value:""},
  name:{toCheck:false,value:""},
  surname:{toCheck:false,value:""},
  phone:{toCheck:false,value:""},
  customerType:{toCheck:false,value:""},
  remark:{toCheck:false,value:""},
  address_number:{toCheck:false,value:""},
  address_tambon:{toCheck:false,value:""},
  address_district:{toCheck:false,value:""},
  address_province:{toCheck:false,value:""},
  address_postcode:{toCheck:false,value:""},
}


const jobInputState={
id:{toCheck:false,min:0,max:0},
dateIn:{toCheck:false,min:"2021-01-01",max:new Date().toISOString().substring(0,10)},
dateTarget:{toCheck:false,min:"2021-01-01",max:new Date().toISOString().substring(0,10)},
dateOut:{toCheck:false,min:"2021-01-01",max:new Date().toISOString().substring(0,10)},

jobType:{toCheck:false,value:""},
jobStatus:{toCheck:false,value:""},

customerId:{toCheck:false,min:0,max:0},
title:{toCheck:false,value:""},
name:{toCheck:false,value:""},
surname:{toCheck:false,value:""},
phone:{toCheck:false,value:""},

remark:{toCheck:false,value:""},

jobValue:{toCheck:false,min:0,max:0},
progress:{toCheck:false,min:0,max:0},

}


const inputState = {
  jobInputState,
  customerInputState,
}
export default inputState
