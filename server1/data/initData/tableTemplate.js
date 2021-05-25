const customerTableTemplate={
id            :
{ lb:'ID',     type:"number",
  width:40,   showCol:true,  showColHead:true,    
},
title           :
{ lb:'คำนำหน้า',type:"string",
  width:60,   showCol:true,  showColHead:true,    
},
name      :
{ lb:'ชื่อ',type:"string",
  width:100,   showCol:true,  showColHead:true,      
},
surname      :
{ lb:'นามสกุล',type:"string",
  width:100,   showCol:true,  showColHead:true,      
},
phone         :
{ lb:'โทรศัพท์', type:"array",
  width:120,   showCol:true,  showColHead:true,      
},
customerType      :
{ lb:'ประเภทลูกค้า',type:"string",
  width:70,   showCol:true,  showColHead:true,      
},    
address       :
{ lb:'ที่อยู่',type:"arrayObject",
  width:200,   showCol:true,  showColHead:true,
  children:{
      number:{lb:"เลขที่"},
      tambon:{lb:"ตำบล"},
      district:{lb:"อำเภอ"},
      province:{lb:"จังหวัด"},
      postcode:{lb:"รหัสไปรษณีย์"}
  }
},
remark      :
{ lb:'หมายเหตุ',type:"string",
  width:200,   showCol:true,  showColHead:true,      
},  
photoUrl1      :
{ lb:'รูป',type:"arrayPhoto",
  width:200,   showCol:true,  showColHead:true,
},

}
//============================

//============================
//============================
const jobTableTemplate={
id            :
  { lb:'ID',     type:"number",
    width:40,   showCol:true,  showColHead:true,    
  },
dateIn           :
  { lb:'วันที่สั่งงาน',type:"date",
  width: 90,   showCol:true,  showColHead:true,    
  }, 
dateTarget           :
  { lb:'วันที่นัดรับ',type:"date",
  width: 90,   showCol:true,  showColHead:true,    
  }, 
dateOut           :
  { lb:'วันที่รับจริง',type:"date",
  width: 90,   showCol:true,  showColHead:true,    
  }, 
jobType           :
  { lb:'ประเภทงาน',type:"string",
    width:90,   showCol:true,  showColHead:true,    
  },
jobStatus           :
  { lb:'สถานะงาน',type:"string",
    width:90,   showCol:true,  showColHead:true,    
  },

customerId            :
  { lb:'IDลูกค้า',     type:"number",
    width:40,   showCol:true,  showColHead:true,    
  },
title           :
  { lb:'คำนำหน้า',type:"string",
    width:60,   showCol:true,  showColHead:true,    
  },
name      :
  { lb:'ชื่อ',type:"string",
    width:100,   showCol:true,  showColHead:true,      
  },
surname      :
  { lb:'นามสกุล',type:"string",
    width:100,   showCol:true,  showColHead:true,      
  },
phone         :
  { lb:'โทรศัพท์', type:"array",
    width:120,   showCol:true,  showColHead:true,      
  },

jobValue            :
{ lb:'มูลค่างาน',     type:"number",
width:70,   showCol:true,  showColHead:true, 
},

progress           :
{ lb:'ความก้าวหน้า',     type:"number",
  width:70,   showCol:true,  showColHead:true,
},

remark      :
{ lb:'หมายเหตุ',type:"string",
  width:200,   showCol:true,  showColHead:true,      
},  
photoUrl1      :
{ lb:'รูป1',type:"arrayPhoto",
  width:200,   showCol:true,  showColHead:true,
},
photoUrl2      :
{ lb:'รูป2',type:"arrayPhoto",
  width:200,   showCol:true,  showColHead:true,
},
}



//======================

const basicDataTableTemplate={
id            :
{ lb:'ไอดี',     type:"number",
  width:50,   showCol:true,  showColHead:true,    
},

routeAddress            :
{ lb:'url',     type:"string",
  width:200,   showCol:true,  showColHead:true,    
},
routeName           :
{ lb:'ชื่อสิทธิ์',type:"string",
  width:100,   showCol:true,  showColHead:true,    
},
userLevel           :
{ lb:'กลุ่มผู้มีสิทธิ์',type:"array",
  width:350,   showCol:true,  showColHead:true,    
},

}

const tableTemplate = {
  basicDataTableTemplate,
  customerTableTemplate,
  jobTableTemplate,
}

module.exports = tableTemplate
