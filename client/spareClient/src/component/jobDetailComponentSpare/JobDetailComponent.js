import React from 'react';
import axios from 'axios';

//==========
import renderTable from  '../../render/renderTableCard/renderTable/renderTable'
//import renderCard from '../../render/renderTableCard/renderCard/renderCard'
import renderModalTableSetting from '../../render/renderTableCard/renderTable/renderModalTableSetting'
import tableUtil from '../../render/renderTableCard/renderTable/tableUtil'
//==========
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import renderModalFilterInput from '../../render/renderFilter/renderModalFilterInput'
//==========
import renderBadge from '../../render/renderBadge/renderBadge'
//==========
import {MainContext} from '../../context/MainContext'
//==========
import axiosUtil from '../../util/axiosUtil'
import StateUtil from '../../model/StateUtil'
import photoUtil from '../../component/galleryone_add/photoUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'
//==========
import ModalComponent from '../../render/ModalComponent'
import ProductComponent from '../../component/productComponent/ProductComponent'
//import renderModalForm from '../../render/renderForm/renderModalForm'
import renderModalError from '../../render/renderModalError'
//==================
import renderModalConfirm from '../../render/renderModalConfirm'
//==================
const {axiGet}=axiosUtil
const {changeArrayFile}=photoUtil
const {tableResize}=tableUtil

