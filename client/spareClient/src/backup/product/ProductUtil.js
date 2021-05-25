

//==================================
const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){
         const arraytxt=arrs.map(i=>` ${i}`)
         return arraytxt
    }}
}
//----------------------------------
const tableLineStyle=(i,editProduct)=>{
    if(editProduct){
        if(editProduct.productId==i.productId){
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



const EmployeeViewUtil={showArray,tableLineStyle}

export default EmployeeViewUtil