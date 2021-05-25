import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {MainContext} from '../context/MainContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import $ from 'jquery';

export default function ModalLogin({jumpLogin,setJumpLogin,
    inputState,setInputState,changeInputState,
    submitLogin,initInputState}) {

    //==================================
    const [hidePassword,setHidePassword]=React.useState(true)
    //=================================
    const refUsernameLG = React.useRef() 
    const refPasswordLG = React.useRef() 
    const refCloseLoginModal=React.useRef()
    //=================================

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
//=========================================
const showVisibleIcon=()=>(
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
)
//===================================
const arrs=[
    {lb:"ชื่อผู้ใช้",id:"username-lg",type:"text",name:"username",value:inputState.username,ref:refUsernameLG},
    {lb:"รหัสเดิม",id:"password-lg",type:hidePassword?"password":"text",name:"password",value:inputState.password,ref:refPasswordLG},
   
]
//=========================================
const renderForm=()=>(
<div className="modal fade" id="modalLogIn" role="dialog">
    <div className="modal-dialog" role="document">
        <div className="modal-content">  

            <div className="modal-body" >
                <div className="my-3">
                    <h5 className="modal-title" id="exampleModalLabel">ยืนยันผู้ใช้</h5>
                </div>
                 
                {
                        arrs.map((i,index)=>(
                        <div className="form-row my-3">  
                            <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                                <label>{i.lb}</label>
                            </div>
                            <div style={{width:"80%", position:"relative"}}>
                                <input className= "form-control"
                                    id={i.id}
                                    type={i.type}
                                    name={i.name}
                                    value={i.value}
                                    ref={i.ref}
                                    onFocus={(e)=>{$(`#${i.id}`).css('background-color','pink')}}
                                    onBlur={(e)=>{$(`#${i.id}`).css('background-color','white')}}
                                    onKeyDown={e=>jumpInputToInput(e)}
                                    onChange={e=>changeInputState(e)}/>
                                {
                                i.name.search('assword')>0
                                ?showVisibleIcon()
                                :null
                                }
                            
                            </div>      
                        </div>
                        ))
                    }

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" 
                    data-dismiss="modal" ref={refCloseLoginModal}
                    onClick={e=>{
                        setInputState(initInputState)
                        setHidePassword(true)
                    }}
                >ยกเลิก</button>
                <button type="button" className="btn btn-primary" 
                    onClick={e=>{
                        submitLogin(e)
                        refCloseLoginModal.current.click()     
                        
                    }}>ตกลง</button>
            </div>

        </div>
    </div>
</div>
)
//=========================================
    return (
    <div>
        {renderForm()}
        {jumpLogin?initJump():null}
    </div>
    )
}
