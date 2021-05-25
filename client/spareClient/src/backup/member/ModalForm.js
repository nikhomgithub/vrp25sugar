import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import $ from 'jquery';

export default function ModalJobForm({
            modalId,
            isAdd,
            
            jumpInput,
            setJumpInput,

            inputState,
            setInputState,

            changeInputState,
 
            submitAdd,
            submitEdit,

            addMember,
            editMember
    }) {
            
    const refCloseModalForm=React.useRef()
    
    const refMemberId = React.useRef() 
    const refName = React.useRef()     
    const refAge = React.useRef() 
    
//========================
    const initJump =()=>{
        setTimeout(()=>{
            refMemberId.current.focus()
            setJumpInput(false)
        },200)
    }

    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "memberId":
                    refName.current.focus();
                    return;
                case "name":
                    refAge.current.focus();
                    return;                   
                case "age":
                    return;
                default:
                    return;    
            }
        }
    }
//==========================
 //validation
 const regexFormatMemberId= /^[0-9]*$/
 const regexFormatName = /^[a-zA-Z]+$/

 const validateInput=()=>{
     return  {
         memberIdCheck : regexFormatMemberId.test(inputState.memberId),   
         nameCheck    : regexFormatName.test(inputState.name),
         ageCheck      : inputState.age>0?true:false
            
     };  
 }

//==========================

const renderModalBody=()=>(
    <div>

        <div className="form-row my-3">  
            <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>รหัส</label>
            </div>
            <div style={{width:"80%"}}>
            <input className= "form-control"
                    id="memberId-id"
                    type="number"
                    name="memberId"
                    value={inputState.memberId}
                    ref={refMemberId}
                    placeholder="ใส่ตัวเลขมากกว่า 0"
                    onFocus={(e)=>{$('#memberId-id').css('background-color','pink')}}
                    onBlur={(e)=>{$('#memberId-id').css('background-color','white')}}
                    onKeyDown={e=>jumpInputToInput(e)}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>

        <div className="form-row my-3">  
            <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>ชื่อ</label>
            </div>
            <div style={{width:"80%"}}>
            <input className= "form-control"
                    id="name-id"
                    type="text"
                    name="name"
                    value={inputState.name}
                    ref={refName}
                    placeholder="ใส่ตัวอักษร"
                    onFocus={(e)=>{$('#name-id').css('background-color','pink')}}
                    onBlur={(e)=>{$('#name-id').css('background-color','white')}}
                    onKeyDown={e=>jumpInputToInput(e)}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>

        <div className="form-row my-3">  
            <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>อายุ</label>
            </div>
            <div style={{width:"80%"}}>
            <input className= "form-control"
                    id="age-id"
                    type="number"
                    name="age"
                    value={inputState.age}
                    ref={refAge}
                    placeholder="ใส่ตัวเลขมากกว่า 0"
                    onFocus={(e)=>{$('#age-id').css('background-color','pink')}}
                    onBlur={(e)=>{$('#age-id').css('background-color','white')}}
                    onKeyDown={e=>jumpInputToInput(e)}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>
             
    </div>
    )

    const renderForm=()=>{
        return(
            <div className="modal fade" id={modalId}  role="dialog">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">          
                        <div className="modal-body" >
                            <div className="my-3">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {isAdd?`เพิ่ม...`:`แก้ไข...`}
                                </h5>
                            </div>

                            {
                            renderModalBody()
                            } 
                        
                        </div>
                  
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary"
                                onClick={e=>{
                                    if(isAdd){
                                        setInputState(addMember)
                                    }else{
                                        setInputState(editMember)
                                    }
                                }}> 
                                <RefreshIcon/>
                            </button>
                            
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalForm}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                                onClick={e=>{
                                    const result=validateInput();
                                    if(result.memberIdCheck&&result.nameCheck&&result.ageCheck){
                                        if(isAdd){
                                            submitAdd(e)
                                        }
                                        else{
                                            submitEdit(e)
                                        }
                                        refCloseModalForm.current.click()
                                    }
                                    else {
                                        if(!result.memberIdCheck){
                                            setInputState({...inputState,memberId:''});
                                            refMemberId.current.focus();
                                        }
                                        if(!result.nameCheck){
                                            setInputState({...inputState,name:''});
                                            refName.current.focus();
                                        }
                                        if(!result.ageCheck){
                                            setInputState({...inputState,age:''});
                                            refAge.current.focus();
                                        }
                                    }
                                }}
                            >ตกลง</button>
                        
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
    <div>

        {jumpInput?initJump():null}
        {renderForm()}
    </div>
    )
}