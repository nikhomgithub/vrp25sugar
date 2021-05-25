import React from 'react'

export default function Input_test() {
    return (
        <div className="row">    

            <div className="col-md-6" style={{display:"flex",marginTop:"1rem"}}>
                <div style={{width:"5%"}}>
                    <input type="checkbox" style={{width:"2rem",height:"2rem",fontSize:"3rem"}}></input>
                </div>
                <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                    <label>วันรับงาน</label>
                </div>
                
                <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                    <label>ระหว่าง</label>
                </div>

                <div style={{width:"55%"}}>
                    <input style={{width:'100%'}}/>
                </div>         
            </div>

            <div className="col-md-6" style={{display:"flex",marginTop:"1rem"}}>
                <div style={{width:"5%"}}>
                
                </div>
                <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                
                </div>
                
                <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                    <label>จนถึง</label>
                </div>

                <div style={{width:"55%"}}>
                    <input style={{width:'100%'}}/>
                </div>         
            </div>
        </div>

    )
}
