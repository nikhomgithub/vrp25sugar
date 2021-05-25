import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import $ from 'jquery';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import th from "date-fns/locale/th";
registerLocale("th", th);

export default function ModalFilterForm({
        modalId,      
        job,
        setFilterJob,
        basicData  
    }) {

const dateNow=()=>{
    let temp=new Date()
    temp=temp.toISOString()
    temp=temp.substring(0,10)
    temp=`${temp}T00:00:00.000Z`
    return temp
}     

const displayThaiDate=(isoDate)=>{
    //in mongo is iso-date 	"2015-03-25"
    //for thaiDate in put is short-date "03/25/2015"
    //for e of thaiDate is long-date "Mar 25 2015"
    if(isoDate){
        const shortDate = isoDate.substring(0,10)
        return new Date(shortDate)
    }
    else{
        return isoDate
    }
}


let [inputState,setInputState]=React.useState({
    toCheckFullName:false,
    fullName:"",

    toCheckId:false,
    id:2, //no use
    minId:0,
    maxId:100,

    toCheckLevel:false,
    level:"",

    toCheckDateIn:false,
    minDateIn:dateNow(),
    maxDateIn:dateNow(),
}) 

let [tempMinDateIn,setTempMinDateIn]=React.useState(displayThaiDate(dateNow()))
let [tempMaxDateIn,setTempMaxDateIn]=React.useState(displayThaiDate(dateNow()))

React.useEffect(()=>{
    //console.log('inputState')
    //console.log(inputState)
},[inputState])

const changeInputState=(e)=>{
    const type=e.target.type;
    const name=e.target.name;
    const value=(type=="checkbox")?e.target.checked:e.target.value;
    setInputState({...inputState,[name]:value})
}

const addOne=(name,value)=>{
    setInputState({...inputState,[name]:value+1})
}

const minusOne=(name,value)=>{
    setInputState({...inputState,[name]:value-1})
}

const refCloseModalFilterForm=React.useRef()

const filterAll=()=>{
    const getMinDate=(minDate)=>{
        const tempStringDate = minDate.substring(0,10)+"T00:00:00.000Z"
        const tempDate=new Date(tempStringDate)
        return tempDate.getTime()
    }

    const getMaxDate=(maxDate)=>{
        const tempStringDate = maxDate.substring(0,10)+"T24:00:00.000Z"
        const tempDate=new Date(tempStringDate)
        return tempDate.getTime()
    }

    const getNormalDate=(stringDate)=>{
        const tempDate = new Date(stringDate)    
        return tempDate.getTime()
    }

    let temp=[]
    
    if(job){
        if(job.length>0){
            job.map(i=>{
   
                let isPass=true;

                if(inputState.toCheckId){
                    const moreThanMin = i.jobId>=inputState.minId
                    const lessThanMax = i.jobId<=inputState.maxId

                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                    }
                }

                if(inputState.toCheckFullName){
                    const criteria = new RegExp(inputState.fullName);
                    let wordToCheck=`${i.title} ${i.name} ${i.surname}`
                    const phones =i.phone.map(j=>` ${j}`)
                    wordToCheck=wordToCheck+phones
                
                    if(!wordToCheck.match(criteria)){
                        isPass=false;
                        //console.log('result of Name Check = false')
                    }
                }

                if(inputState.toCheckDateIn){
                    const normalDate=getNormalDate(i.dateIn);
                    const moreThanMin= normalDate>getMinDate(inputState.minDateIn);
                    const lessThanMax= normalDate<getMaxDate(inputState.maxDateIn);
                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                        //console.log('dateIn false')
                    }
                }


                if(isPass){
                    temp=[...temp,i]                
                }

            })
        }
    }
    //console.log('temp')
    //console.log(temp)
    setFilterJob([...temp])
}
    
//========================

const renderModalBody=()=>(
    <div>

        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckId"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"10%",marginLeft:"1rem",marginTop:"0.3rem",marginRight:"1rem"}}>
                <label>{`ไอดี : ${inputState.id} `}</label>
            </div>
         
                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('minId',inputState.minId)}/>
                    <p>{inputState.minId}</p>
                    <AddBoxIcon                onClick={e=>addOne('minId',inputState.minId)}/>
                </div>

                <div style={{width:"30%",marginRight:"1rem"}}>    
                    <input className= "form-control"
                        type="range"
                        name="id"
                        min={inputState.minId}
                        max={inputState.maxId}
                        value={inputState.id}
                        onChange={e=>changeInputState(e)}
                    />
                </div>    

                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('maxId',inputState.maxId)}/>
                    <p>{inputState.maxId}</p>
                    <AddBoxIcon onClick={e=>addOne('maxId',inputState.maxId)}/>
                </div>
        </div>



        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckFullName"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>ข้อมูลบุคคล</label>
            </div>
            <div style={{width:"50%"}}>
                <input className= "form-control"
                    type="text"
                    name="fullName"
                    placeholder="ชื่อ สกุล โทรศัพท์"
                    value={inputState.name}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>


        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckDateIn"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>วันรับ</label>
            </div>

            <div style={{width:"25%"}}>
                <DatePicker className= "form-control"
                  
                    name="minDateIn"
                    locale="th"
                    dateFormat="dd/MM/yyyy"
                    style={{zIndex:"5000"}}
                    selected={tempMinDateIn}
                    onChange={e=>{
                        setInputState({...inputState,minDateIn:e.toISOString()})
                        setTempMinDateIn(e)                     
                    }}
                 
                />
            </div>

            <div style={{width:"25%"}}>
                <DatePicker className= "form-control"
                 
                    name="maxDateIn"
                    locale="th"
                    dateFormat="dd/MM/yyyy"
                    style={{zIndex:"5000"}}
                    selected={tempMaxDateIn}
                    onChange={e=>{
                        setInputState({...inputState,maxDateIn:e.toISOString()})
                        setTempMaxDateIn(e)                     
                    }}
                  
   
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
                                    ค้นหา
                                </h5>
                            </div>

                            {renderModalBody()} 
                        
                        </div>
                  
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalFilterForm}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                filterAll()
                                refCloseModalFilterForm.current.click()
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
        {renderForm()}
    </div>
    )
}