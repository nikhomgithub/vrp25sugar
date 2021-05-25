import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import showUtil from '../util/showUtil'
import stateUtil from '../util/stateUtil'
import photoUtil from '../util/photoUtil'
import testData from '../util/testData'

import Galleryone_add from '../components/galleryone_add/Galleryone_add'

export default function TestForm() {

const {showArray,showObject} = showUtil
const {people,blankPerson}=testData

const {changeKey,changeArray,changeInnerKey,changeInnerArray,
       addArray,deleteArray,addInnerArray,deleteInnerArray,
        addArrayObject}=stateUtil

const {fileListItem,changeArrayFile,handleInputFile,
    reloadImage,resetFile,deleteFileUrl,deletePhotoUrl}=photoUtil

//const [inputState,setInputState]=React.useState(people[0])
const [inputState,setInputState]=React.useState(blankPerson)

const basicData=[true,false]

React.useEffect(()=>{
    console.log(inputState)
},[inputState])

//==============================
const [arrayFile1,setArrayFile1]=React.useState([])
const [fileUrl1,setFileUrl1]=React.useState([])

const [arrayFile2,setArrayFile2]=React.useState([])
const [fileUrl2,setFileUrl2]=React.useState([])

const [showImage,setShowImage]=React.useState(true)

//==================================
//files from <input type="file"/>
React.useEffect(()=>{
    
    changeArrayFile({arrayFile:arrayFile1,
                      setFileUrl:setFileUrl1,
                      inputState,
                      setInputState,
                      fileName:"file1",
                      setShowImage})
   
},[arrayFile1])
//=================================
//files from <input type="file"/>
React.useEffect(()=>{
    
    changeArrayFile({arrayFile:arrayFile2,
                      setFileUrl:setFileUrl2,
                      inputState,
                      setInputState,
                      fileName:"file2",
                      setShowImage})
   
},[arrayFile2])
//=================================


const renderView=()=>(
<div style={{width:"100%",height:"100%",marginTop:"3.5rem",
    position:"relative"}}>
    <div style={{display:"flex",justifyContent:"center"}}>
          
        <div>
            <div style={{textAlign:"center"}}>           
                <h4>แบบฟอร์ม</h4>
            </div>

            <div style={{border:"1px solid green",padding:"1rem"}}>
                <div style={{display:"flex"}}>
                    <h5>ID</h5>
                    <input
                        value={inputState.id}
                        onChange={e=>{changeKey({key:"id",
                            value:e.target.value,inputState,
                            setInputState})}}
                    />
                </div>

                <div style={{display:"flex"}}>
                    <h5>ชื่อ</h5>
                    <input
                        value={inputState.name}
                        onChange={e=>{changeKey({key:"name",
                            value:e.target.value,inputState,
                            setInputState})}}
                    />
                </div>

                <div style={{display:"flex"}}>
                    <h5>Active</h5>                 
                    <select
                        value={inputState.active}
                        onChange={e=>{changeKey({key:"active",
                            value:e.target.value,inputState,
                            setInputState})}}
                    >
                        <option value="" hidden>เลือกจากรายการ...</option>
                            { basicData.map((a,index3)=>
                                <option key={index3} 
                                    value={a}>{`${a}`}</option>
                            )}
                    </select>
                </div>
            </div>

            <div style={{border:"1px solid red",padding:"1rem"}}>
                <button 
                    onClick={e=>{
                        addArray({key:"email",inputState,setInputState})
                    }}
                >Add Email</button>
                {
                    inputState.email.map((i,index)=>
                    <div style={{display:"block"}}>
                        <input 
                            value={inputState.email[index]}
                            onChange={e=>{
                                changeArray({key:"email",value:e.target.value,
                                idx:index,inputState,setInputState})
                            }}
                        /> 
                        <button
                            onClick={e=>{
                                deleteArray({key:"email",idx:index,
                                inputState,setInputState})
                            }}
                        >del</button>
                    </div>)
                }
            </div>

            <div style={{border:"1px solid green",padding:"1rem"}}>
                <button style={{backgroundColor:"green"}}
                    onClick={e=>addArrayObject({key:"address",
                            newObj:{district:"",phone:[""]},
                            inputState,setInputState})}
                >Add Address</button>
                {
                    inputState.address.map((i,index)=>
                        <div style={{border:"1px solid red", padding:"1rem"}}>
                            <div>
                                <button style={{backgroundColor:"red"}}
                                    onClick={e=>{deleteArray({key:"address",
                                        idx:index,inputState,setInputState})}}
                                > Del Address</button>
                            </div>
                            <input value={inputState.address[index].district}
                                onChange={e=>{
                                    changeInnerKey({key:"address",idx:index,
                                        subKey:"district",value:e.target.value,
                                        inputState,setInputState})
                                }}
                            />
                            <div>
                                <button 
                                    onClick={e=>{addInnerArray({key:"address",
                                        idx:index,subKey:"phone",
                                        inputState,setInputState})}}
                                >Add</button>
                                {
                                    i.phone.map((j,index2)=>
                                    <div>
                                        <input 
                                            value={inputState.address[index].phone[index2]}
                                            onChange={e=>{
                                                changeInnerArray({key:"address",
                                                value:e.target.value,
                                                idx:index,subKey:"phone",
                                                subIdx:index2,
                                                inputState,setInputState})}}
                                        /> 
                                        <button
                                            onClick={e=>{
                                                deleteInnerArray({key:"address",idx:index,
                                                    subKey:"phone",subIdx:index2,
                                                    inputState,setInputState})}}
                                        >del</button>
                                    </div>)
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            
            <div>
                <div>
                    <input
                        type="file"
                        multiple="multiple" accept="image/*"
                        onChange={e=>{
                            handleInputFile({files:e.target.files,
                                arrayFile:arrayFile1,
                                setArrayFile:setArrayFile1})}}
                    />
                </div>
                {showImage
                ?<Galleryone_add 
                    imgarrs={[...inputState.photoUrl1,...fileUrl1]}
                                    deleteFile={deleteFileUrl}
                                    deleteUrl={deletePhotoUrl}
                                    arrayFile={arrayFile1}
                                    setArrayFile={setArrayFile1}
                                    reloadImage={reloadImage}
                                    setShowImage={setShowImage}
                                    inputState={inputState}
                                    setInputState={setInputState}
                />
                :null
                }   
            </div>


            <div>
                <div>
                    <input
                        type="file"
                        multiple="multiple" accept="image/*"
                        onChange={e=>{
                            handleInputFile({files:e.target.files,
                                arrayFile:arrayFile2,
                                setArrayFile:setArrayFile2})}}
                    />
                </div>
                {showImage
                ?<Galleryone_add 
                    imgarrs={[...inputState.photoUrl2,...fileUrl2]}
                                    deleteFile={deleteFileUrl}
                                    deleteUrl={deletePhotoUrl}
                                    arrayFile={arrayFile2}
                                    setArrayFile={setArrayFile2}
                                    reloadImage={reloadImage}
                                    setShowImage={setShowImage}
                                    inputState={inputState}
                                    setInputState={setInputState}
                />
                :null
                }   
            </div>


        </div>
    </div>
</div>
)

//============================================
    return (
        renderView()
    )
}
