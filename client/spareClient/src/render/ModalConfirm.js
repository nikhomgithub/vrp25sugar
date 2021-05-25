import React from 'react';
import axiosUtil from '../util/axiosUtil'
import renderModalError from './renderModalError'

const {submitFunc}=axiosUtil  

function ModalConfirm({
    show,setShow,
    url,stateTemplate,editData,
    //setShowModalError,
    setReload,
    submitOption,
    actionAfterSuccess
    }){


    const refModalConfirm1 = React.createRef()
    const refModalConfirm2 = React.createRef() 

    const [showModalError,setShowModalError]=React.useState(false)
    //const {id,parentId,allDeleteId,routeAuth,detail}=editData
//===============================
//==============================
const submitFunctionOption=()=>{
    console.log(`submitOption : ${submitOption}`)
    
    if(submitOption==0){
        const {id,parentId,allDeleteId,routeAuth,detail}=editData
        submitFunc({
            url,
            stateTemplate,
            inputState:{id,parentId,
                allDeleteId,routeAuth,detail},
            setShow,
            setShowModalError,
            actionAfterSuccess,
        })
    }
    
    if(submitOption==1){

        if(actionAfterSuccess){actionAfterSuccess(editData)}
    }
    
}
//====================
//===============================
    return(

    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                       <h3>ยืนยันที่จะดำเนินการต่อ ?</h3>
                </div>
            </div>
          
            <div className="Modal-footer">
                <div>
                    <button
                        ref={refModalConfirm1}
                        onClick={e=>{
                            submitFunctionOption()
                        }}
                        onKeyDown={e=>{
                            if(e.key=="ArrowRight"){
                                refModalConfirm2.current.focus()
                            }
                        }}
                    >ตกลง</button>
                </div>
                <div>
                    <button
                        ref={refModalConfirm2}
                        onKeyDown={e=>{
                            if(e.key=="ArrowLeft"){
                                refModalConfirm1.current.focus()
                            }
                        }}
                        onClick={e=>{
                            if(setShow){setShow(false)}
                        }}
                    >ยกเลิก</button>
                </div>

            </div>
            {renderModalError({show:showModalError,setShow:setShowModalError})}
        </div>
    </div>
    )
}

export default ModalConfirm
