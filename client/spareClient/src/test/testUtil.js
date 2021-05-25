import React from 'react'
import {Link} from 'react-router-dom';

import {MdRefresh,MdSwapHoriz,MdSettings,MdSearch,MdEdit,MdAddCircle,MdDelete} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa';

import showUtil from '../util/showUtil'
import Galleryone from '../components/galleryone/Galleryone'


import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import th from "date-fns/locale/th";
registerLocale("th", th);

//=============================
const renderBadge=(badgeState)=>{
    const {all,refresh,swap,setting,search,add,edit,del} = badgeState
    
    return(
        all
        ?<div className="Badge-frame"> 
            
            {refresh
            ?<div>
                <MdRefresh
                className="Icon-big"
                onClick={e=>{}}
                />
            </div>:null}
            
            {swap
            ?<div>
                <MdSwapHoriz 
                    className="Icon-big"
                />
            </div>:null}
            
            {setting
            ?<div>
                <MdSettings
                    className="Icon-big"
                />
            </div>:null}   

            {search
            ?<div>
                <MdSearch
                    className="Icon-big"
                    onClick={e=>{ } } 
                />
            </div>:null}
            
            {add
            ?<Link to="/addtest">    
                <MdAddCircle
                    className="Icon-big"
                    onClick={e=>{ 
                        setTimeout(()=>{

                        },200)
                    }}
                />
            </Link>:null}

            {edit
            ?<Link to="/edittest">   
                <MdEdit 
                    className="Icon-big"
                    onClick={e=>{
                        setTimeout(()=>{
                            
                        },200)
                    }}
                />
            </Link>:null}
            
            {del
            ?<div>
                <MdDelete
                    className="Icon-big"
                />
            </div>:null}
        </div>
        :null
    )
}

//======================================
const renderModalError=({title,show,setShow})=>{
    return(
        show
        ?<div className="Modal-background">
            <div className="Modal-box">
                <div className="Modal-header">
                    <div>
                        <p>เกิดข้อผิดพลาด</p>
                    </div>
                </div>
               
                <div className="Modal-body">
                    <div>
                       <p>ดำเนินการไม่สำเร็จ</p>
                    </div>
                </div>
                

                <div className="Modal-footer">
                    <div>
                        <button
                            onClick={e=>{setShow(false)}}
                        >รับทราบ</button>
                    </div>
                </div>


            </div>
        </div>
        :null
)}
//========================================
const renderModalSettingTable=({title,show,setShow,fuct})=>{
    return(
        show
        ?<div className="Modal-background">
            <div className="Modal-box">
                <div className="Modal-header">
                    <div>
                        <h4>{title}</h4>
                    </div>
                </div>
               
                <div className="Modal-body">

                       <div className="Grid-input-setting-table">
                            <p>เลือก</p>
                            <p>หัวข้อ</p>
                            <p>ความกว้าง</p>
                           
                           
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>af</p>
                            <div className="Input-line">
                                <FaPlusSquare className="Icon-small"/>
                                <p>as</p>
                                <FaMinusSquare className="Icon-small"/>
                            </div>
                            
                       </div>
     
                </div>
                

                <div className="Modal-footer">
                    <div>
                        <button
                            onClick={e=>{setShow(false)}}
                        >ยกเลิก</button>
                    </div>
                    <div>
                        <button
                            onClick={e=>{fuct()}}
                        >ตกลง</button>
                    </div>

                </div>

            </div>
        </div>
        :null
)}


//========================================
const renderModalSettingCard=({title,show,setShow,fuct})=>{
    return(
        show
        ?<div className="Modal-background">
            <div className="Modal-box">
                <div className="Modal-header">
                    <div>
                        <h4>{title}</h4>
                    </div>
                </div>
               
                <div className="Modal-body">

                       <div className="Grid-input-setting-card">
                            <p>เลือก</p>
                            <p>หัวข้อ</p>
                  
                            
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>adf</p>

                            <input className="Input-checkbox" type="checkbox"/>
                            <p>adf</p>
                            
                 
                       </div>
     
                </div>
                

                <div className="Modal-footer">
                    <div>
                        <button
                            onClick={e=>{setShow(false)}}
                        >ยกเลิก</button>
                    </div>
                    <div>
                        <button
                            onClick={e=>{fuct()}}
                        >ตกลง</button>
                    </div>

                </div>

            </div>
        </div>
        :null
)}

//========================================
const renderModalSearch=({title,show,setShow,fuct})=>{
    return(
        show
        ?<div className="Modal-background">
            <div className="Modal-box">
                <div className="Modal-header">
                    <div>
                        <h4>{title}</h4>
                    </div>
                </div>
               
                <div className="Modal-body">

                       <div className="Grid-input-search">
                            <p>เลือก</p>
                            <p>หัวข้อ</p>
                            <p>เงื่อนไข</p>
                            
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>adf</p>
                            <input/>
                 
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>adsdfasdfsadfsfdf</p>
                            <input/>
                            
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>adf</p>
                            <select>
                                <option>sfdasf</option>
                                <option>sfdasf</option>
                                <option>sfdasf</option>
                            </select>

                            <input className="Input-checkbox"type="checkbox"/>
                            <p>date</p>
                            <div className="Date-picker-div">
                                <DatePicker
                                    className="Date-picker"
                                    locale="th"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                             
                            <input className="Input-checkbox" type="checkbox"/>
                            <p>af</p>
                            <div className="Input-line">
                                <FaPlusSquare className="Icon-small"/>
                                <p>as</p>
                                <FaMinusSquare className="Icon-small"/>
                                <p>ระหว่าง</p>
                                <FaPlusSquare className="Icon-small"/>
                                <p>as</p>
                                <FaMinusSquare className="Icon-small"/>
                            </div>
                           
                       </div>
     
                </div>
                

                <div className="Modal-footer">
                    <div>
                        <button
                            onClick={e=>{setShow(false)}}
                        >ยกเลิก</button>
                    </div>
                    <div>
                        <button
                            onClick={e=>{fuct()}}
                        >ตกลง</button>
                    </div>

                </div>

            </div>
        </div>
        :null
)}
//============================================

//============================================
const testUtil={renderBadge,renderModalSearch,
    renderModalSettingCard,renderModalSettingTable,
    renderModalError}

export default testUtil