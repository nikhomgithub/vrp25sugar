import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {MainContext} from '../context/MainContext';
import navbarUtil from './navbarUtil'

export default function Navbar() {
    const {username,setUsername}=React.useContext(MainContext)

    const {checkscroll} = navbarUtil;

    const [showNav,setShowNav]=React.useState(true)

    const refToggle=React.useRef()
    
    const menu=[
        {link:"/",lb: "หน้าแรก"},
        {link:"/addtest",lb: "addTest"},
        {link:"/edittest",lb: "editTest"},
        {link:"/employee",lb:"พนักงาน"},
        {link:"/basicdata",lb:"ค่าพื้นฐาน"},
        {link:"/customer",lb:"ลูกค้า"},
        {link:"/job",lb:"งาน"},
        {link:"/product",lb:"สินค้า"}
    ]

    const renderNavbar=()=>(
    <div id="navbar-id" className="container-fluid" 
        style={{visibility:showNav?"visible":"hidden",
                backgroundColor:"#e3f2fd",
                position:"fixed",
                top:"0",height:"3rem",zIndex:'100'}}>
               
        <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler text-dark" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation"
            value=""
            ref={refToggle}
            >
                <MenuIcon className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                    <ul className="navbar-nav mr-auto">
                        {menu.map((i,index)=>
                            <li className="nav-item mr-4"
                                
                            >
                                <Link 
                                className="nav-link btn btn-lg btn-light text-dark font-weight-bold border-0" 
                                to={i.link}
                                onClick={e=>refToggle.current.click()}
                                style={{backgroundColor: "#e3f2fd",margin:"0",padding:"0"}}>
                                    {i.lb}
                                </Link>
                            </li>
                        )}                   
                    </ul>

            </div>
        </nav>
        <div style={{position:"absolute",right:"1rem",top:"0.8rem"}}>
            {username
                ?<h4 className="text-success font-weight-bold" style={{marginTop:'-5px'}}>{username}</h4>
                :<h4 className="text-danger font-weight-bold " style={{marginTop:'-5px'}}>กรุณา log in</h4>   
            }
        </div>
   </div>
    )

    checkscroll(window,setShowNav)

    return (
        renderNavbar()
    )
}