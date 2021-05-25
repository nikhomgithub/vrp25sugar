import React from 'react';

import axios from 'axios';
import Customer from '../../page/customer/Customer'

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


function Job() {

    const { basicData,setBasicData,
            selectCustomer,setSelectCustomer,
            selectProduct,setSelectProduct,
       }=React.useContext(MainContext)

//=========================
const [showCustomer,setShowCustomer]=React.useState(false)

const [showModalConfirm,setShowModalConfirm]=React.useState(false)
//=========================
const [showModalError,setShowModalError]=React.useState({status:false,msg:""})
//====================================
const blankData=genBlankState({template:jobState}).state
//====================================
let [editData,setEditData]=React.useState(blankData)
//====================================
//Table
  const [filterData,setFilterData]=React.useState([blankData])
  const [reloadJob,setReloadJob] = React.useState(true);

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
    //filter and
    axiGet({qCondition:"$and",
    RtAndCt:'/job/getlimit',
    filterTemplate:jobFilter,
    inputState,
    setFilterData,
    pageNumber,setCount
    })
  } 
  const filterOption2=()=>{
    //filter or
    axiGet({qCondition:"$or",
    RtAndCt:'/job/getlimit',
    filterTemplate:jobFilter,
    inputState,
    setFilterData,
    pageNumber,setCount
    })
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
//==================
//==================
//ตาราง detail ใน addForm and editForm
//เรากำหนดขนาดของตาราง ในหน้านี้

let [showTable2,setShowTable2]=React.useState({
  width:1400,
  gridCol:""
})

//const [showModalTableSetting2,setShowModalTableSetting2] = React.useState(false)

const [tableTemplate2,setTableTemplate2]=React.useState({
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
  }) 
  
  React.useEffect(()=>{
    tableResize({tableTemplate:tableTemplate2,
                 showTable:showTable2,
                 setShowTable:setShowTable2})
  },[tableTemplate2])
  
  /*
  const [editDataDetail,setEditDataDetail]=React.useState(blankData.detail[0])
  
  React.useEffect(()=>{
    //console.log('editDataDetail')
    //console.log(editDataDetail)
  },[editDataDetail])
*/
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

const [filterOption,setFilterOption]=React.useState(0)
//=======================================
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
      setShowAdd(true)
  }},
  edit:{show:false,func:()=>{
      //setShowEdit(true)
  }},
  del:{show:editData.id?true:false,func:()=>{
    setShowModalConfirm(true)
  }},
})


let [pageNumber,setPageNumber]=React.useState(1)
let [count,setCount]=React.useState(0)

React.useEffect(()=>{
  //console.log(`pageNumber :${pageNumber}`)
  //console.log(`filterOption : ${filterOption}`)
  
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
//===================================
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

  //for table in form
  tableTemplate:tableTemplate2,
  setTableTemplate:setTableTemplate2,
  showTable:showTable2,
  setShowTable:setShowTable2,
  subFormTemplate:detailForm
  
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
React.useEffect(()=>{
  //console.log('editData')
  //console.log(editData)
  const temp=genRefAndValue({
      template:jobForm,
      FData:editData
      })
  setEditRefAndValue({...temp})

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


let param2={
  isAddForm:false,
  lb:'Edit Job',
  formTemplate:jobForm,
  stateTemplate:jobState,
  setShowModalError,
  //basicData,
  selectData:{basicData/*,customerData,productData*/},
  ref1:refEdit1,
  ref2:refEdit2,

  iconAction:[setShowCustomer],
  
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
  submitKey:"detail",
  //mainInputState:editData,

  reload:reloadJob,
  setReload:setReloadJob,

  //for table in form
  tableTemplate:tableTemplate2,
  setTableTemplate:setTableTemplate2,
  showTable:showTable2,
  setShowTable:setShowTable2,
  subFormTemplate:detailForm
}

//=============================
return (
    <div style={{width:"98.6vw",height:"100vh",
                backgroundColor:"lightgray",
                marginBottom:"1rem",marginTop:"4rem"}}>
   
      <div className="form-row flex-justify-start flex-align-start">
        
        <div className="bd-black xc8 md12 p-2" style={{height:"100vh",paddingBottom:"3rem",overflow:'auto'}}>
          <div className="div-center">
            <h1>งาน</h1>
          </div>
          {renderTable({
            tableTemplate,setTableTemplate,
            filterData,
            editData,setEditData,
            showTable,setShowTable,
            blankData})}
        </div>
        
        <div className="bd-red xc4 md12 p-2" style={{height:"100vh",paddingBottom:"3rem",overflow:'auto'}}>
          <div className="div-center">
            <h1>Job Detail</h1>    
          </div>
          {
          //render Detail Table
          renderTable({
            tableTemplate:tableTemplate2,
            setTableTemplate:setTableTemplate2,
            filterData:editData.detail,
            editData:null,
            setEditData:()=>{},
            showTable:showTable2,
            setShowTable:setShowTable2,
            blankData:blankData.detail[0]})          
          }      
        </div>  
      </div>    

        {renderModalTableSetting({
            show:showModalTableSetting,
            setShow:setShowModalTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate})}
    
        {renderModalFilterInput({
            show:showFilter,
            setShow:setShowFilter,
            title:"ค้นหางาน",
            filterTemplate:jobFilter,
            inputState,setInputState,
            filterData,setFilterData,
            //filterData:customerData,
            //setFilterData:setCustomerData,
            //RtAndCt:'/job/getcustom'
            setPageNumber,setCount,
            setFilterOption
        })}       
        {showAdd?<ModalForm2 param={param1}/>:null}
        {showEdit?<ModalForm2 param={param2}/>:null}
        {showCustomer
          ?<div className="Modal-background">
            <div className="Modal-box">
         
              <div className="Modal-body">
                <Customer/>
              </div>
           
              <div className="Modal-footer" style={{marginTop:"-3.5rem",marginBottom:"2rem"}}>
                <button
                  onClick={e=>{

                    if(selectCustomer){
                      //console.log('selectCustomer')
                      //console.log(selectCustomer)
                      setAddData({...addData,
                        customerId:selectCustomer.id,
                        title:selectCustomer.title,
                        name:selectCustomer.name,
                        surname:selectCustomer.surname,
                        phone:selectCustomer.phone,
                      })
                      setEditData({...editData,
                        customerId:selectCustomer.id,
                        title:selectCustomer.title,
                        name:selectCustomer.name,
                        surname:selectCustomer.surname,
                        phone:selectCustomer.phone,
                      })  
                    }
                    setShowCustomer(false)
                  }}
                >ตกลง</button>
                <button
                  onClick={e=>{
                    setShowCustomer(false)
                  }}
                >ยกเลิก</button>
              </div>
            </div>
          </div>
          :null
        }
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

        <div>
            {renderBadge({badgeState,
                          pageNumber,setPageNumber,
                          setReload:setReloadJob,
                          filterOption,setFilterOption,
                          count,setCount,
            })}
        </div>
    </div>
  );
}

export default Job;


