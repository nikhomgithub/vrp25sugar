import React from 'react';
import axios from 'axios';

import showUtil from '../../util/showUtil'

import tableUtil from './tableUtil'
import renderTable from  './renderTable'

import renderTableSetting from './renderTableSetting'
//==========

/*
//==========
import {MainContext} from '../../context/MainContext'
//==========
import axiosUtil from '../../util/axiosUtil'
import StateUtil from '../../model/StateUtil'
import photoUtil from '../../component/galleryone_add/photoUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import { TrainRounded } from '@material-ui/icons';
*/
//import ModalForm from '../render/renderForm/ModalForm'
//import renderModalForm from '../../render/renderForm/renderModalForm'
//import renderModalError from '../../render/renderModalError'
//==================
//==================
//import './Table.css'

//=====================

const {tableResize}=tableUtil


//=================================
function SubTable({
    colorHead,
    tableTemplate,setTableTemplate,
    filterData,setFilterData,
    editData,setEditData,

    showTableSetting,setShowTableSetting,

}) {

    console.log('SubTable')

//================================
let [sumAmount,setSumAmount]=React.useState(null)


//================================
React.useEffect(()=>{
    console.log('filterData SubTable')
    console.log(filterData)

    if(filterData){
        const objKeys = Object.keys(tableTemplate);
        
        let newSum={}

        let showSum=false

        objKeys.map(h=>{
            if(tableTemplate[h].showSum){
                newSum={...newSum,[h]:0}
                showSum=true
            }
        })
       

        filterData.map(i=>{
            
            objKeys.map(j=>{  
                if(tableTemplate[j].showSum){
                    newSum={...newSum, [j]:(newSum[j]+(i[j]))}
                }
            })
            
        })
        if(showSum){
            setSumAmount(newSum)
        }
    }

},[filterData])


//=================================
let [showTable,setShowTable]=React.useState({
    width:1200,
    gridCol:""
})

React.useEffect(()=>{
    tableResize({tableTemplate,showTable,setShowTable})
},[tableTemplate])
//==========================
return(
    <div className="w-100 h-100"> 
        {filterData
        ?renderTable({
          colorHead,
          tableTemplate,setTableTemplate,
          filterData,setFilterData,
          //filterData:customerData,
          editData,setEditData,
          showTable,setShowTable,
          isSubTable:true,
          sumAmount
          })
        :null
        }

        {
        renderTableSetting({
            show:showTableSetting,
            setShow:setShowTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate,
            //limitRow,setLimitRow
        })
        }

    </div>

)
}
export default SubTable;
