import React from 'react'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const renderModalBodyTable=({modalState,setModalState})=>{
    const objKeys = Object.keys(modalState);
    return(
    <div>
        <div className="row" style={{width:"80%",margin:'auto'}}>
            <div style={{width:`30%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>หัวข้อ</h5>  
            </div>

            <div style={{width:`30%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>แสดง</h5>  
            </div>
            <div style={{width:`40%`,padding:"0.3rem",textAlign:"center"}}>
                <h5>ความกว้าง</h5>  
            </div>
        </div>

        {objKeys.map((i,index)=>
        <div className="row" style={{width:"80%",margin:'auto'}}>        
            <div style={{width:`30%`,padding:"0.3rem",textAlign:"left"}}>
                <h5>{modalState[i].lb}</h5>  
            </div>
    
    
            <div style={{width:`30%`,padding:"0.3rem",}}>
                <div style={{width:"100%"}}>
                    <input  className= "form-control" 
                        style={{width:"1.4rem",margin:"-0.5rem auto"}}
                        type="checkbox"
                        checked={modalState[i].showCol}
                        onChange={e=>{
                            let temp=modalState[i]
                            temp={...temp,showCol:!temp.showCol}
                            setModalState({...modalState,[i]:temp})
                        }}
                    />
                </div>
            </div>

            <div style={{width:`40%`,padding:"0.3rem",}}>
                <div style={{margin:"-0.3rem auto 0 auto",display:'flex',justifyContent:"space-between"}}>            
                    <IndeterminateCheckBoxIcon style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}
                        onClick={e=>{
                            let temp=modalState[i]
                            temp={...temp,width:temp.width-1}
                            setModalState({...modalState,[i]:temp})
                        }}/>
                    <p>{modalState[i].width}</p>
                    <AddBoxIcon  style={{fontSize:'2.3rem',marginTop:"-0.3rem"}}              
                        onClick={e=>{
                            let temp=modalState[i]
                            temp={...temp,width:temp.width+1}
                            setModalState({...modalState,[i]:temp})
                        }}/>
                </div>              
            </div>
        </div>
        )}

    </div>
    )
}

export default renderModalBodyTable