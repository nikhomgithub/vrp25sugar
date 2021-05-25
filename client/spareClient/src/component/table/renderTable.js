
import React from 'react'
import showUtil from '../../util/showUtil'
import tableUtil from './tableUtil'
import Galleryone from '../galleryone/Galleryone'
import {FaPlusSquare,FaMinusSquare,FaArrowsAltV} from 'react-icons/fa';
import TableHeadBar from '../tableHeadBar/TableHeadBar'
import {MdClose,MdArrowUpward,MdArrowDownward} from 'react-icons/md';
import TableUtil from './tableUtil.js'

import './Table.css'
import { id } from 'date-fns/locale';

const {showArray,showAddress,showObject} = showUtil
const {sortColumn} = tableUtil

const renderTable=({
  colorHead,
  tableTemplate,setTableTemplate,
  filterData,setFilterData,
  editData,setEditData,
  showTable,setShowTable,
  isSubTable,
  sumAmount
})=>{
  //let onMouseDownPageX  
  //let tempPageX

  const calSumValue=({value,key})=>{
    if(showTable.showSum){
      console.log(key)
      console.log(value)
    }
  }

  const numberWithCommas=(x)=>{
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  const showContent=(i,j,type,width,children)=>{
    //console.log(children)
    let showColor="black"
    
    if(editData){
      if(i.id==editData.id){
        showColor="red"
      }  
    }
    
    if(type=="array"){
      return <p style={{color:showColor,margin:"0.5rem 0"}}>{showArray(i[j])}</p>
    }
    else if(type=="arrayObject"){
      return( i[j].map((k,idx)=>{
        return (
        <p style={{color:showColor,margin:"0.5rem 0"}} key={idx}>{showObject(k,children)}</p>
        )}
      ))

    }else if(type=="arrayPhoto"){
      
      return(  
        <Galleryone imgarrs={i[j]} width={width}/>
      )
    }
    else if(type=="boolean"){
      return  <p style={{color:showColor,margin:"0.5rem 0"}} >{i[j]?`จริง`:`เท็จ`}</p>
    }
    else if(type=="date"){
      return  <p style={{color:showColor,margin:"0.5rem 0"}} >
        {i[j]
        ?`${i[j].substring(8,10)}-${i[j].substring(5,7)}-${i[j].substring(0,4)}`
        :null
        }</p>
    }
    else if(type=="number"){
      return <p style={{color:showColor,margin:"0.5rem 0"}}>{numberWithCommas(i[j])}</p>
    }
    else{
      
      return <p style={{color:showColor,margin:"0.5rem 0"}}>{i[j]}</p>
    }
  }
  
  // style={{overflowY:"scroll",overflowX:"scroll"}}>    
  //<TableHeadBar tableTemplate={tebleTemplate}/>

  const handleChange=(i,value)=>{

      let temp=tableTemplate[i]
      temp={...temp,width:value}
      setTableTemplate({...tableTemplate,[i]:temp})
    
   }

  //------------------
  /*
  const sortColumn=(filterData,colName,colType,sortType)=>{
    console.log('sortColumn')
    if(!(colType=="number"||colType=="date"||colType=="string")){
      return
    }

    let tempArray=[]
    let tempFilterData=[]
   
    filterData.map(i=>{
      //this Array will be sorted
      if(colType=="number"){
        tempArray=[...tempArray,parseInt(i[colName])]
      }
      if(colType=="string"||colType=="date"){
        tempArray=[...tempArray,i[colName]]
      }

      //Add ["<checked/>"] filed to tempFilterData
      let tempI={...i,["<checked/>"]:false}
      tempFilterData=[...tempFilterData,tempI]
    })

    if (colType=="number") {    
      if(sortType=="a-b"){
        tempArray.sort(function(a, b){return a - b});
        //console.log('a-b')
      }
      if(sortType=="b-a"){
        tempArray.sort(function(a, b){return b - a});
        //console.log('b-a')
      }
    }

    if (colType=="string"||colType=="date") {
      if(sortType=="a-b"){
        tempArray.sort();
      }
      if(sortType=="b-a"){
        tempArray.sort();
        tempArray.reverse();
      }
    }

    let tempResult=[]
  
    tempArray.map(i=>{
      
      for (let j=0;j<tempFilterData.length;j++){
        if(!tempFilterData[j]["<checked/>"]){
          if(i==tempFilterData[j][colName]){
            tempResult=[...tempResult,filterData[j]]
            tempFilterData[j]["<checked/>"]=true
            break;
          }
        }
      }
  
    })
    return tempResult    
  }
  */
  //-------------------------------


  const objKeys = Object.keys(tableTemplate);
  return(
  //Frame
  <div className="w-100 h-100 overflow-hide-on-print" >

    {/*Track*/}
    <div style={{width:`${showTable.width}px`,position:'relative'}}>   
  
    {/*Table Head*/}
    <div className="TableGrid-head" 
        style={{display:"grid",
                 gridTemplateColumns:showTable.gridCol,
                 gridAutoRows:"minmax(2.7rem,auto)",
                 position:'sticky',top:'0',
                 backgroundColor:colorHead
                                 ?isSubTable?colorHead[1]:colorHead[0]
                                 :null
              }}> 
      { objKeys.map((i,index)=>{
          
          /*
          if(tableTemplate[i].showSum){
            setSumAmount({...sumAmount,[i]:0})
          }
          */
          
        return(
          tableTemplate[i].showCol
          ?<div 
              key={index}
              style={{
                  width:`${tableTemplate[i].width}px`,
                  padding:"0.3rem",
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-around',
              }}   
          >   
                  { 
                      tableTemplate[i].showColHead  
                      ?<p
                          onClick={e=>{
                            let temp=tableTemplate[i]
                            let tempBool=tableTemplate[i].showColHead
                            temp={...temp,showColHead:!tempBool}
                            setTableTemplate({...tableTemplate,[i]:temp})
                          }}
                        >{tableTemplate[i].lb}</p>
                      :
                        <div className="flex-center-center flex-no-wrap">
                          <MdClose 
                              className="md-icon"
                            onClick={e=>{
                              let temp=tableTemplate[i]
                              let tempBool=tableTemplate[i].showColHead
                              temp={...temp,showColHead:!tempBool}
                              setTableTemplate({...tableTemplate,[i]:temp})
                            }}
                          className="md-icon"/>
                            
                          <div className="flex-center-center flex-no-wrap"
                              style={{
                                  width:"300px",
                                  height:"60px",
                                  backgroundColor:"#4b6d62",
                                  borderRadius:"15px",
                                  boxShadow:"5px 5px 10px",
                                  position:"fixed",
                                  top:`10px`,
                                  left:`10px`,
                                  zIndex:100,
                              }}    
                          >  
                            
                            <input 
                              className="xc8"
                              type="range" min="10" max="1000" 
                              value={tableTemplate[i].width}
                              onChange={e=>{
                                  handleChange(i,e.target.value)}} 
                            />
                            <MdArrowDownward 
                              className="md-icon"
                              onClick={e=>{
                                const temp=sortColumn(filterData,i,tableTemplate[i].type,"a-b")
                                if(Array.isArray(temp)){
                                  setFilterData(temp)
                                }                              
                              }}
                            />
                            <MdArrowUpward 
                              className="md-icon"
                              onClick={e=>{
                                const temp=sortColumn(filterData,i,tableTemplate[i].type,"b-a")
                                if(Array.isArray(temp)){
                                  setFilterData(temp)
                                }                              
                              }}
                            />
                          </div>

                        </div>                   
                  }
          </div>
          :null
        )
      })}
    </div>
  
    {/*Table Body*/} 
    {filterData.map((i,index1)=>
     
      <div  key={index1} 
          className="TableGrid-body" 
          style={{display:"grid",
              gridTemplateColumns:showTable.gridCol,
              gridAutoRows:"minmax(2.7rem,auto)"
          }}
          onClick={e=>{
              //setEditData(null)
              setEditData({...i,tempIndex:index1})
          }}
      >    
        {objKeys.map((j,index2)=>
            tableTemplate[j].showCol
            ?<div 
                key={index2}
                style={{
                    textAlign:"left",
                    width:`${tableTemplate[j].width}px`,
                }}
            >
            {/*calSumValue({value:i[j],key:j})*/}
            {showContent(i,j,tableTemplate[j].type,tableTemplate[j].width,tableTemplate[j].children)}
            </div>
            :null
        )}
      </div>
    )}
  
    {/*Table Footer*/}
    {
      sumAmount
      ? <div 
            className="TableGrid-body" 
            style={{display:"grid",
                gridTemplateColumns:showTable.gridCol,
                gridAutoRows:"minmax(2.7rem,auto)",
                backgroundColor:"#2184A0"
            }}

        >    
          {objKeys.map((k,index3)=>
              tableTemplate[k].showCol
              ?<div 
                  key={index3}
                  style={{
                      textAlign:"left",
                      width:`${tableTemplate[k].width}px`,
                  }}
              >
                <p>{numberWithCommas(sumAmount[k])}</p>
              </div>
              :null
          )}
      </div>
      :null
    }            
    </div>
  </div>
  
  )
}

//============================================
//============================================

export default renderTable



