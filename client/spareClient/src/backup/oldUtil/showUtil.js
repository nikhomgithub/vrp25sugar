//==========================    
//test   : <h4>{showArray(people[0].email)}</h4>
//result : peter1@mail.com, peter2@mail.com

const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){ 
        let temp =''
        arrs.forEach((i,index)=>{
            temp=`${temp} ${i}`
            
            if(index!=arrs.length-1){
                temp=`${temp},`
            }
           
        })
         return temp
    }}
}

//===========================
// <h4>{showObject(people[0])} </h4>
//id : 0, active : true, 
//email : peter1@mail.com, peter2@mail.com, 
//photo : upload/employee/room-1.jpeg, upload/employee/room-2.jpeg,
const showObject=(obj)=>{
    const arrs=Object.keys(obj)
    let temp=''
    arrs.forEach((i,index)=>{
        //temp=temp+obj[i]?`${i} : ${obj[i]}`:''
        //console.log(obj[i])
        if(typeof obj[i]=="number"||typeof obj[i]=="string"){
            temp=temp+` ${i} : ${obj[i]}`
            if(index!=arrs.length-1){
                temp=`${temp},`
            }
        }
        
        else if(typeof obj[i]=="boolean"){
            if(obj[i]){temp=temp+` ${i} : true`}
            else{temp=temp+` ${i} : false`}
            if(index!=arrs.length-1){
                temp=`${temp},`
            }
        }

        else if(typeof obj[i]=="object" && obj[i].length>0)
        {
            if(typeof obj[i][0]=="number"||typeof obj[i][0]=="string"){
                //console.log(obj[i][0])
                temp=temp+` ${i} :`+showArray(obj[i])              
                if(index!=arrs.length-1){
                    temp=`${temp},`
                }
            } else if(typeof obj[i]=="boolean"){
                if(obj[i]){temp=temp+` ${i} : true`}
                else{temp=temp+` ${i} : false`}
                if(index!=arrs.length-1){
                    temp=`${temp},`
                }
            }
        }
    })
    return temp
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
        return address
    }
}

//----------------------------------

const showUtil={showArray,showObject,showAddress}

export default showUtil
