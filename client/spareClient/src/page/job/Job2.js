import React from 'react';

import axios from 'axios';
import CustomerComponent from '../../component/customerComponent/CustomerComponent'

//==========
import renderTable from  '../../render/renderTableCard/renderTable/renderTable'
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
import ModalForm2 from '../../render/renderForm/ModalForm2'
import renderModalError from '../../render/renderModalError'
import ModalComponent from '../../render/ModalComponent'

//==================
import renderModalConfirm from '../../render/renderModalConfirm'
//==================
const {axiGet}=axiosUtil
const {changeArrayFile}=photoUtil
const {tableResize}=tableUtil

const {jobFilter}=FilterTemplate  
const {jobForm,detailForm}=FormTemplate      
const {jobState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil


function Job2() {

const { basicData,setBasicData,
        selectCustomer,setSelectCustomer
      }=React.useContext(MainContext)

//=========================
const [showModalConfirm,setShowModalConfirm]=React.useState(false)
//=========================
const [showModalError,setShowModalError]=React.useState({status:false,msg:""})
//====================================
const blankData=genBlankState({template:jobState}).state
//====================================
let [editData,setEditData]=React.useState(blankData)
//====================================
const [showCustomer,setShowCustomer]=React.useState(false)

const [filterData,setFilterData]=React.useState([blankData])
const [reloadJob,setReloadJob]=React.useState(true) 

const [pageNumber,setPageNumber]=React.useState(1)
const [count,setCount]=React.useState(0)

const [filterOption,setFilterOption]=React.useState(0)

const [showEdit,setShowEdit]=React.useState(false)

const [showModalComponent,setShowModalComponent]=React.useState(false)
//====================================
const filterOption0=()=>{
    axios.post('/job/getlimit',
      {pageNumber},
      {headers: {'Content-Type': 'application/json',
        'Shopauthorization':localStorage.getItem('shopauthorization'),
        'Userauthorization':localStorage.getItem('userauthorization')
      }}
    )
    .then(result=>{
      setReloadJob(false)
      setFilterData(result.data.data)
      setCount(result.data.count)
      setEditData(blankData)
    })
    .catch(err=>{
      setReloadJob(false)
    })
}

  const filterOption1=()=>{
    axiGet({qCondition:"$and",
    RtAndCt:'/job/getlimit',
    filterTemplate:jobFilter,
    inputState,
    setFilterData,
    pageNumber,setCount
    })
  } 
  const filterOption2=()=>{
    axiGet({qCondition:"$or",
    RtAndCt:'/job/getlimit',
    filterTemplate:jobFilter,
    inputState,
    setFilterData,
    pageNumber,setCount
    })
  }
//==========================
React.useEffect(()=>{
    if(pageNumber==1&& filterOption==0 && reloadJob){
      //console.log('reFresh')
      filterOption0()
    }
    else if(filterOption==0){
      //console.log('option 0 & change pageNumber')
      filterOption0()
    }
    else if(filterOption==1){
      //console.log('option 1 & change pageNumber')
      filterOption1()
    }
    else if(filterOption==2){
      //console.log('option 1 & change pageNumber')
      filterOption2()
    }
  
},[pageNumber,filterOption,reloadJob])
//====================================
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
  const temp=genRefAndValue({
      template:jobForm,
      FData:addData
      })
  setAddRefAndValue({...temp})
},[addData])

let param1={
  isAddForm:true,
  lb:'Add Job',
  formTemplate:jobForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refAdd1,
  ref2:refAdd2,

  iconAction:[setShowCustomer],

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
  reload:reloadJob,
  setReload:setReloadJob,
}


