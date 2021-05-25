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
import CustomerComponent from '../../component/customerComponent/CustomerComponent'
//import renderModalForm from '../../render/renderForm/renderModalForm'
import renderModalError from '../../render/renderModalError'
//==================
import renderModalConfirm from '../../render/renderModalConfirm'
//==================
const {axiGet,genSortFromSortState,reloadAndSearch}=axiosUtil
const {changeArrayFile}=photoUtil
const {tableResize}=tableUtil

const {jobFilter}=FilterTemplate  
const {jobForm,detailForm}=FormTemplate      
const {jobState}=StateTemplate
const {genBlankState,genRefAndValue,findEmptyArrayInData}=StateUtil

//========================
function JobComponent({badgeLayoutOption}) {

const { basicData,setBasicData,
        selectCustomer,setSelectCustomer,
        selectJob,setSelectJob,
        selectJobId,setSelectJobId,
        reloadJobInContext,setReloadJobInContext,
        swapState,setSwapState
}=React.useContext(MainContext)
    
const [showModalCustomer,setShowModalCustomer]=React.useState(false)

const [showModalConfirm,setShowModalConfirm]=React.useState(false)
//====================================
const [showModalError,setShowModalError]=React.useState({status:false,msg:""})
//====================================
const blankData=genBlankState({template:jobState}).state
//====================================
let [editData,setEditData]=React.useState(blankData)
//====================================
let [pageNumber,setPageNumber]=React.useState(1)
let [count,setCount]=React.useState(0)
//====================================
//Table
//เราไม่โหลด customerData ในหน้านี้

const [filterData,setFilterData]=React.useState([blankData])

React.useEffect(()=>{

  
  if(selectJobId>0){ //not "" or null
    filterData.map(i=>{
      if(i.id==selectJobId){
        setSelectJob(i)
      }
    })
    setSelectJob(filterData[selectJobId-1])
  }

},[filterData])

//========================
//ตาราง job
let [showTable,setShowTable]=React.useState({
    width:2000,
    gridCol:""
})
  
let [limitRow,setLimitRow]=React.useState(10)

React.useEffect(()=>{
  
},[limitRow])



const [showModalTableSetting,setShowModalTableSetting] = React.useState(false)
  
const [tableTemplate,setTableTemplate]=React.useState({
    id            :
        { lb:'ID',     type:"number",
          width:60,   showCol:true,  showColHead:true,    
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
          width:100,   showCol:false,  showColHead:true,    
        },
    jobType       :
        { lb:'ประเภทงาน',type:"string",
          width:120,   showCol:true,  showColHead:true,    
        },
    jobStatus      :
        { lb:'สถานะงาน',type:"string",
          width:80,   showCol:true,  showColHead:true,    
        },

    customerId            :
        { lb:'IDลูกค้า',     type:"number",
          width:60,   showCol:true,  showColHead:true,    
        },
    title           :
        { lb:'คำนำหน้า',type:"string",
          width:40,   showCol:true,  showColHead:true,    
        },
    name      :
        { lb:'ชื่อ',type:"string",
          width:100,   showCol:true,  showColHead:true,      
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
          width:220,   showCol:true,  showColHead:true,      
        },    
    photoUrl1      :
        { lb:'รูป1',type:"arrayPhoto",
          width:250,   showCol:true,  showColHead:true,
        },
    photoUrl2      :
        { lb:'รูป2',type:"arrayPhoto",
          width:250,   showCol:true,  showColHead:true,
        }, 

    jobValue    :
        { lb:'มูลค่างาน(บาท)',     type:"number",
          width:100,   showCol:true,  showColHead:true,    
        },
    progress    :
        { lb:'ความคืบหน้า(%)',     type:"number",
          width:100,   showCol:true,  showColHead:true,    
        },
    progressByValue :    
      { lb:'ความคืบหน้ามูลค่า(%)',     type:"number",
      width:100,   showCol:true,  showColHead:true,    
    },

})  

React.useEffect(()=>{
    tableResize({tableTemplate,showTable,setShowTable})
},[tableTemplate]) 
//==================
//Filter
const [showFilter,setShowFilter]=React.useState(false)

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
  jobValue:{toCheck:false,min:0,max:0},
  progress:{toCheck:false,min:0,max:0},
  progressByValue:{toCheck:false,min:0,max:0},

  detailId:{toCheck:false,min:0,max:0},
  detailProductId:{toCheck:false,min:0,max:0},
  detailBarcode:{toCheck:false,value:""},
  detailName:{toCheck:false,value:""},
  detailGroupId:{toCheck:false,min:0,max:0},
  detailUnit:{toCheck:false,value:""},
  detailPrice:{toCheck:false,min:0,max:0},
  detailQuantity:{toCheck:false,min:0,max:0},
  detailRemark:{toCheck:false,value:""},
  detailPic:{toCheck:false,value:""},
  detailJobDetailStatus:{toCheck:false,value:""},

})

