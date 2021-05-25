import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import BasicDataUtil from './BasicDataUtil';

export default function Modal_setting ({modalId,lb,name,submit,inputState,setInputState}) {

const { accendArray,deccendArray,addElement,deleteElement,
        changeInputState,trimInput} = BasicDataUtil

const [toggle,setToggle]=React.useState(true)

React.useEffect(()=>{
    if(toggle){
        const temp=accendArray(inputState[`${name}`])
        setInputState({[name]:temp})
    }
    else{
        const temp=deccendArray(inputState[`${name}`])
        setInputState({[name]:temp})
    }
},[toggle])

const refCloseInputModal=React.useRef();

const renderForm =()=>(
    <form>
        <div className="modal-content" >
            <div className="modal-header" style={{position:"relative"}}>
                <h5 className="modal-title" 
                    onClick={e=>setToggle(!toggle)}
                >{lb}</h5>

                <AddCircleIcon 
                    style={{position:"absolute",
                    right:"1.2rem",top:"1rem",fontSize:"2rem"}}
                    onClick={e=>{addElement(inputState,setInputState,name)}}
                />
            </div>
            
            <div className="modal-body">                        
                
                {   (inputState[`${name}`])
                    ?inputState[`${name}`].map((i,index)=>(
                        <div key={index}  className="form-row text-left mb-2" 
                            style={{position:"relative"}}>
                            <div className="col-11">   
                                <input 
                                    className="form-control" 
                                    value={i} 
                                    onChange={e=>changeInputState(
                                        inputState,setInputState,
                                        name,index,e.target.value
                                    )}
                                />
                            </div>
                            <div className="col-1">
                                <DeleteForeverIcon
                                
                                style={{position:"absolute",top:"0.2rem",
                                fontSize:"2rem"}}
                                onClick={e=>{deleteElement(inputState,
                                    setInputState,index,name)}}
                                />
                            </div>
                        </div>
                    ))
                    :null
                }   
                
            </div>

            <div className="modal-footer">
                <button ref={refCloseInputModal} type="button" 
                        className="btn btn-secondary" data-dismiss="modal"  
                        onClick={e=>setInputState(null)}         
                >ยกเลิก</button>
                <button type="button" className="btn btn-primary"
                    onClick={e=>{
                        submit(name)
                        refCloseInputModal.current.click()
                    }}
                >ตกลง</button>
            </div>
        </div>
    </form>
)

return (
    <div className="modal fade" id={modalId} role="dialog">
        <div className="modal-dialog" role="document">
        {renderForm()}
        </div>
    </div>
)
}
