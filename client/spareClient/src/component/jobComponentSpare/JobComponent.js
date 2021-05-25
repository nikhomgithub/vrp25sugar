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
import ModalComponent from '../../render/ModalComponent'
import CustomerComponent from '../customerComponent/CustomerComponent'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'

//==================
import ModalConfirm from '../../render/ModalConfirm'
//==================

const {jobFilter}=FilterTemplate  
const {jobForm}=FormTemplate      
const {jobState}=StateTemplate

//=================================
function JobComponent() {

  const { basicData,setBasicData,
    selectCustomer,setSelectCustomer
  }=React.useContext(MainContext)
  //================================
  //================================
  const [filterData,setFilterData]=React.useState(null)
  //================================
  const [showModalConfirm,setShowModalConfirm]=React.useState(false)

  const [showTableSetting,setShowTableSetting]=React.useState(false)
  const [showFilter,setShowFilter]=React.useState(false)
  const [showAdd,setShowAdd]=React.useState(false)
  const [showEdit,setShowEdit]=React.useState(false)
  const [reloadData,setReloadData]=React.useState(true)

  //====================================
  const [showModalCustomer,setShowModalCustomer]=React.useState(false)

  let [editData,setEditData]=React.useState(null)
  let [iconActionData,setIconActionData]=React.useState(null)

  let [pageNumber,setPageNumber]=React.useState(1)
  let [count,setCount]=React.useState(0)
  let [filterOption,setFilterOption]=React.useState(0)
  let [limitRow,setLimitRow]=React.useState(10)
  let [swapState,setSwapState]=React.useState(0)
  let [badgeLayoutOption,setBadgeLayoutOption]=React.useState(0)
  //==================================
  React.useEffect(()=>{
    if(selectCustomer){
      const {id,title,name,surname,phone}=selectCustomer
      setIconActionData({customerId:id,title,name,surname,phone})
    }

  },[selectCustomer])
  //==================================
  React.useEffect(()=>{
    console.log('editData')
    console.log(editData)
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
    swapShow:false,swapFunc:()=>{},
    reloadShow:true,reloadFunc:()=>{},
    settingShow:true,settingFunc:()=>{},
    filterShow:true,filterFunc:()=>{},
    addShow:true,addFunc:()=>{setSelectCustomer(null)},
    editShow:false,editFunc:()=>{setSelectCustomer(null)},
    delShow:false,delFunc:()=>{},
    printerShow:true,
  })

  //Table
  //=====================
  const [tableTemplate,setTableTemplate]=React.useState({
            id            :
            { lb:'ID',     type:"number",
            width:30,   showCol:true,  showColHead:true,    
            },
        dateIn           :
            { lb:'วันสั่งงาน',type:"date",
            width:90,   showCol:true,  showColHead:true,    
            },
        dateTarget           :
            { lb:'วันนัดรับ',type:"date",
            width:90,   showCol:true,  showColHead:true,    
            },
        dateOut       :
            { lb:'วันรับจริง',type:"date",
            width:90,   showCol:false,  showColHead:true,    
            },
        jobType       :
            { lb:'ประเภทงาน',type:"string",
            width:90,   showCol:true,  showColHead:true,    
            },
        jobStatus      :
            { lb:'สถานะงาน',type:"string",
            width:70,   showCol:true,  showColHead:true,    
            },


        customerId            :
            { lb:'ID ลูกค้า',     type:"number",
            width:30,   showCol:true,  showColHead:true,    
            },
        title           :
            { lb:'คำนำหน้า',type:"string",
            width:50,   showCol:true,  showColHead:true,    
            },
        name      :
            { lb:'ชื่อ',type:"string",
            width:120,   showCol:true,  showColHead:true,      
            },
        surname      :
            { lb:'สกุล',type:"string",
            width:100,   showCol:false,  showColHead:true,      
            },  
        phone         :
            { lb:'โทรศัพท์', type:"array",
            width:110,   showCol:true,  showColHead:true,      
            }, 

        remark      :
            { lb:'หมายเหตุ',type:"string",
            width:400,   showCol:true,  showColHead:true,      
            },    
        photoUrl1      :
            { lb:'รูป1',type:"arrayPhoto",
            width:200,   showCol:true,  showColHead:true,
            },
        photoUrl2      :
            { lb:'รูป2',type:"arrayPhoto",
            width:200,   showCol:true,  showColHead:true,
            }, 

    })  
    
//===========================

//Filter
let [inputState,setInputState]=React.useState({
    id:{toCheck:false,min:0,max:0},
    dateIn:{toCheck:false,min:"2018-01-01",max:new Date().toISOString()},
    dateOut:{toCheck:false,min:"2018-01-01",max:new Date().toISOString()},
    dateTarget:{toCheck:false,min:"2018-01-01",max:new Date().toISOString()},
    customerId:{toCheck:false,min:0,max:0},
  
    jobType:{toCheck:false,value:""},
    jobStatus:{toCheck:false,value:""},
  
    title:{toCheck:false,value:""},
    name:{toCheck:false,value:""},
    surname:{toCheck:false,value:""},
    phone:{toCheck:false,value:""},
  
    remark:{toCheck:false,value:""},
})

//===================
const actionAfterSuccess=()=>{
  setReloadData(true)
  setIconActionData(null)
}
//===================
const param1={
  isAddForm:true,
  lb:'เพิ่มงานใหม่',
  formTemplate: jobForm,
  stateTemplate:jobState,
  //setShowModalError,

  selectData:{basicData},
  loadData:null,
  show:showAdd,
  setShow:setShowAdd,
  url:'/job/addcustom',

  keyName:["photoUrl1","photoUrl2"],//null
  iconAction:[setShowModalCustomer],//[()=>{}],
  iconActionData,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,//false,

}


let param2={
  isAddForm:false,
  lb:'แก้ไขงาน' ,
  formTemplate:jobForm,
  stateTemplate:jobState,
  //setShowModalError,

  selectData:{basicData},
  loadData:editData,
  show:showEdit,
  setShow:setShowEdit,
  url:'/job/updatecustom',

  keyName:["photoUrl1","photoUrl2"],//null
  iconAction:[setShowModalCustomer],//[()=>{}],
  iconActionData,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,

}

//====================================

return(
<div className="w-100 h-100">
  <div className="w-100 h-100 hide-on-print">
    
    <div className="flex-center-center"
         style={{height:"10%"}}
    >
      <h1>งาน</h1>
    </div>
    
    <div className="w-100 bd-black"
         style={{height:"90%",overflow:"hidden"}}
    >  
      {
       <Table
            filterData={filterData} setFilterData={setFilterData}     

            stateTemplate={jobState}
            filterTemplate={jobFilter}

            tableTemplate={tableTemplate} setTableTemplate={setTableTemplate}
            editData={editData} setEditData={setEditData}

            inputState={inputState} setInputState={setInputState}
            pageNumber={pageNumber} setPageNumber={setPageNumber}
            setCount={setCount}
            url={"/job/getlimit"}
            reloadData={reloadData} setReloadData={setReloadData}
            limitRow={limitRow} setLimitRow={setLimitRow}

            showFilter={showFilter} setShowFilter={setShowFilter}
            filterOption={filterOption} setFilterOption={setFilterOption}

            showTableSetting={showTableSetting} 
            setShowTableSetting={setShowTableSetting}

            titleFilter={"ค้นหางาน"}
            
        />
      }
      
    </div>

  
    {showModalConfirm
    ?< ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={'/job/deletecustom'}
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
    showModalCustomer
    ?<ModalComponent 
        funcOK={()=>{setShowModalCustomer(false)}}
        funcCancel={()=>{setShowModalCustomer(false)}}
    >
        <CustomerComponent/>
    </ModalComponent>
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
export default JobComponent;

