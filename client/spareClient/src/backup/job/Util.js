

//==================================
const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){
         const arraytxt=arrs.map(i=>` ${i}`)
         return arraytxt
    }}
}
//----------------------------------
const tableLineStyle=(i,editJob)=>{
    if(editJob){
        if(editJob.jobId==i.jobId){
            return(
                {color:"red"}
            )
        }
        else{
            return null
        }
    }
    return null
}
//==================================

//==================================



const Util={showArray,tableLineStyle}

export default Util