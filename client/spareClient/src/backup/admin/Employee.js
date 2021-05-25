import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

import {MainContext} from '../context/MainContext';

import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';

import renderUtil from '../renderUtil/renderUtil'

import renderTable        from '../renderUtil/renderTable'
import renderCard         from '../renderUtil/renderCard'

import renderModalFilter  from '../renderUtil/renderModalFilter'
import renderModalBodyFilter from './renderModalBodyFilter'

import renderModalBodyCard from './renderModalBodyCard'
import renderModalSettingCard from '../renderUtil/renderModalSettingCard'

import renderModalBodyTable from './renderModalBodyTable'
import renderModalSettingTable from '../renderUtil/renderModalSettingTable'

export default function EmployeeView() {

const {
    username,level,
    employee,setEmployee,
    filterEmployee,setFilterEmployee,
    setReloadEmployee,
    basicData,setReloadBasicData,
    editEmployee,setEditEmployee,
    addEmployee,setAddEmployee,
    blankEmployee }=React.useContext(MainContext)

const {renderBadge,renderFault,renderErrorModal} = renderUtil;
const {modalBodyFilter,filterAll}=renderModalBodyFilter

const refOpenModalFilter=React.useRef();
const refCloseModalFilter=React.useRef();

const refOpenModalSetting=React.useRef();
const refCloseModalSetting=React.useRef(); 
const refOpenErrorModal=React.useRef();

let [showTable,setShowTable]=React.useState({
    width:75,
    show:true
})

const [modalState,setModalState]=React.useState(
    ()=>{return {

    employeeId    :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'ID',        type:"number"},
    username      :{width:8 ,showCol:true,showLine:true,showColHead:true,lb:'Username',  type:"string"}, 
    active        :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'Active',    type:"boolean"}, 
    employeeLevel :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'Level',     type:"string"},
    title         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'คำนำหน้า',   type:"string"},
    name          :{width:10,showCol:true,showLine:true,showColHead:true,lb:'ชื่อ',        type:"string" },
    surname       :{width:10,showCol:true,showLine:true,showColHead:true,lb:'นามสกุล',    type:"string"},
    idCard        :{width:10,showCol:true,showLine:true,showColHead:true,lb:'บัตรประชาชน',type:"string"}, 
    socialSecurity:{width:10,showCol:true,showLine:true,showColHead:true,lb:'ประกันสังคม', type:"string"},
    phone         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'โทรศัพท์',    type:"arrayString"},
    line          :{width:10,showCol:true,showLine:true,showColHead:true,lb:'ไลน์',       type:"arrayString"},
    email         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'อีเมล',      type:"arrayString"},
    address       :{width:35,showCol:true,showLine:true,showColHead:true,lb:'ที่อยู่',       type:"arrayAddress"},
    remark        :{width:30,showCol:true,showLine:true,showColHead:true,lb:'หมายเหตุ',   type:"string"},
    photoUrl      :{width:10,showCol:true,showLine:true,showColHead:true,lb:'รูป',        type:"arrayPhoto"},
    }}) 


let [filterState,setFilterState]=React.useState({
    toCheckFullName:false,
    fullName:"",

    toCheckId:false,
    minId:0,
    maxId:100,

    toCheckLevel:false,
    level:""
}) 
    
React.useEffect(()=>{
  
    const objKeys = Object.keys(modalState);
    let tempTotal=0;
    objKeys.map((i,index)=>{
        if(modalState[i].showCol){
            tempTotal=tempTotal+modalState[i].width
        }
    })

    setShowTable({...showTable,width:tempTotal})

},[modalState])
//===========================================
const deleteEmployee=()=>{
    const config={headers:{"Content-type":"application/json"}}
    axios  
    .post('/employee/delete',editEmployee,config)
    .then(result=>{
        console.log('delete')
        let tempEmployee=[]
        employee.map((i,index)=>{
            if(i.employeeId!=editEmployee.employeeId){
                tempEmployee=[...tempEmployee,i]     
            }   
        })
        setEmployee([...tempEmployee])

        let tempFilterEmployee=[]
        filterEmployee.map((i,index)=>{
            if(i.employeeId!=editEmployee.employeeId){
                tempFilterEmployee=[...tempFilterEmployee,i]
            }
        })
        setFilterEmployee([...tempFilterEmployee])

        setEditEmployee(blankEmployee)
    })
    .catch(err=>{
        refOpenErrorModal.current.click();
    })
}

//========================================
let badgeObj={
    size:'2.1rem',
    color:'black',
    refresh:{show:true,func:setFilterEmployee,arg:employee},
    filter:{show:true,ref:refOpenModalFilter},
    setting:{show:true,ref:refOpenModalSetting,},
    plus:{show:true,func:()=>{}},
    edit:{show:true,func:()=>{},visCondition:editEmployee.employeeId>=0},
    delete:{show:true,func:deleteEmployee,visCondition:editEmployee.employeeId>=0}
}

const renderEmployee=()=>(
<div style={{width:"100%",height:"100%",marginTop:"3.5rem",position:"relative"}}>
    <div style={{textAlign:"center"}}>
        <div style={{display:"flex",
             alignItems:"center",
             justifyContent:"center"}}
        >
            <SwapHorizontalCircleIcon 
                style={{fontSize:"2.5rem"}}
                onClick={e=>{
                    setShowTable({...showTable,show:!showTable.show})
                }}
            />
            <h4 className="mx-2">ผู้ใช้งาน</h4>
        </div>

        {showTable.show
        ?renderTable({
            modalState,
            setModalState,
            showTable,
            setShowTable,
            filterEmployee,
            blankEmployee,
            editEmployee,
            setEditEmployee,
            submit:()=>{}
        })
        :renderCard({
            modalState,
            setModalState,
            filterEmployee
        })}

        {renderBadge(badgeObj)}
        {renderErrorModal(refOpenErrorModal)}    
        {renderModalFilter({
            modalId:"modalFilter",
            refOpenModalFilter,
            refCloseModalFilter,
            employee,
            setFilterEmployee,
            basicData,
            filterState,setFilterState,
            title:`ค้นหาพนักงาน`,
            renderModalBody:modalBodyFilter,
            submit:filterAll
        })}

        {showTable.show
        ?renderModalSettingTable({
            modalId:"modalSetting",
            refOpenModalSetting,
            refCloseModalSetting,
            modalState,setModalState,
            showTable,setShowTable,
            title:`ตั้งค่าแสดงข้อมูลแบบ ตาราง`,
            renderModalBody:renderModalBodyTable
         })
        :renderModalSettingCard({
            modalId:"modalSetting",
            refOpenModalSetting,
            refCloseModalSetting,
            modalState,setModalState,
            showTable,setShowTable,
            title:`ตั้งค่าแสดงข้อมูลแบบ การ์ด`,
            renderModalBody:renderModalBodyCard
         })
         
        }
    </div>
</div>
)

//============================================
const renderMain=()=>{
   return(
    filterEmployee&&basicData
    ?renderEmployee()
    :renderFault(setReloadEmployee)
   )
}
//============================================
const redirectTo=()=>{
    return <Redirect to ="/" exact/>
}
//============================================
    return (
        (username)
        ?renderMain()
        :redirectTo()
    )
}

