import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import $ from 'jquery';

export default function ModalFilterForm({
        modalId,      
        member,
        setFilterMember   
    }) {
            

let [inputState,setInputState]=React.useState({
    toCheckName:false,
    name:"",
    toCheckAge:false,
    age:2,
    minAge:0,
    maxAge:100
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

    if(member){
        if(member.length>0){
            member.map(i=>{
                let isPass=true;

                if(inputState.toCheckName){
                    const criteria = new RegExp(inputState.name);
                    const wordToCheck=i.name;
                    if(!wordToCheck.match(criteria)){
                        isPass=false;
                        console.log('result of Name Check = false')
                    }
                }

                if(inputState.toCheckAge){
                    const moreThanMin = i.age>inputState.minAge
                    const lessThanMax = i.age<inputState.maxAge
                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                    }
                }

                if(isPass){
                    temp=[...temp,i]                
                }

            })
        }
    }
    console.log('temp')
    console.log(temp)
    setFilterMember([...temp])
}
    
//========================

const renderModalBody=()=>(
    <div>

        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckName"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"10%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>ชื่อ</label>
            </div>
            <div style={{width:"65%"}}>
                <input className= "form-control"
                    type="text"
                    name="name"
                    placeholder="ใส่ชื่อที่ต้องการค้นหา"
                    value={inputState.name}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>


        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckAge"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"10%",marginLeft:"1rem",marginTop:"0.3rem",marginRight:"1rem"}}>
                <label>{`อายุ : ${inputState.age} `}</label>
            </div>
         
          
                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('minAge',inputState.minAge)}/>
                    <p>{inputState.minAge}</p>
                    <AddBoxIcon onClick={e=>addOne('minAge',inputState.minAge)}/>
                </div>

                <div style={{width:"30%",marginRight:"1rem"}}>    
                    <input className= "form-control"
                        type="range"
                        name="age"
                        min={inputState.minAge}
                        max={inputState.maxAge}
                        value={inputState.age}
                        onChange={e=>changeInputState(e)}
                    />
                </div>    

                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('maxAge',inputState.maxAge)}/>
                    <p>{inputState.maxAge}</p>
                    <AddBoxIcon onClick={e=>addOne('maxAge',inputState.maxAge)}/>
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

                            {
                            renderModalBody()
                            } 
                        
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