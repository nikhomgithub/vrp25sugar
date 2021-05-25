import React from 'react';
import stateUtil from '../../util/stateUtil'
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 

import '../../render/Modal.css'
//=============================

const {changeKey,changeArray,addArray,deleteArray,
    addArrayObject,changeArrayObjectKey,changeArrayObjectArray,
    deleteArrayObjectArray,addArrayObjectArray,changeKeyKey}=stateUtil

const renderTableSetting=({
    show,setShow,
    tableSetting,setTableSetting,
    limitRow,setLimitRow
    })=>{

const objKeys = Object.keys(tableSetting);                
             
return(
show
?<div className="Modal-background">
    <div className="Modal-box">
   
        <div className="Modal-header">
            <div>
                <h1>{'ตั้งค่าตาราง'}</h1>
            </div>
        </div>
   
        <div>
            <div className="flex-center-baseline flex-no-wrap" >
                <div className="lc6 flex-center-center"><h5>หัวข้อ</h5></div>
                <div className="lc6 flex-center-center"><h5>แสดง</h5></div>
            </div>
            {
             objKeys.map((i,index)=>(
                <div className="flex-center-baseline flex-no-wrap m-1" key={index} >
                    <div className="lc6 flex-center-center"><p>{tableSetting[i].lb}</p></div>
                    <div className="lc6 flex-center-center">
                        <input
                            type="checkbox"
                            checked={tableSetting[i].showCol}
                            onChange={e=>{
                                changeKeyKey({key:`${i}`,
                                            subKey:'showCol',
                                            value:e.target.checked,
                                            inputState:tableSetting,
                                            setInputState:setTableSetting
                                    })
                            }}
                        />
                    </div>
                </div>
             ))   
            }
        </div>
        {
        limitRow
        ?<div className="flex-center-center">
            <h1>____________________</h1>
        </div>
        :null
        }
        {
        limitRow
        ?<div className="flex-center-center flex-no-wrap" >
                <div className="flex-center-center lc6">
                    <p>จำนวนข้อมูลต่อหน้า</p>
                </div>
                <div className="flex-center-center lc6">
                    <div className="flex-center-center flex-no-wrap">
                        <FaMinusSquare className="md-icon mr-2 mb-3"
                            onClick={e=>{
                                if(limitRow>1){
                                    const temp=limitRow-1
                                    setLimitRow(temp)
                                }
                            }}
                        />
                        <p>{`${limitRow}`}</p>
                        <FaPlusSquare className="md-icon ml-2 mb-3"
                            onClick={e=>{
                                if(limitRow<50){
                                    const temp=limitRow+1
                                    setLimitRow(temp)
                                }
                            }}
                        />
                     </div>   

                    
                </div>
             
        </div>
        :null
        }
        <div className="Modal-footer">
            <div>
                <button
                    onClick={e=>{setShow(false)}}
                >กลับ</button>
            </div>
        </div>

    </div>
</div>
:null
)}


//=============================

export default renderTableSetting
