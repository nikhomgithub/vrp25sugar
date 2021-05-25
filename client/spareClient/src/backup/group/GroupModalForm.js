import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import $ from 'jquery';

export default function GroupModalForm({
    modalId,
    isAdd,
    
    jumpInput,
    setJumpInput,

    inputState,
    setInputState,

    changeInputState,

    submitAdd,
    submitEdit,

    addGroup,
    editGroup
}) {

    //==================================
    const refCloseModalForm=React.useRef()

    const refGroupId = React.useRef() 
    const refGroupName = React.useRef() 
    const refRemark = React.useRef() 

    const initJump =()=>{
        setTimeout(()=>{
            refGroupName.current.focus()
            setJumpInput(false)
        },200)
    }
    
    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "groupId":
                    refGroupName.current.focus();
                    return;
                case "groupName":
                    refRemark.current.focus();
                    return;
                case "remark":
                    return;
                default:
                    return;    
            }
        }
    }

//===================================
//==========================
 //validation
 const regexNumber= /^[0-9]*$/
 const regexText = /^[a-zA-Z]+$/
 
 const totalArray=(arrs)=>{
    const total=arrs.map(j=>` ${j}`)
    return total
 }

 const validateInput=()=>{

     return  {
         groupIdCheck   : regexNumber.test(inputState.groupId),   
         groupNameCheck : regexText.test(inputState.groupName),
         remarkCheck    : regexText.test(inputState.remark),
         //subGroupCheck  : regexNumber.test(totalArray(inputState.subGroup))
     };  
 }
    
//=========================================


const renderForm=()=>(
<div className="modal fade" id={modalId}  role="dialog">
    <div className="modal-dialog" role="document">
        <div className="modal-content">          
            <div className="modal-body" >
                <div className="my-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {isAdd?`เพิ่ม...`:`แก้ไข...`}
                    </h5>
                </div>
                <div className="form-row my-3">  
                    <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                        <label>รหัสกลุ่มสินค้า</label>
                    </div>
                    <div style={{width:"80%"}}>
                        <input className= "form-control"
                            id="groupId-id"
                            type="text"
                            name="groupId"
                            value={inputState.groupId}
                            ref={refGroupId}
                            onFocus={(e)=>{$('#groupId-id').css('background-color','pink')}}
                            onBlur={(e)=>{$('#groupId-id').css('background-color','white')}}
                            onKeyDown={e=>jumpInputToInput(e)}
                            onChange={e=>changeInputState(e)}
                        />
                    </div>      
                </div>

                <div className="form-row my-3">  
                    <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                        <label>ชื่อกลุ่มสินค้า</label>
                    </div>
                    <div style={{width:"80%"}}>
                        <input className= "form-control"
                            id="groupName-id"
                            type="text"
                            name="groupName"
                            value={inputState.groupName}
                            ref={refGroupName}
                            onFocus={(e)=>{$('#groupName-id').css('background-color','pink')}}
                            onBlur={(e)=>{$('#groupName-id').css('background-color','white')}}
                            onKeyDown={e=>jumpInputToInput(e)}
                            onChange={e=>changeInputState(e)}
                        />
                    </div>      
                </div>

                <div className="form-row my-3">  
                    <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                        <label>หมายเหตุ</label>
                    </div>
                    <div style={{width:"80%"}}>
                        <input className= "form-control"
                            id="remark-id"
                            type="text"
                            name="remark"
                            value={inputState.remark}
                            ref={refRemark}
                            onFocus={(e)=>{$('#remark-id').css('background-color','pink')}}
                            onBlur={(e)=>{$('#remark-id').css('background-color','white')}}
                            onKeyDown={e=>jumpInputToInput(e)}
                            onChange={e=>changeInputState(e)}
                        />
                    </div>      
                </div>
            
            </div>
            <div className="modal-footer">

                <button type="button" className="btn btn-primary"
                    onClick={e=>{
                        if(isAdd){
                            setInputState(addGroup)
                        }else{
                            setInputState(editGroup)
                        }
                    }}> 
                    <RefreshIcon/>
                </button>

                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    ref={refCloseModalForm}   
                >ยกเลิก</button>

                <button type="button" className="btn btn-primary"
                    onClick={e=>{
                        if(isAdd){
                            submitAdd(e)
                        }
                        else{
                            submitEdit(e)
                        }
                        refCloseModalForm.current.click()
                        /*
                        const result=validateInput();
                        if(result.groupIdCheck&&result.groupNameCheck&&result.remarkCheck){
                            if(isAdd){
                                submitAdd(e)
                            }
                            else{
                                submitEdit(e)
                            }
                            refCloseModalForm.current.click()
                        }
                        else {
                            if(!result.groupIdCheck){
                                setInputState({...inputState,groupId:''});
                                refGroupId.current.focus();
                            }
                            if(!result.groupNameCheck){
                                setInputState({...inputState,groupName:''});
                                refGroupName.current.focus();
                            }
                            if(!result.remarkCheck){
                                setInputState({...inputState,remark:''});
                                refRemark.current.focus();
                            }
                        }
                        */
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
        {jumpInput?initJump():null}
    </div>
    )
}
