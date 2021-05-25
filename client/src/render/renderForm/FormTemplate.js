import React from 'react';
import MainContext from '../../context/MainContext'

function test() {
    //const {basicData,setBasicData}=React.useContext(MainContext)

}


const shopSignUpForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerName:
        {   lb:'ชื่อผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
        },
    ownerPassword:
        {   lb:'รหัสผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerEmail: {  
            lb:'อีเมลผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'',   
        },     
}

//====================

const shopLogInForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },

}

//=======================
const shopChangePasswordForm={
    shopName:
        {   lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword1:
        {   lb:'รหัสร้านใหม่', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword2:
        {   lb:'ยืนยันรหัสร้านใหม่', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
}

const addUserForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:''
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    userLevel:{
        lb:'ระดับผู้ใช้', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        //selectObj:["นาย","นาง"]
        selectDataKey:"basicData",
        selectObj:'userLevel'
    },
    name:{
        lb:'ชื่อจริง', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }
}

const logInForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'',
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    }    
}

const changePasswordForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword1:{   
        lb:'รหัสใหม่', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword2:{   
        lb:'ยืนยันรหัสใหม่', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
}
//=================================


const customerForm={
    id:{
        lb:'ID', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus",
        //calculation:{method:"autoId"},
    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'title'
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    customerType:{
        lb:'ประเภทลูกค้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'customerType'
    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    //==============================
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 bd-lightGray",  
        subCName:["xc2 alignSelfStart","xc10 div-start"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    },
    address:{
        lb:'ที่อยู่',    
        templateType:"arrayObject", 
        //cName:["xc12 p-1 bd-lightGray","form-row flex-justify-start flex-align-stretch"], 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc12 div-center","xc12 p-2 div-start"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            district:{
                lb:'อำเภอ', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            province:{
                lb:'จังหวัด', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            postcode:{
                lb:'รหัสไปรษณีย์', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
        }
      
    }, 
}

//====================================
const basicDataForm={
    title:{
        lb:'คำนำหน้า', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }, 
    unit:{
        lb:'หน่วย', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }, 
    userLevel:{
        lb:'ระดับผู้ใช้', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    jobType:{
        lb:'ประเภทงาน', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    jobStatus:{
        lb:'สถานะงาน', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    customerType:{
        lb:'ประเภทลูกค้า', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }
}

const routeAuthForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    routeAddress:{
        lb:'url', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    routeName:{
        lb:'ชื่อสิทธิ์', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    userLevel:{
        lb:'สิทธิ์ผู้ใช้', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        //inputType:"text",
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'userLevel'
    }
}

const jobForm={
    id:{
        lb:'ID', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus",
        //calculation:{method:"autoId"},
    },
    dateIn:{
        lb:'วันที่สั่งงาน', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
        placeholder:'', 
    },
    dateTarget:{
        lb:'วันที่นัดรับ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
        placeholder:'', 
    },
    dateOut:{
        lb:'วันที่เสร็จจริง', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
        placeholder:'', 
    },
    jobType:{
        lb:'ประเภทงาน', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'jobType'
    },
    jobStatus:{
        lb:'สถานะงาน', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'jobStatus'
    },   
    iconCustomer:{
        lb:"ค้นหาลูกค้า",
        templateType:"icon",
        cName:"xc12 sc12 p-1",  
        subCName:["xc2 div-center","xc10 div-start"], 
        inputType:"searchIcon",
        iconActionIdx:0,
    },
    customerId:{
        lb:'IDลูกค้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        //autoFocus:"autoFocus"
    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'title'
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 bd-lightGray",  
        subCName:["xc2 alignSelfStart","xc10 div-start"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    },
    jobValue:{
        lb:'มูลค่างาน', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        //calculation:{method:"total",param:["detail","price","quantity"]},
        //autoFocus:"autoFocus"
    },
    progress:{
        lb:'ความก้าวหน้า', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        //autoFocus:"autoFocus"
    }
}

//==================================
const FormTemplate={
    shopSignUpForm,shopLogInForm,shopChangePasswordForm,
    addUserForm,logInForm,changePasswordForm,
    customerForm,
    basicDataForm,
    routeAuthForm,
    jobForm
}

export default FormTemplate
//disabled:"disabled",
