import React from 'react'
import {MainContext} from '../context/MainContext';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';


export default function ModalSetting({
        modalId,showState,setShowState,showEmployee,setShowEmployee
    }) {

const refCloseModalSetting=React.useRef();

const renderModalBody=()=>{
    const objKeys = Object.keys(showState);
    return(
    <div >
        {    
        showEmployee.showTable
        
        ?<div className="row" style={{width:"80%",margin:'auto'}}>
            <div style={{width:`30%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>หัวข้อ</h5>  
            </div>

            <div style={{width:`30%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>แสดง</h5>  
            </div>
            <div style={{width:`40%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>ความกว้าง</h5>  
            </div>
        </div>

        :<div className="row" style={{width:"80%",margin:'auto'}}>
            <div style={{width:`50%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>หัวข้อ</h5>  
            </div>

            <div style={{width:`50%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>แสดง</h5>  
            </div>
        </div>
        }
        
        {objKeys.map((i,index)=>
        showEmployee.showTable
        ?<div className="row" style={{width:"80%",margin:'auto'}}>        
            <div style={{width:`30%`,padding:"0.3rem",textAlign:"left"}}>
                <h5>{showState[i].lb}</h5>  
            </div>
       
       
            <div style={{width:`30%`,padding:"0.3rem",}}>
                <div style={{width:"100%"}}>
                    <input  className= "form-control" 
                        style={{width:"1.4rem",margin:"-0.5rem auto"}}
                        type="checkbox"
                        checked={showState[i].showCol}
                        onChange={e=>{
                            let temp=showState[i]
                            temp={...temp,showCol:!temp.showCol}
                            setShowState({...showState,[i]:temp})
                        }}
                    />
                </div>
            </div>

            <div style={{width:`40%`,padding:"0.3rem",}}>
                <div style={{margin:"-0.3rem auto 0 auto",display:'flex',justifyContent:"space-between"}}>            
                    <IndeterminateCheckBoxIcon style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}
                        onClick={e=>{
                            let temp=showState[i]
                            temp={...temp,width:temp.width-1}
                            setShowState({...showState,[i]:temp})
                        }}/>
                    <p>{showState[i].width}</p>
                    <AddBoxIcon  style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}              
                        onClick={e=>{
                            let temp=showState[i]
                            temp={...temp,width:temp.width+1}
                            setShowState({...showState,[i]:temp})
                        }}/>
                </div>              
            </div>

        </div>
        
        :<div className="row" style={{width:"80%",margin:'auto'}}>
            <div style={{width:`50%`,padding:"0.3rem",textAlign:"left"}}>
                <h5>{showState[i].lb}</h5>  
            </div>
            <div style={{width:`50%`,padding:"0.3rem"}}>
                <div style={{width:"100%"}}>
                    <input  className= "form-control" 
                            style={{width:"1.4rem",margin:"-0.5rem auto"}}
                        type="checkbox"
                        checked={showState[i].showLine}
                        onChange={e=>{
                            let temp=showState[i]
                            temp={...temp,showLine:!temp.showLine}
                            setShowState({...showState,[i]:temp})
                        }}

                    />
                </div>
            </div>
        </div>        
        )}
    </div>
)}
//=======================================
    const renderForm=()=>{
        return(
            <div className="modal fade" id={modalId}  role="dialog">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">          
                        <div className="modal-body" >
                            <div className="my-3" 
                                 style={{display:"flex",
                                      alignItems:"center",
                                      justifyContent:"center"}}>
                               
                                    <SwapHorizontalCircleIcon 
                                        style={{fontSize:"2.5rem"}}
                                        onClick={e=>{
                                            setShowEmployee({...showEmployee,showTable:!showEmployee.showTable})
                                        }}
                                    />
                                    <h4 className="modal-title mx-2" id="exampleModalLabel">
                                        {showEmployee.showTable?`ตั้งค่าแสดงข้อมูลแบบ ตาราง`:`ตั้งค่าแสดงข้อมูลแบบ การ์ด`}
                                    </h4>
        
                            </div>

                            {
                            renderModalBody()
                            } 
                        
                        </div>
                  
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalSetting}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                refCloseModalSetting.current.click()
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
        {
        renderForm()
        }
    </div>
    )
}