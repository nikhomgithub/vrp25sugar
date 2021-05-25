import React from 'react';

//==========
import SubTable from '../table/SubTable'

//===================
import {MainContext} from '../../context/MainContext'

//==================

function ProductDetailComponent({selectDataIn,setSelectDataIn}) {

//====================

const [filterData,setFilterData]=React.useState(selectDataIn.detail)
const [editData,setEditData]=React.useState(null)
const [showTableSetting,setShowTableSetting]=React.useState(false)

React.useEffect(()=>{
    //Everytime basicData change in context, data in BasicData also change dynamically
    if(selectDataIn){
        setFilterData(selectDataIn.detail)
    }
},[selectDataIn])

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




    </div>

);
}

export default ProductDetailComponent;