const [filterOption,setFilterOption]=React.useState(0)
//=======================================
const [sortState,setSortState]=React.useState({
  order1:{toAscending:1, sortName:null},
  order2:{toAscending:1, sortName:null},
  order3:{toAscending:1, sortName:null},
})

React.useEffect(()=>{
  genSortFromSortState({sortState,setSortState,sort,setSort})

},[sortState])

let [sort,setSort]=React.useState({id:1})
//=======================================

//Badge

const [badgeState,setBadgeState] =React.useState({
    all:{show:true,func:()=>{}},
    swap:{show:true,func:()=>{
      setReloadJobInContext(true)
    }},
    refresh:{show:true,func:()=>{
        setReloadJobInContext(true)
    }},
    setting:{show:true,func:()=>{
        setShowModalTableSetting(true)
    }},
    search:{show:true,func:()=>{
        setShowFilter(true)
    }},
    add:{show:true,func:()=>{
        setShowAdd(true)
    }},
    edit:{show:false,func:()=>{
        setShowEdit(true)
    }},
    del:{show:editData.id?true:false,func:()=>{
      setShowModalConfirm(true)
    }},
    printer:{show:true,func:()=>{window.print()}},

})

//=========================
React.useEffect(()=>{  
    //console.log(`jobComponent ,pN:${pageNumber},fO:${filterOption},rlC:${reloadJobInContext}`)

    //console.log(`pageNumber :${pageNumber}`)
    //console.log(`filterOption : ${filterOption}`)
  if(reloadJobInContext){  
    reloadAndSearch({
      blankData,inputState,
      pageNumber,sort,filterOption,
      setFilterData,setCount,setEditData,
      url:"/job/getlimit",
      filterTemplate:jobFilter,
      reload:reloadJobInContext,
      setReload:setReloadJobInContext,
      limitRow
    })
  }
},[pageNumber,filterOption,reloadJobInContext])
//=========================
//===================================
const [showCustomerModalComponent,
       setShowCustomerModalComponent]=React.useState(false)

React.useEffect(()=>{
  //เมื่อมีการเปิด ModalComponent ให้ทำการรีเซ็ตค่า selectCustomer เป็น null
  //เพื่อทำการเลือก selectCustomer ใหม่ 
  if(showCustomerModalComponent){
    setSelectCustomer(null)
  }
},[showCustomerModalComponent])

const funcOK=()=>{
  //เมื่อมีการกดตกลง ใน Modal Component
  if(showAdd){
    setAddData({
      ...addData,
      customerId:selectCustomer.id,
      title:selectCustomer.title,
      name:selectCustomer.name,
      surname:selectCustomer.surname,
      phone:selectCustomer.phone
    })
  }
  if(showEdit){
    setEditData({
      ...editData,
      customerId:selectCustomer.id,
      title:selectCustomer.title,
      name:selectCustomer.name,
      surname:selectCustomer.surname,
      phone:selectCustomer.phone
    })
  }
  //ปิด ModalComponent
  setShowCustomerModalComponent(false)
}

//===================================
//Add Form  
const [showAdd,setShowAdd]=React.useState(false)
const refAdd1=React.createRef()
const refAdd2=React.createRef()
//blankData genไว้แล้ว line 34   

const [addData,setAddData]=React.useState(blankData)
let [addRefAndValue,setAddRefAndValue]=React.useState(
  genRefAndValue({template:jobForm,FData:addData})
)
//image
const [addShowImage,setAddShowImage]=React.useState(true)

const [addArrayFile1,setAddArrayFile1]=React.useState([])
const [addFileUrl1,setAddFileUrl1]=React.useState([])

const [addArrayFile2,setAddArrayFile2]=React.useState([])
const [addFileUrl2,setAddFileUrl2]=React.useState([])

