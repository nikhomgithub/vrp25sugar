import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import RefreshIcon from '@material-ui/icons/Refresh';
import Galleryone_add from './components/galleryone_add/Galleryone_add'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function ProductForm({title,initState,isAdd}) {
    const {basicData,
           blankProduct,
           group,
           product,setProduct,
           reloadProduct,setReloadProduct,
           filterProduct,setFilterProduct,

           editProduct,setEditProduct,
           addProduct,setAddProduct,
           }=React.useContext(MainContext)
    
    const refOpenErrorModal=React.useRef();    
//==================================

let [inputState,setInputState]=React.useState(initState)

React.useEffect(()=>{
    if(inputState){
        console.log('inputState')
        console.log(inputState)
    }
},[inputState])    

const changeInputState=(e)=>{
    setInputState({...inputState,[e.target.name]:e.target.value})
}

//==================================
const ref1=React.useRef()

const [arrayFile1,setArrayFile1]=React.useState([])
const [fileUrl1,setFileUrl1]=React.useState([])

const [showImage,setShowImage]=React.useState(true)

//==================================
function fileListItem(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError("expected argument to fileList1 is File or array of File objects")
    for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
} 
//=================================
React.useEffect(()=>{
    const tempFileList= new fileListItem( arrayFile1 )
    let tempFileUrl=[]
    
    for(let i=0;i<tempFileList.length;i++){
        const tempObject={ name:tempFileList[i].name,
                           blob:URL.createObjectURL(tempFileList[i])}
        tempFileUrl=[...tempFileUrl,tempObject]
    }
    setFileUrl1(tempFileUrl)
    handleChange(tempFileList,"file1")
    reloadImage()

},[arrayFile1])

//files from <input type="file"/>
const handleInputFile1=(files)=>{
    const unique=Array.from(new Set([...arrayFile1,...files]))
    setArrayFile1(unique)   
}

//====================================
//====================================

const handleChange =(value,name)=>{
    setInputState({...inputState,[name]:value})
}

const reloadImage=()=>{
    setShowImage(false)
    setTimeout(()=>{
        setShowImage(true)
    },100)
}
//===================================
//======================================
const resetFile=()=>{
    setArrayFile1([])
    setFileUrl1([])
}

//===================================
const deleteFileUrl1=(name)=>{
    let tempArray=[]
    arrayFile1.map((i,index)=>{
        if(i.name!==name){
            tempArray.push(i)
        }
        return tempArray
    })
    setArrayFile1(tempArray)   
    reloadImage();   
}

const deletePhotoUrl=(name)=>{
    const tempLength=inputState.photoUrl.length
    let temp=[]
    for(let i=0;i<tempLength;i++){
        if(inputState.photoUrl[i]!=name){
            temp=[...temp,inputState.photoUrl[i]]
        }
        if(i==tempLength-1){
            setInputState({...inputState,photoUrl:temp})
        }
    }
    reloadImage()
}
//==================================
//==================================
    const [jumpInput,setJumpInput]=React.useState(true)    
    
    const refProductName = React.useRef() 
    const refUnit = React.useRef()
    const refPrice = React.useRef()
    const refGroupId = React.useRef()

    const initJump =()=>{
        setTimeout(()=>{
            refProductName.current.focus()
            setJumpInput(false)
        },200)
    }
    
    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "productName":
                    refUnit.current.focus();
                    return;
           
                default:
                    return;    
            }
        }
    }

