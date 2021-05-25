import React from 'react'

import {RiLogoutBoxRLine,RiLogoutCircleRLine} from 'react-icons/ri'
import {FaHome,FaWarehouse,FaUserEdit,FaUsers,FaChartLine} from 'react-icons/fa';
import {MdSettingsApplications,MdShoppingCart} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {MainContext} from '../../context/MainContext';

import './Navbar.css';

export default function Navbar() {
    const {
          reloadCheckToken,setReloadCheckToken,
          haveShopToken,setHaveShopToken,
          haveUserToken,setHaveUserToken,
          userName,setUserName
           }=React.useContext(MainContext)

    const refHome=React.createRef()
    const refUser=React.createRef()
    const refSetting=React.createRef()
    const refCustomer=React.createRef()
    const refJob=React.createRef()

    return (
    <div className="navFrame flex-center-center jc-space-between">

            <div id="1" className="h-100" 
                 style={{
                         position:"absolute",top:"0",left:"0",
                         width:"87%",display:"flex",alignItems:"center",
                         justifyContent:"start",overflowX:"auto",overflowY:"hidden"}}>
        
                <div className="navLink" onClick={e=>refHome.current.click()}> 
                    <div className="navIconBox">
                        <FaHome className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">หน้าหลัก</p>
                    </div>
                </div>
                <div className="navLink" onClick={e=>refUser.current.click()}> 
                    <div className="navIconBox">
                        <FaUserEdit className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">ผู้ใช้</p>
                    </div>
                </div>
                <div className="navLink" onClick={e=>refSetting.current.click()}> 
                    <div className="navIconBox">
                        <MdSettingsApplications className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">ตั้งค่า</p>
                    </div>
                </div>
                <div className="navLink" onClick={e=>refCustomer.current.click()}> 
                    <div className="navIconBox">
                        <FaUsers className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">ลูกค้า</p>
                    </div>
                </div>
                

                
                <div className="navLink" onClick={e=>refJob.current.click()}> 
                    <div className="navIconBox">
                        <MdShoppingCart className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">งาน</p>
                    </div>
                </div>


            </div>    

            <div id="2" >
            
            {haveUserToken
            ?
            <div style={{
                position:"absolute",top:"0",right:"0",
                display:"flex",justifyContent:"flex-end"
                }}>
                <p className="sc-hide mt-1">{userName}</p>
                <div className="">
                    <RiLogoutBoxRLine
                    className="navIcon"
                        onClick={e=>{
                            localStorage.removeItem('userauthorization');
                            setReloadCheckToken(true)
                        }}
                    />
                </div>
            </div>
            :haveShopToken
                ?<RiLogoutCircleRLine
                    style={{
                        position:"absolute",top:"0",right:"0"
                    }}
                    className="navIcon"
                    onClick={e=>{
                        localStorage.removeItem('shopauthorization');
                        setReloadCheckToken(true)
                    }}
                />
                :null
            }
            </div>

            <div className="d-none">
                <Link ref={refHome} to="/"/>
                <Link ref={refUser} to="/user"/>
                <Link ref={refSetting} to="/basicdata"/>
                <Link ref={refCustomer} to="/customer"/>
                <Link ref={refJob} to="/job"/>


            </div>
    </div>
        //renderNavbar()
    )

}


