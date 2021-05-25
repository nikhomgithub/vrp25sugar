
const tableLineStyle=(i,data,idx)=>{
    let returnStyle={paddingTop:"0.3rem",paddingBottom:"0.3rem"}

    if(idx%2==1){
        returnStyle={...returnStyle, backgroundColor:"#f1f1f1"}
    }

    if(data){
        if(data.employeeId==i.employeeId){
            returnStyle={...returnStyle, color:"red"}
        }
    }
    return returnStyle
}

const styleUtil={tableLineStyle}

export default styleUtil