//files from <input type="file"/>
React.useEffect(()=>{
    changeArrayFile({ arrayFile:addArrayFile1,
                      fileUrl:addFileUrl1,
                      setFileUrl:setAddFileUrl1,
                      inputState:addData,
                      setInputState:setAddData,
                      fileName:"file1",
                      serverFolder:"/upload/job",
                      setShowImage:setAddShowImage})
      
},[addArrayFile1])
React.useEffect(()=>{
   
  changeArrayFile({ arrayFile:addArrayFile2,
                    fileUrl:addFileUrl2,
                    setFileUrl:setAddFileUrl2,
                    inputState:addData,
                    setInputState:setAddData,
                    fileName:"file2",
                    serverFolder:"/upload/job",
                    setShowImage:setAddShowImage})
    
},[addArrayFile2])
//end Image
//=============
React.useEffect(()=>{
  //console.log('addData')
  //console.log(addData)

  //let tempJobValue=0
  //let tempProgress=0
  //let tempProgressByValue=0
  
  

  const temp=genRefAndValue({
      template:jobForm,
      FData:addData
      })
  setAddRefAndValue({...temp})

},[addData])

let param1={
  isAddForm:true,
  lb:'บันทึกงานใหม่',
  formTemplate:jobForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refAdd1,
  ref2:refAdd2,

  iconAction:[setShowCustomerModalComponent],

  blankData,
  loadData:addData,
  setLoadData:setAddData,
  refAndValue:addRefAndValue,
  setRefAndValue:setAddRefAndValue,

  //for image
  showImage:addShowImage,
  setShowImage:setAddShowImage,
  fileUrl:[addFileUrl1,addFileUrl2],
  arrayFile:[addArrayFile1,addArrayFile2],
  setArrayFile:[setAddArrayFile1,setAddArrayFile2],
  keyName:["photoUrl1","photoUrl2"],
  
  //for submitFunc
  show:showAdd,
  setShow:setShowAdd,
  url:'/job/addcustom',
  //submitOption:1,
  //submitKey:"detail",
  //mainInputState:addData,
  reload:reloadJobInContext,
  setReload:setReloadJobInContext,
}
//=============================
//Edit Form
const [showEdit,setShowEdit]=React.useState(false)
const refEdit1=React.createRef()
const refEdit2=React.createRef()

//blankData genไว้แล้ว line 34
//[editData,setEditData] สร้างไว้แล้ว line 343
let [editRefAndValue,setEditRefAndValue]=React.useState(
  genRefAndValue({template:jobForm,FData:editData})
)
//image
const [editShowImage,setEditShowImage]=React.useState(true)

const [editArrayFile1,setEditArrayFile1]=React.useState([])
const [editFileUrl1,setEditFileUrl1]=React.useState([])

const [editArrayFile2,setEditArrayFile2]=React.useState([])
const [editFileUrl2,setEditFileUrl2]=React.useState([])

//files from <input type="file"/>
React.useEffect(()=>{
  
    changeArrayFile({ arrayFile:editArrayFile1,
                      fileUrl:editFileUrl1,
                      setFileUrl:setEditFileUrl1,
                      inputState:editData,
                      setInputState:setEditData,
                      fileName:"file1",
                      serverFolder:"/upload/job",
                      setShowImage:setEditShowImage})
                      
},[editArrayFile1])

React.useEffect(()=>{
  
  changeArrayFile({ arrayFile:editArrayFile2,
                    fileUrl:editFileUrl2,
                    setFileUrl:setEditFileUrl2,
                    inputState:editData,
                    setInputState:setEditData,
                    fileName:"file2",
                    serverFolder:"/upload/job",
                    setShowImage:setEditShowImage})
                    
},[editArrayFile2])
//end image
//==============================


