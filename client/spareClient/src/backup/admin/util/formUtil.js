import axios from 'axios';

const submitAdd=({e,inputState,setInputState,
                    employee,setEmployee,
                    setFilterEmployee,
                    refOpenErrorModal,blankEmployee
                })=>{
    e.preventDefault()
    let {
        _id,employeeId,
        username,password,
        photoUrl,file1,
        
        imageUrl
    } = inputState

    //let tempPhotoUrl=[...photoUrl]

    const fd=new FormData();
    if(employeeId){fd.append('employeeId',employeeId);}
    if(username){fd.append('username',username);}
    if(password){fd.append('password',password);}
    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            fd.append('photoUrl',`upload/employee/${fileName}`); //ส่วนในฐานข้อมูล จะเก็บเฉพาะ
            //photoUrl.push(`upload/${fileName}`) //ทำการ อัพเดต inputState ด้วย .push
            //tempPhotoUrl.push(`upload/${fileName}`)
        }
    }

    axios
    .post('/employee/add',fd)
    .then(result=>{
        console.log(result)
        setEmployee([...employee,result.data]);
        setFilterEmployee([...employee,result.data]);
        setInputState(blankEmployee)
        //setEditEmployee(blankEmployee)
        //setInputState(initState); //ทำการ อัพเดต inputState ด้วย .push
        //resetFile() //ทำการ รีเซต ค่า ไฟล์ต่างๆ กลับไปเริ่มต้น
        //reloadImage() //รีโหลด เมื่อทำการ add, edit, delete
    })
    .catch(err=>{
        refOpenErrorModal.current.click();    
        //resetFile()
        //setInputState({...inputState,photoUrl:initState.photoUrl})
        //console.log(err)
    })
}
//======================================
const submitEdit=({e,inputState,setInputState,
                   employee,setEmployee,
                   setFilterEmployee,setEditEmployee,
                   refOpenErrorModal,blankEmployee
                    })=>{
    e.preventDefault()
    const {
        _id,employeeId,
        username,password,
        employeeUrl,file1,
        photoUrl,
        imageUrl
    } = inputState

    let tempPhotoUrl=[...photoUrl]

    const fd=new FormData();
    if(employeeId){fd.append('employeeId',employeeId);}
    if(username){fd.append('username',username);}
    if(password){fd.append('password',password);}
    //-----------------------------

    if(file1){
        for(let i=0;i<file1.length;i++){
            const fileName=`${file1[i].name}`
            fd.append(`imageUrl`,file1[i],fileName);   //การแนบไฟล์รูปกับ ชื่อไฟล์พร้อมกัน เก็บใน imageUrl
            
            tempPhotoUrl=[...tempPhotoUrl,`upload/${fileName}`]
        }
    }
    if(tempPhotoUrl.length>0){
        for(let i=0;i<tempPhotoUrl.length;i++){
            fd.append('photoUrl',tempPhotoUrl[i]); // อัพเดตค่า photoUrl ใน mongo 
        }
    }

    //------------------------------
    
    //------------------------------
    const tempInputState={_id:inputState._id,
                          employeeId:inputState.employeeId,
                          username:inputState.username,
                          photoUrl:tempPhotoUrl,
                         }

    axios
    .post('/employee/update',fd)
    .then(result=>{
        console.log('tempInputState')
        console.log(tempInputState)
        let temp=[]
        employee.map((i,index)=>{
            if(i.employeeId==inputState.employeeId){
                temp=[...temp,tempInputState]
            }
            else{
                temp=[...temp,i]
            }
            if(index==employee.length-1){
                setEmployee([...temp])
                setFilterEmployee([...temp])
            }
        })
        setInputState(blankEmployee)
        setEditEmployee(blankEmployee)
        //setInputState(tempInputState);
        //resetFile();
        //reloadImage();
    })
    .catch(err=>{
        refOpenErrorModal.current.click();      
        //console.log(err)
    })                   

}

const formUtil={submitAdd,submitEdit}

export default formUtil