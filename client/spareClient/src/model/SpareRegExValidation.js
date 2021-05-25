
const pattern = {
    ptInteger:/(^$)|(^\d{1,30}$)/gi,
    ptBoolean:/(^$)|(^(true)|(false)$)/gi,
    ptString:/^[ก-๙\s\w\+\-\*\/\\.=]{1,200}$/gi,
        ptEmail:/(^$)|(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/gi,
        ptFileName:/(^$)|(^[\w\-\*\/\.\\=]{1,200}$)/gi,
        ptPassword:/(^$)|(^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$)/gi,  
        ptPhone:/(^$)|(^\d{10}$)/gi,
    ptDate:/(^$)|(^\d{4}-[01]\d-[0123]\d$)/gi,



}
//password 8-30 char, at least 1 letter, at least 1 number, at least 1 special char in [#?!@$%^&*-]
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

//=============================
const valNone=(pttn,str)=>{
    return true
}
  
const valBasic= ({pttn,str})=>{
    return new RegExp(pttn).test(str)
}

const valArray= ({pttn,str})=>{
    let tempResult=true

    for (let i=0; i<str.length;i++){
        tempResult= new RegExp(pttn).test(str[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}

//=============================


const valState = ({inputState,template})=>{
 
    let valResult=true

    const validation= ({st,tp})=>{

        const arrayTemplate=Object.keys(tp)
            
        arrayTemplate.map((tpKey,tpIdx)=>{  
            if(st[tpKey]){
                const {stType,valPattern,stChildren}=tp[tpKey]
                
                if(stType=="object"){
                    validation({st:st[tpKey],tp:stChildren})
                }
                else if(stType=="arrayObject"){
                    st[tpKey].map(i=>{
                        validation({st:i,tp:stChildren})
                    })
                }
                else if(stType=="file"){

                }
                else {

                    let valFunc=valBasic
                    if(stType=="arrayString"){valFunc=valArray}
                    switch(valPattern) {
                        case "fileName":
                            valResult= valFunc({pttn:pattern.ptFileName,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "password":
                            valResult= valFunc({pttn:pattern.ptPassword,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "email":
                            valResult= valFunc({pttn:pattern.ptEmail,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "phone":
                            valResult= valFunc({pttn:pattern.ptPhone,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "string":
                            valResult= valFunc({pttn:pattern.ptString,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "integer":
                            valResult= valFunc({pttn:pattern.ptInteger,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "date":
                            valResult= valFunc({pttn:pattern.ptDate,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        case "boolean":
                            valResult= valFunc({pttn:pattern.ptBoolean,str:st[tpKey]})
                            if(!valResult){ throw(`${tpKey} : invalid`)}
                            return //valResult 
                        default:
                            return         
                }}

            }
        })
    }
    
    try {
        if(Array.isArray(inputState)){
            console.log("it is array")
            inputState.map(i=>{
                validation({st:i,tp:template})
            })
        }
        else if(Object.keys(inputState)[0]!="0"){
            console.log("it is object")
            validation({st:inputState,tp:template})
        }
        return valResult
    } 
    catch (error) {
        console.log(error)
        return false
    }
               
}

const RegExValidation = {valState,valNone,valBasic,valArray,pattern}

export default RegExValidation


/*
import React from 'react';
import RegExValidation from './model/RegExValidation'
import StateTemplate from './model/StateTemplate'
import './App.css'

function App() {

const {valState}=RegExValidation
const {employeeTemplate}=StateTemplate

const [inputState,setInputState]=React.useState({
    id:"1",
    name:"Peter",
    age:22,
    email:["peter1@mail.com","peter2@mail.com"],
    bonus:[1,2,3,4,5],
    BOD:"1980-01-31",
    
    education:{
      university:"KU",
      grade:"3"
    },
    
    photoUrl1:["/upload/customer/room-1.jpeg","/upload/customer/room-2.jpeg",],
    photoUrl2:["/upload/customer/room-3.jpeg","/upload/customer/room-4.jpeg",],
    
    children:[
      {
        name:"Johnนิคม",
        age:22,
        email:["john1@mail.com","john2@mail.com"],
        bonus:[200,300,400,500],
        BOD:"2010-05-20",
        education:{
              university:"CU",
              grade:4,
              pass:true
        },
      },
      {  
        name:"Silly",
        age:23,
        email:["silly1@mail.com","silly2@mail.com"],
        bonus:[200,200,300,300],
        BOD:"2011-12-25",
        education:{
              university:"BU",
              grade:2,
              pass:true
        }
      }
    ],
     file1: null,
     file2: null,
     
})

React.useEffect(()=>{
  console.log('inputState')
  console.log(inputState)
})

const [inputState2,setInputState2]=React.useState([
    {
        id:"1",
        name:"Peter",
        age:22,
        email:["peter1@mail.com","peter2@mail.com"]
    },
    {
        id:"3",
        name:"John",
        age:24,
        email:["john1@mail.com","john2@mail.com"]
    },
])
//=================================
  return (
    <div style={{width:"98vw",height:"100vh",
                backgroundColor:"lightgray",
                marginBottom:"1rem"}}>
    
      <button
        onClick={e=>{
          console.log(valState({inputState,template:employeeTemplate}))
        }}
      >
        ตรวจสอบ Object
      </button>
      <button
        onClick={e=>{
          console.log(valState({inputState:inputState2,template:employeeTemplate}))
        }}
      >
        ตรวจสอบ Array
      </button>
    </div>
  );
}

export default App;
*/
