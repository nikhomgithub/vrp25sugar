
import React from 'react';
import axios from 'axios';

import {FaRegArrowAltCircleDown,FaRegArrowAltCircleUp} from 'react-icons/fa';

import stateUtil from '../../util/stateUtil'
import axiosUtil from '../../util/axiosUtil'


import '../Modal.css'
import { AirlineSeatReclineNormalRounded } from '@material-ui/icons';

const {changeKeyKey} = stateUtil
const {axiGet}=axiosUtil

const renderModalFilterInput=({
    show,setShow,
    title,
    filterTemplate,
    inputState,setInputState,
    setPageNumber,setCount,setFilterOption,
    sortState,setSortState,
    setReload
    //filterData,setFilterData,
    //RtAndCt,
})=>{

const renderBetweenNumber=(i,templateIdx)=>{
    return(
    <div key={templateIdx} className={i.cName}>
        
        <div  className="flex-center-center flex-no-wrap">

            <div className={i.subCName[0]}>
                <input
                    style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    checked={inputState[i.keyName].toCheck}
                    ref={i.refInput[0]}
                    onKeyDown={e=>{
                        if(e.key=="Enter"){
                            i.refInput[1].current.focus()
                        }
                    }}
                    onChange={e=>{
                        changeKeyKey({
                            key:i.keyName,
                            subKey:"toCheck",
                            value:e.target.checked,
                            inputState,setInputState
                        })
                        i.refInput[1].current.focus()
                    }}
                />
            </div>


          <div className={i.subCName[1]}>
              <p className="label">{i.lb}</p>
          </div>

            <div className={i.subCName[2]}>
                  
                    <div className="xc12 flex-center-baseline ">

                        <div className="xc3">
                            <p>ระหว่างค่า</p>
                        </div>
                        <div className="xc4">
                            <input
                                style={{width:"100%"}}
                                type={i.inputType}
                                value={inputState[i.keyName].min}
                                ref={i.refInput[1]}
                                onKeyDown={e=>{
                                    if(e.key=="Enter"){
                                        i.refInput[2].current.focus()
                                    }
                                }}
                                onChange={e=>{changeKeyKey({
                                    key:i.keyName,
                                    subKey:"min",
                                    value:(e.target.type=="number")
                                        ?e.target.value?parseFloat(e.target.value):0
                                        :e.target.value,
                                    inputState,setInputState})}}  
                            />
                        </div>

                        <div className="xc1"
                             style={{textAlign:"center"}}
                        >
                            <p>-</p>
                        </div>   
                        <div className="xc4">    
                            <input
                                style={{width:"100%"}}
                                type={i.inputType}
                                value={inputState[i.keyName].max}
                                ref={i.refInput[2]}
                                onKeyDown={e=>{
                                    if(e.key=="Enter"){
                                        if(filterTemplate.length-1!=templateIdx){
                                            filterTemplate[templateIdx+1].refInput[0].current.focus()
                                        }
                                    }
                                }}
                                onChange={e=>{changeKeyKey({
                                    key:i.keyName,
                                    subKey:"max",
                                    value:(e.target.type=="number")
                                        ?e.target.value?parseFloat(e.target.value):0
                                        :e.target.value,
                                    inputState,setInputState})}}
                            />  
                        </div>
                    </div>
                    
            </div>
        </div>
     </div>
    )
}

//=================================
//=================================
const renderBoolean=(i,templateIdx)=>{
    return(
        <div key={templateIdx} className={i.cName}>
            
            <div  className="flex-center-center flex-no-wrap">
    
                <div className={i.subCName[0]}>
                    <input
                        style={{marginTop:"-0.5rem"}}
                        type="checkbox"
                        checked={inputState[i.keyName].toCheck}
                        ref={i.refInput[0]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                i.refInput[1].current.focus()
                            }
                        }}
                        onChange={e=>{
                            changeKeyKey({
                                key:i.keyName,
                                subKey:"toCheck",
                                value:e.target.checked,
                                inputState,setInputState
                            })
                            i.refInput[1].current.focus()
                        }}
                    />
                </div>
    
    
              <div className={i.subCName[1]}>
                  <p className="label">{i.lb}</p>
              </div>
    
              <div className={`${i.subCName[2]}`}
                   style={{marginTop:"-0.9rem"}}
              >
                <input
                    type={i.inputType}
                    checked={inputState[i.keyName].value}
                    ref={i.refInput[1]}
                    onKeyDown={e=>{
                        if(e.key=="Enter"){
                            if(filterTemplate.length-1!=templateIdx){
                                filterTemplate[templateIdx+1].refInput[0].current.focus()
                            }
                        }
                    }}
                    onChange={e=>{changeKeyKey({
                        key:i.keyName,
                        subKey:"value",
                        value:e.target.checked,
                        inputState,setInputState})}}
                />
              </div>
            </div>
        </div>
    )
}
//========================
//========================

