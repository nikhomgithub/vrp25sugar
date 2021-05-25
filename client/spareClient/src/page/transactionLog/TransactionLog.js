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
import { TramOutlined } from '@material-ui/icons';

const {transactionTableTemplate,transactionLogTableTemplate,
       productDetailTableTemplate,
      transactionGraphTableTemplate,transactionWiDetailGraphTableTemplate
      }=tableTemplate

const {transactionInputState,transactionLogInputState} = inputState
const {transactionFilter,transactionLogFilter}=FilterTemplate  

const { transactionForm,transactionGroupForm }=FormTemplate      
const {transactionState,transactionGroupState,
       transactionLogState}=StateTemplate

function TransactionLog() {

    let [iconActionData,setIconActionData]=React.useState(null)
    let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)
    
    const [selectDataOut1,setSelectDataOut1]=React.useState(null)
    const [selectDataOut2,setSelectDataOut2]=React.useState(null)
    const [selectDataOut3,setSelectDataOut3]=React.useState(null)
    
    const [selectTransactionGroup,setSelectTransactionGroup]=React.useState(null)
    
    const [showModalComponent1,setShowModalComponent1]=React.useState(false)
    const [showModalComponent2,setShowModalComponent2]=React.useState(false) 
    const [showModalComponent3,setShowModalComponent3]=React.useState(false)



    return (
        <div className="w-100 h-100">
          
            <DataComponent    
                lb={["รายงานธุรกรรม","ประเภทธุรกรรม","รายการสินค้า","กราฟสรุปธุรกรรม","กราฟสรุปสินค้า"]}    
                inRouteName={"transactionlog"}
                colorHead={["#7A4B2F","#B17C5E"]}
                totalSwapPage={3}
                
                inLimitRow={10}
                inState={transactionLogState}
                inFilter={transactionLogFilter}
                inForm={transactionForm}
                inKeyPhoto={["photoUrl1"]}
                inIconAction={null}
                
                inInputState={transactionLogInputState}
                inTableTemplate={transactionLogTableTemplate}
                inDetailTableTemplate={productDetailTableTemplate}

                inGroupState={transactionGroupState}
                inGroupForm={transactionGroupForm}
                inRouteGroupName={"transactiongroup"}
                inKeyArray={["id","groupName","effectOrder","effectStock"]}
                
                iconActionData={iconActionData}
                iconActionDataDetail={iconActionDataDetail}

                selectDataOut={selectDataOut1}
                setSelectDataOut={setSelectDataOut1} 

                canChangeData={false}

                graphTableTemplate={[transactionGraphTableTemplate,transactionWiDetailGraphTableTemplate]}
                //showGraph={true}
            />

        </div>
    )
}

export default TransactionLog;