const {jobFilter}=FilterTemplate  
const {jobForm,jobDetailForm}=FormTemplate      
const {jobState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil


function JobDetailComponent({badgeLayoutOption}) {

const { basicData,setBasicData,
        selectCustomer,setSelectCustomer,
        selectProduct,setSelectProduct,
        selectJob,setSelectJob,
        selectJobId,setSelectJobId,
        swapState,setSwapState,
        reloadJobInContext,setReloadJobInContext,
}=React.useContext(MainContext)  
//====================================
//tempData=selectJob
const updateProgressAndValue=(tempSelectJob)=>{
  let finishItem=0
  let finishValue=0
  let jobValue=0
  // progress= sum (item*finish)
  // progressByValue = sum (qty*price*finish)
  // jobValue = sum (qty*price)
  tempSelectJob.detail.map((i)=>{
    const price=parseInt(i.price) 
    const quantity=parseInt(i.quantity) 
    const jobDetailStatus=i.jobDetailStatus
    //console.log(`price : ${price}`)
    //console.log(`unit : ${quantity}`)
    if(jobDetailStatus=="เสร็จแล้ว"){
      finishItem++
      finishValue=finishValue+price*quantity
    }
    jobValue=jobValue+price*quantity
  })

  const progress=finishItem/tempSelectJob.detail.length*100
  const progressByValue=finishValue/jobValue*100

  return {jobValue,progress,progressByValue}
}
//---------------------------------

const sortSelectJobDetail = (updatedDetail)=>{
  const temp = {...selectJob,['detail']:updatedDetail}
  setSelectJob(temp)
}

//=================================
const [showModalConfirm,setShowModalConfirm]=React.useState(false)
//====================================
const [showModalError,setShowModalError]=React.useState({status:false,msg:""})
//====================================
const blankData=genBlankState({template:jobState}).state
//====================================

//ค่าของ Job Detail
//{id:1,productId:1,barcode:"0",name:"สายพาน",....
const [editData,setEditData]=React.useState(blankData.detail[0])

let [updateDeleteJob,setUpdateDeleteJob]=React.useState({})
//====================================
const [pageNumber,setPageNumber]=React.useState(1)
const [count,setCount]=React.useState(0)
//====================================

//====================================
//jobDetailTable
let [showTable,setShowTable]=React.useState({
    width:1600,
    gridCol:""
})
  
const [showModalTableSetting,setShowModalTableSetting] = React.useState(false)
  
const [tableTemplate,setTableTemplate]=React.useState({
  id            :
    { lb:'ID',     type:"number",
      width:100,   showCol:true,  showColHead:true,    
    },
  productId           :
    { lb:'IDสินค้า',type:"number",
      width:100,   showCol:true,  showColHead:true,    
    },
  barcode            :
    { lb:'barcode',type:"string",
      width:100,   showCol:true,  showColHead:true,    
    },
  name       :
    { lb:'ชื่อสินค้า',type:"string",
      width:100,   showCol:true,  showColHead:true,    
    },
  groupId            :
    { lb:'IDกลุ่มสินค้า',     type:"number",
      width:100,   showCol:true,  showColHead:true,    
    },
  unit           :
    { lb:'หน่วย',type:"string",
      width:100,   showCol:true,  showColHead:true,    
    },
  price      :
    { lb:'ราคา',type:"number",
      width:100,   showCol:true,  showColHead:true,      
    },
  quantity      :
    { lb:'จำนวน',type:"number",
      width:100,   showCol:true,  showColHead:true,      
    },  
  remark         :
    { lb:'หมายเหตุ', type:"string",
      width:200,   showCol:true,  showColHead:true,      
    },
  pic :
    { lb:'ผู้รับผิดชอบ', type:"string",
      width:100,   showCol:true,  showColHead:true,      
    }, 
  jobDetailStatus :
    { lb:'สถานะงานย่อย', type:"string",
      width:100,   showCol:true,  showColHead:true,      
    },
}) 
    
React.useEffect(()=>{
  tableResize({tableTemplate,
                showTable,
                setShowTable})
},[tableTemplate])
//-----------------------

//=======================
//Badge

const [badgeState,setBadgeState] =React.useState({
  all:{show:true,func:()=>{}},
  swap:{show:true,func:()=>{
    setReloadJobInContext(true)
  }},
  refresh:{show:true,func:()=>{
    setEditData(blankData.detail[0])
    setReloadJobInContext(true)
  }},
  setting:{show:true,func:()=>{
      setShowModalTableSetting(true)
  }},
  search:{show:false,func:()=>{
      //setShowFilter(true)
  }},
  add:{show:true,func:()=>{
      setShowAdd(true)
  }},
  edit:{show:false,func:()=>{
      //setShowEdit(true)
  }},
  del:{show:false,func:()=>{
    //setShowModalConfirm(true)
    //setSelectJobId(selectJob.id)
  }},
  printer:{show:true,func:()=>{window.print()}},

})
//=======================
React.useEffect(()=>{

  const temp=genRefAndValue({
    template:jobDetailForm,
    FData:editData
    })
  setEditRefAndValue({...temp})

  //for delete in detail array
  if(selectJob){
    let temp=[]
    selectJob.detail.map(i=>{
      if(i.id!=editData.id){
        temp=[...temp,i]
      }
    })
    setUpdateDeleteJob({id:selectJob.id,detail:temp})
  }

  //if editData is selected, display editIcon/deleteIcon
  if(editData.id){
    setBadgeState({...badgeState,
      edit:{show:true,func:()=>{
        setShowEdit(true)
        setSelectJobId(selectJob.id)
      }},
      del:{show:true,func:()=>{
        setShowModalConfirm(true)
        setSelectJobId(selectJob.id)
        //console.log('del')
      }},
    })
  }
  else{
    setBadgeState({...badgeState,
      edit:{show:false,func:()=>{
        setShowEdit(true)
      }},
      del:{show:false,func:()=>{
        setShowModalConfirm(true)
      }},
    })
  }
},[editData])
//===================================
const [showProductModalComponent,
    setShowProductModalComponent]=React.useState(false)

React.useEffect(()=>{
    //เมื่อมีการเปิด ModalComponent ให้ทำการรีเซ็ตค่า selectCustomer เป็น null
    //เพื่อทำการเลือก selectCustomer ใหม่ 
  if(showProductModalComponent){
    setSelectProduct(null)
  }
},[showProductModalComponent])
    
const funcOK=()=>{
  //เมื่อมีการกดตกลง ใน Modal Component
  if(showAdd){
    setAddData({
      ...addData,
      productId:selectProduct.id,
      barcode:selectProduct.barcode,
      groupId:selectProduct.groupId,
      name:selectProduct.name,
      price:selectProduct.price,
      unit:selectProduct.unit,
    })
  }
  if(showEdit){
    setEditData({
      ...editData,
      productId:selectProduct.id,
      barcode:selectProduct.barcode,
      groupId:selectProduct.groupId,
      name:selectProduct.name,
      price:selectProduct.price,
      unit:selectProduct.unit,
    })
  }
    //ปิด ModalComponent
    setShowProductModalComponent(false)
}

//===================================
//Add Form  
const [showAdd,setShowAdd]=React.useState(false)
const refAdd1=React.createRef()
const refAdd2=React.createRef()
//blankData genไว้แล้ว line 34   

const [addData,setAddData]=React.useState(blankData.detail[0])

let [addRefAndValue,setAddRefAndValue]=React.useState(
  genRefAndValue({template:jobDetailForm,FData:addData})
)

//=============
React.useEffect(()=>{
  //console.log('addData')
  //console.log(addData)
  const temp=genRefAndValue({
      template:jobDetailForm,
      FData:addData
      })
  setAddRefAndValue({...temp})
},[addData])

let param1={
  isAddForm:true,
  lb:'บันทึกรายละเอียดงานใหม่',
  formTemplate:jobDetailForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refAdd1,
  ref2:refAdd2,

  iconAction:[setShowProductModalComponent],

  blankData:blankData.detail[0],
  loadData:addData,
  setLoadData:setAddData,
  refAndValue:addRefAndValue,
  setRefAndValue:setAddRefAndValue,

  //for submitFunc
  show:showAdd,
  setShow:setShowAdd,
  url:'/job/updatecustom',
  submitOption:1,
  submitKey:"detail",
  mainInputState:selectJob,
  updateMainKeyInMainInputState:updateProgressAndValue(selectJob),
  reload:reloadJobInContext,
  setReload:setReloadJobInContext,
}
//================================
//Edit Form  
const [showEdit,setShowEdit]=React.useState(false)
const refEdit1=React.createRef()
const refEdit2=React.createRef()
//blankData genไว้แล้ว line 34   

let [editRefAndValue,setEditRefAndValue]=React.useState(
  genRefAndValue({template:jobDetailForm,FData:editData})
)

//===========================

let param2={
  isAddForm:false,
  lb:'แก้ไขรายละเอียดงาน',
  formTemplate:jobDetailForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refEdit1,
  ref2:refEdit2,

  iconAction:[setShowProductModalComponent],

  blankData:blankData.detail[0],
  loadData:editData,
  setLoadData:setEditData,
  refAndValue:editRefAndValue,
  setRefAndValue:setEditRefAndValue,

  //for submitFunc
  show:showEdit,
  setShow:setShowEdit,
  url:'/job/updatecustom',
  submitOption:1,
  submitKey:"detail",
  mainInputState:selectJob,
  updateMainKeyInMainInputState:updateProgressAndValue(selectJob),
  reload:reloadJobInContext,
  setReload:setReloadJobInContext,
}

//=======================
return(
<div className="w-100 h-100">

    <div className="w-100 h-100 bd-black hide-on-print">
        <div className="w-100 flex-center-center"
             style={{height:"12%"}}>
            {selectJob
            ?<h1>{selectJob.id
              ?`รายละเอียดงาน${' ('+selectJob.id+') '
                +selectJob.title+' '+selectJob.name}`
              :`รายละเอียดงาน`}</h1>
            :<h1>รายละเอียดงาน</h1>
            }
        </div>

        <div className="w-100"
            style={{height:"88%",overflow:"hidden"}}>
        { 
        selectJob
        ?renderTable({
            tableTemplate,setTableTemplate,
            filterData:selectJob.detail,
            setFilterData:sortSelectJobDetail,
            editData,setEditData,
            showTable,setShowTable,
            blankData:blankData.detail[0]})
        :null
        }
        </div>
        {
        renderModalTableSetting({
            show:showModalTableSetting,
            setShow:setShowModalTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate,
            
          })
        }

        { 
          renderModalConfirm({
              show:showModalConfirm,
              setShow:setShowModalConfirm,
              url:'/job/updatecustom',
              stateTemplate:jobState,
              editData:updateDeleteJob,
              setShowModalError,
              setReload:setReloadJobInContext
          })
        } 
        
        {showAdd?<ModalForm param={param1}/>:null}
        {showEdit?<ModalForm param={param2}/>:null}

        {showProductModalComponent
            ?<ModalComponent 
                title="เลือกสินค้าจากรายการ"
                funcOK={()=>{funcOK()}}
                funcCancel={()=>{
                  setShowProductModalComponent(false)}}
             >
                <ProductComponent/>
             </ModalComponent>
            :null
        }

        { 
          renderModalError({
              show:showModalError,
              setShow:setShowModalError
          })
        }  

        <div>
            {renderBadge({badgeState,
                pageNumber,setPageNumber,
                setReload:()=>{},
                filterOption:null,
                setFilterOption:()=>{},
                count,setCount,
                badgeLayoutOption,
                swapState,setSwapState,
                
            })}
        </div>
    </div>

</div>
)
}

export default JobDetailComponent;
