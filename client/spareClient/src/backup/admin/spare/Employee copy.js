import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import ModalFilterForm from './ModalFilterForm'
import ModalSetting from './ModalSetting'
import {Redirect} from 'react-router-dom';

import {MainContext} from '../context/MainContext';
import EmployeeViewUtil from './EmployeeViewUtil'
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';

import renderUtil from '../renderUtil/renderUtil'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Galleryone from '../components/galleryone/Galleryone'

export default function EmployeeView() {

const {
    username,level,
    employee,setEmployee,
    filterEmployee,setFilterEmployee,
    setReloadEmployee,
    basicData,setReloadBasicData,
    editEmployee,setEditEmployee,
    addEmployee,setAddEmployee,
    blankEmployee }=React.useContext(MainContext)

const {renderBadge,renderFault,renderErrorModal} = renderUtil;

const {showArray,tableLineStyle,showAddress} = EmployeeViewUtil;

const refOpenModalFilter=React.useRef();
const refOpenModalSetting=React.useRef();
const refOpenErrorModal=React.useRef();

let [showEmployee,setShowEmployee]=React.useState({
    width:75,
    showTable:true
})

const [showState,setShowState]=React.useState({

    employeeId    :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'ID'},
    username      :{width:8 ,showCol:true,showLine:true,showColHead:true,lb:'Username'}, 
    active        :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'Active'}, 
    employeeLevel :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'Level'},
    title         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'คำนำหน้า'},
    name          :{width:10,showCol:true,showLine:true,showColHead:true,lb:'ชื่อ'},
    surname       :{width:10,showCol:true,showLine:true,showColHead:true,lb:'นามสกุล'},
    idCard        :{width:10,showCol:true,showLine:true,showColHead:true,lb:'บัตรประชาชน'}, 
    socialSecurity:{width:10,showCol:true,showLine:true,showColHead:true,lb:'ประกันสังคม'},
    phone         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'โทรศัพท์'},
    line          :{width:10,showCol:true,showLine:true,showColHead:true,lb:'ไลน์'},
    email         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'อีเมล'},
    address       :{width:35,showCol:true,showLine:true,showColHead:true,lb:'ที่อยู่'},
    remark        :{width:30,showCol:true,showLine:true,showColHead:true,lb:'หมายเหตุ'},
    photoUrl      :{width:10,showCol:true,showLine:true,showColHead:true,lb:'รูป'},
}) 

