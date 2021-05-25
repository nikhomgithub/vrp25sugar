import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import BasicDataUtil from './BasicDataUtil';

export default function Modal_routeAuth ({modalId,lb,name,
    submit,inputState,setInputState,basicData}) {


const [subState,setSubState]=React.useState({...inputState})

React.useEffect(()=>{
    //console.log('subState')
    //console.log(subState)
},[subState])

/*
inputState={routhAuth:[{routeId:_,routeName_:authGroup:[_,_,_]}]}
*/

const changeAuthGroup=(value,idx1,idx2)=>{
    let tempArray=[]
    subState.routeAuth.forEach((i,index1)=>{
        if(index1==idx1){
            let tempAuthGroup=[]
            i.authGroup.forEach((j,index2)=>{        
                if(index2==idx2){
                    tempAuthGroup=[...tempAuthGroup,value]
                }
                else{
                    tempAuthGroup=[...tempAuthGroup,j]
                }
            })
            tempAuthGroup=new Set(tempAuthGroup)
            tempArray=[...tempArray,
                { routeId:i.routeId,
                  routeName:i.routeName,
                  authGroup:[...tempAuthGroup]
                }
            ]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })
    setSubState({routeAuth:tempArray})
}

const addInAuthGroup=(idx1)=>{
    let tempArray=[]
    subState.routeAuth.forEach((i,index1)=>{
        if(index1==idx1){
            tempArray=[...tempArray,
                { routeId:i.routeId,
                  routeName:i.routeName,
                  authGroup:[...i.authGroup,'']
                }
            ]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })
    setSubState({routeAuth:tempArray})
}

const deleteInAuthGroup=(idx1,idx2)=>{
    let tempArray=[]
    subState.routeAuth.forEach((i,index1)=>{
        if(index1==idx1){
            let tempAuthGroup=[]
            i.authGroup.forEach((j,index2)=>{        
                if(index2!=idx2){
                    tempAuthGroup=[...tempAuthGroup,j]
                }
            })
            tempArray=[...tempArray,
                { routeId:i.routeId,
                  routeName:i.routeName,
                  authGroup:[...tempAuthGroup]
                }
            ]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })
    setSubState({routeAuth:tempArray})
}

const refCloseRouteAuthModal=React.useRef();
const renderForm =()=>(
    <form>
        <div className="modal-content" >
            <div className="modal-header" style={{position:"relative"}}>
                <h5 className="modal-title">{lb}</h5>
            </div>
            
            <div className="modal-body">                            
                {   
                    (subState[`${name}`])                  
                    ?subState[`${name}`].map((i,index1)=>(
                       <div key={index1}>
                           <div className="form-row mb-3" >                           
                                <div className="col-1">
                                    <AddCircleIcon 
                                    style={{fontSize:"2rem"}}
                                    onClick={e=>{
                                        addInAuthGroup(index1)
                                    }}
                                    />
                                </div>
                                <div className="col-11">
                                    <h5 className="modal-title" 
                                        onClick={e=>{}}
                                    >{i.routeName}</h5>
                                </div>    
                           </div>
                        
                           {  i.authGroup
                               ?i.authGroup.map((j,index2)=>(
                                <div key={index2}  className="form-row text-left mb-2" 
                                style={{position:"relative"}}>
                                    <div className="col-11">    
                                        <select className= "form-control"
                                            value={j}
                                            onChange={e=>{
                                                changeAuthGroup(e.target.value,index1,index2)
                                            }}
                                        >
                                            <option value="" hidden>เลือกจากรายการ...</option>
                                            {basicData.employeeLevel.map((a,index)=>
                                            <option key={index} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-1">
                                        <DeleteForeverIcon
                                        style={{position:"absolute",top:"0.2rem",
                                        fontSize:"2rem"}}
                                        onClick={e=>{deleteInAuthGroup(index1,index2)}}
                                        />
                                    </div>
                                </div>
                               ))
                               :null
                           } 
                       </div>           
                    ))
                    :null
                }             
            </div>

            <div className="modal-footer">
                <button  className="btn btn-secondary"
                        onClick={e=>{
                            e.preventDefault()
                            setSubState({...inputState})
                        }}
                >
                    <RefreshIcon />
                </button>
                    
                <button ref={refCloseRouteAuthModal} type="button" 
                        className="btn btn-secondary" data-dismiss="modal"           
                >ยกเลิก</button>
                <button type="button" className="btn btn-primary"
                    onClick={e=>{
                        setInputState(subState)
                        setTimeout(()=>{
                            //console.log(inputState)
                            submit(subState)
                            refCloseRouteAuthModal.current.click()
                        },100)
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
