import React from 'react';
//================
import Table from  '../table/Table'
import renderTableRangeBar from '../table/renderTableRangeBar'

//==========
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
//==========
import renderBadge from '../../render/renderBadge/renderBadge'
//==========
import {MainContext} from '../../context/MainContext'
//==========
import GroupComponent from './GroupComponent'
import DetailComponent from './DetailComponent'
import GraphComponent from './GraphComponent'
import ModalDataComponent from './ModalDataComponent'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'
import formUtil from '../../render/renderForm/formUtil'
import StateUtil from '../../model/StateUtil'

import ModalComponent from '../../render/ModalComponent'

//====================
//====================
import ModalConfirm from '../../render/ModalConfirm'
import { TrainRounded, TrendingUpRounded } from '@material-ui/icons';
import { FaDoorClosed } from 'react-icons/fa';
import { rgbToHex } from '@material-ui/core';
//==================
//=================

//const {productFilter}=FilterTemplate  
//const {productForm,groupForm}=FormTemplate      
//const {productState,groupState}=StateTemplate


const {convertFormTemplateToTableTemplate}=formUtil

//==================
function DataComponent({
                lb,
                inRouteName,
                colorHead,
                totalSwapPage,

                inState,
                inFilter,
                inForm,
                inKeyPhoto,
                inIconAction,

                inLimitRow,             
                inInputState,
                inTableTemplate,
                inDetailTableTemplate,

                inGroupState,
                inGroupForm,
                inRouteGroupName,
                inKeyArray,

                iconActionData,
                iconActionDataDetail,

                selectDataOut,setSelectDataOut,
                canChangeData,calculation,
                graphTableTemplate,
}) {

//================================

const { basicData }=React.useContext(MainContext)
const {convertFitlerDataToGraphData}=StateUtil
   
console.log('DataComponent')

//================================
  const [selectGroup,setSelectGroup]=React.useState(null)

  React.useEffect(()=>{
    //console.log('selectGroup')
    //console.log(selectGroup)
  },[selectGroup])

//================================
  
  const [showModalConfirm,setShowModalConfirm]=React.useState(false)

  const [showModalDataInComponent,setShowModalDataInComponent]=React.useState(false)

  const [showTableSetting,setShowTableSetting]=React.useState(false)
  const [showFilter,setShowFilter]=React.useState(false)
  const [showAdd,setShowAdd]=React.useState(false)
  const [showEdit,setShowEdit]=React.useState(false)
  const [reloadData,setReloadData]=React.useState(true)

  //====================================
  let [editData,setEditData]=React.useState(null)
  let [pageNumber,setPageNumber]=React.useState(1)
  let [count,setCount]=React.useState(0)
  let [lastRecordId,setLastRecordId]=React.useState(0)
  let [filterOption,setFilterOption]=React.useState(0)
  //let [limitRow,setLimitRow]=React.useState(10)
  let [swapState,setSwapState]=React.useState(0)
  let [badgeLayoutOption,setBadgeLayoutOption]=React.useState(0)
  let [qry,setQry]=React.useState(null)
  //===============================

  //let [iconActionData,setIconActionData]=React.useState(null)
  //let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)
  
  //===============================
  //Clear =========================
  //For renderTableRangeBar
  const [showRange,setShowRange]=React.useState(true)
  const [widthLeft,setWidthLeft]=React.useState(30)
  //===============================

  let [filterData,setFilterData]=React.useState(null)
  let [editDataForDetail,setEditDataForDetail]=React.useState(null)

  
  //==============================
  React.useEffect(()=>{
    console.log("filterData")
    console.log(filterData)

    if(filterData&&editData){
      filterData.map(i=>{
          if(i.id==editData.id){
              setEditData(i)
          }
      })
    }
    

    
    setGraphData(
      convertFitlerDataToGraphData({
        template:inState,
        filterData,
        inputState,
        totalSwapPage
      })
    )
      
  },[filterData])

  React.useEffect(()=>{
    //console.log('lastRecordId')
    //console.log(lastRecordId)
  },[lastRecordId])

  //===============================
  React.useEffect(()=>{
    //console.log('editData')
    //console.log(editData)
    if(editData){
      if(editData.detail){
        setEditDataForDetail(editData)
      }
      setSelectDataOut(editData)
    }

    if(canChangeData){
      if(editData){
        setBadgeState({...badgeState,
            editShow:true,delShow:true})
      }
      else{
        setBadgeState({...badgeState,
            editShow:false,delShow:false})
      }
    }
  
  },[editData])     
  //==================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:true,
    reloadShow:true,
    settingShow:true,
    filterShow:true,
    addShow:canChangeData?true:false, //addShow:false
    editShow:false,
    delShow:false,
    printerShow:true,
  })
  //====================================
  
  React.useEffect(()=>{
    if(selectGroup){
      if(selectGroup.id>0){
        setQry({groupId:selectGroup.id})
        setPageNumber(1)
        setFilterOption(3)
        setReloadData(true)
      }
    }

    /*
    if(canChangeData){

        if(selectGroup){
          if(selectGroup.id){
            setBadgeState({...badgeState,
              addShow:true})
          }
          else {
            setBadgeState({...badgeState,
              addShow:false})
          }
        }
        else{
          setBadgeState({...badgeState,
              addShow:false})
        }

    }
    */
  },[selectGroup])
  
  //===========================
  const [tableTemplate,setTableTemplate]=React.useState(inTableTemplate)
  const [inputState,setInputState]=React.useState(inInputState)
  const [limitRow,setLimitRow]=React.useState(inLimitRow)
  //===========================  
