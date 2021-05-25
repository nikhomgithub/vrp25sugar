import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import ModalFilterForm from './ModalFilterForm'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import {FaEdit,FaPlusCircle,FaFilter} from 'react-icons/fa';
import RefreshIcon from '@material-ui/icons/Refresh';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {MainContext} from '../context/MainContext';
import Util from './Util'

export default function Customer() {

const {
    username,level,
    customer,setCustomer,
    filterCustomer,setFilterCustomer,
    setReloadCustomer,
    basicData,setReloadBasicData,
    editCustomer,setEditCustomer,
    addCustomer,setAddCustomer,

    isAddJob,isEditJob,
    tempAddJob,setTempAddJob,
    tempEditJob,setTempEditJob,

    blankCustomer }=React.useContext(MainContext)


const {showArray,tableLineStyle} = Util;

const refOpenModalFilter=React.useRef();

//===========================================
const deleteCustomer=()=>{
    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/customer/delete',editCustomer,config)
    .then(result=>{
        //console.log('delete')
        let tempCustomer=[]
        customer.map((i,index)=>{
            if(i.customerId!=editCustomer.customerId){
                tempCustomer=[...tempCustomer,i]     
            }   
        })
        setCustomer([...tempCustomer])

        let tempFilterCustomer=[]
        filterCustomer.map((i,index)=>{
            if(i.customerId!=editCustomer.customerId){
                tempFilterCustomer=[...tempFilterCustomer,i]
            }
        })
        setFilterCustomer([...tempFilterCustomer])

        setEditCustomer(blankCustomer)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
}
//============================================
const renderTable=()=>(
<div style={{marginBottom:"10rem"}}>
    <table className="table table-striped" >
            <thead>
                <tr style={{fontSize:"1.2rem"}}>
                    <th scope="col">id</th>
                    <th scope="col">คำนำหน้า</th>
                    <th scope="col">ชื่อ</th>
                    <th scope="col">สกุล</th>
                    <th scope="col">active</th> 
                    <th scope="col">level</th> 
                    <th scope="col">โทรศัพท์</th>                  
                </tr>
            </thead>
            {filterCustomer.map(i=>
                <tbody key={i.customerId} 
                  onClick={e=>{
                      setEditCustomer({...blankCustomer,...i})
                  }}
                  style={ tableLineStyle(i,editCustomer)}
                >
                    <tr style={{fontSize:"1.2rem"}}>
                        <th scope="col">{i.customerId}</th>
                        <th scope="col">{i.title}</th>
                        <th scope="col">{i.name}</th> 
                        <th scope="col">{i.surname}</th> 
                        <th scope="col">{i.active?"true":"false"}</th> 
                        <th scope="col">{i.customerLevel}</th> 
                        <th scope="col">{showArray(i.phone)}</th> 
                    </tr>
                </tbody>
            )}
    </table>
</div>
)

//=============================================

const renderModalFilterForm=()=>{
    return(
    <div>
        <button type="button" className="d-none" ref={refOpenModalFilter}
                data-toggle="modal" data-target="#modal-filter"
                onClick={e=>{ }}/>

        <ModalFilterForm
            modalId={`modal-filter`}
            customer={customer}
            setFilterCustomer={setFilterCustomer}
            basicData={basicData}
        />
    </div>
    )
}

//=============================================


const renderBadge=()=>{
    return(
        <div className="badge badge-pill badge-info" 
            style={{position:'fixed',bottom:'5px',
                    left:'50%',transform:'translateX(-50%)',
                    zIndex:"100",width:'100%',overflow:"auto"}}> 
            <RefreshIcon className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=> {setFilterCustomer(customer)} }
            />

            <FaFilter className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=>{ 
                    setTimeout(()=>{
                        refOpenModalFilter.current.click()                      
                    },200)
                } }
            />
            
            <Link to="/addcustomer">    
                <FaPlusCircle className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white"}}
                    onClick={e=>{ 
                    
                    } }
                />
            </Link>

            <Link to="/editcustomer">   
                <FaEdit className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white",visibility:editCustomer.customerId>=0?"visible":"hidden"}}
                    onClick={e=>{
                        
                    }}
                />
            </Link>
            
            <DeleteForeverIcon className="mx-5"  
                style={{fontSize:'2.5rem',color:"white",visibility:editCustomer.customerId>=0?"visible":"hidden"}}
                onClick={e=>{ 
                    deleteCustomer();
                }}
            />
        </div>
    )
}
//============================================
const refOpenErrorModal=React.useRef();
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
//============================================
const renderCustomer=()=>(
<div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
    <div style={{textAlign:"center"}}>
        <div>
            <h1>ลูกค้า</h1>
            {
            isAddJob
            ? 
            <Link to="/addjob">
                <button onClick={e=>{
                    if(editCustomer.customerId>0){
                        const {customerId,title,name,surname,phone,line,email}=editCustomer
                        setTempAddJob({...tempAddJob,customerId,title,name,surname,phone,line,email})
                    }
                }}>
                    กลับไป addJob
                </button>
            </Link>
            :null
            }
           
            {
            isEditJob
            ? 
            <Link to="/editjob">
                <button onClick={e=>{
                if(editCustomer.customerId>0){
                    const {customerId,title,name,surname,phone,line,email}=editCustomer
                    setTempEditJob({...tempEditJob,customerId,title,name,surname,phone,line,email})
                }
                }}>
                กลับไป editJob
                </button>
            </Link>
            :null
            } 
           
        </div>
        
        
        {renderBadge()}
        {renderTable()}
        {renderErrorModal()}    
        {renderModalFilterForm()}
    </div>
</div>
)
//-------------------------------------------
const renderFault=()=>{
    return(
        <div style={{width:"100%",height:"100%",
                        display:"flex",justifyContent:"center",alignItems:"center",}}>
            <div style={{textAlign:"center"}}>
                <h4>ถ้าข้อมูลไม่แสดง  </h4>
                <button className="text-center btn btn-primary btn-lg"
                    onClick={e=>{
                        setReloadBasicData(true)
                        setReloadCustomer(true)
                    }}
                >กดเพื่อรีโหลดข้อมูล</button>
            </div>
        </div>
    )
}
//============================================
const renderMain=()=>{
   return(
    filterCustomer&&basicData
    ?renderCustomer()
    :renderFault()
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================
    return (
        (username&&level=="admin")
        ?renderMain()
        :redirectTo()
    )
}
