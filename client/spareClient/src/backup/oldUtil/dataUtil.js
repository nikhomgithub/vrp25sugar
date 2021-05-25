const deleteData=({data,setData,idx})=>{
    let temp = []
    data.map((i,index)=>{
        if(idx!=index){
            temp=[...temp,i]
        }
    })
    setData([...temp])
}
//-------------------------------
const addData=({data,setData,newObj})=>{
    setData([...data,newObj])
}
//-------------------------------
const updateData=({data,setData,newObj,idx})=>{
    let temp={...data[idx],...newObj}
    let temp=[]
    data.map((i,index)=>{
        if(idx==index){
            temp=[...temp,{...i,...newObj}]
        }
        else{
            temp=[...temp,i]
        }
    })
    setData([...temp])
}

const dataUtil={deleteData,addData,updateData}

export default dataUtil