//=============================

let [graphData,setGraphData]=React.useState(null)
//{noDetail,wiDetail,allDetail}
React.useEffect(()=>{
  //console.log('graphData')
  //console.log(graphData)
},[graphData])

//=======================

  
//===================

const actionAfterSuccess=()=>{
  setReloadData(true)
}
//===================
const genUseGenFD=()=>{
  let temp=false
  if(inKeyPhoto){
    if(inKeyPhoto.length>0){
      temp=true
    }
  }
  return temp
}

const genLoadData=()=>{
  let temp=null  
  if(selectGroup){
    const {id,...remaining}=selectGroup
    
    temp={groupId:id,...remaining}
  }
  return temp
}
//===================
let param1={
  isAddForm:true,
  lb:`เพิ่ม${lb[0]}`,
  formTemplate:inForm,
  stateTemplate:inState,
  
  selectData:{basicData},
  loadData:null,//genLoadData()
  show:showAdd,
  setShow:setShowAdd,
  url:`/${inRouteName}/addcustom`,

  keyName:inKeyPhoto,
  //submitOption:0,
  iconAction:inIconAction, 
  iconActionData,
  iconActionDataDetail,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:genUseGenFD(),
  lastRecordId,
  genAutoId:true,
  calculation,
  detailTableTemplate:inDetailTableTemplate

}

let param2={
  isAddForm:false,
  lb:`แก้ไข${lb[0]}`,
  formTemplate:inForm,
  stateTemplate:inState,
  
  selectData:{basicData},
  loadData:editData,
  show:showEdit,
  setShow:setShowEdit,
  url:`/${inRouteName}/updatecustom`,

  keyName:inKeyPhoto,
  //submitOption:0,
  iconAction:inIconAction, 
  iconActionData,
  iconActionDataDetail,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD: genUseGenFD(),
  lastRecordId,
  genAutoId:false,
  calculation,
  detailTableTemplate:inDetailTableTemplate

}

//==================================


//------------------------------
const renderTable=()=>{
  return(
    <div className="w-100 h-100">
        <div style={{height:"5%"}}>                
            <h5 style={{textAlign:"center"}}>{lb[0]}</h5>
        </div>
        
        <div className="w-100" style={{height:`95%`}}>
            
            <Table
              colorHead={colorHead}

              filterData={filterData} setFilterData={setFilterData}     

              stateTemplate={inState}
              filterTemplate={inFilter}

              tableTemplate={tableTemplate} setTableTemplate={setTableTemplate}
              editData={editData} setEditData={setEditData}

              inputState={inputState} setInputState={setInputState}
              pageNumber={pageNumber} setPageNumber={setPageNumber}
              setCount={setCount} setLastRecordId={setLastRecordId}
              url={`/${inRouteName}/getlimit`} //out
              reloadData={reloadData} setReloadData={setReloadData}
              limitRow={limitRow} setLimitRow={setLimitRow}

              showFilter={showFilter} setShowFilter={setShowFilter}
              filterOption={filterOption} setFilterOption={setFilterOption}

              showTableSetting={showTableSetting} 
              setShowTableSetting={setShowTableSetting}

              titleFilter={`ค้นหา${lb[0]}`}

              qry={qry}
              
            />       

        </div>
    </div>

  )
}
//=============================
const renderSubTable=()=>{
  
}

