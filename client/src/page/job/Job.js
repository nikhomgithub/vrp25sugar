import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'
import CardTemplate from '../../component/card/CardTemplate'
//import './App2.css'

function Job() {

const {customerForm,jobForm}=FormTemplate
const {customerState,jobState}=StateTemplate
const {customerFilter,jobFilter}=FilterTemplate
const {customerInputState,jobInputState}=inputState
const {jobCard}=CardTemplate

//=======================================
const [isSecond,setIsSecond]=React.useState(false)
React.useEffect(()=>{
    if(!isSecond){
        setIsSecond(true)
    }
},[isSecond])    

//=======================================
const [showCustomerModal,setShowCustomerModal]=React.useState(false)
const {basicData,widthLeft,setWidthLeft,myheader}=React.useContext(MainContext)

const [selectCustomer,setSelectCustomer]=React.useState(null)

const [iconActionData,setIconActionData]=React.useState(null)

React.useEffect(()=>{
    if(selectCustomer){
    setIconActionData({customerId:selectCustomer.id,
                       title:selectCustomer.title,
                       name:selectCustomer.name,
                       surname:selectCustomer.surname,
                       phone:selectCustomer.phone
                    })
    }
},[selectCustomer])


return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    <PageComponent
        basicData={basicData}
        dataForm={jobForm}
        dataState={jobState}
        dataFilter={jobFilter}
        dataInputState={jobInputState}
        tableTitle={"ตารางงาน"}
        graphTitle={"กราฟข้อมูลงาน"}
        addFormTitle={"เพิ่มข้อมูลงาน"}
        editFormTitle={"แก้ไขข้อมูลงาน"}
        
        tableHeadColor={"#F7786B"}
        graphColor={"#FF6F61"}
        dataUrl={"job"}
        canDataChange={true}
        dataTableTemplateName={"jobTableTemplate"}

        iconAction={[
                     ()=>setShowCustomerModal(true),
                    ]}
        iconActionData={iconActionData}

        cardTemplate={jobCard}
        cardTitle={"แสดงงานอัตโนมัติ"}
        intervalTime={4000}
        myheader={myheader}
        totalSwapPage={3}
        swapPageOption={["table","table-graph","card"]}
        keyName={["photoUrl1"]}
    />

    {showCustomerModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({customerId:"",
                title:"",
                name:"",
                surname:"",
                phone:[],
                address:[]

             })
            setShowCustomerModal(false)
        }}
        funcOK={()=>setShowCustomerModal(false)}

        children={
            <PageComponent
                basicData={basicData}
                dataForm={customerForm}
                dataState={customerState}
                dataFilter={customerFilter}
                dataInputState={customerInputState}
                tableTitle={"ตารางลูกค้า"}

                tableHeadColor={"#6B5B95"}
                dataUrl={"customer"}

                canDataChange={false}
                dataTableTemplateName={"customerTableTemplate"}
                setSelectData={setSelectCustomer}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["table"]}            
            />
        }
    />
    :null
    }

 
</div>
)

}
export default Job;