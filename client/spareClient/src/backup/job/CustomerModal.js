import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import $ from 'jquery';
import SearchIcon from '@material-ui/icons/Search';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function CustomerModal({
        modalId,      
        customer,
        filterCustomer,
        setFilterCustomer,
        editCustomer,
        setEditCustomer,
        changeInputStateCustomerModal
    }) {
  
let [inputState,setInputState]=React.useState({
    toCheckFullName:true,
    fullName:"",
}) 

const [showCustomer,setShowCustomer]=React.useState(false)

React.useEffect(()=>{
    console.log('inputState')
    console.log(inputState)
},[inputState])

const changeInputState=(e)=>{
    const type=e.target.type;
    const name=e.target.name;
    const value=(type=="checkbox")?e.target.checked:e.target.value;
    setInputState({...inputState,[name]:value})
}

const refCloseModalFilterForm=React.useRef()

const filterAll=()=>{
   
    let temp=[]
    
    if(customer){
        if(customer.length>0){
            customer.map(i=>{
   
                let isPass=true;

             

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
            <div className="d-none" style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckFullName"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>บุคคล</label>
            </div>
            <div style={{width:"50%"}}>
                <input className= "form-control"
                    type="text"
                    name="fullName"
                    placeholder="ชื่อ สกุล โทรศัพท์"
                    value={inputState.fullName}
                    onChange={e=>changeInputState(e)}
                />
            </div> 
            <div  style={{width:"5%", marginLeft:"2rem"}}>
                <SearchIcon style={{fontSize:'2.5rem'}} 
                     onClick={e=> {
                        filterAll()
                        setShowCustomer(true)} 
                     }
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
                        {
                        //====================
                        }
                       

                        {
                        showCustomer
                        ?<div>
                            {
                            filterCustomer.map((i,index)=>
                            <div key={index} onClick={e=>{setEditCustomer(i)}}>
                                <h3 style={{color:(i.customerId==editCustomer.customerId)?'red':'black'}}>
                                    {`${i.title} ${i.name} ${i.surname}`}
                                </h3>
                            </div>)
                            }
                        </div>
                        :null
                        }
 
                        {
                        //====================
                        }                       
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalFilterForm}   
                                    onClick={e=>{setShowCustomer(false)}}
                            >ยกเลิก</button>

                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                changeInputStateCustomerModal()
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