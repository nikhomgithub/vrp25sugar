import React from 'react'
import {Link} from 'react-router-dom';

import {MdRefresh,MdSwapHoriz,MdSettings,
        MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
        MdArrowBack,MdArrowForward,MdKeyboardTab,
        MdChevronLeft,MdChevronRight,MdLastPage} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa';
import axiosUtil from '../../util/axiosUtil'

//const limitRow=10
const {axiGet}=axiosUtil

const renderBadge=({badgeState,
                    pageNumber,setPageNumber,
                    limitRow,
                    count,setCount,                    
                    setFilterOption,
                    badgeLayoutOption,
                    barWidth,
                    
                    totalSwapPage,
                    swapState,setSwapState,
                    reloadData,setReloadData,
                    showTableSetting,setShowTableSetting,
                    showFilter,setShowFilter,
                    showAdd,setShowAdd,
                    showEdit,setShowEdit,
                    setShowModalConfirm
                  })=>{
    const {swapShow,swapFunc,
           reloadShow,reloadFunc,
           settingShow,settingFunc,
           filterShow,filterFunc,
           addShow,addFunc,
           editShow,editFunc,
           delShow,delFunc,
           printerShow,printerFunc
          } = badgeState

    //===========================
    // we use 2 badgges for 2 screen option
    
    const displayLayoutOption=()=>{
        
        if(badgeLayoutOption==1){
            return "badge-frame-xc6-left"
        }
        else if(badgeLayoutOption==2){
            return "badge-frame-xc6-right"
        }
        else{
            return "badge-frame-xc12"
        }

    }                
    //==============================
    const changeSwapState=()=>{
        if(swapState<totalSwapPage-1){
            setSwapState(swapState+1)
        }
        if(swapState==totalSwapPage-1){
            setSwapState(0)
        }
        //if(swapState==0){ setSwapState(1) }
        //if(swapState==1){ setSwapState(0) }
        //if(swapState==2){ setSwapState(0) }
    }

    const totalPage=Math.ceil(count/limitRow)
// <div style={{"width":displayLayoutOption()}}> 
    //<div className={displayLayoutOption()}> 
    return(

        <div className={displayLayoutOption()}
             style={ badgeLayoutOption==1||badgeLayoutOption==2 ?{width:`${barWidth}%`}:null }
        > 
        
        <div className="flex-center-center flex-no-wrap xc12 jc-start"
              style={{overflow:"auto",justifyContent:"flex-start"}}>

            {swapShow
            ?<div>
                <MdSwapHoriz
                className="lg-icon"
                onClick={e=>{
                    changeSwapState()
                    if(swapFunc){swapFunc()}
                }}
                />
            </div>:null}
            

            {reloadShow
            ?<div>
                <MdRefresh
                className="lg-icon"
                onClick={e=>{
                    if(setFilterOption){setFilterOption(0)}
                    setReloadData(true)
                    if(reloadFunc){reloadFunc()}
                }}
                />
            </div>:null}
               
            {settingShow
            ?<div>
                <MdSettings
                    className="lg-icon"
                    onClick={e=>{ 
                        setShowTableSetting(true)
                        if(settingFunc){settingFunc()}
                    } } 
                />
            </div>:null}   

            {filterShow
            ?<div>
                <MdSearch
                    className="lg-icon"
                    onClick={e=>{ 
                        setShowFilter(true)
                        if(filterFunc){filterFunc()}
                    } } 
                />
            </div>:null}
            
            {addShow
            ?<div>    
                <MdAddCircle
                    className="lg-icon"
                    onClick={e=>{ 
                        setShowAdd(true)
                        if(addFunc){addFunc()}
                    }}
                />
            </div>:null}

            {editShow
            ?<div>   
                <MdEdit 
                    className="lg-icon"
                    onClick={e=>{
                        setShowEdit(true)
                        if(editFunc){editFunc()}
                    }}
                />
            </div>:null}
            
            {delShow
            ?<div>
                <MdDelete
                    className="lg-icon"
                    onClick={e=>{
                          setShowModalConfirm(true)
                          if(delFunc){delFunc()}
                        }}
                />
            </div>:null}

            {printerShow
            ?<div>
                <MdPrint
                    className="lg-icon"
                    onClick={e=>{
                        window.print()
                        if(printerFunc){printerFunc()}
                    }}
                />
            </div>:null}
                  
            <div>
                <MdChevronLeft
                    className="lg-icon"
                    style={{visibility:(totalPage>1)&&(pageNumber>1)?"visible":"hidden"}}
                    onClick={e=>{
                        const temp=parseInt(pageNumber)-1
                        setPageNumber(temp)
                        setReloadData(true)
                    }}
                />
            </div>
            {totalPage>1
             ?<input 
                type="number"
                style={{width:"70px"}}
                value={pageNumber}
                onChange={e=>{
                    const temp=parseInt(e.target.value)
                    setPageNumber(temp)
                    setReloadData(true)
                }}
              />
             :null
            }        
            {totalPage>1
            ?<div style={{paddingTop:"1rem"}}>
                <p>{`/${totalPage}`}</p>
            </div>
            :null
            }
            {(totalPage>1)&&(pageNumber<totalPage)
            ?<div>
                <MdChevronRight
                    className="lg-icon"
                    onClick={e=>{
                      const temp=parseInt(pageNumber)+1
                      setPageNumber(temp)
                      setReloadData(true)
                    }}
                />
            </div>
            :null}
               
            {(totalPage>1)&&(pageNumber<totalPage)
             ?<div>
                 <MdLastPage
                    className="lg-icon"
                    onClick={e=>{
                        const temp=parseInt(totalPage)
                        setPageNumber(temp)
                        setReloadData(true)
                    }}
                 />
              </div>   
             :null   
            }
        </div>
        
    </div>  
    )
}


export default renderBadge

