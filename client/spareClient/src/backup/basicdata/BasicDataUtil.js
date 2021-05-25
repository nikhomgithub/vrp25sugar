const accendArray=(arrs)=>{
    let temp=arrs.sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })
    return temp
}//===========================   
const deccendArray=(arrs)=>{
    let temp=arrs.sort(function(a, b){
        if(a < b) { return 1; }
        if(a > b) { return -1; }
        return 0;
    })
    return temp
}//========================== 
const addElement=(inputState,setInputState,name)=>{
    let temp=inputState[`${name}`]
    temp=[...temp,""]
    setInputState({[name]:temp})
}//=========================
const deleteElement=(inputState,setInputState,idx,name)=>{
    let temp=[]
    inputState[`${name}`].map((i,index)=>{
        if(idx!=index){
            temp=[...temp,i]
        }
    })    
    setInputState({[name]:temp})
}//========================= 
const changeInputState=(inputState,setInputState,name,idx,value)=>{  
    let temp=inputState[`${name}`].map((i,index)=>{
        if(idx==index){ return value }
        else{return i}
    });
    setInputState({[name]:temp})
}//======================
const trimInput=(inputState,setInputState,name)=>{
    let temp=[]
    inputState[`${name}`].map((i,index)=>{
        i.trim()
        if(i!=""){
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[`${name}`]:temp})
}//========================
const BasicDataUtil={accendArray,deccendArray,addElement,
    deleteElement,changeInputState,trimInput}

export default BasicDataUtil