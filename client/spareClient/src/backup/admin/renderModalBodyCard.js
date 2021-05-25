import React from 'react'

const renderModalBodyCard=({modalState,setModalState})=>{

    const objKeys = Object.keys(modalState);
    return(
        <div >
           <div className="row" style={{width:"80%",margin:'auto'}}>
                <div style={{width:`50%`,padding:"0.3rem",textAlign:"center"}}>
                    <h5>หัวข้อ</h5>  
                </div>
    
                <div style={{width:`50%`,padding:"0.3rem",textAlign:"center"}}>
                    <h5>แสดง</h5>  
                </div>
            </div>
            
            {objKeys.map((i,index)=>   
                <div className="row" style={{width:"80%",margin:'auto'}}>
                    <div style={{width:`50%`,padding:"0.3rem",textAlign:"left"}}>
                        <h5>{modalState[i].lb}</h5>  
                    </div>
                    <div style={{width:`50%`,padding:"0.3rem"}}>
                        <div style={{width:"100%"}}>
                            <input  className= "form-control" 
                                    style={{width:"1.4rem",margin:"-0.5rem auto"}}
                                type="checkbox"
                                checked={modalState[i].showLine}
                                onChange={e=>{
                                    let temp=modalState[i]
                                    temp={...temp,showLine:!temp.showLine}
                                    setModalState({...modalState,[i]:temp})
                                }}
        
                            />
                        </div>
                    </div>
                </div>        
            )}
          
        </div>
 
    )}

export default renderModalBodyCard