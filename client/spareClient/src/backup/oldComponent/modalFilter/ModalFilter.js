import React from 'react'
//import {MainContext} from '../context/MainContext';
//import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
//import $ from 'jquery';
//modalId
//modalState,setModalState,
//title,
//renderModalBody,
//submit
export default function ModalFilter({
        modalId,      
        employee,
        setFilterEmployee,
        basicData,
        filterState,setFilterState ,
        refCloseModalFilter
    }) {

const filterAll=()=>{
    let temp=[]
    
    if(employee){
        if(employee.length>0){
            employee.map(i=>{
   
                let isPass=true;

                if(filterState.toCheckId){
                    const moreThanMin = i.employeeId>=filterState.minId
                    const lessThanMax = i.employeeId<=filterState.maxId

                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                    }
                }

                if(filterState.toCheckFullName){
                    const criteria = new RegExp(filterState.fullName);
                    let wordToCheck=`${i.title} ${i.name} ${i.surname}`
                    const phones =i.phone.map(j=>` ${j}`)
                    wordToCheck=wordToCheck+phones
                
                    if(!wordToCheck.match(criteria)){
                        isPass=false;
                        //console.log('result of Name Check = false')
                    }
                }

                if(filterState.toCheckLevel){

                    const criteria = new RegExp(filterState.level);
                    let wordToCheck=`${i.employeeLevel}`
                
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
    setFilterEmployee([...temp])
}
    
//========================
const renderModalBody=()=>{
    const changeFilterState=(e)=>{
        const type=e.target.type;
        const name=e.target.name;
        const value=(type=="checkbox")?e.target.checked:e.target.value;
        setFilterState({...filterState,[name]:value})
    }
    
    const addOne=(name,value)=>{
        setFilterState({...filterState,[name]:value+1})
    }
    
    const minusOne=(name,value)=>{
        setFilterState({...filterState,[name]:value-1})
    }

    return(
    <div>

        <div className="form-row my-3">  
            <div className="" style={{width:"5%",marginLeft:"0.1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{width:"1.4rem",marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckId"
                    onChange={e=>changeFilterState(e)}
                />
            </div>

            <div className="" style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem",textAlign:"left"}}>
                <label>{`รหัสระหว่าง`}</label>
            </div>

            <div className="" style={{width:"50%"}}>
                <div style={{display:'flex',justifyContent:"space-between",marginTop:"0.3rem"}}>
                        
                        <IndeterminateCheckBoxIcon style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}
                            onClick={e=>minusOne('minId',filterState.minId)}/>
                        <p>{filterState.minId}</p>
                        <AddBoxIcon  name="" style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}              
                            onClick={e=>addOne('minId',filterState.minId)}/>
                    
                
                        <label>{`ถึง`}</label>
                    
                    
                        <IndeterminateCheckBoxIcon style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}
                            onClick={e=>minusOne('maxId',filterState.maxId)}/>
                        <p>{filterState.maxId}</p>
                        <AddBoxIcon style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}
                            onClick={e=>addOne('maxId',filterState.maxId)}/>
                        
                </div>
            </div>
            
        </div>



        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"0.1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{width:"1.4rem",marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckFullName"
                    onChange={e=>changeFilterState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem",textAlign:"left"}}>
                <label>ข้อมูลบุคคล</label>
            </div>
            <div style={{width:"50%"}}>
                <input className= "form-control"
                    type="text"
                    name="fullName"
                    placeholder="ชื่อ สกุล โทรศัพท์"
                    value={filterState.name}
                    onChange={e=>changeFilterState(e)}
                />
            </div>      
        </div>


        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"0.1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{width:"1.4rem",marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckLevel"
                    onChange={e=>changeFilterState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem",textAlign:"left"}}>
                <label>กลุ่มพนักงาน</label>
            </div>
            <div style={{width:"50%"}}>
                <select id="filterState1" 
                    className="form-control"
                    value={filterState.level}
                    onChange={e=>{setFilterState({...filterState,level:e.target.value})}}
                >
                    <option value="" hidden>เลือกจากรายการ...</option>
                    {basicData.employeeLevel.map((a,index)=>
                        <option key={index} 
                        value={a}>{a}</option>)}
                </select>
            </div>      
        </div>

    </div>
    )
}
    const renderForm=()=>{
        return(
            <div className="modal fade" id={modalId}  role="dialog">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">          
                        <div className="modal-body" >
                            <div className="my-3">
                                <h4 className="modal-title" id="exampleModalLabel">
                                    ค้นหาพนักงาน
                                </h4>
                            </div>
                        {/* Change Here*/}
                            {renderModalBody()} 
                        {/*==========*/}
                        </div>
                  
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalFilter}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                filterAll()
                                refCloseModalFilter.current.click()
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