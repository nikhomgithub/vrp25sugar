import React from 'react'
import {MainContext} from '../context/MainContext';
import RefreshIcon from '@material-ui/icons/Refresh';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import $ from 'jquery';

export default function ModalFilterForm({
        modalId,      
        product,
        setFilterProduct,
        basicData  
    }) {

let [inputState,setInputState]=React.useState({
    toCheckProductName:false,
    productName:"",

    toCheckId:false,
    id:2,
    minId:0,
    maxId:100,

    toCheckPrice:false,
    minPrice:0,
    maxPrice:100,

}) 

React.useEffect(()=>{
    //console.log('inputState')
    //console.log(inputState)
},[inputState])

const changeInputState=(e)=>{
    const type=e.target.type;
    const name=e.target.name;
    const value=(type=="checkbox")?e.target.checked:e.target.value;
    setInputState({...inputState,[name]:value})
}

const addOne=(name,value)=>{
    setInputState({...inputState,[name]:value+1})
}

const minusOne=(name,value)=>{
    setInputState({...inputState,[name]:value-1})
}

const refCloseModalFilterForm=React.useRef()

const filterAll=()=>{
    let temp=[]
    
    if(product){
        if(product.length>0){
            product.map(i=>{
   
                let isPass=true;

                if(inputState.toCheckId){
                    const moreThanMin = i.productId>=inputState.minId
                    const lessThanMax = i.productId<=inputState.maxId

                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                    }
                }

                if(inputState.toCheckProductName){
                    const criteria = new RegExp(inputState.productName);
                    let wordToCheck=i.productName
                
                    if(!wordToCheck.match(criteria)){
                        isPass=false;
                        //console.log('result of Name Check = false')
                    }
                }

                if(inputState.toCheckPrice){
                    const moreThanMin = i.price>=inputState.minPrice
                    const lessThanMax = i.price<=inputState.maxPrice

                    if( !(moreThanMin&&lessThanMax) ){
                        isPass=false;
                    }
                }
                
                if(isPass){
                    temp=[...temp,i]                
                }

            })
        }
    }
    //console.log('temp')
    //console.log(temp)
    setFilterProduct([...temp])
}
    
//========================

const renderModalBody=()=>(
    <div>

        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckId"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"10%",marginLeft:"1rem",marginTop:"0.3rem",marginRight:"1rem"}}>
                <label>{`ไอดี : ${inputState.id} `}</label>
            </div>
         
                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('minId',inputState.minId)}/>
                    <p>{inputState.minId}</p>
                    <AddBoxIcon                onClick={e=>addOne('minId',inputState.minId)}/>
                </div>

                <div style={{width:"30%",marginRight:"1rem"}}>    
                    <input className= "form-control"
                        type="range"
                        name="id"
                        min={inputState.minId}
                        max={inputState.maxId}
                        value={inputState.id}
                        onChange={e=>changeInputState(e)}
                    />
                </div>    

                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('maxId',inputState.maxId)}/>
                    <p>{inputState.maxId}</p>
                    <AddBoxIcon onClick={e=>addOne('maxId',inputState.maxId)}/>
                </div>
        </div>




        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckProductName"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <label>ชื่อสินค้า</label>
            </div>
            <div style={{width:"50%"}}>
                <input className= "form-control"
                    type="text"
                    name="productName"
                    placeholder="ชื่อสินค้า"
                    value={inputState.productName}
                    onChange={e=>changeInputState(e)}
                />
            </div>      
        </div>




        <div className="form-row my-3">  
            <div style={{width:"5%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                <input  className= "form-control" style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    name="toCheckPrice"
                    onChange={e=>changeInputState(e)}
                />
            </div>

            <div style={{width:"10%",marginLeft:"1rem",marginTop:"0.3rem",marginRight:"1rem"}}>
                <label>{`ราคา`}</label>
            </div>
         
                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('minPrice',inputState.minPrice)}/>
                    <p>{inputState.minPrice}</p>
                    <AddBoxIcon                onClick={e=>addOne('minPrice',inputState.minPrice)}/>
                </div>

              
                <div className="row" style={{width:"20%",marginTop:"0.3rem"}}>
                    <IndeterminateCheckBoxIcon onClick={e=>minusOne('maxPrice',inputState.maxPrice)}/>
                    <p>{inputState.maxPrice}</p>
                    <AddBoxIcon                onClick={e=>addOne('maxPrice',inputState.maxPrice)}/>
                </div>
        </div>
       

    </div>
    )

    const renderForm=()=>{
        return(
            <div className="modal fade" id={modalId}  role="dialog">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">          
                        <div className="modal-body" >
                            <div className="my-3">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    ค้นหา
                                </h5>
                            </div>

                            {renderModalBody()} 
                        
                        </div>
                  
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    ref={refCloseModalFilterForm}   
                            >ยกเลิก</button>
                          
                            <button type="button" className="btn btn-primary"
                            onClick={e=>{
                                filterAll()
                                refCloseModalFilterForm.current.click()
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
        {renderForm()}
    </div>
    )
}