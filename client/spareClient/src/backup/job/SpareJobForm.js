import React from 'react'

import {MainContext} from '../context/MainContext';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import RefreshIcon from '@material-ui/icons/Refresh';
import Galleryone_add from './components/galleryone_add/Galleryone_add'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import CustomerModal from './CustomerModal'
import th from "date-fns/locale/th";
registerLocale("th", th);


export default function JobForm({title,initState,isAdd}) {
    const {blankJob,
           job,setJob,
           reloadJob,setReloadJob,
           filterJob,setFilterJob,

           editJob,setEditJob,
           addJob,setAddJob,

           customer,
           filterCustomer,setFilterCustomer,
           editCustomer,setEditCustomer,
           }=React.useContext(MainContext)
    
    const refOpenErrorModal=React.useRef();    

//==================================

//==================================
const [inputState,setInputState]=React.useState(initState)

const changeInputState=(e)=>{
    if(e.target.name=='customerId'){
        customer.map(i=>{  
            if(i.customerId==e.target.value){
                const temp={
                    customerId:i.customerId,
                    title:i.title,
                    name:i.name,
                    surname:i.surname,
                    phone:i.phone,
                    email:i.email,
                    line:i.line
                }
                setInputState({...inputState,...temp}) 
            }
        })
    }
    else{
        setInputState({...inputState,[e.target.name]:e.target.value})
    }
}
React.useEffect(()=>{
    if(inputState){
        console.log('inputState')
        console.log(inputState)
    }
},[inputState])  

//=====================================
const changeInputStateCustomerModal=()=>{
    const {customerId,title,name,surname,phone,email,line}=editCustomer
    if(editCustomer.customerId>0){
        setInputState({...inputState,customerId,title,name,surname,phone,email,line})
    }
}

//=====================================
const displayEngDate=(fullDate)=>{
    //console.log('fullDate.substring(0,10)')
    //console.log(fullDate.substring(0,10))
    return fullDate.substring(0,10);
}
//=========================
const displayThaiDate=(isoDate)=>{
    //in mongo is iso-date 	"2015-03-25"
    //for thaiDate in put is short-date "03/25/2015"
    //for e of thaiDate is long-date "Mar 25 2015"
    if(isoDate){
        const shortDate = isoDate.substring(0,10)
        return new Date(shortDate)
    }
    else{
        return isoDate
    }
}

let [tempDateIn,setTempDateIn]=React.useState(displayThaiDate(inputState.dateIn))
let [tempDateOut,setTempDateOut]=React.useState(displayThaiDate(inputState.dateOut))

//==================================
const ref1=React.useRef()
const ref2=React.useRef()

const [arrayFile1,setArrayFile1]=React.useState([])
const [fileUrl1,setFileUrl1]=React.useState([])

const [arrayFile2,setArrayFile2]=React.useState([])
const [fileUrl2,setFileUrl2]=React.useState([])

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
React.useEffect(()=>{
    const tempFileList= new fileListItem( arrayFile2 )
    let tempFileUrl=[]
    
    for(let i=0;i<tempFileList.length;i++){
        const tempObject={ name:tempFileList[i].name,
                           blob:URL.createObjectURL(tempFileList[i])}
        tempFileUrl=[...tempFileUrl,tempObject]
    }
    setFileUrl2(tempFileUrl)
    handleChange(tempFileList,"file2")
    reloadImage()

},[arrayFile2])

//files from <input type="file"/>
const handleInputFile2=(files)=>{
    const unique=Array.from(new Set([...arrayFile2,...files]))
    setArrayFile2(unique)   
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

    setArrayFile2([])
    setFileUrl2([])
}
//===================================
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

const deleteBeforeUrl=(name)=>{
    const tempLength=inputState.beforeUrl.length
    let temp=[]
    for(let i=0;i<tempLength;i++){
        if(inputState.beforeUrl[i]!=name){
            temp=[...temp,inputState.beforeUrl[i]]
        }
        if(i==tempLength-1){
            setInputState({...inputState,beforeUrl:temp})
        }
    }
    reloadImage()
}
//==================================
//==================================
const deleteFileUrl2=(name)=>{ 
    let tempArray=[]
    arrayFile2.map((i,index)=>{
        if(i.name!==name){
            tempArray.push(i)
        }
        return tempArray
    })
    setArrayFile2(tempArray)   
    reloadImage();   
}

const deleteAfterUrl=(name)=>{
    const tempLength=inputState.afterUrl.length
    let temp=[]
    for(let i=0;i<tempLength;i++){
        if(inputState.afterUrl[i]!=name){
            temp=[...temp,inputState.afterUrl[i]]
        }
        if(i==tempLength-1){
            setInputState({...inputState,afterUrl:temp})
        }
    }
    reloadImage()
}
//==================================
//==================================
    const [jumpInput,setJumpInput]=React.useState(true)    
    
    const refCustomerId = React.useRef() 
    const refDateIn = React.useRef()
    const refDateOut = React.useRef()

    const initJump =()=>{
        setTimeout(()=>{
            //refCustomerId.current.focus()
            setJumpInput(false)
        },200)
    }
    
    const jumpInputToInput = (e)=>{
        if(e.key=="Enter"){
            switch(e.target.name){
                case "customerId":
                    //refDateIn.current.focus();
                    return;
                case "dateIn":
                    //refDateOut.current.focus();
                    return;
                case "dateOut":
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
        _id,jobId,
        customerId,
        title,name,surname,
        line,email,phone,
        dateIn,dateOut,
        file1,file2,
        beforeUrl,afterUrl,
        imageUrl
    } = inputState



    const fd=new FormData();
    if(jobId){fd.append('jobId',jobId);}
    if(customerId){fd.append('customerId',customerId);}
    if(title){fd.append('title',title)}
    if(name){fd.append('name',name)}
    if(surname){fd.append('surname',surname)}
    if(dateIn){fd.append('dateIn',dateIn);}
    if(dateOut){fd.append('dateOut',dateOut);}

    if(phone){
        for(let i=0;i<phone.length;i++){
            fd.append('phone',phone[i]);
        }
    }
    if(line){
        for(let i=0;i<line.length;i++){
            fd.append('line',line[i]);
        }
    }
    if(email){
        for(let i=0;i<email.length;i++){
            fd.append('email',email[i]);
        }
    }

    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            fd.append('beforeUrl',`upload/${fileName}`); //ส่วนในฐานข้อมูล จะเก็บเฉพาะ
          }
    }
    if(file2){
        for(let i=0;i<file2.length;i++){
            const fileName=`${file2[i].name}`
            fd.append(`imageUrl`,file2[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            fd.append('afterUrl',`upload/${fileName}`); //ส่วนในฐานข้อมูล จะเก็บเฉพาะ
            //afterUrl.push(`upload/${fileName}`) //ทำการ อัพเดต inputState ด้วย .push
        }
    }

    axios
    .post('/job/add',fd)
    .then(result=>{
        console.log(result)
        setJob([...job,result.data]);
        setFilterJob([...job,result.data]);
        setInputState(blankJob)
        
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
    const {
        _id,jobId,
        customerId,
        title,name,surname,
        line,email,phone,
        dateIn,dateOut,
        file1,file2,
        beforeUrl,afterUrl,
        imageUrl
    } = inputState

    const fd=new FormData();
    if(jobId){fd.append('jobId',jobId);}
    if(customerId){fd.append('customerId',customerId);}
    if(title){fd.append('title',title)}
    if(name){fd.append('name',name)}
    if(surname){fd.append('surname',surname)}
    if(dateIn){fd.append('dateIn',dateIn);}
    if(dateOut){fd.append('dateOut',dateOut);}

    if(phone){
        for(let i=0;i<phone.length;i++){
            fd.append('phone',phone[i]);
        }
    }
    if(line){
        for(let i=0;i<line.length;i++){
            fd.append('line',line[i]);
        }
    }
    if(email){
        for(let i=0;i<email.length;i++){
            fd.append('email',email[i]);
        }
    }

    //-----------------------------
    let tempBeforeUrl=[...beforeUrl]
    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            
            tempBeforeUrl=[...tempBeforeUrl,`upload/${fileName}`]
        }
    }
    if(tempBeforeUrl.length>0){
        for(let i=0;i<tempBeforeUrl.length;i++){
            fd.append('beforeUrl',tempBeforeUrl[i]); // อัพเดตค่า  ใน mongo 
        }
    }
    //--------------------------------
    let tempAfterUrl=[...afterUrl]
    if(file2){
        for(let i=0;i<file2.length;i++){
            const fileName=`${file2[i].name}`
            fd.append(`imageUrl`,file2[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            
            tempAfterUrl=[...tempAfterUrl,`upload/${fileName}`]
        }
    }
    if(tempAfterUrl.length>0){
        for(let i=0;i<tempAfterUrl.length;i++){
            fd.append('afterUrl',tempAfterUrl[i]); // อัพเดตค่า ใน mongo 
        }
    }


    //------------------------------
    
    //------------------------------
    const tempInputState={_id:inputState._id,
                          jobId:inputState.jobId,
                          customerId:inputState.customerId,
                          dateIn:inputState.dateIn,
                          dateOut:inputState.dateOut,
                          beforeUrl:tempBeforeUrl,
                          afterUrl:tempAfterUrl
                         }

    axios
    .post('/job/update',fd)
    .then(result=>{
        console.log('tempInputState')
        console.log(tempInputState)
        let temp=[]
        job.map((i,index)=>{
            if(i.jobId==inputState.jobId){
                temp=[...temp,tempInputState]
            }
            else{
                temp=[...temp,i]
            }
            if(index==job.length-1){
                setJob([...temp])
                setFilterJob([...temp])
            }
        })
        setInputState(blankJob)
        setEditJob(blankJob)
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
                        onClick={e=>{setInputState(blankJob)}}
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
                <div style={{width:"100%"}}>
                    <div className="form-row my-3">  
                        <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label >รหัสลูกค้า</label>
                        </div>
                        <div style={{width:"80%"}}>
                            <select className= "form-control"
                                id="customerId-id"
                                name="customerId"
                                value={inputState.customerId}
                                ref={refCustomerId}
                                onFocus={(e)=>{$('#customerId-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#customerId-id').css('background-color','white')}}
                                onKeyDown={e=>jumpInputToInput(e)}
                                onChange={e=>{
                                    changeInputState(e)
                                }}
                            >
                                <option value="" hidden>เลือกจากรายการ...</option>
                                {customer.map((a,index)=>
                                <option key={index} 
                                value={a.customerId}>{`${a.customerId} : ${a.title} ${a.name} ${a.surname}`}</option>)}
                            </select>
                        </div>      
                    </div>
                </div>

                <div style={{width:"50%"}}>
                    <div className="form-row my-3">  
                        <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>วันรับ</label>
                        </div>
                        <div style={{width:"80%"}} >
                            <div style={{width:"100%", position:"relative"}} >
                          
                                <DatePicker className= "form-control"
                                    id="dateIn-id"
                                    name="dateIn"
                                    locale="th"
                                    dateFormat="dd/MM/yyyy"
                                    style={{zIndex:"5000"}}
                                    selected={tempDateIn}
                                    onChange={e=>{
                                        setInputState({...inputState,dateIn:e.toISOString()})
                                        setTempDateIn(e)
                                        
                                     
                                        
                                    }}
                                    onFocus={(e)=>{$('#dateIn-id').css('background-color','pink')}}
                                    onBlur={(e)=>{$('#dateIn-id').css('background-color','white')}}
                                    onKeyDown={e=>jumpInputToInput(e)}
                                  
                                />
                            </div>
                        </div>    
                    </div>
                </div>   


                <div style={{width:"50%"}}>
                    <div className="form-row my-3">  
                        <div style={{width:"15%",marginLeft:"1rem",marginTop:"0.3rem"}}>
                            <label>วันนัด</label>
                        </div>
                        <div style={{width:"80%"}} >
                            <div style={{width:"100%", position:"relative"}} >
                                <DatePicker className= "form-control"
                                    id="dateOut-id"
                                    name="dateOut"
                                    locale="th"
                                    dateFormat="dd/MM/yyyy"
                                    style={{zIndex:"5000"}}
                                    selected={tempDateOut}
                                    onChange={e=>{
                                        //console.log('e.toISOSting')
                                        //console.log(e.toISOString())
                                        setInputState({...inputState,dateOut:e.toISOString()})
                                        setTempDateOut(e)
                                    }}
                                    
                                    onFocus={(e)=>{$('#dateOut-id').css('background-color','pink')}}
                                    onBlur={(e)=>{$('#dateOut-id').css('background-color','white')}}
                                    onKeyDown={e=>jumpInputToInput(e)}
                                />
                            </div>
                        </div>    
                    </div>
                </div>   

            </div>                


            <div className="form-row" style={{marginBottom:"1rem"}}> 
                <div className={`form-group col-md-6 text-left`}>
                    <input  
                            type="file" className="form-control-file d-none"  
                            multiple="multiple" accept="image/*"
                            ref={ref1}
                            onChange={e=>{handleInputFile1(e.target.files)}}
                    />
                    <div className="d-flex justify-content-around mb-2">
                        <button 
                            className="btn btn-primary"
                            onClick={e=>{
                                e.preventDefault();
                                ref1.current.click()
                        }}>{`เลือกไฟล์ภาพ`}</button>
                        <h5>จำนวนรูปภาพ = {fileUrl1.length+inputState.beforeUrl.length}</h5>
                    </div>
                    {showImage
                    ?<Galleryone_add imgarrs={[...inputState.beforeUrl,...fileUrl1]}
                                        deleteFile={deleteFileUrl1}
                                        deleteUrl={deleteBeforeUrl}
                    />
                    :null
                    }   
                </div>   

                <div className={`form-group col-md-6 text-left`}>
                    <input  
                            type="file" className="form-control-file d-none"  
                            multiple="multiple" accept="image/*"
                            ref={ref2}
                            onChange={e=>{handleInputFile2(e.target.files)}}
                    />
                    <div className="d-flex justify-content-around  mb-2">
                        <button 
                            className="btn btn-primary"
                            onClick={e=>{
                                e.preventDefault();
                                ref2.current.click()
                        }}>{`เลือกไฟล์ภาพ`}</button>
                        <h5>จำนวนรูปภาพ = {fileUrl2.length+inputState.afterUrl.length}</h5>
                    </div>
                    {showImage
                    ?<Galleryone_add imgarrs={[...inputState.afterUrl,...fileUrl2]}
                                        deleteFile={deleteFileUrl2}
                                        deleteUrl={deleteAfterUrl}
                    />
                    :null
                    }   
                </div>   
            </div>

        </div>
    )
    }
    //======================================
    const renderTable=()=>{
        return(
        <div style={{marginBottom:"2rem"}}>
            <table className="table table-striped" >
                    <thead>
                        <tr style={{fontSize:"1.2rem"}}>
                            <th scope="col"></th>
                            <th scope="col">id</th>
                            <th scope="col">สินค้า</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">หน่วย</th>
                            <th scope="col">จำนวน</th>     
                            
                        </tr>
                    </thead>
                    {inputState.detail.map((i,index)=>
                        <tbody key={i.detailIndex} 
                               onClick={e=>{
                                
                               }}
                               style={{color:'black'} }                       
                        >
                            <tr style={{fontSize:"1.2rem"}}>
                              
                                <th scope="col">{i.detailIndex}</th>
                                <th scope="col">{i.productId}</th>
                                <th scope="col">{i.productName}</th> 
                                <th scope="col">{i.price}</th> 
                                <th scope="col">{i.unit}</th> 
                                <th scope="col">{i.quantity}</th>
                            
                            </tr>
                        </tbody>
                    )}
            </table>
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
    /*
    const refOpenCustomerModal=React.useRef()
   
    const renderCustomerModal=()=>{
        return(
        <div>
            <button type="button" className="d-none" ref={refOpenCustomerModal}
                    data-toggle="modal" data-target="#customer-filter"
            >Test</button>

            <CustomerModal
                modalId={`customer-filter`}
                customer={customer}
                filterCustomer={filterCustomer}
                setFilterCustomer={setFilterCustomer}
                editCustomer={editCustomer}
                setEditCustomer={setEditCustomer}
                changeInputStateCustomerModal={changeInputStateCustomerModal}
            />
        </div>
        )
    }
    */
    //============================
       
    //======================================
    const renderJob=()=>{ 
        return(
        <div style={{width:"100%",height:"100%",marginTop:"5rem",position:"relative"}}>
            {
            //jumpInput?initJump():null
            }
            <div style={{textAlign:"center"}}>
                <h1>{`${title} : ${inputState.jobId}`}</h1>
              
                {
                renderErrorModal()
                }   
               
                {
                renderModalForm()
                }
                {
                renderTable()    
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
        return <Redirect to ="/job" exact/>
    }
    //=======================================
    return (
        inputState.jobId>=0
        ?renderJob():
        redirectTo()
    )
}

