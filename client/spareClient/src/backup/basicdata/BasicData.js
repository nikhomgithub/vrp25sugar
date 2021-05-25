import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import EditIcon from '@material-ui/icons/Edit';
import {MainContext} from '../context/MainContext';
import Modal_setting from './Modal_setting';
import Modal_routeAuth from './Modal_routeAuth';

import renderUtil from '../renderUtil/renderUtil'
import BasicDataUtil from './BasicDataUtil'

export default function BasicData() {
    const {basicData,setBasicData,
        setReloadBasicData,username}=React.useContext(MainContext)
    
    const {renderFault,renderErrorModal} = renderUtil;
    const { accendArray,deccendArray,addElement,deleteElement,
        changeInputState,trimInput} = BasicDataUtil
    const [inputState,setInputState]=React.useState(null);

    const refOpenErrorModal=React.useRef()

//====================================
const submitRouteAuth=(subState)=>{
    const tempBasicData={...basicData,...subState}
    axios.post('/basicdata/update',tempBasicData)
        .then(result=>{
            setBasicData(tempBasicData)
        })
        .catch(err=>{
            refOpenErrorModal.current.click();
        })
} 

//====================================
const submit=(name)=>{
    let temp=[]
    
    inputState[`${name}`].map((i,index)=>{
        i.trim()
        if(i!=""){
            temp=[...temp,i]
        }
    });
    
    const tempBasicData={...basicData,[name]:temp}
    axios.post('/basicdata/update',tempBasicData)
        .then(result=>{
            setBasicData(tempBasicData)
        })
        .catch(err=>{
            refOpenErrorModal.current.click();
        })
}
//====================================
const [name,setName]=React.useState(null)
const [lb,setLb]=React.useState(null)
const refOpenRouteAuthModal=React.useRef()
const refOpenInputModal=React.useRef()
const renderInputModal=()=>{
    return(
        name=="routeAuth" 
        ?<div>
            <button type="button" className="btn btn-primary d-none" 
                data-toggle="modal" data-target="#routeAuthModal"
                ref={refOpenRouteAuthModal}
            />
            <Modal_routeAuth 
                modalId="routeAuthModal"
                lb={lb}
                name={name}
                submit={submitRouteAuth}
                inputState={inputState} 
                setInputState={setInputState}  
                basicData={basicData}
            />
        </div>
        :<div>
            <button type="button" className="btn btn-primary d-none" 
                data-toggle="modal" data-target="#inputModal"
                ref={refOpenInputModal}
            />
            <Modal_setting 
                modalId="inputModal"
                lb={lb}
                name={name}
                submit={submit}
                inputState={inputState} 
                setInputState={setInputState}  
            />
        </div>

    )
}
//=========================
const renderSelect=()=>{
    const {_id,title,jobStatus,productStatus,unit
          ,employeeLevel,customerLevel,routeAuth}=basicData;
    const arrs=[
        {lb:"คำนำหน้า",name:"title"},
        {lb:"สถานะงาน",name:"jobStatus"},
        {lb:"สถานะสินค้า",name:"productStatus"},
        {lb:"หน่วย",name:"unit"},
        {lb:"กลุ่มพนักงาน",name:"employeeLevel"},
        {lb:"กลุ่มลูกค้า",name:"customerLevel"},
        {lb:"สิทธ์ใช้งาน",name:"routeAuth"}
    ]
    return(
    <div className="form-row">   
    {arrs.map((a,index)=>

    <div key={index} className={`col-lg-3 col-md-4 col-12 text-left`}>
        <label >{a.lb}</label>  
        <EditIcon style={{marginLeft:"1rem", marginTop:"-0.5rem"}}
            onClick={e=>{
            setLb(a.lb)
            setName(a.name)
            setInputState({ [a.name]:basicData[`${a.name}`]})
            setTimeout(()=>{
                if(a.name=="routeAuth") {
                    refOpenRouteAuthModal.current.click()
                }
                else{
                    refOpenInputModal.current.click()
                }
            },100)
            }}
        />                     
        
        <select className="form-control">  
            <option value="" hidden>ตรวจสอบรายการ...</option>
            {   a.name=="routeAuth"
                ?basicData[`${a.name}`].map((m,index)=>
                    <option key={index}>{m.routeName}</option>)
                :basicData[`${a.name}`].map((m,index)=>
                    <option key={index}>{m}</option>)
            }
            
        </select>

    </div>
    )}
    </div>      
    ) 
}
//====================================
const renderView=()=>{ 
    return(
    <div style={{width:"100%",height:"100%",position:"relative"}} >
        <div style={{width:"100%",height:"100%",padding:"5rem 2rem 2rem 2rem"}} >
            <div style={{textAlign:"center"}}>
                <h1>ค่าพื้นฐาน</h1>
            </div>
            {renderSelect()}
            {renderErrorModal(refOpenErrorModal)}
            {inputState?renderInputModal():null}
        </div>
    </div>
    )
}

//============================
const renderBasicData=()=>(
    basicData
    ?renderView()
    :renderFault(setReloadBasicData)
)
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================
    return (
        username
        ?renderBasicData()
        :redirectTo()
    )
}
