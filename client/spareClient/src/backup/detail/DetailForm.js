import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

import {FaEdit,FaPlusCircle,FaFilter} from 'react-icons/fa';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';
import $ from 'jquery';

import RefreshIcon from '@material-ui/icons/Refresh';

export default function DetailForm({title,initState,isAdd}) {
    const {basicData,
           blankJob,
           tempAddJob,setTempAddJob,
           tempEditJob,setTempEditJob,
           isAddJob,setIsAddJob,
           isEditJob,setIsEditJob,
           deIndex,setDeIndex
        }=React.useContext(MainContext)
    
    const refOpenErrorModal=React.useRef();    
//==================================
    
const newDetail={
    detailIndex:"",
    productId:"",
    productName:"",
    price:"",
    unit:"",
    quantity:"",
    total:"",
    productRemark:"",
    productStatus:"",
    employeeId:"",
    name:"",
    startDate:"",
    endDate:"",
    workHour:""
}

let [inputState,setInputState]=React.useState(initState)

//detail เป็น array ของ product
let [detailState,setDetailState]=React.useState(inputState.detail)

React.useEffect(()=>{
    if(detailState){
        console.log('detailState')
        console.log(detailState)
    }
},[detailState])    

const changeDetailState=(ind,e)=>{
    let tempDetailState=[]

    detailState.map((i,index)=>{
        if(index==ind){
            const updateI={...i,[e.target.name]:e.target.value}

            tempDetailState=[...tempDetailState,updateI]
        }
        else{
            tempDetailState=[...tempDetailState,i]
        }
    })
    setDetailState([...tempDetailState])

}

//=================================
const styleInput=()=>{
    return ({
        background:"transparent",
        width:'100%',height:'100%',
        position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
        border:"none",
        textAlign:'center'
    })
}
//====================================
const tableLineStyle=(i)=>{
    
        if(deIndex==i){
            return(
                {background:"pink"}
            )
        }
        else{
            return null
        }
    
    
}
//==================================
const submitAdd=(e)=>{

}
//======================================
const submitEdit=(e)=>{
   
}
//======================================
const renderTable=()=>{
    return(
        <div style={{width:'100%',overflow:"auto"}}>
            <div style={{width:'200%'}}>
            <table className="table table-striped" >
                <thead>
                    <tr style={{fontSize:"1.2rem"}}>
                        <th scope="col">
                        <FaPlusCircle style={{fontSize:'1.5rem'}}
                            onClick={e=>{
                                setDetailState([newDetail,...detailState])
                            }}
                        />
                        </th>
                        <th scope="col">index</th>
                        <th scope="col">id</th>
                        <th scope="col">สินค้า</th>
                        <th scope="col">ราคา</th>
                        <th scope="col">หน่วย</th>
                        <th scope="col">จำนวน</th>
                        <th scope="col">รวม</th>   
                        <th scope="col">หมายเหตุ</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">รหัส พน</th>
                        <th scope="col">ชื่อ พน</th>
                        <th scope="col">วันเริ่มทำ</th>
                        <th scope="col">วันเสร็จ</th>
                        <th scope="col">ชม ทำ</th>
                    </tr>
                </thead>
                {detailState.map((i,index)=>
                <tbody key={index} 
                    onClick={e=>{
                        setDeIndex(index)
                    }}
                    style={ tableLineStyle(index) }                       
                >
                    <tr style={{fontSize:"1.2rem"}}>
                        <th scope="col">
                            <FaPlusCircle style={{fontSize:'1.5rem'}}
                                onClick={e=>{
                                    let temp=[]
                                    detailState.map((i,idx)=>{
                                        if(index==idx){
                                            temp=[...temp,i,newDetail]
                                        }
                                        else{
                                            temp=[...temp,i]
                                        }
                                    })
                                    setDetailState([...temp])
                                }}
                            />
                            <DeleteForeverIcon style={{fontSize:'2rem'}}
                                onClick={e=>{
                                    let temp=[]
                                    detailState.map((i,idx)=>{
                                        if(index!=idx){
                                            temp=[...temp,i]
                                        }
                                    })
                                    setDetailState([...temp])
                                }}
                            />
                            <Link to="product"
                                  onClick={e=>{
                                      if(isAddJob){
                                          setTempAddJob({...tempAddJob,detail:detailState})
                                      }
                                      if(isEditJob){
                                        setTempEditJob({...tempEditJob,detail:detailState})
                                    }

                                  }}>
                                <SearchIcon style={{fontSize:'2rem'}}/>
                            </Link>
                            
    
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="detailIndex"
                                value={i.detailIndex}
                                onChange={e=>changeDetailState(index,e)}
                            />
                        
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="productID"
                                value={i.productId}
                                onChange={e=>changeDetailState(index,e)}

                            />
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="productName"
                                value={i.productName}
                                onChange={e=>changeDetailState(index,e)}
                            />
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="price"
                                value={i.price}
                                onChange={e=>changeDetailState(index,e)}
                            />
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <select  style={styleInput()}
                                name="unit"
                                value={i.unit}
                                onChange={e=>changeDetailState(index,e)}
                            >
                                <option value="" hidden>เลือก...</option>
                                {basicData.unit.map((a,index)=>
                                <option key={index} value={a}>{a}</option>
                                )}
                            </select>
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="quantity"
                                value={i.quantity}
                                onChange={e=>changeDetailState(index,e)}
                            />
                        </th>
                        <th style={{position:"relative"}} scope="col">
                            <input  style={styleInput()}
                                name="total"
                                value={i.total}
                                onChange={e=>changeDetailState(index,e)}
                            />
                        </th>


                        <th scope="col">{i.productName}</th> 
                        <th scope="col">{i.price}</th> 
                        <th scope="col">{i.unit}</th> 
                        <th scope="col">{i.quantity}</th>
                    
                    </tr>
                </tbody>
            )}
            </table>

            </div>
        </div>
      
    )
}


//======================================
    const renderFooter=()=>{
        return(
            <div className="form-row" style={{marginBottom:"10rem"}}> 
        
                <div className={`form-group col-md-4 text-center`}>
                   
                    
                    <button className="btn btn-primary"
                        onClick={e=>{
                            if(isAddJob){
                                setTempAddJob({...tempAddJob,detail:detailState})
                            }   
                            if(isEditJob){
                                setTempEditJob({...tempEditJob,detail:detailState})
                            }
                            setInputState(blankJob)
                        }}
                    >
                        Back
                    </button>
                    
                   
                </div>
            </div>        
        )
    }

    //====================================
  
    const renderModalForm=()=>{
    return(

        <div>
            
           
                

           



        </div>
    )
    }
    
    //======================================
    const renderErrorModal=()=>{
        return(
            <div>
                <button type="button" className="btn btn-primary d-none" ref={refOpenErrorModal}
                        data-toggle="modal" data-target="#errorModal"/>
                        
                <div className="modal fade" id="errorModal"role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">แจ้งเตือน</h5>
                            </div>
                        <div className="modal-body">
                            <p className="modal-title" id="exampleModalLabel">ดำเนินการไม่สำเร็จ</p>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" 
                                        data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //======================================
    const renderDetail=()=>{ 
        return(
        <div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
            <div style={{textAlign:"center"}}>
                <h1>{`Detail Form ${title} : ${inputState.jobId}`}</h1>
                {
                renderErrorModal()
                }   
               
                {
                renderModalForm()
                }
                {
                 renderTable()
                }
                {   
                renderFooter()
                }
            </div>
        </div>
        )
    }
    //====================================
    const redirectTo=()=>{
        if(isAddJob){
            return <Redirect to ="/addjob" exact/>
        }
        else if(isEditJob){
            return <Redirect to ="/editjob" exact/>
        }
        else{
            return <Redirect to ="/job" exact/>
        }
    }
    //=======================================
    return (
        inputState.jobId>=0
        ?renderDetail():
        redirectTo()
    )
}

