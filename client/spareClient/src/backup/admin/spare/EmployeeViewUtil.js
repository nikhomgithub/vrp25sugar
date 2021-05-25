

//==================================
const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){ 
        let arraytxt =''
        arrs.map((i,index)=>{
            if(index==arrs.length-1){
                arraytxt=`${arraytxt} ${i}`
            }
            else{
                arraytxt=`${arraytxt} ${i},`
            }
        })
         return arraytxt
    }}
}
//==================================
const showAddress=(obj)=>{
    if(obj){
        let {number,building,tambon,district,province,postcode}=obj

        //console.log(obj)
        number=number?`เลขที่ ${number}`:``
        building=building?` อาคาร ${building}`:``
        tambon=tambon?` ตำบล ${building}`:``
        district=district?` อำเภอ ${building}`:``
        province=province?` จังหวัด ${province}`:``
        postcode=postcode?` รหัสไปรษณีย์ ${postcode}`:``

        const address=number+building+tambon+district+province+postcode
        //console.log('address')
        //console.log(address)
        return address
    }
}

//----------------------------------
const tableLineStyle=(i,editEmployee,idx)=>{
    let returnStyle={paddingTop:"0.3rem",paddingBottom:"0.3rem"}

    if(idx%2==1){
        returnStyle={...returnStyle, backgroundColor:"#f1f1f1"}
    }

    if(editEmployee){
        if(editEmployee.employeeId==i.employeeId){
            returnStyle={...returnStyle, color:"red"}
        }
    }
    return returnStyle
}


const EmployeeViewUtil={showArray,tableLineStyle,showAddress}

export default EmployeeViewUtil