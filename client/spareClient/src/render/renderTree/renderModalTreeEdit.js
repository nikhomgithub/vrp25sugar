import React from 'react';
//import stateUtil from '../util/stateUtil'
//=============================
/*
const {changeKey,changeArray,addArray,deleteArray,
    addArrayObject,changeArrayObjectKey,changeArrayObjectArray,
    deleteArrayObjectArray,addArrayObjectArray,changeKeyKey}=stateUtil
*/
//=========================================
//import renderModalError from './render/renderModalError'
//const [showModalError,setShowModalError] = React.useState(false)

//<button
//  onClick={e=>{setShowModalError(true)}}
//>ok</button>
//{renderModalError({show:showModalError,setShow:setShowModalError})}

const renderModalTreeEdit=({show,setShow,selectGroupObject,setSelectGroupObject,formTemplate})=>{

    const renderInput=()=>{
        return(
            <div style={{width:"100%",height:"100%"}}>     
                <div className="form-row">
                    <div className="lc2 flex-center">
                        <p> ds</p>
                    </div>
                    <div className="lc10 flex-center">
                        <input
                            type="text"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="lc2 flex-center">
                        <p> ds</p>
                    </div>
                    <div className="lc10 flex-center">
                        <input
                            type="text"
                        />
                    </div>
                </div>
            </div>
        )
    }

return(
    show
    ?<div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <h5>แก้ไขกลุ่มสินค้า</h5>
                </div>
            </div>
            <div className="Modal-body">
               



                {renderInput()}



                
            </div>
            <div className="Modal-footer">
                <div>
                    <button className="Modal-cancel-button"
                        onClick={e=>{setShow(false)}}
                    >กลับ</button>
                    
                    {selectGroupObject.id>0
                    ?<button >
                        ตกลง
                    </button>
                    :null
                    }
                </div>
            </div>
        </div>
    </div>
    :null
)}

export default renderModalTreeEdit