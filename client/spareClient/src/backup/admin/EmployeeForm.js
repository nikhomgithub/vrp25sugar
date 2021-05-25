import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
//import $ from 'jquery';
//onFocus={(e)=>{$('#username-LG').css('background-color','pink')}}
//onBlur={(e)=>{$('#username-LG').css('background-color','white')}}
import RefreshIcon from '@material-ui/icons/Refresh';
import Galleryone_add from '../components/galleryone_add/Galleryone_add'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import photoUtil from '../util/photoUtil'
import renderUtil from '../renderUtil/renderUtil'

import formUtil from './util/formUtil'
import Modal_setting from '../basicdata/Modal_setting'

export default function EmployeeForm({title,initState,isAdd}) {
    const {blankEmployee,
           employee,setEmployee,
           reloadEmployee,setReloadEmployee,
           filterEmployee,setFilterEmployee,

           editEmployee,setEditEmployee,
           addEmployee,setAddEmployee,
           }=React.useContext(MainContext)
    
    const refOpenErrorModal=React.useRef();    
//==================================
const {renderBadge,renderFault,renderErrorModal} = renderUtil;
const {fileListItem,changeArrayFile,handleInputFile,
       reloadImage,resetFile,deleteFileUrl,deletePhotoUrl}=photoUtil
const {submitAdd,submitEdit} = formUtil

let [inputState,setInputState]=React.useState(initState)

React.useEffect(()=>{
    if(inputState){
        console.log('inputState')
        console.log(inputState)
    }
},[inputState])    

const changeInputState=(e)=>{
    setInputState({...inputState,[e.target.name]:e.target.value})
}

//==================================
const refInputPhoto1=React.useRef()

const [arrayFile1,setArrayFile1]=React.useState([])
const [fileUrl1,setFileUrl1]=React.useState([])

const [showImage,setShowImage]=React.useState(true)

//==================================
//files from <input type="file"/>
React.useEffect(()=>{
    
    changeArrayFile({arrayFile:arrayFile1,
                      setFileUrl:setFileUrl1,
                      inputState,
                      setInputState,
                      fileName:"file1",
                      setShowImage})
   
},[arrayFile1])

//==================================
    const [jumpLogin,setJumpLogin]=React.useState(true)    
    
    const refUsernameLG = React.useRef() 
    const refPasswordLG = React.useRef()


    const initJump =()=>{
        setTimeout(()=>{
            refUsernameLG.current.focus()
            setJumpLogin(false)
        },200)
    }
    
    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "username":
                    refPasswordLG.current.focus();
                    return;
                case "password":
                    return;
                default:
                    return;    
            }
        }
    }

//===================================
const [hidePassword,setHidePassword]=React.useState(true)

//==================================
const a={
    employeeId    :{lb:'ID',        type:"number"},
    username      :{lb:'Username',  type:"text"}, 
    password      :{lb:'Password',  type:"password"},
    active        :{lb:'Active',    type:"checkbox"}, 
    employeeLevel :{lb:'Level',     type:"select"},
    
    title         :{lb:'คำนำหน้า',   type:"select"},
    name          :{lb:'ชื่อ',        type:"text" },
    surname       :{lb:'นามสกุล',    type:"text"},

    idCard        :{lb:'บัตรประชาชน',type:"text"}, 
    socialSecurity:{lb:'ประกันสังคม', type:"text"},
    
    phone         :{lb:'โทรศัพท์',    type:"arrayText"},
    line          :{lb:'ไลน์',       type:"arrayText"},
    email         :{lb:'อีเมล',      type:"arrayText"},
    
    address       :{lb:'ที่อยู่',       type:"arrayAddress"},
    remark        :{lb:'หมายเหตุ',   type:"text"},
    photoUrl      :{lb:'รูป',        type:"arrayPhoto"}, 
}

//====================================
const renderInput=({lb,col,type,name,value,ref,onKeyDown,onChange})=>{
    return (
        <div className={`col-xl-${col[0]} col-lg-${col[1]} col-md-${col[2]} col-sm-${col[3]} col-12 text-left`}>
            <div className="form-row my-3">  
                <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                    <label>{lb}</label>
                </div>
                <div style={{width:"60%"}}>
                    <input className= "form-control"
                        type={type}
                        name={name}
                        value={value}
                        ref={ref}
                        onKeyDown={e=>onKeyDown(e)}
                        onChange={e=>onChange(e)}
                    />
                </div>      
            </div>
        </div>
    )
}
//====================================
const renderInputArray=({lb,})=>{
   return(
       <div>
            <button type="button" className="btn btn-primary d-none" 
            data-toggle="modal" data-target="#inputModal"
            ref={refOpenInputModal}
            />
            <Modal_setting 
                modalId="inputModal"
                lb={lb}
                name={name}
                submit={submit}
                inputState={inputState} 
                setInputState={setInputState}  

            />
        </div>
   )
}