//==========================
//ตาราง job
let [showTable,setShowTable]=React.useState({
    width:1400,
    gridCol:""
  })
  
  const [showModalTableSetting,setShowModalTableSetting] = React.useState(false)
  
  const [tableTemplate,setTableTemplate]=React.useState({
      id            :
        { lb:'ID',     type:"number",
          width:100,   showCol:true,  showColHead:true,    
        },
      dateIn           :
        { lb:'วันรับงาน',type:"date",
          width:100,   showCol:true,  showColHead:true,    
        },
      dateTarget           :
        { lb:'วันเป้าหมาย',type:"date",
          width:100,   showCol:true,  showColHead:true,    
        },
      dateOut       :
        { lb:'วันเสร็จจริง',type:"date",
          width:100,   showCol:true,  showColHead:true,    
        },

      customerId            :
        { lb:'IDลูกค้า',     type:"number",
          width:100,   showCol:true,  showColHead:true,    
        },

      title           :
        { lb:'คำนำหน้า',type:"string",
          width:100,   showCol:true,  showColHead:true,    
        },
      name      :
        { lb:'ชื่อ',type:"string",
          width:100,   showCol:true,  showColHead:true,      
        },
      surname      :
        { lb:'สกุล',type:"string",
          width:100,   showCol:true,  showColHead:true,      
        },  
      phone         :
        { lb:'โทรศัพท์', type:"array",
          width:200,   showCol:true,  showColHead:true,      
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

  React.useEffect(()=>{
    tableResize({tableTemplate,showTable,setShowTable})
  },[tableTemplate]) 

//=======================================
//Filter

const [showFilter,setShowFilter]=React.useState(false)

let [inputState,setInputState]=React.useState({
  id:{toCheck:false,min:0,max:0},
  dateIn:{toCheck:false,min:"2018-01-01",max:new Date().toISOString().substring(0,10)},
  dateOut:{toCheck:false,min:"2018-01-01",max:new Date().toISOString().substring(0,10)},
  dateTarget:{toCheck:false,min:"2018-01-01",max:new Date().toISOString().substring(0,10)},
  customerId:{toCheck:false,min:0,max:0},

  title:{toCheck:false,value:""},
  name:{toCheck:false,value:""},
  surname:{toCheck:false,value:""},
  phone:{toCheck:false,value:""},

  detailId:{toCheck:false,min:0,max:0},
  detailProductId:{toCheck:false,min:0,max:0},
  detailBarcode:{toCheck:false,value:""},
  detailName:{toCheck:false,value:""},
  detailGroupId:{toCheck:false,min:0,max:0},
  detailUnit:{toCheck:false,value:""},
  detailPrice:{toCheck:false,min:0,max:0},
  detailQuantity:{toCheck:false,min:0,max:0},
  detailRemark:{toCheck:false,value:""},
})
//=============================
//Badge
const [badgeState,setBadgeState] =React.useState({
    all:{show:true,func:()=>{}},
    refresh:{show:true,func:()=>{
      setReloadJob(true)
    }},
    swap:{show:true,func:()=>{}},
    setting:{show:true,func:()=>{
        setShowModalTableSetting(true)
    }},
    search:{show:true,func:()=>{
        setShowFilter(true)
    }},
    add:{show:true,func:()=>{
        //setShowAdd(true)
    }},
    edit:{show:false,func:()=>{
        //setShowEdit(true)
    }},
    del:{show:editData.id?true:false,func:()=>{
      setShowModalConfirm(true)
    }},
  })

React.useEffect(()=>{
    //console.log('editData')
    //console.log(editData)
    /*
    const temp=genRefAndValue({
        template:jobForm,
        FData:editData
        })
    setEditRefAndValue({...temp})
    */
    if(parseInt(editData.id)){
      setBadgeState({...badgeState,
        edit:{show:true,func:()=>{setShowEdit(true)}},
        del:{show:true,func:()=>{setShowModalConfirm(true)}}
      })
    }
    else{
      setBadgeState({...badgeState,
        edit:{show:false,func:()=>{setShowEdit(true)}},
        del:{show:false,func:()=>{setShowModalConfirm(true)}}
      })
    }
},[editData])
   

//=============================
return (
    <div style={{width:"100vw",height:"100vh",
                backgroundColor:"lightgray",
                marginBottom:"2.5rem",marginTop:"4rem"}}>
       
        <div className="div-center">
            <div className="form-row">
                <h1>งาน222</h1>
                <button
                    onClick={e=>{
                        setShowModalComponent(true)
                    }}
                >customer</button>     
            </div>
        </div>
        {showModalComponent
         ?<ModalComponent 
            title="โปรดเลือก : ลูกค้าจากรายการข้างล่าง"
            funcClose={()=>setShowModalComponent(false)}
          >
             <CustomerComponent/>
          </ModalComponent>
         :null
        }

        {renderTable({
            tableTemplate,setTableTemplate,
            filterData,
            //filterData:customerData,
            editData,setEditData,
            showTable,setShowTable,
            blankData})}
        

        {renderModalFilterInput({
            show:showFilter,
            setShow:setShowFilter,
            title:"ค้นหางาน",
            filterTemplate:jobFilter,
            inputState,setInputState,
            filterData,setFilterData,
            setPageNumber,setCount,
            setFilterOption
        })}       

        {renderModalTableSetting({
            show:showModalTableSetting,
            setShow:setShowModalTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate})}

        { renderModalConfirm({
            show:showModalConfirm,
            setShow:setShowModalConfirm,
            url:'/job/deletecustom',
            editData,
            setShowModalError,
            setReload:setReloadJob,
            //setReload:setReloadCustomerData
        })} 
    
        {renderModalError({
            show:showModalError,
            setShow:setShowModalError})}

        {renderBadge({badgeState,
            pageNumber,setPageNumber,
            setReload:setReloadJob,
            filterOption,setFilterOption,
            count,setCount,
        })}
    </div>
)        
}        
    
export default Job2;
