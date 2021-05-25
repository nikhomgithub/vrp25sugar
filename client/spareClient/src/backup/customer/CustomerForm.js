import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import RefreshIcon from '@material-ui/icons/Refresh';
import Galleryone_add from './components/galleryone_add/Galleryone_add'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function CustomerForm({title,initState,isAdd}) {
    const {basicData,
           blankCustomer,
           customer,setCustomer,
           reloadCustomer,setReloadCustomer,
           filterCustomer,setFilterCustomer,

           editCustomer,setEditCustomer,
           addCustomer,setAddCustomer,
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
    
    const refName = React.useRef() 
    const refSurname = React.useRef()
    const refTitle = React.useRef()

    const initJump =()=>{
        setTimeout(()=>{
            refName.current.focus()
            setJumpInput(false)
        },200)
    }
    
    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "name":
                    refSurname.current.focus();
                    return;
                case "surname":
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
        _id,customerId,
        name,surname,
        photoUrl,file1,
        
        imageUrl
    } = inputState

    //let tempPhotoUrl=[...photoUrl]

    const fd=new FormData();
    if(customerId){fd.append('customerId',customerId);}
    if(name){fd.append('name',name);}
    if(surname){fd.append('surname',surname);}
    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            fd.append('photoUrl',`upload/${fileName}`); //ส่วนในฐานข้อมูล จะเก็บเฉพาะ
            //photoUrl.push(`upload/${fileName}`) //ทำการ อัพเดต inputState ด้วย .push
            //tempPhotoUrl.push(`upload/${fileName}`)
        }
    }

    axios
    .post('/customer/add',fd)
    .then(result=>{
        //console.log(result)
        setCustomer([...customer,result.data]);
        setFilterCustomer([...customer,result.data]);
        setInputState(blankCustomer)
       
        //setInputState(initState); //ทำการ อัพเดต inputState ด้วย .push
        //resetFile() //ทำการ รีเซต ค่า ไฟล์ต่างๆ กลับไปเริ่มต้น
        //reloadImage() //รีโหลด เมื่อทำการ add, edit, delete
    })
    .catch(err=>{
        refOpenErrorModal.current.click();    
        //resetFile()
        //setInputState({...inputState,photoUrl:initState.photoUrl})
        //console.log(err)
    })
}
//======================================
const submitEdit=(e)=>{
    e.preventDefault()
    const {
        _id,customerId,
        name,surname,
        file1,
        photoUrl,
        imageUrl
    } = inputState

    let tempPhotoUrl=[...photoUrl]

    const fd=new FormData();
    if(customerId){fd.append('customerId',customerId);}
    if(name){fd.append('name',name);}
    if(surname){fd.append('surname',surname);}
    //-----------------------------

    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            
            tempPhotoUrl=[...tempPhotoUrl,`upload/${fileName}`]
        }
    }
    if(tempPhotoUrl.length>0){
        for(let i=0;i<tempPhotoUrl.length;i++){
            fd.append('photoUrl',tempPhotoUrl[i]); // อัพเดตค่า photoUrl ใน mongo 
        }
    }

    //------------------------------
    
    //------------------------------
    const tempInputState={_id:inputState._id,
                          customerId:inputState.customerId,
                          name:inputState.name,
                          photoUrl:tempPhotoUrl,
                         }

    axios
    .post('/customer/update',fd)
    .then(result=>{
        console.log('tempInputState')
        console.log(tempInputState)
        let temp=[]
        customer.map((i,index)=>{
            if(i.customerId==inputState.customerId){
                temp=[...temp,tempInputState]
            }
            else{
                temp=[...temp,i]
            }
            if(index==customer.length-1){
                setCustomer([...temp])
                setFilterCustomer([...temp])
            }
        })
        setInputState(blankCustomer)
        setEditCustomer(blankCustomer)
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
                        onClick={e=>{setInputState(blankCustomer)}}
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
              
                <div className="col-md-4">
                
                    <div className="row my-3">  
                        <div style={{width:"30%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>คำนำหน้า</label>
                        </div>
                        
                        <div style={{width:"50%"}}>
                            <select className= "form-control"
                                id="title-id"
                                name="title"
                                value={inputState.title}
                                ref={refTitle}
                                onFocus={(e)=>{$('#title-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#title-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>{
                                    changeInputState(e)
                                }}
                            >
                                <option value="" hidden>เลือก...</option>
                            {basicData.title.map((a,index)=>    
                                <option key={index} value={a}>{`${a}`}</option>
                            )}
                            </select>
                        </div>      
                    </div>

                </div>
               
                <div className="col-md-4">

                    <div className="row my-3">  
                        <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>ชื่อผู้ใช้</label>
                        </div>
                        <div style={{width:"50%"}}>
                            <input className= "form-control"
                                id="name-id"
                                type="text"
                                name="name"
                                value={inputState.name}
                                ref={refName}
                                onFocus={(e)=>{$('#name-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#name-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>changeInputState(e)}
                            />
                        </div>      
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-row my-3">  
                      
                        <div style={{width:"20%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>นามสกุล</label>
                        </div>
                        <div style={{width:"50%"}} >
                            <div style={{width:"100%", position:"relative"}} >
                                <input className= "form-control"
                                    id="surname-id"
                                    type="text"
                                    name="surname"
                                    value={inputState.surname}
                                    ref={refSurname}
                                    onFocus={(e)=>{$('#surname-id').css('background-color','pink')}}
                                    onBlur={(e)=>{$('#surname-id').css('background-color','white')}}
                                    onKeyDown={e=>jumpInputToInput(e)}
                                    onChange={e=>changeInputState(e)}    
                                />
                               
                            </div>
                        </div>    
                    </div>
                </div>                    

            </div>                

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
    const renderCustomer=()=>{ 
        return(
        <div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
            {jumpInput?initJump():null}
            <div style={{textAlign:"center"}}>
                <h1>{`${title} : ${inputState.customerId}`}</h1>
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
        return <Redirect to ="/customer" exact/>
    }
    //=======================================
    return (
        inputState.customerId>=0
        ?renderCustomer():
        redirectTo()
    )
}

