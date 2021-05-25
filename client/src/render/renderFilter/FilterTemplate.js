import React from 'react';

const genRef=()=>{
    return [1,2,3].map(i=>React.createRef())
}

const cName="xc12 mb-1"

const subCNameMinMax = ["xc1 h-100",
                        "xc3 h-100",
                        "xc8 h-100"]
  
const subCNameInput= subCNameMinMax



let customerFilter=[
  { 
    templateType:"number",
    lb:"id",
    cName,  
    subCName:subCNameMinMax,
    keyName:"id",
    refInput:genRef(),
    inputType:"number",
    filterCommand:["id"]
  },
  //==============
  //title
  { 
    templateType:"string",
    lb:"คำนำหน้า",
    cName,  
    subCName:subCNameInput,    
    keyName:"title",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["title"]
  },
  //name
  { 
    templateType:"string",
    lb:"ชื่อ",
    cName,  
    subCName:subCNameInput,    
    keyName:"name",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["name"]
  },
  //surname
  { 
    templateType:"string",
    lb:"นามสกุล",
    cName,  
    subCName:subCNameInput,    
    keyName:"surname",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["surname"]
  },
  //phone
  { 
    templateType:"arrayString",
    lb:"โทรศัพท์",
    cName,  
    subCName:subCNameInput,      
    keyName:"phone",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["phone"]
  },
  //customerType
  { 
    templateType:"string",
    lb:"ประเภทลูกค้า",
    cName,  
    subCName:subCNameInput,    
    keyName:"customerType",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["customerType"]
  },
  //remark
  { 
    templateType:"string",
    lb:"หมายเหตุ",
    cName,  
    subCName:subCNameInput,    
    keyName:"remark",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["remark"]
  },
  {       
    templateType:"arrayObjectString",
    lb:"ที่อยู่|เลขที่",
    cName,  
    subCName:subCNameInput,
    keyName:"address_number",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["address","number"]
  },
  { 
    templateType:"arrayObjectString",
    lb:"ที่อยู่|ตำบล",
    cName,  
    subCName:subCNameInput,
    keyName:"address_tambon",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["address","tambon"]
  },
  { 
    templateType:"arrayObjectString",
    lb:"ที่อยู่|อำเภอ",
    cName,  
    subCName:subCNameInput,
    keyName:"address_district",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["address","district"]
  },
  { 
    templateType:"arrayObjectString",
    lb:"ที่อยู่|จังหวัด",
    cName,  
    subCName:subCNameInput,
    keyName:"address_province",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["address","province"]
  },
  { 
    templateType:"arrayObjectString",
    lb:"ที่อยู่|รหัสไปรษณีย์",
    cName,  
    subCName:subCNameInput,
    keyName:"address_postcode",
    refInput:genRef(),
    inputType:"text",
    filterCommand:["address","postcode"]
  },   
]


let jobFilter=[
//id
{ 
  templateType:"number",
  lb:"id",
  cName,  
  subCName:subCNameMinMax,
  keyName:"id",
  refInput:genRef(),
  inputType:"number",
  filterCommand:["id"]
},
//dateIn
{ 
  templateType:"number",
  lb:"วันสั่งงาน",
  cName,  
  subCName:subCNameMinMax,
  keyName:"dateIn",
  refInput:genRef(),
  inputType:"date",
  filterCommand:["dateIn"]
},
//dateOut
{ 
  templateType:"number",
  lb:"วันเสร็จจริง",
  cName,  
  subCName:subCNameMinMax,
  keyName:"dateOut",
  refInput:genRef(),
  inputType:"date",
  filterCommand:["dateOut"]
},
//dateTarget
{ 
  templateType:"number",
  lb:"วันนัดรับ",
  cName,  
  subCName:subCNameMinMax,
  keyName:"dateTarget",
  refInput:genRef(),
  inputType:"date",
  filterCommand:["dateTarget"]
},
//jobType
{ 
  templateType:"string",
  lb:"ประเภทงาน",
  cName,  
  subCName:subCNameInput,    
  keyName:"jobType",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["jobType"]
},
//jobStatus
{ 
  templateType:"string",
  lb:"สถานะงาน",
  cName,  
  subCName:subCNameInput,    
  keyName:"jobStatus",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["jobStatus"]
},
//customerId
{ 
  templateType:"number",
  lb:"idลูกค้า",
  cName,  
  subCName:subCNameMinMax,
  keyName:"customerId",
  refInput:genRef(),
  inputType:"number",
  filterCommand:["customerId"]
},
//title
{ 
  templateType:"string",
  lb:"คำนำหน้า",
  cName,  
  subCName:subCNameInput,    
  keyName:"title",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["title"]
},
//name
{ 
  templateType:"string",
  lb:"ชื่อ",
  cName,  
  subCName:subCNameInput,    
  keyName:"name",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["name"]
},
//surname
{ 
  templateType:"string",
  lb:"นามสกุล",
  cName,  
  subCName:subCNameInput,    
  keyName:"surname",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["surname"]
},
//phone
{ 
  templateType:"arrayString",
  lb:"โทรศัพท์",
  cName,  
  subCName:subCNameInput,      
  keyName:"phone",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["phone"]
},
//remark
{ 
  templateType:"string",
  lb:"หมายเหตุ",
  cName,  
  subCName:subCNameInput,    
  keyName:"remark",
  refInput:genRef(),
  inputType:"text",
  filterCommand:["remark"]
},
//jobValue
{ 
  templateType:"number",
  lb:"มูลค่างาน",
  cName,  
  subCName:subCNameMinMax,
  keyName:"jobValue",
  refInput:genRef(),
  inputType:"number",
  filterCommand:["jobValue"]
},
//progress
{ 
  templateType:"number",
  lb:"ความก้าวหน้า",
  cName,  
  subCName:subCNameMinMax,
  keyName:"progress",
  refInput:genRef(),
  inputType:"number",
  filterCommand:["progress"]
},
]


const StateTemplate={
    customerFilter,jobFilter
}
  
export default StateTemplate
  