const renderString=(i,templateIdx)=>{

    return(
        <div key={templateIdx} className={i.cName}>
            
            <div  className="flex-center-center flex-no-wrap">
    
                <div className={i.subCName[0]}>
                    <input
                        style={{marginTop:"-0.5rem"}}
                        type="checkbox"
                        checked={inputState[i.keyName].toCheck}
                        ref={i.refInput[0]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                i.refInput[1].current.focus()
                            }
                        }}
                        onChange={e=>{
                            changeKeyKey({
                                key:i.keyName,
                                subKey:"toCheck",
                                value:e.target.checked,
                                inputState,setInputState
                            })
                            i.refInput[1].current.focus()
                        }}
                    />
                </div>
    
    
              <div className={i.subCName[1]}>
                  <p className="label">{i.lb}</p>
              </div>
    
              <div className={`${i.subCName[2]}`}
                   style={{marginTop:"-0.9rem"}}
              >
                <input
                    type={i.inputType}
                    value={inputState[i.keyName].value}
                    ref={i.refInput[1]}
                    onKeyDown={e=>{
                        if(e.key=="Enter"){
                            if(filterTemplate.length-1!=templateIdx){
                                filterTemplate[templateIdx+1].refInput[0].current.focus()
                            }
                        }
                    }}
                    onChange={e=>{changeKeyKey({
                        key:i.keyName,
                        subKey:"value",
                        value:e.target.value.replace(/\s{2}$/,' '),
                        inputState,setInputState})}}
                />
              </div>
            </div>
        </div>
    )
}

//<div style={{width:"100%",height:"100%"}}>     
const renderFilterBody=()=>{
return(
    filterTemplate.map((i,templateIdx)=>{
        //we change from switch case to if instead to prevent error
        if( (i.templateType =="number")||
            (i.templateType=="arrayNumber")||
            (i.templateType=="objectNumber")||
            (i.templateType=="arrayObjectNumber")||
            (i.templateType=="arrayObjectArrayNumber") ){
                return renderBetweenNumber(i,templateIdx)
            }
        else if( (i.templateType =="boolean")||
            (i.templateType=="arrayBoolean")||
            (i.templateType=="objectBoolean")||
            (i.templateType=="arrayObjectBoolean")||
            (i.templateType=="arrayObjectArrayBoolean") ){
                return renderBoolean(i,templateIdx)
            }
        else{
            return renderString(i,templateIdx)
        }
    })
    )
}

const renderSortBody=()=>{
    const arraySortStateKey=Object.keys(sortState)
    //["order1","order2","order3"]
    //=====================
    let tempFilterTemplate=[]
    
    filterTemplate.map((i)=>{
        //we change from switch case to if instead to prevent error
        if((i.templateType=="string")||
           (i.templateType=="number")||
           (i.templateType=="date")){
            tempFilterTemplate=[...tempFilterTemplate,i]
        }
    })

  
return(
<div className="w-100">
    {
        arraySortStateKey.map((i,index)=>{
            return(
            <div key={index} className={filterTemplate[0].cName} >
                <div  className="form-row flex-justify-start pb-2">
                    
                    <div className={filterTemplate[0].subCName[0]}>
                        {sortState[i].toAscending==1
                          ?<FaRegArrowAltCircleDown className="md-icon"
                                onClick={e=>{
                                    const tempOrder=sortState[i]
                                    tempOrder.toAscending=-1
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                }}
                            />
                          :<FaRegArrowAltCircleUp className="md-icon"
                                onClick={e=>{
                                    const tempOrder=sortState[i]
                                    tempOrder.toAscending=1
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                }}
                          />
                        }
                    </div>
                
                    <div className={filterTemplate[0].subCName[1]} >
                        <h3>{`ลำดับที่ ${index+1}`}</h3>
                    </div>
                    <div className={filterTemplate[0].subCName[2]} >
                        <select type="select" 
                                className="w-100"
                                value={sortState[i].sortName
                                        ?sortState[i].sortName
                                        :""}
                                onChange={e=>{
                     
                                    const tempOrder=sortState[i]
                                    tempOrder.sortName=e.target.value
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                    
                                }}

                        >  
                            <option value="" hidden>ตรวจสอบรายการ...</option>
                            {    //we use keyName for filterTemplate, 
                                 //but make sure to use only main Field 
                                 tempFilterTemplate.map((k,index)=>{
                                    return(
                                        <option key={index} value={k.keyName}>{k.lb}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </div>
            </div>
            )
        })
    }
</div>
)    
}

return (
    show
    ?<div className="Modal-background">
        <div className="Modal-box" style={{minWidth:"70%"}}>
          
            <div className="flex-center-center">
                <h1>{title}</h1>
            </div>

            <div className="flex-center-center jc-start">
                <h2>เลือกหัวข้อที่จะค้นหา</h2>
            </div>
          
            { renderFilterBody() }
           
            <div className="mb-2">
                <h2>แสดงผลโดยเรียงตามหัวข้อ</h2>
            </div>

            { sortState?renderSortBody():null }


            <div className="flex-center-center mt-2">
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            setFilterOption(1)
                            setPageNumber(1)
                            setReload(true)
                            /*
                            axiGet({qCondition:"$and",
                                RtAndCt,
                                filterTemplate,
                                inputState,
                                setFilterData,
                                pageNumber,setCount
                            })
                            */
                            setShow(false)
                        }}
                    >
                        ค้นหาทุกเงื่อนไขจริง
                    </button>
                </div>
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            setFilterOption(2)
                            setPageNumber(1)
                            setReload(true)

                            /*
                            axiGet({qCondition:"$or",
                                  RtAndCt,
                                  filterTemplate,
                                  inputState,
                                  setFilterData,
                                  pageNumber,setCount
                                })
                            */
                            setShow(false)
                        }}
                    >
                        ค้นหาบางเงื่อนไขจริง
                    </button>
                </div>
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            setShow(false)
                        }}
                    >
                        กลับ
                    </button>
                </div>

          </div>                  
        </div>
    </div>
    :null
)
}

export default renderModalFilterInput