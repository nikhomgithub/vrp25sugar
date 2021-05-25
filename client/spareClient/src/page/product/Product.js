import React from 'react';

import DataComponent from '../../component/dataComponent/DataComponent'
import ModalComponent from '../../render/ModalComponent'
import GroupComponent from '../../component/dataComponent/GroupComponent'

import tableTemplate from '../../component/table/tableTemplate'
import inputState from '../../component/table/inputState'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'

import {MainContext} from '../../context/MainContext'

const {productTableTemplate,productDetailTableTemplate}=tableTemplate

const {productInputState} = inputState
const {productFilter}=FilterTemplate  

const {productForm,groupForm}=FormTemplate      
const {productState,groupState}=StateTemplate

function Product() {

let [iconActionData,setIconActionData]=React.useState(null)
let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

const [selectDataOut1,setSelectDataOut1]=React.useState(null)
const [selectDataOut2,setSelectDataOut2]=React.useState(null)

const [selectGroup,setSelectGroup]=React.useState(null)

const [showModalComponent1,setShowModalComponent1]=React.useState(false)
const [showModalComponent2,setShowModalComponent2]=React.useState(false) 

//============================
const calculation =({location,value,refAndValue})=>{

  let temp={...refAndValue}
  //if location is ["detail",1,"price"]
  //if location is ["detail",1,"quantity"]


  if(location.length==3){
    if(location[0]=="detail"){
    
        if(location[2]=="quantity"){

          const quantity=value
          const price=temp["detail"][location[1]]["price"].value

          temp["detail"][location[1]]["result"].value=price*quantity

        }
        if(location[2]=="price"){

          const price =value
          const quantity = temp["detail"][location[1]]["quantity"].value
          temp["detail"][location[1]]["result"].value=price*quantity

        }


        //recal total, grandTotal
        let total=0

        temp["detail"].map(i=>{
          total=total+i.result.value
        })
       
    }
  }


  return temp
}


//===========================

return (
    < div className="w-100 h-100">
        
        <DataComponent    
            lb={["สินค้า","กลุ่มสินค้า","สินค้าย่อย"]}    
            inRouteName={"product"}
            colorHead={["#BE4944","#EB9FA9"]}
            totalSwapPage={2}

            inLimitRow={10}
            inState={productState}
            inFilter={productFilter}
            inForm={productForm}
            inKeyPhoto={["photoUrl1"]}
            inIconAction={ [setShowModalComponent1,setShowModalComponent2] }
            
            inInputState={productInputState}
            inTableTemplate={productTableTemplate}
            inDetailTableTemplate={productDetailTableTemplate}

            inGroupState={groupState}
            inGroupForm={groupForm}
            inRouteGroupName={"group"}
            inKeyArray={["id","groupName"]}
            
            iconActionData={iconActionData}
            iconActionDataDetail={iconActionDataDetail}

            selectDataOut={selectDataOut1}
            setSelectDataOut={setSelectDataOut1} 

            canChangeData={true}
            calculation={calculation}
        />

    {
      showModalComponent1
      ?<ModalComponent
        funcOK={e=>{
          const {id,groupName}=selectGroup
          setIconActionData({groupId:id,groupName})
          setShowModalComponent1(false)
        }}
        funcCancel={e=>{setShowModalComponent1(false)}}
        fullScreen={true}
       >
            <GroupComponent 
              selectGroup={selectGroup} setSelectGroup={setSelectGroup}
              groupState={groupState} groupForm={groupForm}
              lb={"กลุ่มสินค้า"} routeName={"group"}
              keyArray={["id","groupName"]}
            />
      </ModalComponent>
      :null 
    }

    {
      showModalComponent2
      ?<ModalComponent
        funcOK={e=>{
          const {id,barcode,name,groupId,groupName,unit,isRawMat}=selectDataOut2
          setIconActionDataDetail({id,barcode,name,groupId,groupName,unit,isRawMat})
          setShowModalComponent2(false)
        }}
        funcCancel={e=>{setShowModalComponent2(false)}}
        fullScreen={true}
       >
        
        <DataComponent    
            lb={["สินค้า","กลุ่มสินค้า","สินค้าย่อย"]}    
            inRouteName={"product"}
            colorHead={["#005900","#7A794A"]}
            totalSwapPage={2}
            
            inLimitRow={10}
            inState={productState}
            inFilter={productFilter}
            inForm={productForm}
            inKeyPhoto={["photoUrl1"]}
            inIconAction={[]}
            
            inInputState={productInputState}
            inTableTemplate={productTableTemplate}

            inGroupState={groupState}
            inGroupForm={groupForm}
            inRouteGroupName={"group"}
            inKeyArray={["id","groupName"]}
            
            selectDataOut={selectDataOut2}
            setSelectDataOut={setSelectDataOut2} 

            canChangeData={false}
        />


      </ModalComponent>
      :null
    }


    </div>
)
}

export default Product;
