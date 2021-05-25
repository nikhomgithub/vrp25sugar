import React from 'react';

import tableUtil from './tableUtil'
import renderTable from  './renderTable'

import renderTableSetting from './renderTableSetting'
//==========
import renderModalFilterInput from '../../render/renderFilter/renderModalFilterInput'
//==========
//==========
//==========
import axiosUtil from '../../util/axiosUtil'
import StateUtil from '../../model/StateUtil'
import { set } from 'date-fns';
//==================
//==================
//import './Table.css'

//=====================
const {genSortFromSortState,reloadAndSearch}=axiosUtil
const {tableResize}=tableUtil

const {genBlankState}=StateUtil

//=================================
function Table({
    colorHead,
    stateTemplate,
    filterTemplate,
    tableTemplate,setTableTemplate,

    editData,setEditData,
    inputState,setInputState,
    pageNumber,setPageNumber,
    setCount,setLastRecordId,

    url,
    reloadData,
    setReloadData,
    limitRow,setLimitRow,

    showFilter,setShowFilter,
    filterOption,setFilterOption,
    titleFilter,

    showTableSetting,setShowTableSetting,
    
    filterData,setFilterData,

    qry

}) {
console.log('Table')    

const blankData=genBlankState({template:stateTemplate}).state

let [sumAmount,setSumAmount]=React.useState(null)
//=================================
//=============================
React.useEffect(()=>{

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
    //console.log('filterData')
    //console.log(filterData)
},[filterData])

React.useEffect(()=>{
    console.log(`pN:${pageNumber},fO:${filterOption},rlC:${reloadData}`)
    if(reloadData){
        reloadAndSearch({
            blankData,
            inputState,
            pageNumber,
            sort,
            filterOption,
            setFilterData,
            setCount,
            setLastRecordId,
            setEditData,
            url,
            filterTemplate,
            reload:reloadData,
            setReload:setReloadData,
            limitRow,
            qry
        })
    }  
},[pageNumber,filterOption,reloadData])
//==========================
//=================================
const [sortState,setSortState]=React.useState({
    order1:{toAscending:1, sortName:null},
    order2:{toAscending:1, sortName:null},
    order3:{toAscending:1, sortName:null},
  })

React.useEffect(()=>{
    genSortFromSortState({sortState,setSortState,sort,setSort})
},[sortState])

let [sort,setSort]=React.useState({id:1})
//=================================
let [showTable,setShowTable]=React.useState({
    width:1200,
    gridCol:"",
})
//=================================

//=================================
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
          editData,setEditData,
          showTable,setShowTable,
          sumAmount
          })
        :null
        }
        {
        renderModalFilterInput({
            show:showFilter,
            setShow:setShowFilter,
            title:titleFilter,
            filterTemplate,
            inputState,setInputState,
            filterData,setFilterData,
            setPageNumber,setCount,
            setFilterOption,
            sortState,setSortState,
            setReload:setReloadData
        })
        }  

        {
        renderTableSetting({
            show:showTableSetting,
            setShow:setShowTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate,
            limitRow,setLimitRow,
        })
        }




    </div>

)
}
export default Table;
