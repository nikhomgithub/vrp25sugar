import React from 'react';

//==========

import Table from  '../table/Table'
//==========
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
//==========
import renderBadge from '../../render/renderBadge/renderBadge'
//==========
import {MainContext} from '../../context/MainContext'
//==========

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'

//==================
import ModalConfirm from '../../render/ModalConfirm'
//==================

const {partnerFilter}=FilterTemplate  
const {partnerForm}=FormTemplate      
const {partnerState}=StateTemplate

//=================================
function PartnerComponent() {

  const { basicData,setBasicData,
    selectPartner,setSelectPartner
  }=React.useContext(MainContext)

  //================================
  const [filterData,setFilterData]=React.useState(null)
  //================================
  const [showModalConfirm,setShowModalConfirm]=React.useState(false)
  //const [showModalError,setShowModalError]=React.useState({status:false,msg:""})

  const [showTableSetting,setShowTableSetting]=React.useState(false)
  const [showFilter,setShowFilter]=React.useState(false)
  const [showAdd,setShowAdd]=React.useState(false)
  const [showEdit,setShowEdit]=React.useState(false)
  const [reloadData,setReloadData]=React.useState(true)

  //====================================
  let [editData,setEditData]=React.useState(null)
  let [pageNumber,setPageNumber]=React.useState(1)
  let [count,setCount]=React.useState(0)
  let [filterOption,setFilterOption]=React.useState(0)
  let [limitRow,setLimitRow]=React.useState(10)
  let [swapState,setSwapState]=React.useState(0)
  let [badgeLayoutOption,setBadgeLayoutOption]=React.useState(0)
  //==================================
  React.useEffect(()=>{
    console.log('editData')
    console.log(editData)
    if(editData){
      setSelectPartner(editData)
    }

    if(editData){
      setBadgeState({...badgeState,
          editShow:true,delShow:true})
    }
    else{
      setBadgeState({...badgeState,
          editShow:false,delShow:false})
    }
  },[editData])
  //==================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:false,
    reloadShow:true,
    settingShow:true,
    filterShow:true,
    addShow:true,
    editShow:false,
    delShow:false,
    printerShow:true,
  })

  //Table
  //=====================
  const [tableTemplate,setTableTemplate]=React.useState({
      id            :
        { lb:'ID',     type:"number",
          width:40,   showCol:true,  showColHead:true,    
        },
      title           :
        { lb:'คำนำหน้า',type:"string",
          width:60,   showCol:true,  showColHead:true,    
        },
      name      :
        { lb:'ชื่อ',type:"string",
          width:100,   showCol:true,  showColHead:true,      
        },
      phone         :
        { lb:'โทรศัพท์', type:"array",
          width:120,   showCol:true,  showColHead:true,      
        },
      partnerType      :
        { lb:'ประเภทคู่ค้า',type:"string",
          width:70,   showCol:true,  showColHead:true,      
        },    
      address       :
        { lb:'ที่อยู่',type:"arrayObject",
          width:200,   showCol:true,  showColHead:true,
          children:{
              number:{lb:"เลขที่"},
              tambon:{lb:"ตำบล"},
              district:{lb:"อำเภอ"},
              province:{lb:"จังหวัด"},
              postcode:{lb:"รหัสไปรษณีย์"}
          }
        },
      remark      :
        { lb:'หมายเหตุ',type:"string",
          width:200,   showCol:true,  showColHead:true,      
        },  
      photoUrl1      :
        { lb:'รูป',type:"arrayPhoto",
          width:200,   showCol:true,  showColHead:true,
        },
      
    })  
    
//===========================

//Filter
let [inputState,setInputState]=React.useState({
  id:{toCheck:false,min:0,max:0},
  title:{toCheck:false,value:""},
  name:{toCheck:false,value:""},
  phone:{toCheck:false,value:""},
  partnerType:{toCheck:false,value:""},
  remark:{toCheck:false,value:""},
  addressNumber:{toCheck:false,value:""},
  addressTambon:{toCheck:false,value:""},
  addressDistrict:{toCheck:false,value:""},
  addressProvince:{toCheck:false,value:""},
  addressPostcode:{toCheck:false,value:""},
})


//===================
const actionAfterSuccess=()=>{
  setReloadData(true)
}
//===================
const param1={
  isAddForm:true,
  lb:'เพิ่มคู่ค้าใหม่',
  formTemplate:partnerForm,
  stateTemplate:partnerState,
  //setShowModalError,

  selectData:{basicData},
  loadData:null,
  show:showAdd,
  setShow:setShowAdd,
  url:'/partner/addcustom',


  keyName:["photoUrl1"],//null
  iconAction:null,//[()=>{}],
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,//false,

}


let param2={
  isAddForm:false,
  lb:'แก้ไขคู่ค้า',
  formTemplate:partnerForm,
  stateTemplate:partnerState,
  //setShowModalError,

  selectData:{basicData},
  loadData:editData,
  show:showEdit,
  setShow:setShowEdit,
  url:'/partner/updatecustom',

  keyName:["photoUrl1"],//null
  iconAction:null,//[()=>{}],
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,

}

//====================================

return(
<div className="w-100 h-100">
  <div className="w-100 h-100 hide-on-print">
    
    <div style={{height:"5%"}}>                
      <h5 style={{textAlign:"center"}}>คู่ค้า</h5>
    </div>
    
    <div className="w-100 bd-black"
         style={{height:"95%",overflow:"hidden"}}
    >  
      {
       <Table
            filterData={filterData} setFilterData={setFilterData}     

            stateTemplate={partnerState}
            filterTemplate={partnerFilter}

            tableTemplate={tableTemplate} setTableTemplate={setTableTemplate}
            editData={editData} setEditData={setEditData}

            inputState={inputState} setInputState={setInputState}
            pageNumber={pageNumber} setPageNumber={setPageNumber}
            setCount={setCount}
            url={"/partner/getlimit"}
            reloadData={reloadData} setReloadData={setReloadData}
            limitRow={limitRow} setLimitRow={setLimitRow}

            showFilter={showFilter} setShowFilter={setShowFilter}
            filterOption={filterOption} setFilterOption={setFilterOption}

            showTableSetting={showTableSetting} 
            setShowTableSetting={setShowTableSetting}

            titleFilter={"ค้นหาคู่ค้า"}
            
        />
      }
      
    </div>

  
    {showModalConfirm
    ?< ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={'/partner/deletecustom'}
        editData={editData}
        //setShowModalError,
        setReload={setReloadData}
        submitOption={0}
        actionAfterSuccess={actionAfterSuccess}
    />
    :null
    }
     
    
    {showAdd?<ModalForm param={param1}/>:null}
    {showEdit?<ModalForm param={param2}/>:null}

    {
      renderBadge({
        badgeState,
        pageNumber,setPageNumber,
        limitRow,
        count,setCount,                    
        setFilterOption,
        badgeLayoutOption,
        barWidth:"100",
        
        swapState,setSwapState,
        reloadData,setReloadData,
        showTableSetting,setShowTableSetting,
        showFilter,setShowFilter,
        showAdd,setShowAdd,
        showEdit,setShowEdit,
        setShowModalConfirm
      })
    } 
  </div>

 
</div>
)
}
export default PartnerComponent;

