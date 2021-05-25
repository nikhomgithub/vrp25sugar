const productTableTemplate={
    id            :
      { lb:'ID',     type:"number",
        width:65,   showCol:true,  showColHead:true,    
      },
    barcode           :
      { lb:'บาร์โคด',type:"string",
        width:65,   showCol:true,  showColHead:true,    
      },
    name      :
      { lb:'ชื่อ',type:"string",
        width:100,   showCol:true,  showColHead:true,      
      },
    groupId      :
      { lb:'ไอดีกลุ่ม',type:"number",
        width:40,   showCol:true,  showColHead:true,      
      },  
    groupName      :
      { lb:'ชื่อกลุ่ม',type:"string",
        width:60,   showCol:true,  showColHead:true,      
      }, 
    unit      :
      { lb:'หน่วย',type:"string",
        width:40,   showCol:true,  showColHead:true,      
      },
    price     :
      { lb:'ราคา',     type:"number",
        width:60,   showCol:true,  showColHead:true,    
      },
      
    isRawMat      :
      { lb:'เป็นวัตถุดิบ',type:"boolean",
        width:60,   showCol:true,  showColHead:true,      
      },   
    stock      :
      { lb:'ยอดสต็อค',type:"number",
        width:60,   showCol:true,  showColHead:true,      
      },   
    order      :
      { lb:'ยอดจอง',type:"number",
        width:60,   showCol:true,  showColHead:true,      
      },   
    plan      :
      { lb:'ยอดแผน',type:"number",
        width:60,   showCol:true,  showColHead:true,      
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

const productDetailTableTemplate={
   
    id            :
    { lb:'ID',     type:"number",
      width:40,   showCol:true,  showColHead:true,    
    },
    barcode           :
    { lb:'บาร์โคด',type:"string",
      width:60,   showCol:true,  showColHead:true,    
    },
    name      :
    { lb:'ชื่อ',type:"string",
      width:100,   showCol:true,  showColHead:true,      
    },
    groupId      :
    { lb:'ไอดีกลุ่ม',type:"number",
      width:40,   showCol:true,  showColHead:true,      
    },  
    groupName      :
    { lb:'ชื่อกลุ่ม',type:"string",
      width:60,   showCol:true,  showColHead:true,      
    }, 
    unit      :
    { lb:'หน่วย',type:"string",
      width:40,   showCol:true,  showColHead:true,      
    },
    isRawMat      :
    { lb:'เป็นวัตถุดิบ',type:"boolean",
      width:60,   showCol:true,  showColHead:true,      
    },   
    quantity      :
    { lb:'จำนวน',type:"number",
      width:40,   showCol:true,  showColHead:true,      
    }, 
    remark      :
    { lb:'หมายเหตุ',type:"string",
      width:200,   showCol:true,  showColHead:true,      
    },  

}


const partnerTableTemplate={
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
  phone         :
    { lb:'โทรศัพท์', type:"array",
      width:120,   showCol:true,  showColHead:true,      
    },
  partnerType      :
    { lb:'ประเภทคู่ค้า',type:"string",
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
const commonTransaction={
    id            :
      { lb:'ID',     type:"number",
        width:40,   showCol:true,  showColHead:true,    
      },
    date           :
      { lb:'วันที่',type:"date",
      width: 90,   showCol:true,  showColHead:true,    
      }, 
    groupId      :
      { lb:'รหัสเอกสาร',type:"number",
        width:50,   showCol:true,  showColHead:true,      
    },  
    groupName      :
      { lb:'ชื่อเอกสาร',type:"string",
        width:80,   showCol:true,  showColHead:true,      
      },

    total            :
      { lb:'รวม',     type:"number",
      width:70,   showCol:true,  showColHead:true,showSum:true     
      },
    reduction           :
      { lb:'ส่วนลด',     type:"number",
        width:70,   showCol:true,  showColHead:true, showSum:true   
      },
    grandTotal            :
      { lb:'สุทธิ',     type:"number",
        width:80,   showCol:true,  showColHead:true, showSum:true    
      },

    partnerId      :
      { lb:'ไอดีคู่ค้า',type:"number",
        width:60,   showCol:true,  showColHead:true,      
      },  
    title          :
      { lb:'คำนำหน้า',type:"string",
        width:60,   showCol:true,  showColHead:true,    
      },
    name      :
      { lb:'ชื่อ',type:"string",
        width:100,   showCol:true,  showColHead:true,      
      }
}
//============================
//============================
const transactionTableTemplate={
  ...commonTransaction,

  phone         :
    { lb:'โทรศัพท์', type:"array",
    width:110,   showCol:true,  showColHead:true,      
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

const transactionLogTableTemplate={
  status          :
  { lb:'สถานะ',type:"string",
    width:60,   showCol:true,  showColHead:true,    
  },
  ...transactionTableTemplate
}

const transactionLogWithDetailTemplate={
  ...transactionLogTableTemplate,
}

//======================
const transactionGraphTableTemplate={
  status          :
  { lb:'สถานะ',type:"string",
    width:60,   showCol:true,  showColHead:true,    
  },
  ...commonTransaction
}

const transactionWiDetailGraphTableTemplate={
  
}
//======================

const tableTemplate = {
    productTableTemplate,productDetailTableTemplate,
    partnerTableTemplate,transactionTableTemplate,
    transactionLogTableTemplate
}

export default tableTemplate