//===================================
//==================================
const submitAdd=(e)=>{
    
    e.preventDefault()
    let {
        _id,productId,productName,
        unit,price,minPrice,discountPrice,
        supplierId,groupId,
        type,processId,remark,
        photoUrl,file1,imageUrl
    } = inputState

    //let tempPhotoUrl=[...photoUrl]

    const fd=new FormData();
    if(productId){fd.append('productId',productId)}
    if(productName){fd.append('productName',productName)}
    if(unit){fd.append('unit',unit)}
    if(price){fd.append('price',price)}
    if(minPrice){fd.append('minPrice',minPrice)}

    if(discountPrice){
        for(let i=0;i<discountPrice.length;i++){
            fd.append(`discountPrice[${i}][price]`,discountPrice[i].price)
            fd.append(`discountPrice[${i}][remark]`,discountPrice[i].remark)
        }
    }

    if(supplierId){
        for(let i=0;i<supplierId.length;i++){
            fd.append('supplierId',supplierId[i]);
        }
    }

    if(groupId){fd.append('groupId',groupId)}
    if(type){fd.append('type',type)}
    if(processId){fd.append('processId',processId)}
    if(remark){fd.append('remark',remark)}

   //-----------------------------
    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            fd.append('photoUrl',`upload/${fileName}`); //ส่วนในฐานข้อมูล จะเก็บเฉพาะ
        }
    }

    //-------------------------

    axios
    .post('/product/add',fd)
    .then(result=>{
        console.log(result)
        setProduct([...product,result.data]);
        setFilterProduct([...product,result.data]);
        setInputState(blankProduct)
        
        //setInputState(initState); //ทำการ อัพเดต inputState ด้วย .push
        //resetFile() //ทำการ รีเซต ค่า ไฟล์ต่างๆ กลับไปเริ่มต้น
        //reloadImage() //รีโหลด เมื่อทำการ add, edit, delete
    })
    .catch(err=>{
        refOpenErrorModal.current.click();    
        //resetFile()

        //console.log(err)
    })
}
//======================================
const submitEdit=(e)=>{

    e.preventDefault()
    let {
        _id,productId,productName,
        unit,price,minPrice,discountPrice,
        supplierId,groupId,
        type,processId,remark,
        photoUrl,file1,imageUrl
    } = inputState


    const fd=new FormData();
    if(productId){fd.append('productId',productId)}
    if(productName){fd.append('productName',productName)}
    if(unit){fd.append('unit',unit)}
    if(price){fd.append('price',price)}
    if(minPrice){fd.append('minPrice',minPrice)}

    if(discountPrice){
        for(let i=0;i<discountPrice.length;i++){
            fd.append(`discountPrice[${i}][price]`,discountPrice[i].price)
            fd.append(`discountPrice[${i}][remark]`,discountPrice[i].remark)
        }
    }

    if(supplierId){
        for(let i=0;i<supplierId.length;i++){
            fd.append('supplierId',supplierId[i]);
        }
    }

    if(groupId){fd.append('groupId',groupId)}
    if(type){fd.append('type',type)}
    if(processId){fd.append('processId',processId)}
    if(remark){fd.append('remark',remark)}

    //-----------------------------
    let tempPhotoUrl=[...photoUrl]
    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            
            tempPhotoUrl=[...tempPhotoUrl,`upload/${fileName}`]
        }
    }
    if(tempPhotoUrl.length>0){
        for(let i=0;i<tempPhotoUrl.length;i++){
            fd.append('photoUrl',tempPhotoUrl[i]); // อัพเดตค่า  ใน mongo 
        }
    }
    //--------------------------------

    //------------------------------
    
    //------------------------------
    const tempInputState={
        _id,productId,productName,
        unit,price,minPrice,discountPrice,
        supplierId,groupId,
        type,processId,remark,
        photoUrl:tempPhotoUrl,
    }

    axios
    .post('/product/update',fd)
    .then(result=>{
        console.log('tempInputState')
        console.log(tempInputState)
        let temp=[]
        product.map((i,index)=>{
            if(i.productId==inputState.productId){
                temp=[...temp,tempInputState]
            }
            else{
                temp=[...temp,i]
            }
            if(index==product.length-1){
                setProduct([...temp])
                setFilterProduct([...temp])
            }
        })
        setInputState(blankProduct)
        setEditProduct(blankProduct)
        //setInputState(tempInputState);
        //resetFile();
        //reloadImage();
    })
    .catch(err=>{
        refOpenErrorModal.current.click();      
        //console.log(err)
    })                   

}

