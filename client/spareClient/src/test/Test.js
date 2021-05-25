import React from 'react'
import {Link} from 'react-router-dom';
import './Test.css';
import testUtil from './testUtil'
import renderTable from '../renderUtil/renderTable'

export default function Test() {

    const {renderBadge,renderModalSearch,
          renderModalSettingCard,renderModalSettingTable,
          renderModalError}=testUtil
    
    const [badgeState,setBadgeState]=React.useState({
        all:true,
        refresh:true,
        swap:true,
        setting:true,
        search:true,
        add:true,
        edit:true,
        del:true
    })

    const [showModalSettingTable,setShowModalSettingTable]=React.useState(false)
    const [showModalSettingCard,setShowModalSettingCard]=React.useState(false)
    const [showModalSearch,setShowModalSearch]=React.useState(false)
    const [showModalError,setShowModalError]=React.useState(false)

    let [showTable,setShowTable]=React.useState({
        width:75,
        show:true
    })
    const [modalState,setModalState]=React.useState(
        ()=>{return {
    
        employeeId    :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'ID',        type:"number"},
        username      :{width:8 ,showCol:true,showLine:true,showColHead:true,lb:'Username',  type:"string"}, 
        active        :{width:5 ,showCol:true,showLine:true,showColHead:true,lb:'Active',    type:"boolean"}, 
        phone         :{width:10,showCol:true,showLine:true,showColHead:true,lb:'โทรศัพท์',    type:"arrayString"},
        address       :{width:35,showCol:true,showLine:true,showColHead:true,lb:'ที่อยู่',       type:"arrayAddress"},
        photoUrl      :{width:10,showCol:true,showLine:true,showColHead:true,lb:'รูป',        type:"arrayPhoto"},
    }}) 

    const [filterEmployee,setFilterEmployee]=React.useState([
        {employeeId:0,username:"peter",active:true,phone:["123","456"],address:[],photoUrl:["/upload/employee/room-1.jpeg"]},
        {employeeId:1,username:"john",active:true,phone:["123","456"],address:[],photoUrl:["/upload/employee/room-2.jpeg","/upload/employee/room-3.jpeg"]},
        {employeeId:2,username:"sand",active:true,phone:["123","456"],address:[],photoUrl:["/upload/employee/room-5.jpeg"]}

    ])

    const [editEmployee,setEditEmployee]=React.useState(null)

    const blankEmployee={
        employeeId:0,username:"",active:true,phone:[],address:[],photoUrl:[]
    }

    return (
        <div className="App-frame">
            <h1>Test.....</h1>
            <button
                onClick={e=>{setShowModalSearch(true)}}
            >เปิด Modal Search</button>
            
            <button
                onClick={e=>{setShowModalSettingTable(true)}}
            >เปิด Modal Setting Table</button>

            <button
                onClick={e=>{setShowModalSettingCard(true)}}
            >เปิด Modal Setting Card</button>

            <button
                onClick={e=>{setShowModalError(true)}}
            >เปิด ModalError</button>
            
            {renderTable({modalState,setModalState,
                    showTable,setShowTable,
                    filterEmployee,blankEmployee,
                    editEmployee,setEditEmployee
            })}

            {renderModalError({
                show:showModalError,
                setShow:setShowModalError
            })}
            
            {renderBadge(badgeState)}
            
            {renderModalSearch({title:"Search",
                          show:showModalSearch,
                          setShow:setShowModalSearch,
                          funct:()=>{}
                        })}
            
            {renderModalSettingCard({title:"SettingCard",
                show:showModalSettingCard,
                setShow:setShowModalSettingCard,
                funct:()=>{}
            })}

            {renderModalSettingTable({title:"SettingTable",
                show:showModalSettingTable,
                setShow:setShowModalSettingTable,
                funct:()=>{}
            })}

        </div>
    )
}
