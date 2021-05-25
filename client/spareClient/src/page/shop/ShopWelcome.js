import React from 'react';

import {MainContext} from '../../context/MainContext'

import StateUtil from '../../model/StateUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'

import ModalForm from '../../render/renderForm/ModalForm'
import renderModalError from '../../render/renderModalError'

function ShopWelcome() {
  
  const {basicData,setBasicData,setReloadCheckToken}=React.useContext(MainContext)

  const {shopSignUpForm,shopLogInForm,shopChangePasswordForm}=FormTemplate      
  const {shopSignUpState,shopLogInState,shopChangePasswordState}=StateTemplate

  //====================================
  const [showModalError,setShowModalError]=React.useState({status:false,msg:""})
  //====================================
  //shopSignUp

  const [showShopSignUp,setShowShopSignUp]=React.useState(false)
  
  let param1={
    isAddForm:true,
    lb:'สมัครร้านค้าใหม่',
    formTemplate:shopSignUpForm,
    stateTemplate:shopSignUpState,
    setShowModalError,

    selectData:{basicData},
    loadData:null,    
    show:showShopSignUp,
    setShow:setShowShopSignUp,
    url:'/shop/shopsignup',

    keyName:null,//["photoUrl"]
    iconAction:null,//[()=>{}],
    actionAfterSuccess:null,//()=>{}
    useGenFD:false
  }
  //==================
  const actionAfterSuccessShopLogin=(resultAxios)=>{
    localStorage.setItem('shopauthorization',
        `b ${resultAxios.data.shopToken}`)
    setReloadCheckToken(true)
  }

  const [showShopLogIn,setShowShopLogIn]=React.useState(false)

  let param2={
    isAddForm:true,
    lb:'ล็อกอินร้านค้า',
    formTemplate:shopLogInForm,
    stateTemplate:shopLogInState,
    setShowModalError,

    selectData:{basicData},
    loadData:null,
    show:showShopLogIn,
    setShow:setShowShopLogIn,
    url:'/shop/shoplogin',

    keyName:null,//["photoUrl"]
    iconAction:null,//()=>{}
    actionAfterSuccess:actionAfterSuccessShopLogin,//null
    useGenFD:false
  }

  //==================
  const [showShopChangePassword,setShowShopChangePassword]=React.useState(false)

  let param3={
    isAddForm:true,
    lb:'เปลี่ยนรหัสรานค้า',
    formTemplate:shopChangePasswordForm,
    stateTemplate:shopChangePasswordState,
    setShowModalError,

    selectData:{basicData},
    loadData:null,
    show:showShopChangePassword,
    setShow:setShowShopChangePassword,
    url:'/shop/shopchangepassword',

    keyName:null,//["photoUrl"]
    iconAction:null,//[()=>{}],
    actionAfterSuccess:null,//()=>{}
    useGenFD:false
  }

  /*
  //shopSignUp 
  const [showShopSignUp,setShowShopSignUp]=React.useState(false)

  //ไปสร้างใน ModalForm
  const refShopSignUp1=React.createRef()
  const refShopSignUp2=React.createRef()
 
  //ไปสร้างใน ModalForm ใส่  stateTemplate เข้าไป
  let blankShopSignUp=genBlankState({template:shopSignUpState}).state

  //isAddForm:true,
  //อันนี้ เหมือนการ add
  const [shopSignUpData,setShopSignUpData]=React.useState(blankShopSignUp)

  //ไปสร้างใน ModalForm ใส่ formState เข้าไป และ inputState ใน Modal Form 
  let [shopSignUpRefAndValue,setShopSignUpRefAndValue]=React.useState(
    genRefAndValue({template:shopSignUpForm,FData:shopSignUpData})
  )
  

  React.useEffect(()=>{
    const temp=genRefAndValue({
        template:shopSignUpForm,
        FData:shopSignUpData
        })
    setShopSignUpRefAndValue({...temp})
  },[shopSignUpData])
  
  let param1={
    isAddForm:true,
    lb:'สมัครร้านค้าใหม่',
    formTemplate:shopSignUpForm,
    stateTemplate:shopSignUpState,
    setShowModalError,
    //basicData,
    selectData:{basicData},
    ref1:refShopSignUp1,
    ref2:refShopSignUp2,
    
    blankData:blankShopSignUp,
    loadData:shopSignUpData,
    setLoadData:setShopSignUpData,
    refAndValue:shopSignUpRefAndValue,
    setRefAndValue:setShopSignUpRefAndValue,
    
    show:showShopSignUp,
    setShow:setShowShopSignUp,
    url:'/shop/shopsignup',
    //submitOption:0,
    //mainInputState:basicData,
    reload:null,
    setReload:null
  }
  */
   //==========================
   /*
   const [showShopLogIn,setShowShopLogIn]=React.useState(false)
   
   const refShopLogIn1=React.createRef()
   const refShopLogIn2=React.createRef()

   let blankShopLogIn=genBlankState({template:shopLogInState}).state
 
   const [shopLogInData,setShopLogInData]=React.useState(blankShopLogIn)
 
   let [shopLogInRefAndValue,setShopLogInRefAndValue]=React.useState(
    genRefAndValue({template:shopLogInForm,FData:shopLogInData})
   )
    
   React.useEffect(()=>{
     const temp=genRefAndValue({
            template:shopLogInForm,
            FData:shopLogInData
            })
     setShopLogInRefAndValue({...temp})
   },[shopLogInData]) 

   let param2={
     isAddForm:true,
     lb:'ล็อกอินร้านค้า',
     formTemplate:shopLogInForm,
     stateTemplate:shopLogInState,
     setShowModalError,
     //basicData,
     selectData:{basicData},
     ref1:refShopLogIn1,
     ref2:refShopLogIn2,

     blankData:blankShopLogIn,
     loadData:shopLogInData,
     setLoadData:setShopLogInData,
     refAndValue:shopLogInRefAndValue,
     setRefAndValue:setShopLogInRefAndValue,

     show:showShopLogIn,
     setShow:setShowShopLogIn,
     url:'/shop/shoplogin',
     //submitOption:0,
     //mainInputState:basicData,
     reload:null,
     setReload:null,
     setReloadCheckToken
   }

   */
  //=======================
  /*
   const [showShopChangePassword,setShowShopChangePassword]=React.useState(false)
   
   const refShopChangePassword1=React.createRef()
   const refShopChangePassword2=React.createRef()

   let blankShopChangePassword=genBlankState({template:shopChangePasswordState}).state
 
   const [shopChangePasswordData,setShopChangePasswordData]=React.useState(blankShopChangePassword)
 
   let [shopChangePasswordRefAndValue,setShopChangePasswordRefAndValue]=React.useState(
    genRefAndValue({template:shopChangePasswordForm,FData:shopChangePasswordData})
   )

   React.useEffect(()=>{
    const temp=genRefAndValue({
        template:shopChangePasswordForm,
        FData:shopChangePasswordData
        })
    setShopChangePasswordRefAndValue({...temp})
  },[shopChangePasswordData]) 

   let param3={
     isAddForm:true,
     lb:'เปลี่ยนรหัสรานค้า',
     formTemplate:shopChangePasswordForm,
     stateTemplate:shopChangePasswordState,
     setShowModalError,
     //basicData,
     selectData:{basicData},
     ref1:refShopChangePassword1,
     ref2:refShopChangePassword2,
     //setReload:setReloadCustomer,

     blankData:blankShopChangePassword,
     loadData:shopChangePasswordData,
     setLoadData:setShopChangePasswordData,
     refAndValue:shopChangePasswordRefAndValue,
     setRefAndValue:setShopChangePasswordRefAndValue,

     show:showShopChangePassword,
     setShow:setShowShopChangePassword,
     url:'/shop/shopchangepassword',
     //submitOption:0,
     //mainInputState:basicData,
     reload:null,
     setReload:null,
   }
   */
  //=======================
  return (
    <div className="page-center">
        <div className="w-50 h-40 ">
            
            <div className="flex-center-center h-60"
                 style={{background:"rgba(225,225,225,0.8)",
                         boxShadow:"5px 5px 20px black",
                         borderRadius:"10px"  
                }}
            >
                <h1 style={{fontSize:"2rem",textAlign:"center"}}>ล็อกอิน ร้านค้าก่อนใช้งาน</h1>
            </div>
            
            <div className="flex-center-center h-30">

              <div className="xc4 sc12 p-1 ">
                <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{setShowShopSignUp(true)}}
                >
                   สมัครร้านค้าใหม่
                </button>
                {showShopSignUp?<ModalForm param={param1}/>:null}
              </div>

                <div className="xc4 sc12 p-1">
                  <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowShopLogIn(true)
                        }}
                  >
                    ล็อกอินร้านค้า
                  </button>
                  {
                   showShopLogIn?<ModalForm param={param2}/>:null
                  }
                </div>

                <div className="xc4 sc12 p-1">
                  <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowShopChangePassword(true)
                        }}
                  >
                    เปลี่ยนรหัสร้านค้า
                  </button>
                  {
                    showShopChangePassword?<ModalForm param={param3}/>:null
                  }
                </div>

                {renderModalError({show:showModalError,setShow:setShowModalError})}
            </div>
        </div>
    </div>
  );
}

export default ShopWelcome;
