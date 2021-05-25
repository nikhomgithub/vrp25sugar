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

const {productTableTemplate,productDetailTableTemplate,
    partnerTableTemplate,
    transactionTableTemplate}=tableTemplate

const {productInputState,partnerInputState,transactionInputState} = inputState
const {productFilter,partnerFilter,transactionFilter}=FilterTemplate  

const {productForm,groupForm,
    partnerForm,partnerGroupForm,
    transactionForm,transactionGroupForm }=FormTemplate      
const {productState,groupState,
    partnerState,partnerGroupState,
    transactionState,transactionGroupState}=StateTemplate

function Transaction() {
    const {
      }=React.useContext(MainContext)

    let [iconActionData,setIconActionData]=React.useState(null)
    let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)
    
    const [selectDataOut1,setSelectDataOut1]=React.useState(null)
    const [selectDataOut2,setSelectDataOut2]=React.useState(null)
    const [selectDataOut3,setSelectDataOut3]=React.useState(null)
    
    const [selectTransactionGroup,setSelectTransactionGroup]=React.useState(null)

         
    React.useEffect(()=>{
      console.log('iconActionData')
      console.log(iconActionData)
    },[iconActionData]) 

    React.useEffect(()=>{
      console.log('selectTransactionGroup')
      console.log(selectTransactionGroup)
    },[selectTransactionGroup])
    
    const [showModalComponent1,setShowModalComponent1]=React.useState(false)
    const [showModalComponent2,setShowModalComponent2]=React.useState(false) 
    const [showModalComponent3,setShowModalComponent3]=React.useState(false)

    
    React.useEffect(()=>{
      //console.log('selectDataOut1')
      //console.log(selectDataOut1)
    },[selectDataOut1])

    React.useEffect(()=>{
      //console.log('selectDataOut2')
      //console.log(selectDataOut2)
    },[selectDataOut2])

    React.useEffect(()=>{
      //console.log('selectDataOut3')
      //console.log(selectDataOut3)
    },[selectDataOut3])

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
            temp.total.value=total
            temp.grandTotal.value=total-temp.reduction.value
        }
      }

      if(location.length==1){
        if(location[0]=="total"){
          const total=value
          const reduction = temp["reduction"].value
          temp["grandTotal"].value=total-reduction
        }
        if(location[0]=="reduction"){
          const reduction=value
          const total=temp["total"].value
          temp["grandTotal"].value=total-reduction
        }
      }
      /*
      location.map(i=>{ temp=temp[i]})
      temp.value=value
      setRefAndValue({...refAndValue})
      */

      return temp
    }

return (
< div className="w-100 h-100">
    

    <DataComponent    
        lb={["ธุรกรรม","ประเภทธุรกรรม","รายงาน รายการสินค้า"]}    
        inRouteName={"transaction"}
        colorHead={["#734C7E","#A87EB3"]}
        totalSwapPage={2}

        inLimitRow={10}
        inState={transactionState}
        inFilter={transactionFilter}
        inForm={transactionForm}
        inKeyPhoto={["photoUrl1"]}
        inIconAction={[setShowModalComponent1,setShowModalComponent2,setShowModalComponent3]}
        
        inInputState={transactionInputState}
        inTableTemplate={transactionTableTemplate}
        inDetailTableTemplate={productDetailTableTemplate}

        inGroupState={transactionGroupState}
        inGroupForm={transactionGroupForm}
        inRouteGroupName={"transactiongroup"}
        inKeyArray={["id","groupName","effectOrder","effectStock","effectPlan"]}
        
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
          const {id,title,name,phone,address}=selectDataOut1
          setIconActionData({partnerId:id,title,name,phone,address})
          setShowModalComponent1(false)
        }}
        funcCancel={e=>{setShowModalComponent1(false)}}
        fullScreen={true}
       >
        <DataComponent    
            lb={["คู่ค้า","ประเภทคู่ค้า",""]}    
            inRouteName={"partner"}
            colorHead={["#004C74","#597A98"]}
            totalSwapPage={1}

            inLimitRow={10}
            inState={partnerState}
            inFilter={partnerFilter}
            inForm={partnerForm}
            inKeyPhoto={["photoUrl1"]}
            inIconAction={[]}
            
            inInputState={partnerInputState}
            inTableTemplate={partnerTableTemplate}

            inGroupState={partnerGroupState}
            inGroupForm={partnerGroupForm}
            inRouteGroupName={"partnergroup"}
            inKeyArray={["id","groupName"]}
            
            selectDataOut={selectDataOut1}
            setSelectDataOut={setSelectDataOut1} 
            canChangeData={false}
        />
      </ModalComponent>
      :null
    }

    {
      showModalComponent2
      ?<ModalComponent
        funcOK={e=>{
          const {id,groupName,effectStock,effectOrder,effectPlan}=selectTransactionGroup
          setIconActionData({groupId:id,groupName,effectOrder,effectStock,effectPlan})
          setShowModalComponent2(false)
        }}
        funcCancel={e=>{setShowModalComponent2(false)}}
        fullScreen={true}
       >
            <GroupComponent 
              selectGroup={selectTransactionGroup} setSelectGroup={setSelectTransactionGroup}
              groupState={transactionGroupState} groupForm={transactionGroupForm}
              lb={"ประเภทธุรกรรม"} routeName={"transactiongroup"}
              keyArray={["id","groupName","effectOrder","effectStock","effectPlan"]}
            />
      </ModalComponent>
      :null 
    }   


    {
      showModalComponent3
      ?<ModalComponent
        funcOK={e=>{
          const {id,barcode,name,groupId,groupName,unit,price,isRawMat}=selectDataOut3
          setIconActionDataDetail({id,barcode,name,groupId,groupName,unit,price,isRawMat})
          setShowModalComponent3(false)
        }}
        funcCancel={e=>{setShowModalComponent3(false)}}
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
            

            selectDataOut={selectDataOut3}
            setSelectDataOut={setSelectDataOut3} 

            canChangeData={false}
        />


      </ModalComponent>
      :null
    }
    

</div>
)
}

export default Transaction;
