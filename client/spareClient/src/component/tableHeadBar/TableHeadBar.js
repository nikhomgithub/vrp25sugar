import React from 'react'

export default function TableHeadBar({handleChange,value,i}) {
    
    let [box,setBox]=React.useState({
        show:true,
        left:10,
        top:10,
    })
    const moveBox=(e)=>{
      const gX=e.pageX
      const gY=e.pageY
      setBox({...box,left:gX-150,top:gY-30})
    }

    return (
        <div className="flex-center-center"
            onDragStart={e=>{moveBox(e)}}   
            onDrag={e=>{moveBox(e)}}
            onDragEnd={e=>{moveBox(e)}}  
            style={{
                width:"300px",height:"60px",

                backgroundColor:"#4b6d62",
                borderRadius:"15px",
                boxShadow:"5px 5px 10px",
                position:"fixed",
                top:`${box.top}px`,
                left:`${box.left}px`,
                zIndex:100,
            }}    
        
        >
            <div className="xc11">
                <input 
                    type="range" min="10" max="1000" 
                    value={value}
                    onChange={e=>{
                        handleChange(i,e.target.value)}} 
            />
            </div>    
            
        </div>
    )
}
//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}

/*
<TableHeadBar 
    className="hide-on-print"
    handleChange={handleChange}
    value={tableTemplate[i].width}
    i={i}
/>

*/