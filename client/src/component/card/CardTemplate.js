const jobCard={

    id:{
        lb:'ไอดี', 
        templateType:"string" , 
        cName:"flex-cetner-center xc2 sc12 p-1",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
    },
    dateIn:{
        lb:'วันที่สั่งงาน', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
    },
    dateTarget:{
        lb:'วันที่นัดรับ', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
    },
    dateOut:{
        lb:'วันที่เสร็จจริง', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
    },
    
    jobType:{
        lb:'ประเภทงาน', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
    },
    jobStatus:{
        lb:'สถานะงาน', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    customerId:{
        lb:'IDลูกค้า', 
        templateType:"string" , 
        cName:"xc2 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"select", 
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"textarea", 

    },
    jobValue:{
        lb:'มูลค่างาน', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    progress:{
        lb:'ความก้าวหน้า', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
   
    //=================

}

const CardTemplate={jobCard}

export default CardTemplate