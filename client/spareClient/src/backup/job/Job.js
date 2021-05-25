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

export default function Job() {

const {
    username,level,

    blankJob,
    job,setJob,setReloadJob,
    filterJob,setFilterJob,
    addJob,setAddJob,
    editJob,setEditJob,
    
    tempAddJob,setTempAddJob,
    tempEditJob,setTempEditJob,
    isAddJob,setIsAddJob,
    isEditJob,setIsEditJob,
    deIndex,setDeIndex,
    
    basicData,setReloadBasicData,
    }=React.useContext(MainContext)

const {showArray,tableLineStyle} = Util;


//===================================

const refOpenModalFilter=React.useRef();

//===========================================
const deleteJob=()=>{
    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/job/delete',editJob,config)
    .then(result=>{
        console.log('delete')
        let tempJob=[]
        job.map((i,index)=>{
            if(i.jobId!=editJob.jobId){
                tempJob=[...tempJob,i]     
            }   
        })
        setJob([...tempJob])

        let tempFilterJob=[]
        filterJob.map((i,index)=>{
            if(i.jobId!=editJob.jobId){
                tempFilterJob=[...tempFilterJob,i]
            }
        })
        setFilterJob([...tempFilterJob])

        setEditJob(blankJob)
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
                    <th scope="col">name</th>
                    <th scope="col">surname</th>
                    <th scope="col">jobStatus</th>  
                    <th scope="col">โทรศัพท์</th>                  
                </tr>
            </thead>
            {filterJob.map(i=>
                <tbody key={i.jobId} 
                  onClick={e=>{setEditJob({...blankJob,...i})}}
                  style={ tableLineStyle(i,editJob)}
                >
                    <tr style={{fontSize:"1.2rem"}}>
                        <th scope="col">{i.jobId}</th>
                        <th scope="col">{i.title}</th>
                        <th scope="col">{i.name}</th> 
                        <th scope="col">{i.surname}</th> 
                        <th scope="col">{i.jobStatus}</th> 
                        <th scope="col">{showArray(i.phone)}</th> 
                    </tr>
                </tbody>
            )}
    </table>
</div>
)
//=============================================


//=============================================

const renderModalFilterForm=()=>{
    return(
    <div>
        <button type="button" className="d-none" ref={refOpenModalFilter}
                data-toggle="modal" data-target="#modal-filter"
                onClick={e=>{ }}/>

        <ModalFilterForm
            modalId={`modal-filter`}
            job={job}
            setFilterJob={setFilterJob}
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
                onClick={e=> {setFilterJob(job)} }
            />

            <FaFilter className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=>{ 
                    setTimeout(()=>{
                        refOpenModalFilter.current.click()                      
                    },200)
                } }
            />
            
            <Link to="/addjob">    
                <FaPlusCircle className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white"}}
                    onClick={e=>{ 
                        setIsAddJob(true)
                        setIsEditJob(false)
                    } }
                />
            </Link>

            <Link to="/editjob">   
                <FaEdit className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white",visibility:editJob.jobId>=0?"visible":"hidden"}}
                    onClick={e=>{
                        setIsEditJob(true)
                        setIsAddJob(false)
                    }}
                />
            </Link>
            
            <DeleteForeverIcon className="mx-5"  
                style={{fontSize:'2.5rem',color:"white",visibility:editJob.jobId>=0?"visible":"hidden"}}
                onClick={e=>{ 
                    deleteJob();
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
//=========================================
const renderJob=()=>(
<div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
    <div style={{textAlign:"center"}}>
        <h1>งาน</h1>
       
        {
        renderBadge()
        }
        {
        renderTable()
        }
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
                        setReloadJob(true)
                    }}
                >กดเพื่อรีโหลดข้อมูล</button>
            </div>
        </div>
    )
}
//============================================
const renderMain=()=>{
   return(
    filterJob&&basicData
    ?renderJob()
    :renderFault()
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================

//============================================    
    return (
        (username&&level=="admin")
        ?renderMain()
        :redirectTo()
    )
}
