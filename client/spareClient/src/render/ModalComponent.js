import React from 'react';

function ModalComponent({children,funcOK,funcCancel,title,fullScreen}) {
//console.log('ModalComponent')

  return (
    <div className="Modal-background"
         style={fullScreen?{width:"100vw",height:"100vh",paddingBottom:"0rem"}:null}
    >
        <div className="Modal-box w-100 h-100" style={{minWidth:"90%"}}>


                <div style={{display:"flex",position:"fixed",
                     bottom:fullScreen?"1rem":"4rem",right:"2rem",zIndex:"200"}}>

                        <div className="mx-1">
                            <button
                                onClick={e=>{
                                    funcOK()
                                }}
                            >ตกลง</button>
                        </div>

                        <div className="mx-1">
                            <button
                                onClick={e=>{
                                    funcCancel()
                                }}
                            >ยกเลิก</button>
                        </div>

                    </div>

                       

            <div className="" style={{height:"100%"}}>           
                {children}
            </div>

        </div>
    </div>
  );
}

export default ModalComponent;
