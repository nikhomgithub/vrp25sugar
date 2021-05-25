import React from 'react';
import stateUtil from '../util/stateUtil'
import './Modal.css'

const {changeKey,changeArray,addArray,deleteArray,
    addArrayObject,changeArrayObjectKey,changeArrayObjectArray,
    deleteArrayObjectArray,addArrayObjectArray,changeKeyKey}=stateUtil


const renderModalError=({show,setShow})=>{
return(
    show.status
    ?<div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <h2>! เกิดข้อผิดพลาด</h2>
                </div>
            </div>
            <div className="Modal-body">
                <div>
                    <p>ดำเนินการไม่สำเร็จ</p>
                </div>
            </div>
            <div className="Modal-footer">
                <div>
                    <button
                        onClick={e=>{setShow({status:false,msg:""})}}
                    >กลับ</button>
                </div>
            </div>

        </div>
    </div>
    :null
)}

export default renderModalError
               