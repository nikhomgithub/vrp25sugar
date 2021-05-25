import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import ModalFilterForm from './ModalFilterForm'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import {FaEdit,FaPlusCircle,FaFilter} from 'react-icons/fa';
import RefreshIcon from '@material-ui/icons/Refresh';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {MainContext} from '../context/MainContext';
import ProductUtil from './ProductUtil'

import Group from '../group/Group';

export default function Product() {

const {
    username,level,
    basicData,setBasicData,setReloadBasicData,
    editGroup,

    blankProduct,
    product,setProduct,setReloadProduct,
    filterProduct,setFilterProduct,
    addProduct,setAddProduct,
    editProduct,setEditProduct,
    
    isAddJob,isEditJob,
    tempAddJob,setTempAddJob,
    tempEditJob,setTempEditJob,
    deIndex

    }=React.useContext(MainContext)


const {tableLineStyle} = ProductUtil;

const refOpenModalFilter=React.useRef();

//===========================================
const deleteProduct=()=>{
   
}
//============================================
const renderTable=()=>(
<div style={{marginBottom:"10rem"}}>
    <table className="table table-striped" >
            <thead>
                <tr style={{fontSize:"1.2rem"}}>
                    <th scope="col">id</th>
                    <th scope="col">ชื่อสินค้า</th>
                    <th scope="col">หน่วย</th>
                    <th scope="col">ราคา</th> 
                    <th scope="col">กลุ่มสินค้า</th>
                </tr>
            </thead>
            {filterProduct.map(i=>
                <tbody key={i.productId} 
                  onClick={e=>{setEditProduct({...blankProduct,...i})}}
                  style={ tableLineStyle(i,editProduct)}
                >
                    <tr style={{fontSize:"1.2rem"}}>
                        <th scope="col">{i.productId}</th>
                        <th scope="col">{i.productName}</th>
                        <th scope="col">{i.unit}</th>    
                        <th scope="col">{i.price}</th> 
                        <th scope="col">{i.groupId}</th> 
                    </tr>
                </tbody>
            )}
    </table>
</div>
)

//=============================================

const renderModalFilterForm=()=>{
    return(
    <div>
        <button type="button" className="d-none" ref={refOpenModalFilter}
                data-toggle="modal" data-target="#modal-filter"
                onClick={e=>{ }}/>

        <ModalFilterForm
            modalId={`modal-filter`}
            product={product}
            setFilterProduct={setFilterProduct}
            basicData={basicData}
        />
    </div>
    )
}

//=============================================


const renderBadge=()=>{
    return(
        <div className="badge badge-pill badge-info" 
            style={{position:'fixed',bottom:'5px',
                    left:'50%',transform:'translateX(-50%)',
                    zIndex:"100",width:'100%',overflow:"auto"}}> 
            <RefreshIcon className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=> {setFilterProduct(product)} }
            />

            <FaFilter className="mx-5" 
                style={{fontSize:'2.5rem',color:"white"}}
                onClick={e=>{ 
                    setTimeout(()=>{
                        refOpenModalFilter.current.click()                      
                    },200)
                } }
            />
            
            <Link to="/addproduct">    
                <FaPlusCircle className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white"}}
                    onClick={e=>{ 
                        console.log('deIndex')
                        console.log(deIndex)
                    } }
                />
            </Link>

            <Link to="/editproduct">   
                <FaEdit className="mx-5" 
                    style={{fontSize:'2.5rem',color:"white",visibility:editProduct.productId>=0?"visible":"hidden"}}
                    onClick={e=>{
                        
                    }}
                />
            </Link>
            
            <DeleteForeverIcon className="mx-5"  
                style={{fontSize:'2.5rem',color:"white",visibility:editProduct.productId>=0?"visible":"hidden"}}
                onClick={e=>{ 
                    deleteProduct();
                }}
            />
        </div>
    )
}
//============================================
const refOpenErrorModal=React.useRef();
const renderErrorModal=()=>{
    return(
        <div>
            <button type="button" className="btn btn-primary d-none" ref={refOpenErrorModal}
                    data-toggle="modal" data-target="#errorModal"/>

            <div className="modal fade" id="errorModal"role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">แจ้งเตือน</h5>
                        </div>
                    <div className="modal-body">
                        <p className="modal-title" id="exampleModalLabel">ดำเนินการไม่สำเร็จ</p>
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" 
                                   data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
//============================================
const renderProduct=()=>(
<div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
    <div style={{textAlign:"center"}}>
        <div>
            <h1>สินค้า</h1>
            {
            isAddJob
            ? 
            <Link to="/adddetail">
                <button onClick={e=>{
                    if(editProduct.productId>0){
                        //console.log('deIndex')
                        //console.log(deIndex)
                        const {productId,productName,price,unit}=editProduct
                        
                        let tempDetailState=[]
                        
                        tempAddJob.detail.map((i,index)=>{
                            if(index==deIndex){
                                const updateI={...i,productId,productName,price,unit}
                                tempDetailState=[...tempDetailState,updateI]
                            }
                            else{
                                tempDetailState=[...tempDetailState,i]
                            }
                        })
                        
                        setTempAddJob({...tempAddJob,detail:tempDetailState})
            
                    }
                }}>
                    กลับไป addJob
                </button>
            </Link>
            :null
            }
           
            {
            isEditJob
            ? 
            <Link to="/editdetail">
                <button onClick={e=>{
                if(editProduct.productId>0){
                
                    const {productId,productName,price,unit}=editProduct
                        
                    let tempDetailState=[]
                    
                    tempEditJob.detail.map((i,index)=>{
                        if(index==deIndex){
                            const updateI={...i,productId,productName,price,unit}
                            tempDetailState=[...tempDetailState,updateI]
                        }
                        else{
                            tempDetailState=[...tempDetailState,i]
                        }
                    })
                    
                    setTempEditJob({...tempEditJob,detail:tempDetailState})
        
                }
                }}>
                กลับไป editJob
                </button>
            </Link>
            :null
            } 
        </div>
       
        
        {renderBadge()}
        
       
        <div className="row">
            <div style={{width:'46%',marginRight:"2rem"}}>
                <Group/>
               
            </div>
            
            <div style={{width:'46%'}} >
                <div className="row">
                    <div style={{width:"1px",backgroundColor:"red"}}>

                    </div>
                    <div style={{width:"99%"}}>
                        {renderTable()}
                    </div>  
                </div>
            </div>
        </div>
       
        {renderErrorModal()}    
        {renderModalFilterForm()}
    </div>
</div>
)
//-------------------------------------------
const renderFault=()=>{
    return(
        <div style={{width:"100%",height:"100%",
                        display:"flex",justifyContent:"center",alignItems:"center",}}>
            <div style={{textAlign:"center"}}>
                <h4>ถ้าข้อมูลไม่แสดง  </h4>
                <button className="text-center btn btn-primary btn-lg"
                    onClick={e=>{
                        setReloadBasicData(true)
                        setReloadProduct(true)
                    }}
                >กดเพื่อรีโหลดข้อมูล</button>
            </div>
        </div>
    )
}
//============================================
const renderMain=()=>{
   return(
    filterProduct&&basicData
    ?renderProduct()
    :renderFault()
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================
    return (
        //(username&&level=="admin")
        true
        ?renderMain()
        :redirectTo()
    )
}
