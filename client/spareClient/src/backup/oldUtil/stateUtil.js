//แก้ไข name:"Peter"
const changeKey=({key,value,inputState,setInputState})=>{
    setInputState({...inputState,[key]:value})
}

//แก้ไข email:["peter1@mail.com","peter2@mail.com"]
const changeArray=({key,value,idx,inputState,setInputState})=>{ 
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            temp=[...temp,value]
        }else{
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

const addArray=({key,inputState,setInputState})=>{ 
    let temp=[...inputState[key],"" ]
    setInputState({...inputState,[key]:temp})
}

const deleteArray=({key,idx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index!=idx){
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//
const addArrayObject=({key,newObj,inputState,setInputState})=>{
    let temp=[...inputState[key],newObj ]
    setInputState({...inputState,[key]:temp})
} 


//แก้ไข district:"Bangbo",
const changeInnerKey=({key,idx,subKey,value,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            const tempObj={...i,[subKey]:value}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//แก้ไข phone:["0899214409"]

const changeInnerArray=({key,value,idx,subKey,subIdx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            let subArray=[]
            i[subKey].forEach((j,index2)=>{
                if(index2==subIdx){
                    subArray=[...subArray,value]
                }   
                else{
                    subArray=[...subArray,j]
                }             
            })
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

const deleteInnerArray=({key,idx,subKey,subIdx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            let subArray=[]
            i[subKey].forEach((j,index2)=>{
                if(index2!=subIdx){
                    subArray=[...subArray,j]
                }     
            })
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

const addInnerArray=({key,idx,subKey,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            const subArray=[...i[subKey],""]
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

//================================


const stateUtil={changeKey,changeArray,changeInnerKey,changeInnerArray,
    addArray,deleteArray,addInnerArray,deleteInnerArray,
    addArrayObject}

export default stateUtil
