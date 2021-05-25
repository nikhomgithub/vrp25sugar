import React from 'react';

import $ from 'jquery';
import {FaRegFolderOpen, FaRegFolder,FaFolderPlus,FaFolder,FaFolderOpen} from 'react-icons/fa';

import {MdRefresh,MdEdit,MdAddCircle,MdDelete} from 'react-icons/md';

import './Tree.css'
import renderModalTreeEdit from './renderModalTreeEdit';

const renderTreeWithState=({
            arrs,
            selectGroupObject,setSelectGroupObject,
            groupTree,setGroupTree,
            setShowAdd,setShowEdit,setShowModalConfirm ,
            //selectGroupId,setSelectGroupId,
            blankData
          })=>{    
    //console.log('blankData');console.log(blankData)
    //console.log('groupTree');console.log(groupTree)
    //console.log('arrs');console.log(arrs)


    const changeKeyInData=({data,setData,id,key,value})=>{
        let tempData=[]
        data.map(i=>{
            if (i.id==id){
                tempData=[...tempData,{...i,[key]:value}]
            }else{
                tempData=[...tempData,i]
            }
        })
        setData([...tempData])
    }   

    //================================
    const renderSubFolder = (subArrs) =>{
      
      return ( subArrs.map((i,index)=> {
        //console.log('renderSubFolder')
        //console.log(i)
        return(  
        <div key={index} className="Tree-box">    
                {
                i.open    
                ?<div>
                    <FaFolderOpen 
                        className="Tree-open-icon"
                        style={{display:'inline'}}
                        onClick={e=>{                //ถ้าคลิกรูปไอคอน folder เปิดนี้            
                            changeKeyInData({
                                data:groupTree,
                                setData:setGroupTree,
                                id:i.id,
                                key:"open",
                                value:false
                            })
                        }}
                    />
                
                    <p id={i.groupName}
                        onClick={e=>{
                            //console.log(`selectGroupObjct : ${selectGroupObject}`)
                            //console.log(`selectGroupId : ${selectGroupId}`)
                            setSelectGroupObject(i)
                        }}
                        className="Tree-p"
                        style={{color:selectGroupObject.id==i.id?'red':'black',
                                fontSize:i.groupName=="main"?"1.5rem":null
                               }}
                    >{`${i.id}.${i.groupName}`}
                    </p>
                    
                    <div >
                        {
                        renderSubFolder(i.folders)
                        }    
                    </div>
                </div>
                :<div>
                    
                    {i.children.length>0
                    ?<FaFolderPlus 
                        className="Tree-close-icon"
                        style={{display:'inline'}} 
                        onClick={e=>{                 //ถ้าคลิกรูปไอคอน folder ปิดนี้       
                            changeKeyInData({
                                data:groupTree,
                                setData:setGroupTree,
                                id:i.id,
                                key:"open",
                                value:true
                            })
                        }}
                    />
                    :<FaFolder
                        className="Tree-close-icon"
                        style={{display:'inline'}} 
                        onClick={e=>{                 //ถ้าคลิกรูปไอคอน folder ปิดนี้       
                            changeKeyInData({
                                data:groupTree,
                                setData:setGroupTree,
                                id:i.id,
                                key:"open",
                                value:true
                            })
                        }}
                    /> 
                    }

                    <p id={i.groupName}
                        onClick={e=>{
                          //console.log(`selectGroupObjct : ${selectGroupObject}`)
                          setSelectGroupObject(i)
                        }}
                        className="Tree-p"
                        style={{color:selectGroupObject.id==i.id?'red':'black',
                                fontSize:i.groupName=="main"?"1.5rem":null
                               }}
                    >{`${i.id}.${i.groupName}`}
                    </p>
                </div>
            }
  
        </div>
        )}
      ))
    }
  
    //==============================
    if(arrs){if(arrs.length>0){
      //<div style={{position:'absolute',top:"0.5rem",right:"0.5rem",zIndex:'2'}}>
        return(
          <div className="h-100 w-100" style={{position:"relative"}}>
            <div className="h-10">
              <MdRefresh className="lg-icon" onClick={e=>{
                //setSelectGroupId(null)
                setSelectGroupObject(blankData)
              }}
              />
              {selectGroupObject.id>0
                ?<MdAddCircle className="lg-icon" onClick={e=>{setShowAdd(true)}}/>
                :null
              }
              {selectGroupObject.id>1
                ?<MdEdit className="lg-icon"  onClick={e=>{setShowEdit(true)}} />
                :null
              }
              {selectGroupObject.id>1
                ?<MdDelete className="lg-icon" onClick={e=>{setShowModalConfirm(true)}}/>
                :null
              }
            </div>
            <div className="w-100 h-90"
                 style={{overflowY:"scroll",overflowX:"scroll",}}
            >
              {renderSubFolder(arrs)}
            </div>
          </div>
        )
    }} 
  }


const renderTree={renderTreeWithState}

export default renderTree
