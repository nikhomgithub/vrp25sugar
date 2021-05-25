import React from 'react';

import DataComponent from '../../component/dataComponent/DataComponent'
import ModalComponent from '../../render/ModalComponent'
import GroupComponent from '../../component/dataComponent/GroupComponent'

import inputState from '../../component/table/inputState'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'

import {MainContext} from '../../context/MainContext'

const {partnerInputState} = inputState
const {partnerFilter}=FilterTemplate  

const {partnerForm,partnerGroupForm}=FormTemplate      
const { partnerState,partnerGroupState}=StateTemplate

function Partner() {
    const {allTableTemplate}=React.useContext(MainContext)

    let [iconActionData,setIconActionData]=React.useState(null)
    let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)
    
    const [selectDataOut,setSelectDataOut]=React.useState(null)    
    
    const [selectPartnerGroup,setSelectPartnerGroup]=React.useState(null)

    const [showModalComponent1,setShowModalComponent1]=React.useState(false)
    const [showModalComponent2,setShowModalComponent2]=React.useState(false) 

return (
    allTableTemplate
    ?<div className="w-100 h-100">
        
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
            inIconAction={[setShowModalComponent1]}
            
            inInputState={partnerInputState}
            inTableTemplateList={[
              {
                tableName:"partnerTableTemplate",
                template:allTableTemplate.partnerTableTemplate
              }
            ]}

            inGroupState={partnerGroupState}
            inGroupForm={partnerGroupForm}
            inRouteGroupName={"partnergroup"}
            inKeyArray={["id","groupName"]}
            
            iconActionData={iconActionData}
            iconActionDataDetail={iconActionDataDetail}

            selectDataOut={selectDataOut}
            setSelectDataOut={setSelectDataOut} 
            canChangeData={true}
        />

    {
      showModalComponent1
      ?<ModalComponent
        funcOK={e=>{
          const {id,groupName}=selectPartnerGroup
          setIconActionData({groupId:id,groupName})
          setShowModalComponent1(false)
        }}
        funcCancel={e=>{setShowModalComponent1(false)}}
        fullScreen={true}
       >
            <GroupComponent 
              selectGroup={selectPartnerGroup} 
              setSelectGroup={setSelectPartnerGroup}
              groupState={partnerGroupState} groupForm={partnerGroupForm}
              lb={"ประเภทคู่ค้า"} routeName={"partnergroup"}
              keyArray={["id","groupName"]}
            />
      </ModalComponent>
      :null 
    }

  </div>
  :null
)
}

export default Partner;
