import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import $ from 'jquery';

export default function ModalFilterForm({
        modalId,      
        customer,
        setFilterCustomer,
        basicData  
    }) {

let [inputState,setInputState]=React.useState({
    toCheckFullName:false,
    fullName:"",

    toCheckId:false,
    id:2,
    minId:0,
    maxId:100,

    toCheckLevel:false,
    level:""
}) 

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
    let temp=[]
    
    if(customer){
        if(customer.length>0){
            customer.map(i=>{
   
                let isPass=true;

                if(inputState.toCheckId){
                    const moreThanMin = i.customerId>=inputState.minId
                    const lessThanMax = i.customerId<=inputState.maxId

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

                if(inputState.toCheckLevel){

                    const criteria = new RegExp(inputState.level);
                    let wordToCheck=`${i.customerLevel}`
                
                    if(!wordToCheck.match(criteria)){
                        isPass=false;
                        //console.log('result of Name Check = false')
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
    setFilterCustomer([...temp])
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
                    name="toCheckLevel"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>กลุ่มพนักงาน</label>
            </div>
            <div style={{width:"50%"}}>
                <select id="inputState1" 
                    className="form-control"
                    value={inputState.level}
                    onChange={e=>{setInputState({...inputState,level:e.target.value})}}
                >
                    <option value="" hidden>เลือกจากรายการ...</option>
                    {basicData.customerLevel.map((a,index)=>
                        <option key={index} 
                        value={a}>{a}</option>)}
                </select>
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