import React from 'react';

import ModalComponent from '../../render/ModalComponent';
import {MainContext} from '../../context/MainContext'

import Table from  '../table/Table'
import renderTableRangeBar from '../table/renderTableRangeBar'
import Group from '../../page/group/Group'
import renderBadge from '../../render/renderBadge/renderBadge';

import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import StateTemplate from '../../model/StateTemplate'

const {productFilter}=FilterTemplate   
const {productState}=StateTemplate

//===============================

function GroupAndProductTable () {

const {
        allProduct2,setAllProduct2,
        selectProduct2,setSelectProduct2,
        selectGroup2,setSelectGroup2,
        widthLeft,setWidthLeft,
        reloadProduct,setReloadProduct,

        }=React.useContext(MainContext)

const [showRange,setShowRange]=React.useState(true)

const [showModalConfirm,setShowModalConfirm]=React.useState(false)

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
//==================================
//Badge
const [badgeState,setBadgeState] =React.useState({
        swapShow:false,
        reloadShow:true,
        settingShow:true,
        filterShow:true,
        addShow:false,
        editShow:false,
        delShow:false,
        printerShow:false,
})
//====================================
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
    
//===============================
React.useEffect(()=>{
//console.log('editData')
//console.log(editData)
        if(editData){
                setSelectProduct2(editData)
        }

},[editData])     
//=================================

React.useEffect(()=>{
  
  if(selectGroup2){
    if(selectGroup2.id>0){
      setQry({groupId:selectGroup2.id})
      setPageNumber(1)
      setFilterOption(3)
      setReloadProduct(true)
    }
  }
  
},[selectGroup2])


//==================================
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
    
//====================================
//------------------------------

const renderTable=()=>{
        return(
        <Table
          filterData={allProduct2} setFilterData={setAllProduct2}     
      
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
      
//======================================

const renderGroupAndProductComponent=()=>{
return(
<div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}

        <div className="h-100 bd-black" 
             style={{paddingTop:"0.5rem",width:`${widthLeft}%`}}>
                <Group selectGroup={selectGroup2} setSelectGroup={setSelectGroup2}/>
        </div>

        <div className="h-100 bd-black" 
             style={{paddingTop:"0.5rem",
                width:`${100-widthLeft}%`}}>
                {renderTable()}
        </div>

</div>  
)}


return (
<div className="w-100 h-100">
   <div className="w-100 h-100 hide-on-print">
        {renderGroupAndProductComponent()}

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
       
)
}

export default GroupAndProductTable;
