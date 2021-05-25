import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import {FaEdit,FaPlusCircle,FaFilter} from 'react-icons/fa';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RefreshIcon from '@material-ui/icons/Refresh';
import ModalForm from './ModalForm';
import ModalFilterForm from './ModalFilterForm'
import axios from 'axios';

export default function Login() {

    const { blankMember,
            member,setMember,
            reloadMember,setReloadMember,
            addMember,setAddMember,
            editMember,setEditMember,
            filterMember,setFilterMember
          }=React.useContext(MainContext)

const refOpenErrorModal=React.useRef();    
const refOpenModalAdd=React.useRef();
const refOpenModalEdit=React.useRef();

const refOpenModalFilter=React.useRef();

const [jumpInput,setJumpInput]=React.useState(false)
const [isAdd,setIsAdd] = React.useState(false)

//=============================================
let [inputState,setInputState]=React.useState(blankMember)

const changeInputState=(e)=>{
    setInputState({...inputState,[e.target.name]:e.target.value})
}
///===========================================

//============================================
const submitAdd=(e)=>{
    e.preventDefault();

    axios.post('/member/add',inputState)
        .then(result=>{
            //console.log(result.data)
            setMember([...member,result.data])
        })
        .catch(err=>{
            refOpenErrorModal.current.click()
        })
}

const submitEdit=(e)=>{
    //console.log(inputState)
    e.preventDefault();
    axios.post('/member/update',inputState)
        .then(result=>{
            //console.log(result.data)
            let temp=[]
            member.map(i=>{
                if(i.memberId!=inputState.memberId){
                    temp=[...temp,i]
                }    
                else{
                    temp=[...temp,
                          { _id:i._id,
                            memberId:inputState.memberId,
                            name:inputState.name,
                            age:inputState.age
                          }]   
                }
            })
            setMember([...temp])
        })
        .catch(err=>{
            refOpenErrorModal.current.click()
        })
}

const deleteMember=()=>{
    //console.log('deleteMember')
    axios.post('/member/delete',editMember)
    .then(result=>{
        
        console.log(result)
        //setMember([...member,result.data])
        let temp=[]
        member.map((i)=>{
            if(i.memberId!=editMember.memberId){
                temp=[...temp,i]
            }
        })
        setMember([...temp])

    })
    .catch(err=>{

        refOpenErrorModal.current.click()
    })
}
//=============================================
const renderList=()=>{
    return(
        <div style={{marginBottom:"10rem"}}>
        {filterMember.map((i,index)=>
            <h2 key={index} 
                style={{color:editMember.memberId==i.memberId?"red":"black"}}
                onClick={e=>{
                    setEditMember(i)
                } }
            >{`memberID : ${i.memberId}, name:${i.name} ,age:${i.age}`}</h2>
        )}
        </div>
    )
}  
//=============================================

const renderModalForm=()=>{
    return(
        <div>
            {isAdd
            ?<div>
                <button type="button" className="d-none" ref={refOpenModalAdd}
                        data-toggle="modal" data-target="#modal-add"
                        onClick={e=> setJumpInput(true) }/>

                <ModalForm
                    modalId={`modal-add`}
                    isAdd={isAdd}
                    
                    jumpInput={jumpInput}
                    setJumpInput={setJumpInput}

                    inputState={inputState}
                    setInputState={setInputState}

                    changeInputState={changeInputState}

                    submitAdd={submitAdd}
                    submitEdit={submitEdit}

                    addMember={addMember}
                    editMember={editMember}
                />
            </div>
            :<div>
                <button type="button" className="d-none" ref={refOpenModalEdit}
                        data-toggle="modal" data-target="#modal-edit"
                        onClick={e=> setJumpInput(true) }/>

                <ModalForm
                    modalId={`modal-edit`}
                    isAdd={isAdd}
                    
                    jumpInput={jumpInput}
                    setJumpInput={setJumpInput}

                    inputState={inputState}
                    setInputState={setInputState}

                    changeInputState={changeInputState}

                    submitAdd={submitAdd}
                    submitEdit={submitEdit}

                    addMember={addMember}
                    editMember={editMember}
                />
            </div>
            }            
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
            member={member}
            setFilterMember={setFilterMember}
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
                onClick={e=> {setFilterMember(member)} }
            />

            <FaFilter className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=>{ 
                    //console.log(addEmployee)
                    //setInputState({...blankMember,...addMember}) 
                    //refreshFile()
                    //setIsAdd(true)
                    setTimeout(()=>{
                        refOpenModalFilter.current.click()
                        
                    },200)
                } }
            />

            <FaPlusCircle className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=>{ 
                    //console.log(addEmployee)
                    setInputState({...blankMember,...addMember}) 
                    //refreshFile()
                    setIsAdd(true)
                    setTimeout(()=>{
                        refOpenModalAdd .current.click()
                        
                    },200)
                } }
            />
            <FaEdit className="mx-5" 
                style={{fontSize:'2.5rem',color:"white",visibility:editMember.memberId>0?"visible":"hidden"}}
                onClick={e=>{
                    setInputState({...blankMember,...editMember})
                    //refreshFile()
                    setIsAdd(false)
                    setTimeout(()=>{
                        refOpenModalEdit.current.click()
                        
                    },200)        
                }}
            />
            <DeleteForeverIcon className="mx-5"  
                style={{fontSize:'2.5rem',color:"white",visibility:editMember.memberId>0?"visible":"hidden"}}
                onClick={e=>{ 
                    deleteMember();
                }}
            />
        </div>
    )
} 
//=============================================
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
const renderMember=()=>(
    <div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
        <div style={{textAlign:"center"}}>
            <h1>ทดสอบ</h1>
            {
            renderErrorModal()
            }    
            {
            renderList()
            }
            {
            renderBadge()
            }
            {
            renderModalForm()
            }
            {
            renderModalFilterForm()
            }
        </div>
    </div>
    )
//=========================================
const renderFault=()=>{
    return(
        <div style={{width:"100%",height:"100%",
                     display:"flex",justifyContent:"center",alignItems:"center",}}>
            <div style={{textAlign:"center"}}>
                
                <h4>ถ้าข้อมูลไม่แสดง  </h4>
                <button className="text-center btn btn-primary btn-lg"
                    onClick={e=>setReloadMember(true)}
                >กดเพื่อรีโหลดข้อมูล</button>
            </div>
        </div>
    )
}

//============================================

    return (
       filterMember
        ?renderMember()
        :renderFault()
    )
}
