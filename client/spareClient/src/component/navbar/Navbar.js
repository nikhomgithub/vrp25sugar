import React from 'react'

import {RiLogoutBoxRLine,RiLogoutCircleRLine} from 'react-icons/ri'
import {FaHome,FaWarehouse,FaUserEdit,FaUsers,FaChartLine} from 'react-icons/fa';
import {MdSettingsApplications,MdShoppingCart} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {MainContext} from '../../context/MainContext';

import './Navbar.css';

export default function Navbar() {
    const {
          username,setUsername,
          reloadCheckToken,setReloadCheckToken,
          haveShopToken,setHaveShopToken,
          haveUserToken,setHaveUserToken,
          userName,setUserName
           }=React.useContext(MainContext)

    const refHome=React.createRef()
    const refUser=React.createRef()
    const refSetting=React.createRef()
    const refCustomer=React.createRef()
    const refProduct=React.createRef()
    const refTransaction=React.createRef()
    const refTransactionLog=React.createRef()

    return (
        <div className="navFrame">
         
            <div id="1" className="h-100" 
                 style={{width:"87%",display:"flex",alignItems:"center",
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
                        <p className="navText">พนักงาน</p>
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
                        <p className="navText">คู่ค้า</p>
                    </div>
                </div>
                
                <div className="navLink" onClick={e=>refProduct.current.click()}> 
                    <div className="navIconBox">
                        <FaWarehouse className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">สินค้า</p>
                    </div>
                </div>
                
                <div className="navLink" onClick={e=>refTransaction.current.click()}> 
                    <div className="navIconBox">
                        <MdShoppingCart className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">งาน</p>
                    </div>
                </div>

                <div className="navLink" onClick={e=>refTransactionLog.current.click()}> 
                    <div className="navIconBox">
                        <FaChartLine className="navIcon"/>
                    </div>
                    <div className="navTextBox">
                        <p className="navText">รายงาน</p>
                    </div>
                </div>
            </div>    


            <div id="2" 
                 style={{position:"fixed",top:"0.3rem",right:"0"}}>
            
            {haveUserToken
            ?
            <div style={{display:"flex",justifyContent:"flex-end"}}>
                <p className="sc-hide mt-1">{userName}</p>
                <div className="">
                    <RiLogoutBoxRLine
                    className="md-icon"
                        onClick={e=>{
                            localStorage.removeItem('userauthorization');
                            setReloadCheckToken(true)
                        }}
                    />
                </div>
            </div>
            :haveShopToken
                ?<RiLogoutCircleRLine
                    className="md-icon"
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
                <Link ref={refCustomer} to="/partner"/>
                <Link ref={refProduct} to="/product"/>
                <Link ref={refTransaction} to="/transaction"/>
                <Link ref={refTransactionLog} to="/transactionlog"/>

            </div>
        </div>
        //renderNavbar()
    )

}






 /*
    const checkscroll=()=>{
        let stopY= 0;
        let currentY=0;

        //true="down", false="up"
        let movedown = true;
        let premovedown = true;

        //คอยฟังการขยับของ window จากการ scroll
        window.addEventListener("scroll", (e)=>{    
            //เมื่อหน้าจอมีการขยับในแนวดิ่ง 
            currentY = window.pageYOffset;
                //ถ้าค่า y ที่ได้ต่ำกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ลง
                if(currentY>(stopY+5)){
                    stopY=currentY; 
                    movedown=true;
                }
                //ถ้าค่า y ที่ได้น้อยกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ขึ้น
                else if(currentY<(stopY-5)){
                    stopY=currentY;
                    movedown=false;
                }
                //ค่าระหว่าง +5 และ -5 ไม่นำมาพิจารณาเพราะอาจเกิด bouncing
                //ดังนั้นค่า movedown เหมือนเดิม
              
                //เราจะจำกัดการเปลี่ยนค่า showNave ตามเงื่อนไขที่กำหนดไว้เท่านั้น
                //ถ้ามีการเปลี่ยนแปลงทิศทางการเคลื่อนที่ 
                //และการเคลื่อนที่ปัจจบัน เป็น การเคลื่อนที่ลง ไม่ต้องแสดง navbar
                //แต่ถ้ากำลังเคลื่อนที่ขึ้น ให้แสดง navbar 
                if(movedown!=premovedown){
                    //console.log('change')
                    if(movedown){
                        //setShowNav(false);
                    }
                    else{
                        //setShowNav(true)
                    }
                    //ทำการบันทึกการเคลื่อนที่ของรอบนี้ไว้เทียบกับของรอบหน้า
                    premovedown=movedown
                }
        })
    }

    
    const showMouseCoor=()=>{
        window.addEventListener("mousemove", (e)=>{    
            console.log(`x:${e.pageX}, y:${e.pageY}`)
        })
    }
    showMouseCoor()
    */