//====================================
const renderFormBody=()=>{
return(

    <div>
        
        <div className="form-row" >
            
            <div  className={`col-lg-3 col-md-4 col-12 text-left`}>
                <div className="form-row my-3">  
                    <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                        <label>ชื่อผู้ใช้</label>
                    </div>
                    <div style={{width:"60%"}}>
                        <input className= "form-control"
                            type="text"
                            name="username"
                            value={inputState.username}
                            ref={refUsernameLG}
                            onKeyDown={e=>jumpInputToInput(e)}
                            onChange={e=>changeInputState(e)}
                        />
                    </div>      
                </div>
            </div>

            <div className={`col-lg-3 col-md-4 col-12 text-left`}>
                <div className="form-row my-3">  
                    <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                        <h5>รหัส</h5>
                    </div>
                    <div style={{width:"80%"}} >
                        <div style={{width:"100%", position:"relative"}} >
                            <input className= "form-control"
                                type={hidePassword?"password":"text"}
                                name="password"
                                value={inputState.password}
                                ref={refPasswordLG}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>changeInputState(e)}    
                            />
                            {
                                hidePassword
                                ?<VisibilityOffIcon style={{position:'absolute',top:"0.3rem",right:'1rem'}}
                                    onClick={e=>{
                                        setHidePassword(!hidePassword)
                                    }}
                                />
                                :<VisibilityIcon style={{position:'absolute',top:"0.3rem",right:'1rem'}} 
                                    onClick={e=>{
                                        setHidePassword(!hidePassword)
                                    }}
                                />
                            }
                        </div>
                    </div>    
                </div>
            </div>                    

        </div>                

        <div className="form-row" style={{marginBottom:"10rem"}}> 
            <div className={`form-group col-md-6 text-left`}>
                <input  
                        type="file" className="form-control-file d-none"  
                        multiple="multiple" accept="image/*"
                        ref={refInputPhoto1}
                        onChange={e=>{handleInputFile({files:e.target.files,arrayFile:arrayFile1,setArrayFile:setArrayFile1})}}
                />
                <div className="d-flex justify-content-around">
                    <button 
                        className="btn btn-primary"
                        onClick={e=>{
                            e.preventDefault();
                            refInputPhoto1.current.click()
                    }}>{`เลือกไฟล์ภาพ`}</button>
                    <h5>จำนวนรูปภาพ = {fileUrl1.length+inputState.photoUrl.length}</h5>
                </div>
                {showImage
                ?<Galleryone_add imgarrs={[...inputState.photoUrl,...fileUrl1]}
                                    deleteFile={deleteFileUrl}
                                    deleteUrl={deletePhotoUrl}
                                    arrayFile={arrayFile1}
                                    setArrayFile={setArrayFile1}
                                    reloadImage={reloadImage}
                                    setShowImage={setShowImage}
                                    inputState={inputState}
                                    setInputState={setInputState}
                />
                :null
                }   
            </div>   

        </div>



    </div>
)}

    //======================================
    const renderForm=()=>{ 
        return(
        <div style={{width:"100%",height:"100%",marginTop:"4rem",position:"relative"}}>
            {jumpLogin?initJump():null}
            <div style={{textAlign:"center"}}>
                <h4>{`${title} : ${inputState.employeeId}`}</h4>
                {
                renderErrorModal(refOpenErrorModal)
                }   
               
                {
                renderFormBody()
                }
                  
                {/* footer */}
                <div className="form-row" style={{marginBottom:"10rem"}}> 
                    <div className={`form-group col-md-4 text-center`}>
                        <button className="btn btn-primary"
                            onClick={e=>{
                                setInputState(initState)
                                resetFile({setArrayFile:setArrayFile1,setFileUrl:setFileUrl1})
                        }}> 
                            <RefreshIcon/>
                        </button>
                        
                        <button className="btn btn-primary"
                            onClick={e=>{setInputState(blankEmployee)}}>
                            ยกเลิก
                        </button>
        
                        <button className="btn btn-primary"
                            onClick={e=>{
                                isAdd
                                ?submitAdd({e,inputState,setInputState,
                                            employee,setEmployee,
                                            setFilterEmployee,
                                            refOpenErrorModal,blankEmployee})
                                :submitEdit({e,inputState,setInputState,
                                            employee,setEmployee,
                                            setFilterEmployee,setEditEmployee,
                                            refOpenErrorModal,blankEmployee})
                        }}>
                            ตกลง
                        </button>
                    </div>
                </div>
                {/*footer*/}        

            </div>
        </div>
        )
    }
    //====================================
    const redirectTo=()=>{
        return <Redirect to ="/employee" exact/>
    }
    //=======================================
    return (
        inputState.employeeId>=0
        ?renderForm():
        redirectTo()
    )
}

