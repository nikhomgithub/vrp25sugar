import React from 'react';
import axios from 'axios';

import treeUtil from '../../render/renderTree/treeUtil'
import renderTree from '../../render/renderTree/renderTree'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'

import StateUtil from '../../model/StateUtil'

import ModalForm from '../../render/renderForm/ModalForm'
//==================
import ModalConfirm from '../../render/ModalConfirm'
import {MainContext} from '../../context/MainContext'


const {convertToObject,createGroupTree,findAllChildrenId}=treeUtil
const {renderTreeWithState}=renderTree

//const {groupForm}=FormTemplate      
//const {groupState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil

function GroupComponent({
      selectGroup,setSelectGroup,
      groupForm,groupState,
      lb,routeName,keyArray
}) {
    const {basicData,setBasicData,
          }=React.useContext(MainContext)

    const [showModalConfirm,setShowModalConfirm]=React.useState(false)
    //=========================
    
    const [showAdd,setShowAdd]=React.useState(false)
    const [showEdit,setShowEdit]=React.useState(false)
    
    //====================================
    const [reloadGroup,setReloadGroup] = React.useState(true);
    //====================================
    const blankData=genBlankState({template:groupState}).state
    //=====================    
    const [groupTree,setGroupTree]=React.useState(null)
    const [tempObj,setTempObj]=React.useState([])
    let [selectGroupObject,setSelectGroupObject]=React.useState(blankData)
    let [allDeleteId,setAllDeleteId]=React.useState([])

    const genSelectGroup=(keyArray)=>{
      let temp={}

      keyArray.map(i=>{
        temp={...temp,[i]:selectGroupObject[i]}
      })

      return temp
    }

    React.useEffect(()=>{

      setSelectGroup(genSelectGroup(keyArray))
      //setSelectGroup({ id:selectGroupObject.id, groupName:selectGroupObject.groupName})

      if(selectGroupObject[keyArray[0]]>0){
        const tempAllDeleteId=findAllChildrenId(selectGroupObject[keyArray[0]],selectGroupObject)
        setAllDeleteId(tempAllDeleteId)
      }

    },[selectGroupObject])

    React.useEffect(()=>{
        //console.log('tempObj')
        //console.log(tempObj[0])
    },[tempObj])

    React.useEffect(()=>{

        if(groupTree){
            setTempObj(convertToObject(groupTree,groupState))
        }
    },[groupTree])

    React.useEffect(()=>{
      //console.log('allDeleteId')
      //console.log(allDeleteId)
    },[allDeleteId])

    //=====================
    
    const [loadData,setLoadData]=React.useState(null)

    React.useEffect(()=>{

        if(loadData){
          const tempGroupTree=createGroupTree({
                                  group:loadData,
                                  prevGroupTree:groupTree})
          setGroupTree(tempGroupTree)
          setTempObj(convertToObject(tempGroupTree,groupState))
          setSelectGroupObject(blankData)
        }
        
    },[loadData])
  
    React.useEffect(()=>{
        if(reloadGroup){
          axios.post(`/${routeName}/getcustom`,
            {},
            {headers: {'Content-Type': 'application/json',
                'Shopauthorization':localStorage.getItem('shopauthorization'),
                'Userauthorization':localStorage.getItem('userauthorization')
            }}
          )
          .then(result=>{

            setReloadGroup(false)
            setLoadData(result.data)

          })
          .catch(err=>{
            setReloadGroup(false)
          })
        }
    },[reloadGroup])
//=============
const actionAfterSuccess=()=>{
  setReloadGroup(true)
}


//==============================

//Add Form  
  
  const param1={
    isAddForm:false,
    lb:`เพิ่ม${lb}`,
    formTemplate:groupForm,
    stateTemplate:groupState,
    
    selectData:{basicData},
    loadData:{parentId:selectGroupObject[keyArray[0]]},
    show:showAdd,
    setShow:setShowAdd,
    url:`/${routeName}/addcustom`,
    //submitOption:0,
    //mainInputState:basicData,
    
    keyName:null,
    iconAction:null,
    actionAfterSuccess:actionAfterSuccess,//
    useGenFD:false,
  
  }


//=============

//edit Form
//Edit Form

//blankData genไว้แล้ว line 34
//[editData,setEditData] สร้างไว้แล้ว line 45


  
  let param2={
    isAddForm:false,
    lb:`แก้ไข${lb}`,
    formTemplate:groupForm,
    stateTemplate:groupState,

    selectData:{basicData},
    loadData:selectGroupObject,
    setLoadData:setSelectGroupObject,
    show:showEdit,
    setShow:setShowEdit,
    url:`/${routeName}/updatecustom`,
    //submitOption:0,
    //mainInputState:basicData,
    
    keyName:null,
    iconAction:null,
    actionAfterSuccess:actionAfterSuccess,//
    useGenFD:false,
  

  }

//=============
/*

*/
//<div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",overflow:"auto"}}>

return (
  <div className="h-100 w-100">
      <div className="flex-center-center"
           style={{height:"5%"}}
      >
        <h5>{lb}</h5>
      </div>
      <div className="w-100"
           style={{height:"95%"}}
      >
        {
      
        tempObj  
        ?renderTreeWithState({
          arrs:tempObj,
          selectGroupObject,setSelectGroupObject,
          groupTree,setGroupTree,
          setShowAdd,
          setShowEdit,
          setShowModalConfirm,
          blankData
        })
        :null
        
      }
      </div>
    
    {showAdd?<ModalForm param={param1}/>:null}
    {showEdit?<ModalForm param={param2}/>:null}

    { showModalConfirm
      ?<ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={`/${routeName}/deletecustom`}
        //editData:{id:1000},
        editData={{...selectGroupObject,allDeleteId}}
        setReload={setReloadGroup}
        submitOption={0}
        actionAfterSuccess={actionAfterSuccess}
    />
    :null
    } 

  </div>
  );
}

export default GroupComponent;
