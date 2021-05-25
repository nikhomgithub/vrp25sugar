import React from 'react'

export default function ModalSetting({
        modalId,modalState,setModalState,
        title,
        renderModalBody,
        submit
    }) {

const refCloseModalSetting=React.useRef();

    const renderForm=()=>{
        return(
            <div className="modal fade" id={modalId}  role="dialog">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">          
                        <div className="modal-body" >
                            <div className="my-3">
                                    <h4 className="modal-title mx-2" id="exampleModalLabel">
                                    {title}
                                    </h4>
        
                            </div>

                            {renderModalBody({modalState,setModalState})} 
                        
                        </div>
                  
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalSetting}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                refCloseModalSetting.current.click()
                                submit()
                            }}  
                            >ตกลง</button>
                        
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
    <div>
        {
        renderForm()
        }
    </div>
    )
}