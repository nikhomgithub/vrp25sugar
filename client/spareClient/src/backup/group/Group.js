import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';

import GroupModalForm from './GroupModalForm'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import {FaEdit,FaPlusCircle,FaFilter} from 'react-icons/fa';
import RefreshIcon from '@material-ui/icons/Refresh';


import { FaRegFolderOpen, FaRegFolder,FaFolderPlus,FaRegCircle,
         FaFolderMinus,FaMinusCircle} from 'react-icons/fa';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {MainContext} from '../context/MainContext';

export default function Group() {

const {
    blankGroup,
    group,setGroup,setReloadGroup,
    addGroup,setAddGroup,
    editGroup,setEditGroup,

    groupObject,
    selectGroupObject,setSelectGroupObject
}=React.useContext(MainContext)

const refOpenModalForm = React.useRef()

//===========================================
/*
const deleteGroup=()=>{
    
    let updateParentGroup={}
    let tempGroup=[]

    for(let i=0;i<group.length;i++){

        //update Parent Group
        if(group[i].groupId==selectGroupObject.fParent){
            updateParentGroup=group[i]
            let tempSubGroup=[]
            group[i].subGroup.map(j=>{
                if(j!=selectGroupObject.fId){
                    tempSubGroup=[...tempSubGroup,j]
                }
            })
            updateParentGroup={...updateParentGroup,subGroup:tempSubGroup}
            
            tempGroup=[...tempGroup,updateParentGroup]
            //break;
        } else {
            if(group[i].groupId!=selectGroupObject.fId){              
                tempGroup=[...tempGroup,group[i]]
            }
            
        }
    }
*/
const deleteGroup=()=>{
    let tempGroup=[]
    let updateParentGroup={}
    let deleteArray=[selectGroupObject.fId]
    //let deleteArrayInMongo=[selectGroupObject.fId]
    //let tempDeleteArray=[selectGroupObject.fId]

    for(let i=0;i<group.length;i++){
        //console.log(`groupId : ${group[i].groupId}`)
        let tempDeleteArray=[]
        //แก้ไข Parent
        if(group[i].groupId==selectGroupObject.fParent){
            //console.log("parent")
            updateParentGroup=group[i]

            let tempSubGroup=[]
            
            group[i].subGroup.map(j=>{
                if(j!=selectGroupObject.fId){
                    tempSubGroup=[...tempSubGroup,j]
                }
            })
            updateParentGroup={...updateParentGroup,subGroup:tempSubGroup}
            
            tempGroup=[...tempGroup,updateParentGroup]
        }
        // ลบ ตัวมัน,ลูก,หลาน,เหลน,โหลน... 
        else{

            for(let j=0;j<deleteArray.length;j++){
                
                if(group[i].groupId==deleteArray[j]){
                    //tempDeleteArray=[...tempDeleteArray,...group[i].subGroup]
                    tempDeleteArray=[...tempDeleteArray,...group[i].subGroup]
                    //console.log('found ')
                    break;
                }
                
                if(j==deleteArray.length-1){
                    //console.log('not Found')
                    tempGroup=[...tempGroup,group[i]]
                }        
            }
            deleteArray=[...deleteArray,...tempDeleteArray]
            //deleteArrayInMongo=[...deleteArrayInMongo,...tempDeleteArray]
        }
    }

    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/group/deleteparent',{groupId:deleteArray,updateParentGroup},config)
    //.post('/group/delete',{groupId:selectGroupObject.fId,updateParentGroup},config)
    .then(result=>{
        //console.log('delete result')
        //console.log(result)
        setGroup([...tempGroup])
        setEditGroup(blankGroup)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
 
}
//============================================

const renderFolder=(arrs)=>{

    if(arrs){if(arrs.length>0){

        return arrs.map((i,index)=>{
            return(
            <div key={index} style={{marginLeft:`3rem`,marginTop:'1rem',position:'relative'}} >  
                
                <FaRegFolder 
                    style={{fontSize:'2.6rem',
                            display:'inline',
                            marginTop:'-1.2rem',
                            marginRight:'1rem'
                        }} 
                    onClick={e=>{                 //ถ้าคลิกรูปไอคอน folder ปิดนี้
        $(e.currentTarget).css({'display':'none'})//ไม่แสดง folder ปิด
        $(e.currentTarget).nextAll().css({'display':'inline'}) //แสดงตัวถัดไป     
                    }}
                />
                
                <FaRegFolderOpen 
                    style={{fontSize:'3rem',
                            display:'none',
                            marginTop:'-1.2rem',
                            marginRight:'1rem'
                          }} 
                    onClick={e=>{                //ถ้าคลิกรูปไอคอน folder เปิดนี้
        $(e.currentTarget).css({'display':'none'}) //ไม่แสดง folder เปิด นี้
        $(e.currentTarget).prev().css({'display':'inline'}) //แสดง folder(ปิด)ก่อนหน้า 
        $(e.currentTarget).siblings('h3').css({'display':'inline'}) // แสดง น้อง ที่เป็น h3        
        $(e.currentTarget).siblings('div').css({'display':'none'}) // ไม่แสดง 
                    }}
                />
                <h3 id={i.fName}
                    onClick={e=>{
                        setSelectGroupObject(i)
                    }}
                    style={
                    
                        (selectGroupObject.fId==i.fId)
                        ?{display:'inline',color:'red',whiteSpace:'nowrap',
                          position:'absolute',left:'3.2rem',top:'-0.7rem'}
                        :{display:'inline',color:'black',whiteSpace:'nowrap',
                          position:'absolute',left:'3.2rem',top:'-0.7rem'}
                    
                    }>{i.fName}</h3>
                <div style={{display:'none'}}>
                    {
                    renderFolder(i.folders)
                    }
                    
                </div>
            </div>
            )
        })
    }}
}

//=============================================

const submitAdd=()=>{
    //
    //เพิ่ม subGroup ในตัวแม่คือ editGroup มาอีกอันคือ จาก inputState.groupId
    const tempSubGroup=[...editGroup.subGroup,inputState.groupId]

    //สร้าง ตัวแม่ใหม่ คือ editGroup แก้ไขใส่วน subGroup ข้างต้น
    const updateParentGroup={...editGroup,subGroup:tempSubGroup}
    
    //console.log('updateParentGroup')
    //console.log( updateParentGroup)
    
    const newChildGroup=inputState
    //ทำการส่งข้อมูลไปให้ Server 
    
    //เอา group มา map เพื่อสร้าง tempGroup เพื่อหา parent แล้ว update parent

    let tempGroup=[]
    group.map(i=>{
        if(i.groupId==updateParentGroup.groupId){
            tempGroup=[...tempGroup,updateParentGroup]
        }
        else{
            tempGroup=[...tempGroup,i]
        }
    })
    //เพิ่ม new group เข้าไป ต่อท้าย tempGroup
    tempGroup=[...tempGroup,newChildGroup]

    //console.log('tempGroup')
    //console.log(tempGroup)
    
    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/group/addchild',{newChildGroup,updateParentGroup},config)
    //.post('/group/delete',{groupId:selectGroupObject.fId,updateParentGroup},config)
    .then(result=>{
        //console.log('delete result')
        //console.log(result)
        setGroup([...tempGroup])
        setEditGroup(blankGroup)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
    
}

const submitEdit=()=>{
    //แก้ไขเฉพาะ editGroup
    let tempGroup=[]
    group.map(i=>{
        if(i.groupId==inputState.groupId){
            tempGroup=[...tempGroup,inputState]
        }
        else{
            tempGroup=[...tempGroup,i]
        }
    })

    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/group/update',inputState,config)
    //.post('/group/delete',{groupId:selectGroupObject.fId,updateParentGroup},config)
    .then(result=>{
        //console.log('delete result')
        //console.log(result)
        setGroup([...tempGroup])
        setEditGroup(inputState)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
}

const [isAdd,setIsAdd]=React.useState(true)
const [jumpInput,setJumpInput]=React.useState(false)


let [inputState,setInputState]=React.useState(blankGroup)

React.useEffect(()=>{
    //console.log('inputState')
    //console.log(inputState)
},[inputState])

const changeInputState=(e)=>{
    setInputState({...inputState,[e.target.name]:e.target.value})
    
}

const renderModalForm=()=>{
    return(
        <div>
            < button className="d-none" 
              data-toggle="modal" data-target="#modalGroup"
              ref={refOpenModalForm}          
              onClick={e=>{
                setJumpInput(true)
              }}
            />               
        
            <GroupModalForm
        
                modalId={`modalGroup`}
                isAdd={isAdd}
                
                jumpInput={jumpInput}
                setJumpInput={setJumpInput}

                inputState={inputState}
                setInputState={setInputState}

                changeInputState={changeInputState}

                submitAdd={submitAdd}
                submitEdit={submitEdit}

                addGroup={addGroup}
                editGroup={editGroup}
            
            />
        </div>
    )
}


//=============================================

const renderBadge=()=>{
    return(
        <div className="badge badge-pill badge-info" 
        style={{width:'100%'}}>   
   
            <FaFolderPlus className="mx-3"   
            style={
                (selectGroupObject.fId>0)
                ?{visibility:'visible',fontSize:"2.5rem"}
                :{visibility:'hidden',fontSize:"2.5rem"}
            }
            data-toggle="modal" data-target="#add-folder"
            onClick={e=>{
                setIsAdd(true)
                setInputState(addGroup)
                setTimeout(()=>{
                    refOpenModalForm.current.click()
                },200)
            }}

            />
            
            <FaFolderMinus className="mx-3" 
            style={
                (selectGroupObject.fId>1)
                ?{visibility:'visible',fontSize:"2.5rem"}
                :{visibility:'hidden',fontSize:"2.5rem"}
            }
            onClick={e=>{ 
                deleteGroup()
            }}   
            />
        
            <FaEdit className="mx-3"
            style={
                    (selectGroupObject.fId>1)
                    ?{visibility:'visible',fontSize:"2.5rem"}
                    :{visibility:'hidden',fontSize:"2.5rem"}
                }
            data-toggle="modal" data-target="#edit-folder"
            onClick={e=>{
                setIsAdd(false)
                setInputState(editGroup)
                setTimeout(()=>{
                    refOpenModalForm.current.click()
                },200)
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
const renderGroup=()=>(
<div style={{width:"100%",height:"100%",marginTop:"0rem",background:"lightGray",position:"relative",overflow:"auto"}}>
    <div style={{textAlign:"center"}}>
        <h3>กลุ่มสินค้า</h3>
        {renderBadge()}
        {renderModalForm()}
    
        {renderErrorModal()}    
    </div>
    <div  style={{textAlign:"left",marginBottom:'7rem'}}>
        {renderFolder(groupObject)}
    </div>
   
</div>
)
//-------------------------------------------
const renderFault=()=>{
    return(
        <div style={{width:"50%",height:"80%",marginTop:"5rem",background:"lightGray",
                     display:"flex",justifyContent:"center",alignItems:"center",}}>
            <div style={{textAlign:"center"}}>
                <h4>ถ้าข้อมูลไม่แสดง  </h4>
                <button className="text-center btn btn-primary btn-lg"
                    onClick={e=>{
                        setReloadGroup(true)
                    }}
                >กดเพื่อรีโหลดข้อมูล</button>
            </div>
        </div>
    )
}
//============================================
const renderMain=()=>{
   return(
    group
    ?renderGroup()
    :renderFault()
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================
    return (
        //(username&&level=="admin")
        true
        ?renderMain()
        :redirectTo()
    )
}
