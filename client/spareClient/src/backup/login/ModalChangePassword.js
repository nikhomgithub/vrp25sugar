import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import $ from 'jquery';

export default function ModalChangePassword({
        jumpChangePassword,setJumpChangePassword,
        inputState,setInputState,changeInputState,
        submitChangePassword,initInputState}) {
    //==================================
    const [hidePassword,setHidePassword]=React.useState(true)
    //==================================
    const refUsernameCP = React.useRef() 
    const refPasswordCP = React.useRef() 
    const refNewPassword1CP = React.useRef() 
    const refNewPassword2CP = React.useRef() 

    const refCloseChangePasswordModal=React.useRef()

    //==================================
    const initJump =()=>{
        setTimeout(()=>{
            refUsernameCP.current.focus()
            setJumpChangePassword(false)
        },200)
    }

    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "username":
                    refPasswordCP.current.focus();
                    return;
                case "password":
                    refNewPassword1CP.current.focus();
                    return;
                case "newPassword1":
                    refNewPassword2CP.current.focus();
                    return;
                case "newPassword2":
                    return;
                default:
                    return;    
            }
        }
    }
    //===================================
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
        {lb:"ชื่อผู้ใช้",id:"username-cp",type:"text",name:"username",value:inputState.username,ref:refUsernameCP},
        {lb:"รหัสเดิม",id:"password-cp",type:hidePassword?"password":"text",name:"password",value:inputState.password,ref:refPasswordCP},
        {lb:"รหัสใหม่",id:"newPassword1-cp",type:hidePassword?"password":"text",name:"newPassword1",value:inputState.newPassword1,ref:refNewPassword1CP},
        {lb:"ยืนยันรหัสใหม่",id:"newPassword2-cp",type:hidePassword?"password":"text",name:"newPassword2",value:inputState.newPassword2,ref:refNewPassword2CP}
    ]
    //===================================
    const renderForm=()=>(
    <div className="modal fade" id="modalChangePassword" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">          
                <div className="modal-body" >
                    <div className="my-3">
                        <h5 className="modal-title" id="exampleModalLabel">เปลี่ยนรหัสผู้ใช้</h5>
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
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" 
                        ref={refCloseChangePasswordModal}
                        onClick={e=>{
                            setInputState(initInputState)
                            setHidePassword(true)
                           
                        }}
                    >ยกเลิก</button>
                    <button type="button" className="btn btn-primary"
                        onClick={e=>{
                            submitChangePassword(e)
                            refCloseChangePasswordModal.current.click()
                        }}
                    >ตกลง</button>
                </div>
            </div>
        </div>
    </div>
    )
//=========================================
    return (
    <div>
        {renderForm()}
        {jumpChangePassword?initJump():null}
    </div>
    )
}
