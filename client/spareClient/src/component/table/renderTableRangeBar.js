import React from 'react';
import {MdClose,MdCheck} from 'react-icons/md';


const renderTableRangeBar=({showRange,setShowRange,widthLeft,setWidthLeft})=>{
return(
<div  style={{position:"fixed",top:"3rem",width:`100vw`,zIndex:"200"}}>
    <div style={{position:"relative"}}>
        <input type="range" min="5" max="95"   
            style={{visibility:showRange?"visible":"hidden"}}
            value={widthLeft}
            onChange={e=>{setWidthLeft(e.target.value)}} 
        />
        <div style={{position:"absolute",
             bottom:"-2rem",right:"0"}}>
            {showRange
            ?<MdClose className="lg-icon" 
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{setShowRange(!showRange)}}/>
            :<MdCheck className="lg-icon"
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{setShowRange(!showRange)}}/>
            }
        </div>
    </div>
</div> 
)
}

export default renderTableRangeBar