//======================================
    const renderFooter=()=>{
        return(
            <div className="form-row" style={{marginBottom:"10rem"}}> 
        
                <div className={`form-group col-md-4 text-center`}>
                    <button className="btn btn-primary"
                        onClick={e=>{
                            setInputState(initState)
                            resetFile()
                        }}
                    > 
                        <RefreshIcon/>
                    </button>
                    
                    <button className="btn btn-primary"
                        onClick={e=>{setInputState(blankProduct)}}
                    >
                        ยกเลิก
                    </button>
                    
                    <button className="btn btn-primary"
                        onClick={e=>{
                            isAdd
                            ?submitAdd(e)
                            :submitEdit(e)
                        }}
                    >
                        ตกลง
                    </button>
                </div>
            </div>        
        )
    }

    //====================================
    const renderModalForm=()=>{
    return(

        <div>
            
            <div className="form-row my-3" >

                <div style={{width:"30%"}}>
                    <div className="form-row my-3">  
                        <div style={{width:"25%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>ชื่อสินค้า</label>
                        </div>
                        <div style={{width:"65%"}}>
                            <input className= "form-control"
                                id="productName-id"
                                type="text"
                                name="productName"
                                value={inputState.productName}
                                ref={refProductName}
                                onFocus={(e)=>{$('#productName-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#productName-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>changeInputState(e)}
                            />
                        </div>      
                    </div>
                </div>


                <div style={{width:"18%"}}>
                    <div className="form-row my-3">  
                     
                        <div style={{width:"40%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>หน่วย</label>
                        </div>
                        <div style={{width:"50%"}}>
                            <select className= "form-control"
                                id="unit-id"
                                name="unit"
                                value={inputState.unit}
                                ref={refUnit}
                                onFocus={(e)=>{$('#unit-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#unit-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>{
                                    changeInputState(e)
                                }}
                            >
                                <option value="" hidden>เลือก...</option>
                                {basicData.unit.map((a,index)=>
                                    <option key={index} value={a}>{a}</option>
                                )}
                            </select>
                        </div>      
                    </div>
                </div>


                <div style={{width:"20%"}}>
                    <div className="form-row my-3">  
                        <div style={{width:"30%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>ราคา</label>
                        </div>
                        <div style={{width:"50%"}}>
                            <input className= "form-control"
                                id="price-id"
                                type="text"
                                name="price"
                                value={inputState.price}
                                ref={refPrice}
                                onFocus={(e)=>{$('#price-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#price-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>changeInputState(e)}
                            />
                        </div>      
                    </div>
                </div>                  


                <div style={{width:"18%"}}>
                    <div className="form-row my-3">  
                     
                        <div style={{width:"40%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>กลุ่มสินค้า</label>
                        </div>
                        <div style={{width:"50%"}}>
                            <select className= "form-control"
                                id="groupId-id"
                                name="groupId"
                                value={inputState.groupId}
                                ref={refGroupId}
                                onFocus={(e)=>{$('#groupId-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#groupId-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>{
                                    changeInputState(e)
                                }}
                            >
                                <option value="" hidden>เลือก...</option>
                                {group.map((a,index)=>
                                    <option key={index} value={a.groupId}>{a.groupName}</option>
                                )}
                            </select>
                        </div>      
                    </div>
                </div>

            </div>                

            <div className="form-row my-3" >                        
                <div className={`col-md-6` }>
                    <div className="form-row ml-1">
                        <h5>ราคาพิเศษ</h5>
                        <AddCircleIcon 
                            style={{fontSize:"2rem",marginTop:"-0.1rem"}}
                            onClick={e=>{
                                const tempDiscountPrice=[...inputState.discountPrice,{price:"",remark:""}]
                                setInputState({...inputState,discountPrice:tempDiscountPrice})
                            }}        
                        />
                    </div>
                </div>                    
            </div>                        

            {
                (inputState.discountPrice.length>0)
                ?inputState.discountPrice.map((i,index)=>(
                    <div key={index}  className="form-row">
                         <div className="form-group ml-2">
                            <input 
                                type="number"
                                placeholder="ราคา"
                                value={inputState.discountPrice[index].price}
                                onChange={e=>{
                                    let temp=[]
                                    inputState.discountPrice.map((j,idx)=>{
                                        if(index==idx){
                                            j.price=e.target.value
                                            temp=[...temp,j]
                                        }
                                        else{
                                            temp=[...temp,j]
                                        }
                                    })
                                   
                                    setInputState({...inputState,discountPrice:temp})
                                }}
                            />
                        </div>
                        <div className="form-group ml-2">
                            <input 
                                type="text"
                                placeholder="หมายเหตุ"
                                value={inputState.discountPrice[index].remark}
                                onChange={e=>{
                                    let temp=[]
                                    inputState.discountPrice.map((j,idx)=>{
                                        if(index==idx){
                                            j.remark=e.target.value
                                            temp=[...temp,j]
                                        }
                                        else{
                                            temp=[...temp,j]
                                        }
                                    })
                                   
                                    setInputState({...inputState,discountPrice:temp})
                                }}
                            />
                        </div>
                        <div className="ml-2">
                            <DeleteForeverIcon 
                                style={{fontSize:"2rem"}}
                            />
                        </div>
                    </div>
                ))
                :null
                /*
                (inputState.discountPrice.length>0)
                ?inputState.discoutPrice.map((i,index)=>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input placeholder="ok"/>
                        </div>
                        <div className="form-group col-md-6">
                            <input placeholder="love you"/>
                        </div>
                    </div>
                )
                :null
                */
            }                        

            <div className="form-row" style={{marginBottom:"10rem"}}> 
                <div className={`form-group col-md-6 text-left`}>
                    <input  
                            type="file" className="form-control-file d-none"  
                            multiple="multiple" accept="image/*"
                            ref={ref1}
                            onChange={e=>{handleInputFile1(e.target.files)}}
                    />
                    <div className="d-flex justify-content-around">
                        <button 
                            className="btn btn-primary"
                            onClick={e=>{
                                e.preventDefault();
                                ref1.current.click()
                        }}>{`เลือกไฟล์ภาพ`}</button>
                        <h5>จำนวนรูปภาพ = {fileUrl1.length+inputState.photoUrl.length}</h5>
                    </div>
                    {showImage
                    ?<Galleryone_add imgarrs={[...inputState.photoUrl,...fileUrl1]}
                                        deleteFile={deleteFileUrl1}
                                        deleteUrl={deletePhotoUrl}
                    />
                    :null
                    }   
                </div>   

            </div>



        </div>
    )
    }
    
    //======================================
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
    //======================================
    const renderProduct=()=>{ 
        return(
        <div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
            {jumpInput?initJump():null}
            <div style={{textAlign:"center"}}>
                <h1>{`${title} : ${inputState.productId}`}</h1>
                {
                renderErrorModal()
                }   
               
                {
                renderModalForm()
                }
                {   
                renderFooter()
                }
            </div>
        </div>
        )
    }
    //====================================
    const redirectTo=()=>{
        return <Redirect to ="/product" exact/>
    }
    //=======================================
    return (
        inputState.productId>=0
        ?renderProduct():
        redirectTo()
    )
}

