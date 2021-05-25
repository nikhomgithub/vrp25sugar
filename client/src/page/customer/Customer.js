import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'

function Customer() {
const {customerForm,customerGroupForm}=FormTemplate
const {customerState,customerGroupState}=StateTemplate
const {customerFilter}=FilterTemplate
const {customerInputState}=inputState

const {basicData,widthLeft,setWidthLeft,myheader}=React.useContext(MainContext)

return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
   
    <PageComponent
        basicData={basicData}
        dataForm={customerForm}
        dataState={customerState}
        dataFilter={customerFilter}
        dataInputState={customerInputState}
        tableTitle={"รายการลูกค้า"}
        addFormTitle={"เพิ่มลูกค้า"}
        editFormTitle={"แก้ไขลูกค้า"}
        tableHeadColor={"#0072B5"}
        dataUrl={"customer"}
        canDataChange={true}
        dataTableTemplateName={"customerTableTemplate"}

        myheader={myheader}
        totalSwapPage={1}
        swapPageOption={["table"]}
        keyName={["photoUrl1"]}
    />

</div>
)

}
export default Customer;