//==============================
//end image
React.useEffect(()=>{

    findEmptyArrayInData(jobState,editData,blankData,setEditData)

    const temp=genRefAndValue({
        template:jobForm,
        FData:editData
        })
    setEditRefAndValue({...temp})
    
    //console.log(parseInt(editData.id))
    
    if(parseInt(editData.id)){
      setBadgeState({...badgeState,
        edit:{show:true,func:()=>{
            setShowEdit(true)
        }},
        del:{show:true,func:()=>{
            setShowModalConfirm(true)
        }}
      })
    }
    else{
      setBadgeState({...badgeState,
        edit:{show:false,func:()=>{
            setShowEdit(true)
        }},
        del:{show:false,func:()=>{
            setShowModalConfirm(true)
        }}
      })
    }
    //table need at least blank data to avoid map error
    if(selectJob){
      //secondly onward
      //clicking to select in table
      if(editData.id>0){ 
        setSelectJob(editData)
      }
    }
    else{
      //firstly
      //in context, default of selectJob = null
      //default of editData = blank data
      //selectJob = > selectJob.detail is also blankData
      //table of jobDetail show blankData
      setSelectJob(editData)
    }
},[editData])
//==============================
React.useEffect(()=>{
  if(editData.progress==100){
    setEditData({...editData,jobStatus:"เสร็จแล้ว"})    
  }
  if(addData.progress==100){
    setAddData({...addData,jobStatus:"เสร็จแล้ว"})    
  }
},[editData.progress,addData.progress])

//==============================
let param2={
  isAddForm:false,
  lb:'แก้ไขงาน',
  formTemplate:jobForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refEdit1,
  ref2:refEdit2,

  iconAction:[setShowCustomerModalComponent],
  
  blankData,
  loadData:editData,
  setLoadData:setEditData,
  refAndValue:editRefAndValue,
  setRefAndValue:setEditRefAndValue,

  showImage:editShowImage,
  setShowImage:setEditShowImage,
  fileUrl:[editFileUrl1,editFileUrl2],
  arrayFile:[editArrayFile1,editArrayFile2],
  setArrayFile:[setEditArrayFile1,setEditArrayFile2],
  keyName:["photoUrl1","photoUrl2"],
  
  show:showEdit,
  setShow:setShowEdit,
  url:'/job/updatecustom',
  //submitOption:0,
  //submitKey:"detail",
  //mainInputState:editData,

  reload:reloadJobInContext,
  setReload:setReloadJobInContext,
}

//=========================

return(
<div className="w-100 h-100">
    <div className="w-100 h-100 bd-black hide-on-print"> 
        <div className="flex-center-center w-100"
             style={{height:"12%",display:"none"}}>
            <h1>งาน</h1>
        </div>

        <div className="w-100"
         style={{height:"100%",overflow:"hidden"}}>
        { 
        renderTable({
            tableTemplate,setTableTemplate,
            filterData,setFilterData,
            //filterData:customerData,
            editData,setEditData,
            showTable,setShowTable,
            blankData})
        }
        </div>

        {
        renderModalTableSetting({
            show:showModalTableSetting,
            setShow:setShowModalTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate,
            limitRow,setLimitRow
          })
        }

        {
        renderModalFilterInput({
            show:showFilter,
            setShow:setShowFilter,
            title:"ค้นหางาน",
            filterTemplate: jobFilter,
            inputState,setInputState,
            filterData,setFilterData,
            setPageNumber,setCount,
            setFilterOption,
            sortState,setSortState,
            setReload:setReloadJobInContext
          })
        }  

        { 
        renderModalConfirm({
            show:showModalConfirm,
            setShow:setShowModalConfirm,
            url:'/job/deletecustom',
            editData,
            setShowModalError,
            setReload:setReloadJobInContext})
        } 

        {showAdd?<ModalForm param={param1}/>:null}
        {showEdit?<ModalForm param={param2}/>:null}
        
        {showCustomerModalComponent
            ?<ModalComponent 
                title="เลือกลูกค้าจากรายการ"
                funcOK={()=>{funcOK()}}
                funcCancel={()=>{
                  setShowCustomerModalComponent(false)}}
             >
                <CustomerComponent/>
             </ModalComponent>
            :null
        }
        {
        renderModalError({
            show:showModalError,
            setShow:setShowModalError})
        }

        {
        renderBadge({badgeState,
            pageNumber,setPageNumber,
            setReload:setReloadJobInContext,
            filterOption,setFilterOption,
            count,setCount,
            badgeLayoutOption,
            swapState,setSwapState,
            limitRow
          })
        } 
    </div>

    <div className="w-100 h-100 hide-on-screen"> 
      { //for print only
        renderTable({
            tableTemplate,setTableTemplate,
            filterData,filterData,
            //filterData:customerData,
            editData,setEditData,
            showTable,setShowTable,
            blankData})
        }
    </div>  
</div>
)
}

export default JobComponent;