React.useEffect(()=>{
  
    const objKeys = Object.keys(showState);
    let tempTotal=0;
    objKeys.map((i,index)=>{
        if(showState[i].showCol){
            tempTotal=tempTotal+showState[i].width
        }
    })

    setShowEmployee({...showEmployee,width:tempTotal})

},[showState])
//===========================================
const deleteEmployee=()=>{
    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/employee/delete',editEmployee,config)
    .then(result=>{
        console.log('delete')
        let tempEmployee=[]
        employee.map((i,index)=>{
            if(i.employeeId!=editEmployee.employeeId){
                tempEmployee=[...tempEmployee,i]     
            }   
        })
        setEmployee([...tempEmployee])

        let tempFilterEmployee=[]
        filterEmployee.map((i,index)=>{
            if(i.employeeId!=editEmployee.employeeId){
                tempFilterEmployee=[...tempFilterEmployee,i]
            }
        })
        setFilterEmployee([...tempFilterEmployee])

        setEditEmployee(blankEmployee)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
}
//============================================
const renderCard=()=>{
    const showEachLine=(i,j,index2)=>{
        if( (j=="phone")||(j=="line")||(j=="email") ){
            return( 
            <div key={index2} 
                className={`col-lg-3 col-sm-4 col-12 text-left`}
                style={{display:"flex",justifyContent:"flex-left"}}    
            >    
                <h5>{`${showState[j].lb} :`}</h5>
                <h5>{showArray(i[j])}</h5>
            </div>) 
        }
        else if(j=="address"){
            return( 
                <div key={index2} 
                    className={`col-lg-4 col-sm-6 col-12 text-left`}>    
                    <h5>{`${showState[j].lb} :`}</h5>
                    {i[j].map((k,idx)=>
                        <p key={idx}>{showAddress(k)}</p>
                    )}
                </div>
        )}
        else if(j=="photoUrl"){
            //<Galleryone imgarrs={['http://localhost:3001/upload/tree.jpg']}/>
            //<img className="img" src={'http://localhost:3001/upload/tree.jpg'} />
            return(
            <div key={index2} 
                className={`col-lg-4 col-sm-6 col-12 text-left`}
                >    
                <h5>{`${showState[j].lb} : `}</h5>
                <Galleryone imgarrs={i[j]}/>
           
            </div>
        )}
        else if(j=="remark"){
            return(
            <div key={index2} 
                className={`col-lg-4 col-sm-6 col-12 text-left`}>    
                <h5>{`${showState[j].lb} : `}</h5>
                <p>{i[j]}</p> 
            </div>
        )}
        else{ 
            return( 
                <div key={index2} 
                     className={`col-lg-3 col-sm-4 col-12 text-left`}
                     style={{display:"flex",justifyContent:"flex-left"}}    >    
                        <h5>{`${showState[j].lb} : `}</h5>
                        <h5>{i[j]}</h5>             
                </div>
        )}
    }

    const objKeys = Object.keys(showState);
    return(
        <div style={{marginBottom:"5rem",width:'100%'}}>    
        
            {filterEmployee.map((i,index1)=>
                <div key={index1}
                    style={{width:"95%",
                    border:"1px solid #eee",
                    borderRadius:"0.5rem",
                    boxShadow:"5px 5px #eee",
                    margin:"1rem auto",padding:'0.2rem'}}>
                    <div className="form-row">
                        {objKeys.map((j,index2)=>showState[j].showLine?showEachLine(i,j,index2):null)}
                    </div>
                </div>
            )}
        </div>
    )
}
//===========================================
//===========================================
const renderTable=()=>{
    const showH5=(i,j)=>{
        if( (j=="phone")||(j=="line")||(j=="email") ){
            return <h5>{showArray(i[j])}</h5>
        }
        else if(j=="address"){
            return <h5>{showAddress(i[j][0])}</h5>
        }else if(j=="photoUrl"){
            return  <img className="img" src={i[j][0]} />
        }else{
            return <h5>{i[j]}</h5>
        }
    }
    const objKeys = Object.keys(showState);
    //console.log(objKeys)
    return(
    
        <div style={{marginBottom:"3rem",width:'100%',height:"70vh",overflow:"auto"}}>    
            <div style={{width:`${showEmployee.width}rem`,position:'relative'}}>
            
                <div className="row" style={{position:'sticky',top:'0'}}>
                    { objKeys.map((i,index)=>
                        showState[i].showCol
                        ?<div 
                            style={{
                                width:`${showState[i].width}rem`,
                                padding:"0.3rem",
                                borderRight:"1px solid #ddd",
                                backgroundColor:"#e3f2fd",
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'space-around' 
                            }}
                            onMouseOver={e=>{
                                let temp=showState[i]
                                temp={...temp,showColHead:false}
                                setShowState({...showState,[i]:temp})
                            }}
                            onMouseLeave={e=>{
                                let temp=showState[i]
                                temp={...temp,showColHead:true}
                                setShowState({...showState,[i]:temp})
                            }}
                        >   
                            {showState[i].showColHead
                            ?<h5>{showState[i].lb}</h5>
                            :<div style={{width:"100%",display:"flex"}}>
                                <AddCircleIcon style={{margin:"auto 0.4rem",fontSize:'2rem'}}
                                    onClick={e=>{
                                        let temp=showState[i]
                                        temp={...temp,width:temp.width+1}
                                        setShowState({...showState,[i]:temp})
                                    }}/>
                                
                                <RemoveCircleIcon style={{margin:"auto 0.4rem",fontSize:'2rem'}}
                                 onClick={e=>{
                                    let temp=showState[i]
                                    temp={...temp,width:temp.width-1}
                                    setShowState({...showState,[i]:temp})
                                }}/>
                                
                            </div>
                            
                            }
                        </div>
                        :null
                    )}
                </div>
                
                {filterEmployee.map((i,index1)=>
                
                <div key={index1}  className="row"
                onClick={e=>{setEditEmployee({...blankEmployee,...i})}}
                style={ tableLineStyle(i,editEmployee,index1)}
                >    
                    {objKeys.map((j,index2)=>
                        showState[j].showCol
                        ?<div 
                            style={{
                                textAlign:"left",
                                width:`${showState[j].width}rem`,
                                paddingLeft:"0.3rem",
                                paddingRight:"0.3rem",
                                borderRight:"1px solid #ddd",
                            }}
                        >
                        {showH5(i,j)}
                        </div>
                        :null
                    )}
                </div>    
                )}
                
            </div>
        </div>
    
    )
}
//=============================================
const renderModalSetting=()=>{
    return(
    
    <div>
        <button type="button" className="d-none" ref={refOpenModalSetting}
                data-toggle="modal" data-target="#modal-setting"
                onClick={e=>{ }}/>

        <ModalSetting
            modalId={`modal-setting`}
            showState={showState}
            setShowState={setShowState}
            showEmployee={showEmployee}
            setShowEmployee={setShowEmployee}
        />
    </div>
    )
}

//=============================================
const renderModalFilterForm=()=>{
    return(
    <div>
        <button type="button" className="d-none" ref={refOpenModalFilter}
                data-toggle="modal" data-target="#modal-filter"
                onClick={e=>{ }}/>

        <ModalFilterForm
            modalId={`modal-filter`}
            employee={employee}
            setFilterEmployee={setFilterEmployee}
            basicData={basicData}
        />
    </div>
    )
}

//============================================
let badgeObj={
    size:'2.1rem',
    color:'black',
    refresh:{show:true,func:setFilterEmployee,arg:employee},
    filter:{show:true,ref:refOpenModalFilter},
    setting:{show:true,ref:refOpenModalSetting,},
    plus:{show:true,func:()=>{}},
    edit:{show:true,func:()=>{},visCondition:editEmployee.employeeId>=0},
    delete:{show:true,func:deleteEmployee,visCondition:editEmployee.employeeId>=0}
}

const renderEmployee=()=>(
<div style={{width:"100%",height:"100%",marginTop:"3.5rem",position:"relative"}}>
    <div style={{textAlign:"center"}}>
        <div style={{display:"flex",
             alignItems:"center",
             justifyContent:"center"}}
        >
            <SwapHorizontalCircleIcon 
                style={{fontSize:"2.5rem"}}
                onClick={e=>{
                    setShowEmployee({...showEmployee,showTable:!showEmployee.showTable})
                }}
            />
            <h4 className="mx-2">ผู้ใช้งาน</h4>
        </div>        
        {showEmployee.showTable
        ?renderTable()
        :renderCard()}
        {renderBadge(badgeObj)}
        {renderErrorModal(refOpenErrorModal)}    
        {renderModalFilterForm()}
        {renderModalSetting()}
    </div>
</div>
)

//============================================
const renderMain=()=>{
   return(
    filterEmployee&&basicData
    ?renderEmployee()
    :renderFault(setReloadEmployee)
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================
    return (
        (username)
        ?renderMain()
        :redirectTo()
    )
}