//------------------------------
const renderGroupAndDataComponent=()=>{
  
  const returnPage0=()=>{
    return (
      <div className="flex-center-stretch w-100 h-100 " style={{overflow:"hidden"}}>
          {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
  
          <div className="h-100 bd-black" 
              style={{paddingTop:"0.5rem",width:`${widthLeft}%`}}>
                {
                <GroupComponent 
                  selectGroup={selectGroup} setSelectGroup={setSelectGroup}
                  groupState={inGroupState} groupForm={inGroupForm}
                  lb={lb[1]} routeName={inRouteGroupName}
                  keyArray={inKeyArray}
                />
                }
          </div>
  
          <div className="h-100 bd-black" 
              style={{width:`${100-widthLeft}%`}}>                      
                {
                  renderTable()
                }
          </div>
      
      </div>  
      )
  }

  const returnPage1=()=>{
    return(
      <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
        <div className="h-100 bd-black" style={{width:`${widthLeft}%`}}>
            {
              renderTable()
            }
        </div>

        <div className="h-100 bd-black" 
            style={{paddingTop:"0.5rem",
                    width:`${100-widthLeft}%`}}>
              
              {
              selectDataOut
              ?<DetailComponent 
                    lb={lb[2]}
                    colorHead={colorHead}
                    selectDataIn={editDataForDetail} 
                    setSelectDataIn={setEditDataForDetail}
                    detailTableTemplate={inDetailTableTemplate}
              />
              :null
              }

        </div>
  
      </div>  
    )

  }

  const returnPage2=()=>{


    return(
      <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
        <div className="h-100 bd-black" style={{width:`${widthLeft}%`}}>
            <GraphComponent
              lb={lb[3]}
              colorHead={["#BAA6B1","#B26697"]}
              selectDataIn={graphData.noDetail} 
              setSelectDataIn={()=>{}}
              graphTableTemplate={graphTableTemplate[0]}
              showRange={showRange}
              barColor={"#FAA765"}
            />
        </div>

        <div className="h-100 bd-black" 
            style={{paddingTop:"0.5rem",
                    width:`${100-widthLeft}%`}}>
              
              <GraphComponent
                lb={lb[4]}
                colorHead={["#B26697","#BAA6B1"]}
                selectDataIn={graphData.wiDetail} 
                setSelectDataIn={()=>{}}
                graphTableTemplate={graphTableTemplate[1]}
                showRange={showRange}
                barColor={"rgba(75,192,192,1)"}
              />

        </div>
  
      </div>  
    )
  }  
    if(swapState==0){ return returnPage0() }  
    if(swapState==1){ return returnPage1() }
    if(swapState==2){ return returnPage2() }



}

//==================================
return (
  <div className="page-badge">

    <div className="w-100 h-100 hide-on-print">

    {
     renderGroupAndDataComponent()
    }
 
    {
    showModalConfirm
      ?< ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={`/${inRouteName}/deletecustom`}
        editData={editData}
        //setShowModalError,
        setReload={setReloadData}
        submitOption={0}
        actionAfterSuccess={actionAfterSuccess}
      />
      :null
    }
    
  
   
    {
      renderBadge({
        badgeState,
        pageNumber,setPageNumber,
        limitRow,
        count,setCount,                    
        setFilterOption,
        badgeLayoutOption,
        barWidth:widthLeft,
        
        totalSwapPage,
        swapState,setSwapState,
        reloadData:reloadData, setReloadData:setReloadData,
        showTableSetting,setShowTableSetting,
        showFilter,setShowFilter,
        showAdd,setShowAdd,
        showEdit,setShowEdit,
        setShowModalConfirm
      })
     } 

    </div>

    {showAdd?<ModalForm param={param1}/>:null}
    {showEdit?<ModalForm param={param2}/>:null}
    
    <div className="hide-on-screen">
      {
         renderTable()
      }
    </div>


  </div>
  );
}

export default DataComponent;

