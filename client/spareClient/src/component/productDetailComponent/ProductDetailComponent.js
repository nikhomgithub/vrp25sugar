import React from 'react';

//==========
import SubTable from '../table/SubTable'

//==========
import renderBadge from '../../render/renderBadge/renderBadge'

//===================
import {MainContext} from '../../context/MainContext'
//===================
import StateUtil from '../../model/StateUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalSubForm from '../../render/renderForm/ModalSubForm'

import ModalProductComponent from '../ModalProductComponent/ModalProductComponent'
//==================
import ModalSubFormConfirm from '../../render/ModalSubFormConfirm'
//==================
const {productForm,productDetailForm}=FormTemplate      
const {productState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil
//==================

function ProductDetailComponent({selectProduct,setSelectProduct}) {

    const {basicData,setBasicData,
           selectProduct2,setSelectProduct2,
           selectGroup2,setSelectGroup2,
           reloadProduct,setReloadProduct,
           widthLeft,setWidthLeft
           
          }=React.useContext(MainContext)

//====================

const [filterData,setFilterData]=React.useState(selectProduct.detail)
let [iconActionData,setIconActionData]=React.useState(null)

React.useEffect(()=>{
    //Everytime basicData change in context, data in BasicData also change dynamically
    if(selectProduct){
        setFilterData(selectProduct.detail)
    }
},[selectProduct])

React.useEffect(()=>{

    if(selectProduct2){
      if(selectProduct2.id>0){
        const {id,barcode,name,groupId,groupName,unit,isRawMat} = selectProduct2
        const temp={ id,barcode,name,groupId,groupName,unit,isRawMat}
        setIconActionData(temp)
      }
    }

},[selectProduct2])

//====================
const [showModalConfirm,setShowModalConfirm]=React.useState(false)

const [showTableSetting,setShowTableSetting]=React.useState(false)
const [showFilter,setShowFilter]=React.useState(false)
const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
const [reloadData,setReloadData]=React.useState(true)

const [showModalProductComponent,setShowModalProductComponent]=React.useState(false)
//====================    

//======================

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
    isRawMat      :
    { lb:'เป็นวัตถุดิบ',type:"boolean",
      width:60,   showCol:true,  showColHead:true,      
    },   
    quantity      :
    { lb:'จำนวน',type:"number",
      width:40,   showCol:true,  showColHead:true,      
    }, 
    remark      :
    { lb:'หมายเหตุ',type:"string",
      width:200,   showCol:true,  showColHead:true,      
    },  

})  

//========================
//==================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:false,
    reloadShow:true,
    settingShow:true,
    filterShow:false,
    addShow:true,
    editShow:false,
    delShow:false,
    printerShow:false,
  })
//====================================
//========================

const actionAfterSuccess=(formInputState)=>{
      setReloadProduct(true)
      setShowEdit(false)
      setShowAdd(false)
}


const actionAfterUpdate=()=>{
      setShowModalConfirm(false)
      setReloadProduct(true)
}

  //==========================
  const blankData = genBlankState({template:productState}).state
  //const [showEdit,setShowEdit]=React.useState(false)
  //const [showAdd,setShowAdd]=React.useState(false)
  const [editData,setEditData]=React.useState(null)
  const [addData,setAddData]=React.useState(blankData.detail[0])

  
  React.useEffect(()=>{
      console.log('editData')
      console.log(editData)
      if(editData){
        setBadgeState({...badgeState, ['editShow']:true,['delShow']:true})  
      }
      else{
        setBadgeState({...badgeState, ['editShow']:false,['delShow']:false})  
      }

  },[editData])
  
  const paramEditDetail={
    isAddForm:false,
    lb:'แก้ไขสินค้าย่อย',
    formTemplate:productDetailForm,
    stateTemplate:productState.detail.stChildren,
  
    selectData:{basicData},
    loadData:editData,
    show:showEdit,
    setShow:setShowEdit,
    url:'/product/updatecustom',
  
    iconAction:[setShowModalProductComponent],//null,[()=>{}],
    iconActionData,

    actionAfterSuccess:actionAfterSuccess,//()=>{}
    useGenFD:false,

    mainData:selectProduct,
    subField:'detail'
  }
  
  //==============
  const paramAddDetail={
    isAddForm:false,
    lb:'เพิ่มสินค้าย่อย',
    formTemplate:productDetailForm,
    stateTemplate:productState.detail.stChildren,
  
    selectData:{basicData},
    loadData:addData,
    show:showAdd,
    setShow:setShowAdd,
    url:'/product/updatecustom',

    iconAction:[setShowModalProductComponent],//null,[()=>{}],
    iconActionData,

    actionAfterSuccess:actionAfterSuccess,//()=>{}
    useGenFD:false,

    mainData:selectProduct,
    subField:'detail'
  }
  
  //======================



  //======================
return(

    <div className="h-100 w-100">
        
      
            <div style={{height:"5%"}}>                
                  <h5 style={{textAlign:"center"}}
                  >สินค้าย่อย</h5>
                
            </div>
            <div className="w-100" style={{height:`95%`}}>
    
                <SubTable
                    tableTemplate={tableTemplate}
                    setTableTemplate={setTableTemplate}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    editData={editData}
                    setEditData={setEditData}
                
                    showTableSetting={showTableSetting}
                    setShowTableSetting={setShowTableSetting}
                /> 

            </div>  

        {/*===========*/}

        {showEdit?<ModalSubForm param={paramEditDetail}/>:null}
        {showAdd?<ModalSubForm param={paramAddDetail}/>:null}

        {
        showModalConfirm
        ?<ModalSubFormConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                url={'/product/updatecustom'}
                mainData={selectProduct}
                subField={'detail'}
                editData={editData}
                stateTemplate={productState}

                submitOption={1}
                actionAfterSuccess={actionAfterUpdate}
        />
        :null
        }

        {
          showModalProductComponent
          ?<ModalProductComponent
            funcOK={()=>setShowModalProductComponent(false)}
            funcCancel={()=>{
              setShowModalProductComponent(false)
              setSelectProduct2(null)
              setSelectGroup2(null)
            }}
          />
          :null
        }

        {
          renderBadge({
            badgeState,
            badgeLayoutOption:2,
            barWidth:100-widthLeft,
    
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

);
}

export default ProductDetailComponent;