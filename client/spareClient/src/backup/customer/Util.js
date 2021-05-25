

//==================================
const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){
         const arraytxt=arrs.map(i=>` ${i}`)
         return arraytxt
    }}
}
//----------------------------------
const tableLineStyle=(i,editCustomer)=>{
    if(editCustomer){
        if(editCustomer.customerId==i.customerId){
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