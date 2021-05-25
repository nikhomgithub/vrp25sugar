import React from 'react';
import {FaWarehouse,FaUserEdit,FaUsers,FaChartLine} from 'react-icons/fa';
import {MdSettingsApplications,MdShoppingCart} from 'react-icons/md';
import {Link} from 'react-router-dom';

import './Home.css'


function Home() {

const refUser=React.createRef()
const refSetting=React.createRef()
const refCustomer=React.createRef()
const refProduct=React.createRef()
const refTransaction=React.createRef()
const refTransactionLog=React.createRef()

return (
    <div className="home-hero">
        <div className="home-bg-screen">
            <div className="home-box">
                
                <div className="home-link" 
                     onClick={e=>{refUser.current.click()}}>
                    <div >
                        <FaUserEdit className="home-icon"/>
                    </div>
                    <div>
                        <h3>พนักงาน</h3>
                    </div>
                </div>
                
                <div className="home-link"
                     onClick={e=>{refSetting.current.click()}}>
                    <div>
                        <MdSettingsApplications className="home-icon"/>
                    </div>
                    <div>
                        <h3>ตั้งค่า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refCustomer.current.click()}}>
                    <div>
                        <FaUsers className="home-icon"/>
                    </div>
                    <div>
                        <h3>คู่ค้า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refProduct.current.click()}}>
                    <div>
                        <FaWarehouse className="home-icon"/>
                    </div>
                    <div>
                        <h3>สินค้า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refTransaction.current.click()}}>
                    <div>
                        <MdShoppingCart className="home-icon"/>
                    </div>
                    <div>
                        <h3>งาน</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refTransactionLog.current.click()}}>
                    <div>
                        <FaChartLine className="home-icon"/>
                    </div>
                    <div>
                        <h3>รายงาน</h3>
                    </div>
                </div>    

            </div>
        </div>
       
        <div className="d-none">
            <Link ref={refUser} to="/user"/>
            <Link ref={refSetting} to="/basicdata"/>
            <Link ref={refCustomer} to="/partner"/>
            <Link ref={refProduct} to="/product"/>
            <Link ref={refTransaction} to="/transaction"/>
            <Link ref={refTransactionLog} to="/transactionlog"/>

        </div>
        
    </div>
)
}

export default Home;
/*
<div className="home-link"
onClick={e=>{refProduct.current.click()}}>
<div>
   <FaWarehouse className="home-icon"/>
</div>
<div>
   <h3>คลังสินค้า</h3>
</div>
</div>
*/