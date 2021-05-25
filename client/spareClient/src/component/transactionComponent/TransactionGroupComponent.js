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

const {transactionGroupForm}=FormTemplate      
const {transactionGroupState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil

function TransactionGroupComponent({selectGroup,setSelectGroup}) {
    const {basicData,setBasicData,
     
    }=React.useContext(MainContext)

    const [showModalConfirm,setShowModalConfirm]=React.useState(false)
    //=========================

    const [showAdd,setShowAdd]=React.useState(false)
    const [showEdit,setShowEdit]=React.useState(false)

    //====================================
    const [reloadGroup,setReloadGroup] = React.useState(true);
    //====================================
    const blankData=genBlankState({template:transactionGroupState}).state
    //=====================    

    const [groupTree,setGroupTree]=React.useState(null)
    const [tempObj,setTempObj]=React.useState([])
    let [selectGroupObject,setSelectGroupObject]=React.useState(blankData)
    let [allDeleteId,setAllDeleteId]=React.useState([])

    React.useEffect(()=>{
      //console.log('tempObj')
      //console.log(tempObj)
    },[tempObj])

    //======================
    React.useEffect(()=>{
      console.log('selectGroupObject')
      console.log(selectGroupObject)

      setSelectGroup({
        id:selectGroupObject.id,
        groupName:selectGroupObject.groupName,
        effectStock:selectGroupObject.effectStock,
        effectOrder:selectGroupObject.effectOrder,
        transactionType:selectGroupObject.transactionType,
      })

      if(selectGroupObject.id>0){
        const tempAllDeleteId=findAllChildrenId(selectGroupObject.id,selectGroupObject)
        setAllDeleteId(tempAllDeleteId)
      }

    },[selectGroupObject])
    //=====================

    React.useEffect(()=>{
        if(groupTree){
            setTempObj(convertToObject(groupTree,transactionGroupState))
        }
    },[groupTree])

    //=====================
    const [filterData,setFilterData]=React.useState([blankData])

    React.useEffect(()=>{
        //console.log('filterData')
        //console.log(filterData)
    },[filterData])

    React.useEffect(()=>{
        if(reloadGroup){
          axios.post('/transactiongroup/getcustom',
            {},
            {headers: {'Content-Type': 'application/json',
                'Shopauthorization':localStorage.getItem('shopauthorization'),
                'Userauthorization':localStorage.getItem('userauthorization')
            }}
          )
          .then(result=>{

            setReloadGroup(false)
            setFilterData(result.data)
            const groupTree=createGroupTree(result.data)

            //console.log('groupTree')
            //console.log(groupTree)
            //setFilterData(testData)
            //const groupTree=createGroupTree(testData)
            setGroupTree(groupTree)
            setTempObj(convertToObject(groupTree,transactionGroupState))
            setSelectGroupObject(blankData)
          })
          .catch(err=>{
            setReloadGroup(false)
          })
        }
    },[reloadGroup])
//=============
//=============
const actionAfterSuccess=()=>{
  setReloadGroup(true)
}
//=============

//==============================

//Add Form  
  
const param1={
  isAddForm:false,
  lb:'เพิ่มประเภทเอกสารใหม่',
  formTemplate:transactionGroupForm,
  stateTemplate:transactionGroupState,
  
  selectData:{basicData},
  loadData:{parentId:selectGroupObject.id},
  show:showAdd,
  setShow:setShowAdd,
  url:'/transactiongroup/addcustom',
  //submitOption:0,
  //mainInputState:basicData,
  
  keyName:null,
  iconAction:null,
  actionAfterSuccess:actionAfterSuccess,//
  useGenFD:false
}


//=============

//edit Form
//Edit Form

//blankData genไว้แล้ว line 34
//[editData,setEditData] สร้างไว้แล้ว line 45

let param2={
  isAddForm:false,
  lb:'แก้ไขประเภทเอกสาร',
  formTemplate:transactionGroupForm,
  stateTemplate:transactionGroupState,

  selectData:{basicData},
  loadData:selectGroupObject,
  setLoadData:setSelectGroupObject,
  show:showEdit,
  setShow:setShowEdit,
  url:'/transactiongroup/updatecustom',
  //submitOption:0,
  //mainInputState:basicData,
  
  keyName:null,
  iconAction:null,
  actionAfterSuccess:actionAfterSuccess,//
  useGenFD:false

}

//=============
//=============

    return (
  <div className="h-100 w-100">
  
      <div className="flex-center-center"
           style={{height:"5%"}}
      >
        <h4>ประเภทเอกสาร</h4>
      </div> 
      
      <div className="w-100" style={{height:"95%"}}>

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
        url={'/transactiongroup/deletecustom'}
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

export default TransactionGroupComponent;
