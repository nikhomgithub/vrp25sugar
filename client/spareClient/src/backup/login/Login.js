import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import {MainContext} from '../context/MainContext';

import ModalLogin from './ModalLogin';
import ModalChangePassword from './ModalChangePassword';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import renderUtil from '../renderUtil/renderUtil'
//import loginUtil from './loginUtil'

export default function Login() {

    const {username,setUsername,level,setLevel}=React.useContext(MainContext)
    
    const [jumpLogin,setJumpLogin]=React.useState(false)

    const [jumpChangePassword,setJumpChangePassword]=React.useState(false)

    const initInputState={
        username:'',
        password:'',
        newPassword1:'',
        newPassword2:''
    }


    const {renderTest,renderErrorModal} = renderUtil;
    //const {submitLogin,submitChangePassword}=loginUtil;

    const refOpenErrorModal=React.useRef();

    //=============================================
    let [inputState,setInputState]=React.useState(initInputState)

    const changeInputState=(e)=>{
        setInputState({...inputState,[e.target.name]:e.target.value})
    }
    //=============================================
    const submitLogin=(e)=>{
        e.preventDefault();
    
        axios.post('/employee/login',inputState)
            .then(result=>{
                //console.log(result.data)
                localStorage.setItem('employee-token',result.data.token)
                setInputState(initInputState)
                setUsername(result.data.username)
                //setLevel(result.data.employeeLevel)
            })
            .catch(err=>{
                refOpenErrorModal.current.click();
            })
    }
    
    const submitChangePassword=(e)=>{
        e.preventDefault();
            
        axios.post('/employee/changepassword',inputState)
            .then(result=>{
                setInputState(initInputState)
                //setLevel(null)
                setUsername(null)
                localStorage.setItem('employee-token','')
            })
            .catch(err=>{
                refOpenErrorModal.current.click()
            })   
     }
    
    //=============================================
    const renderLogin=()=>{
        return(
        <div className="div-background-login"
            style={{width:"100%",height:"100%",margin:"auto"}}>
            <div className="border"
                 style={{width:"100%",height:"100%",
                        display:"flex",justifyContent:"center",alignItems:"center",
                        background:"rgba(200,200,200,0.8)"}}> 
                                
                <div >
                    <div style={{textAlign:"center",marginBottom:"2rem"}}>
                        <h1>ล็อคอิน ก่อนเริ่มใช้งาน</h1>
                    </div>
    
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <button type="button" className="btn btn-secondary mx-2" 
                                data-toggle="modal" data-target="#modalChangePassword"
                                style={{width:"10rem"}}
                                onClick={e=>{
                                    setJumpChangePassword(true)
                                }}
                        >
                            เปลี่ยรหัสผู้ใช้
                        </button>   
                    
                        <button type="button" className="btn btn-primary mx-2" 
                                data-toggle="modal" data-target="#modalLogIn"
                                style={{width:"10rem"}}
                                onClick={e=>{
                                    setJumpLogin(true)
                                }}
                        >
                            ล็อคอิน
                        </button>   
                    </div>
                </div>
                <ModalLogin
                    jumpLogin={jumpLogin}
                    setJumpLogin={setJumpLogin}
                    inputState={inputState}
                    setInputState={setInputState}
                    changeInputState={changeInputState}
                    submitLogin={submitLogin}
                    initInputState={initInputState}
                />
                <ModalChangePassword 
                    jumpChangePassword={jumpChangePassword} 
                    setJumpChangePassword={setJumpChangePassword}
                    inputState={inputState}
                    setInputState={setInputState}
                    changeInputState={changeInputState}
                    submitChangePassword={submitChangePassword}
                    initInputState={initInputState}
                />
                {renderErrorModal(refOpenErrorModal)}
            </div>
        </div>
        )
    }
//=========================================
    const renderWelcome=()=>{
        return (
            <div className="div-background-login"
            style={{width:"100%",height:"100%",margin:"auto"}}>
                <div style={{width:"100%",height:"100%",
                        display:"flex",justifyContent:"center",alignItems:"center",
                        background:"rgba(200,200,200,0.8)"}}> 
                   
                    <div>                   
                        <div style={{textAlign:"center",marginBottom:"2rem"}}>
                            <h1>ยินดีต้อนรับ</h1>
                        </div>
                        
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <button type="button" className="btn btn-secondary mx-2" 
                                    data-toggle="modal" data-target="#modalChangePassword"
                                    style={{width:"10rem"}}
                                    onClick={e=>{
                                        setInputState(initInputState)
                                        //setLevel(null)
                                        setUsername(null)
                                        localStorage.setItem('employee-token','')
                                    }}
                            >
                                ล็อคเอาท์
                            </button>   
                    
                        </div>

                    </div>
                </div>                
            </div>
        )
    }
//============================================
    return (
        username
        ?renderWelcome()
        :renderLogin()   
    )
}
