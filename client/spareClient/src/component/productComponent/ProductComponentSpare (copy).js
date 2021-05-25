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
import Group from '../../page/group/Group'
import ProductDetailComponent from '../productDetailComponent/ProductDetailComponent'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'

//====================
import ModalConfirm from '../../render/ModalConfirm'
//==================
//=================

const {productFilter}=FilterTemplate  
const {productForm}=FormTemplate      
const {productState}=StateTemplate

//==================
function ProductComponent() {

  const {basicData,setBasicData,

        allProduct,setAllProduct,
        selectProduct1,setSelectProduct1,
        reloadProduct,setReloadProduct,
        selectGroup1,setSelectGroup1,
        
        widthLeft,setWidthLeft,
        
        //swapState,setSwapState,
      }=React.useContext(MainContext)

//================================
//  const [filterData,setFilterData]=React.useState(null)
//=====================
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
  //===============================
  React.useEffect(()=>{
    if(swapState==0){
      setBadgeLayoutOption(0)
    }
    else if(swapState==1){
      setBadgeLayoutOption(0)
    }
    else if(swapState==2){
      setBadgeLayoutOption(1)
    }
  },[swapState])

  //===============================
  React.useEffect(()=>{
    //console.log('editData')
    //console.log(editData)
    if(editData){
      setSelectProduct1(editData)
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
    swapShow:true,
    reloadShow:true,
    settingShow:true,
    filterShow:true,
    addShow:false,
    editShow:false,
    delShow:false,
    printerShow:true,
  })
  //====================================


  React.useEffect(()=>{
    if(selectGroup1){
      if(selectGroup1.id>0){
        setQry({groupId:selectGroup1.id})
        setPageNumber(1)
        setFilterOption(3)
        setReloadProduct(true)
      }
    }


    if(selectGroup1){
      if(selectGroup1.id){
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
  },[selectGroup1])

  //===========================


  //===========================  
  const [tableTemplate,setTableTemplate]=React.useState({
      id            :
        { lb:'ID',     type:"number",
          width:40,   showCol:true,  showColHead:true,    
        },
      barcode           :
        { lb:'บาร์โคด',type:"string",
          width:60,   showCol:true,  showColHead:true,    
        },
      name      :
        { lb:'ชื่อ',type:"string",
          width:100,   showCol:true,  showColHead:true,      
        },
      groupId      :
        { lb:'ไอดีกลุ่ม',type:"number",
          width:40,   showCol:true,  showColHead:true,      
        },  
      groupName      :
        { lb:'ชื่อกลุ่ม',type:"string",
          width:60,   showCol:true,  showColHead:true,      
        }, 
      unit      :
        { lb:'หน่วย',type:"string",
          width:40,   showCol:true,  showColHead:true,      
        },
      price       :
        { lb:'ราคา',type:"arrayObject",
          width:150,   showCol:true,  showColHead:true,
          children:{
              price:{lb:"B"},
              remark:{lb:"*"},
          }
        },
      isRawMat      :
        { lb:'เป็นวัตถุดิบ',type:"boolean",
          width:60,   showCol:true,  showColHead:true,      
        },   
      stock      :
        { lb:'ยอดสต็อค',type:"number",
          width:60,   showCol:true,  showColHead:true,      
        },   
      order      :
        { lb:'ยอดจอง',type:"number",
          width:60,   showCol:true,  showColHead:true,      
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
  
//==========================
  let [inputState,setInputState]=React.useState({
    id:     {toCheck:false,min:0,max:0},
    barcode:{toCheck:false,value:""},
    name:   {toCheck:false,value:""},
    groupId:{toCheck:false,min:0,max:0},
    groupName:{toCheck:false,value:""},
    unit:   {toCheck:false,value:""},
    isRawMat:   {toCheck:false,value:false},
    stock:{toCheck:false,min:0,max:0},
    order:{toCheck:false,min:0,max:0},

    pricePrice:  {toCheck:false,min:0,max:0},
    priceRemark: {toCheck:false,value:""},
    remark: {toCheck:false,value:""},
  })

  
//===================
const actionAfterSuccess=()=>{
  setReloadProduct(true)
}
//===================
let param1={
  isAddForm:false,
  lb:'เพิ่มสินค้า',
  formTemplate:productForm,
  stateTemplate:productState,
  
  selectData:{basicData},
  loadData:selectGroup1?{groupId:selectGroup1.id,groupName:selectGroup1.groupName}:null,//null,
  show:showAdd,
  setShow:setShowAdd,
  url:'/product/addcustom',

  keyName:["photoUrl1"],
  //submitOption:0,
  iconAction:null,//[()=>{}],
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,

}

let param2={
  isAddForm:false,
  lb:'แก้ไขสินค้า',
  formTemplate:productForm,
  stateTemplate:productState,
  
  selectData:{basicData},
  loadData:editData,
  show:showEdit,
  setShow:setShowEdit,
  url:'/product/updatecustom',

  keyName:["photoUrl1"],
  //submitOption:0,
  iconAction:null,//[()=>{}]
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:true,
}
//==================================

const [showRange,setShowRange]=React.useState(true)
//const [widthLeft,setWidthLeft]=React.useState(30)

//------------------------------
//------------------------------
const renderTable=()=>{
  return(
    <Table
    filterData={allProduct} setFilterData={setAllProduct}     

    stateTemplate={productState}
    filterTemplate={productFilter}

    tableTemplate={tableTemplate} setTableTemplate={setTableTemplate}
    editData={editData} setEditData={setEditData}

    inputState={inputState} setInputState={setInputState}
    pageNumber={pageNumber} setPageNumber={setPageNumber}
    setCount={setCount}
    url={"/product/getlimit"}
    reloadData={reloadProduct} setReloadData={setReloadProduct}
    limitRow={limitRow} setLimitRow={setLimitRow}

    showFilter={showFilter} setShowFilter={setShowFilter}
    filterOption={filterOption} setFilterOption={setFilterOption}

    showTableSetting={showTableSetting} 
    setShowTableSetting={setShowTableSetting}

    titleFilter={"ค้นหาสินค้า"}

    qry={qry}
        
  />       
  )
}

//------------------------------
const renderGroupAndProductComponent=()=>{

  if(swapState==0){
    
    return (
    <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}

        <div className="h-100 bd-black" 
            style={{paddingTop:"0.5rem",width:`${widthLeft}%`}}>
              <Group selectGroup={selectGroup1} setSelectGroup={setSelectGroup1}/>
        </div>

        <div className="h-100 bd-black" 
            style={{width:`${100-widthLeft}%`}}>
                      
            <div style={{height:"5%"}}>                
              <h5 style={{textAlign:"center"}}>สินค้า</h5>
            </div>
            
            <div className="w-100" style={{height:`95%`}}>
              {renderTable()}
            </div>
      
        </div>
    
    </div>  
    )
    
  }
  else if(swapState==1){
    return(
    <div className="w-100 h-100 " style={{overflow:"hidden"}}>
        <div style={{height:"5%"}}>                
          <h5 style={{textAlign:"center"}}>สินค้า</h5>
        </div>
            
        <div className="w-100" style={{height:`95%`}}>
          {renderTable()}
        </div>
    </div>
    )
  }
  /*
  <div className="xc12 h-100 bd-black" style={{paddingTop:"0.5rem"}}>
    {renderTable()}
  </div>
  */
  else if(swapState==2){
    return(
      <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
      {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}

      <div className="h-100 bd-black" style={{width:`${widthLeft}%`}}>
        <div style={{height:"5%"}}>                
          <h5 style={{textAlign:"center"}}>สินค้า</h5>
        </div>
            
        <div className="w-100" style={{height:`95%`}}>
          {renderTable()}
        </div>
        
      </div>

      <div className="h-100 bd-black" 
          style={{paddingTop:"0.5rem",
                  width:`${100-widthLeft}%`}}>
            
            
            {selectProduct1
            ?<ProductDetailComponent 
                  selectProduct={selectProduct1} 
                  setSelectProduct={setSelectProduct1}
            />
            :null
            }

      </div>
  
  </div>  
    )
  }
  else {
    return null
  }
}

//==================================
return (
  <div className="w-100 h-100">
    <div className="w-100 h-100 hide-on-print">


    {
     renderGroupAndProductComponent()
    }

   
 
    {showModalConfirm
      ?< ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={'/product/deletecustom'}
        editData={editData}
        //setShowModalError,
        setReload={setReloadProduct}
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
        barWidth:widthLeft,
        
        swapState,setSwapState,
        reloadData:reloadProduct,
        setReloadData:setReloadProduct,
        showTableSetting,setShowTableSetting,
        showFilter,setShowFilter,
        showAdd,setShowAdd,
        showEdit,setShowEdit,
        setShowModalConfirm
      })
    } 
    </div>
  </div>
  );
}

export default ProductComponent;


  /*
  const [qry,setQry]=React.useState({})

  React.useEffect(()=>{
    //console.log(`selectGroupId : ${selectGroupId}`)

    if(selectGroupId){
      setQry({groupId:selectGroupId})
      setPageNumber(1)
      setFilterOption(3)
      setReloadData(true)
    }

    if(selectGroupId>0){

      setBadgeState({...badgeState, addShow:true})
    }
    else{ setBadgeState({...badgeState,addShow:false})
    }

  },[selectGroupId])
  */