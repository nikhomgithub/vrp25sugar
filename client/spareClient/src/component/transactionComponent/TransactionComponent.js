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
import TransactionGroupComponent from './TransactionGroupComponent'
//import TransactionDetailComponent from '../transactionDetailComponent/TransactionDetailComponent'
import ModalPartnerComponent from '../partnerComponent/ModalPartnerComponent'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'

//====================
import ModalConfirm from '../../render/ModalConfirm'
//==================
//=================

const {transactionFilter}=FilterTemplate  
const {transactionForm}=FormTemplate      
const {transactionState}=StateTemplate

//==================
function TransactionComponent() {
    const {basicData,setBasicData,

        allTransaction,setAllTransaction,
        selectTransaction1,setSelectTransaction1,
        reloadTransaction,setReloadTransaction,
        selectTransactionGroup1,setSelectTransactionGroup1,
        
        widthLeft,setWidthLeft,

        selectPartner,setSelectPartner,
        selectProduct1,setSelectProduct1
        //swapState,setSwapState,
      }=React.useContext(MainContext)
//=============================
const [showModalConfirm,setShowModalConfirm]=React.useState(false)
const [showModalError,setShowModalError]=React.useState({status:false,msg:""})

const [showTableSetting,setShowTableSetting]=React.useState(false)
const [showFilter,setShowFilter]=React.useState(false)
const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
//const [reloadData,setReloadData]=React.useState(true)


//====================================
let [editData,setEditData]=React.useState(null)
let [pageNumber,setPageNumber]=React.useState(1)
let [count,setCount]=React.useState(0)
let [filterOption,setFilterOption]=React.useState(0)
let [limitRow,setLimitRow]=React.useState(10)
let [swapState,setSwapState]=React.useState(0)
let [badgeLayoutOption,setBadgeLayoutOption]=React.useState(0)
let [qry,setQry]=React.useState(null)
//===================================
const [showRange,setShowRange]=React.useState(true)
//==================================

const [showModalPartnerComponent,setShowModalPartnerComponent]=React.useState(false)
const [showModalProductComponent,setShowModalProductComponent]=React.useState(false)
const [iconActionData,setIconActionData]=React.useState(null)
const [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)
//==================================
React.useEffect(()=>{
  if(selectPartner){
    const {id,title,name,phone,address}=selectPartner
    setIconActionData({partnerId:id,title,name,phone,address})
  }
},[selectPartner])
//==================================
React.useEffect(()=>{
  if(selectProduct1){
    const {id,barcode,name,groupId,groupName,quantity,
           unit,price,result,remark,isRawMat}=selectProduct1
    setIconActionDataDetail({
        id,barcode,name,groupId,groupName,quantity,
        unit,price,result,remark,isRawMat
    })
  }
},[selectProduct1])

//==================================
React.useEffect(()=>{
    //console.log('editData')
    //console.log(editData)
    if(editData){
      setSelectTransaction1(editData)
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
//=================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:false,
    reloadShow:true,
    settingShow:true,
    filterShow:true,
    addShow:false,
    editShow:false,
    delShow:false,
    printerShow:true,
  })
//===============================


React.useEffect(()=>{
    if(selectTransactionGroup1){
      if(selectTransactionGroup1.id>0){
        setQry({groupId:selectTransactionGroup1.id})
        setPageNumber(1)
        setFilterOption(3)
        setReloadTransaction(true)
      }
    }


    if(selectTransactionGroup1){
      if(selectTransactionGroup1.id){
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
  },[selectTransactionGroup1])



//================================
const [tableTemplate,setTableTemplate]=React.useState({
    id            :
      { lb:'ID',     type:"number",
        width:40,   showCol:true,  showColHead:true,    
      },
    date           :
      { lb:'วันที่',type:"date",
      width: 90,   showCol:true,  showColHead:true,    
      }, 
    groupId      :
      { lb:'รหัสเอกสาร',type:"number",
        width:40,   showCol:true,  showColHead:true,      
    },  
    groupName      :
      { lb:'ชื่อเอกสาร',type:"string",
        width:60,   showCol:true,  showColHead:true,      
      },
    transactionStatus      :
      { lb:'สถานะเอกสาร',type:"string",
        width:60,   showCol:true,  showColHead:true,      
      },
    /*
    transactionType      :
      { lb:'ประเภทเอกสาร',type:"string",
        width:60,   showCol:true,  showColHead:true,      
      },
    effectStock      :
      { lb:'กระทบสต็อก',type:"string",
      width:60,   showCol:true,  showColHead:true,      
      },
    effectOrder      :
      { lb:'กระทบจอง',type:"string",
      width:60,   showCol:true,  showColHead:true,      
      },*/
    total            :
      { lb:'รวม',     type:"number",
      width:40,   showCol:true,  showColHead:true,    
      },
    reduction           :
      { lb:'ส่วนลด',     type:"number",
        width:40,   showCol:true,  showColHead:true,    
      },
    granTotal            :
      { lb:'สุทธิ',     type:"number",
        width:40,   showCol:true,  showColHead:true,    
      },

    partnerId      :
      { lb:'ไอดีคู่ค้า',type:"number",
        width:40,   showCol:true,  showColHead:true,      
      },  
    title          :
      { lb:'คำนำหน้า',type:"string",
        width:60,   showCol:true,  showColHead:true,    
      },
    name      :
      { lb:'ชื่อ',type:"string",
        width:100,   showCol:true,  showColHead:true,      
      },
    phone         :
      { lb:'โทรศัพท์', type:"array",
      width:110,   showCol:true,  showColHead:true,      
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
//=====================  
    //Filter
    let [inputState,setInputState]=React.useState({
        id:{toCheck:false,min:0,max:0},
        date:{toCheck:false,min:"2018-01-01",max:new Date().toISOString()},
        groupId:{toCheck:false,min:0,max:0},
        groupName:{toCheck:false,value:""},
        
        transactionStatus:{toCheck:false,value:""},
        //transactionType:{toCheck:false,value:""},
        //effectStock:{toCheck:false,value:""},
        //effectOrder:{toCheck:false,value:""},              

        partnerId:{toCheck:false,min:0,max:0},
        title:{toCheck:false,value:""},
        name:{toCheck:false,value:""},
        phone:{toCheck:false,value:""},
   
        remark:{toCheck:false,value:""},
        addressNumber:{toCheck:false,value:""},
        addressTambon:{toCheck:false,value:""},
        addressDistrict:{toCheck:false,value:""},
        addressProvince:{toCheck:false,value:""},
        addressPostcode:{toCheck:false,value:""},

        total:{toCheck:false,min:0,max:0},
        reduction:{toCheck:false,min:0,max:0},
        grandTotal:{toCheck:false,min:0,max:0},

        detailId:     {toCheck:false,min:0,max:0},
        detailBarcode:{toCheck:false,value:""},
        detailName:   {toCheck:false,value:""},
        detailGroupId:{toCheck:false,min:0,max:0},
        detailGroupName:{toCheck:false,value:""},
        detailUnit:   {toCheck:false,value:""},
        detailIsRawMat:   {toCheck:false,value:false},

        detailPrice:  {toCheck:false,min:0,max:0},
        detailQuantity: {toCheck:false,min:0,max:0},
        detailRemark: {toCheck:false,value:""},

    })
//===================================
const actionAfterSuccess=()=>{
    setReloadTransaction(true)
  }
//===================================

//===================================
let param1={
    isAddForm:false,
    lb:'เพิ่มเอกสาร',
    formTemplate:transactionForm,
    stateTemplate:transactionState,
    
    selectData:{basicData},
    loadData:selectTransactionGroup1?{
        groupId:selectTransactionGroup1.id,
        groupName:selectTransactionGroup1.groupName,
        transactionType:selectTransactionGroup1.transactionType,
        effectStock:selectTransactionGroup1.effectStock,
        effectOrder:selectTransactionGroup1.effectOrder
    }:null,//null,
    show:showAdd,
    setShow:setShowAdd,
    url:'/transaction/addcustom',
  
    keyName:["photoUrl1"],
    //submitOption:0,
    iconAction:[()=>{setShowModalPartnerComponent(true)}],//null
    iconActionData,
    iconActionDataDetail,
    actionAfterSuccess:actionAfterSuccess,//()=>{}
    useGenFD:true,
    createTableTemplate:transactionForm.detail.subFormTemplate
  }
  
  let param2={
    isAddForm:false,
    lb:'แก้ไขเอกสาร',
    formTemplate:transactionForm,
    stateTemplate:transactionState,
    
    selectData:{basicData},
    loadData:editData,
    show:showEdit,
    setShow:setShowEdit,
    url:'/transaction/updatecustom',
  
    keyName:["photoUrl1"],
    //submitOption:0,
    iconAction:[()=>{setShowModalPartnerComponent(true)}],//null
    iconActionData,
    iconActionDataDetail,
    actionAfterSuccess:actionAfterSuccess,//()=>{}
    useGenFD:true,
    createTableTemplate:transactionForm.detail.subFormTemplate

  }
//===================================
//------------------------------
const renderTable=()=>{
    return(
      <Table
      filterData={allTransaction} setFilterData={setAllTransaction}     
  
      stateTemplate={transactionState}
      filterTemplate={transactionFilter}
  
      tableTemplate={tableTemplate} setTableTemplate={setTableTemplate}
      editData={editData} setEditData={setEditData}
  
      inputState={inputState} setInputState={setInputState}
      pageNumber={pageNumber} setPageNumber={setPageNumber}
      setCount={setCount}
      url={"/transaction/getlimit"}
      reloadData={reloadTransaction} setReloadData={setReloadTransaction}
      limitRow={limitRow} setLimitRow={setLimitRow}
  
      showFilter={showFilter} setShowFilter={setShowFilter}
      filterOption={filterOption} setFilterOption={setFilterOption}
  
      showTableSetting={showTableSetting} 
      setShowTableSetting={setShowTableSetting}
  
      titleFilter={"ค้นหาธุรกรรม"}
  
      qry={qry}
          
    />       
    )
  }
  
//=============================
const renderTransactionGroupAndTransactionComponent=()=>{


      
      return (
      <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
          {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
  
          <div className="h-100 bd-black" 
              style={{paddingTop:"0.5rem",width:`${widthLeft}%`}}>
                <TransactionGroupComponent selectGroup={selectTransactionGroup1} setSelectGroup={setSelectTransactionGroup1}/>
          </div>
  
          <div className="h-100 bd-black" 
              style={{width:`${100-widthLeft}%`}}>
                        
              <div style={{height:"5%"}}>                
                <h5 style={{textAlign:"center"}}>ธุรกรรม</h5>
              </div>
              
              <div className="w-100" style={{height:`95%`}}>
                {renderTable()}
              </div>
        
          </div>
      
      </div>  
      )
      
}
     
//=============================      
return (
    <div className="w-100 h-100">
        <div className="w-100 h-100 hide-on-print">
            {
                renderTransactionGroupAndTransactionComponent()
            }

            {showModalConfirm
            ?< ModalConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                url={'/transaction/deletecustom'}
                editData={editData}
                //setShowModalError,
                setReload={setReloadTransaction}
                submitOption={0}
                actionAfterSuccess={actionAfterSuccess}
            />
            :null
            }
    
            {showAdd?<ModalForm param={param1}/>:null}
            {showEdit?<ModalForm param={param2}/>:null}

            {showModalPartnerComponent
              ?<ModalPartnerComponent 
                  funcOK={    ()=>setShowModalPartnerComponent(false)}
                  funcCancel={()=>{
                    setShowModalPartnerComponent(false)
                    setSelectPartner(null)
                  }}
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
                
                swapState,setSwapState,
                reloadData:reloadTransaction,
                setReloadData:setReloadTransaction,
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

export default TransactionComponent;
