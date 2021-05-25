import React from 'react';
import axios from 'axios';

import {Route,Switch,Redirect} from 'react-router-dom';
import Navbar from './component/navbar/Navbar'

import Home from './page/home/Home'
import ShopWelcome from './page/shop/ShopWelcome'
import UserWelcome from './page/user/UserWelcome'
import BasicData from './page/basicdata/BasicData'
import Partner from './page/partner/Partner'
import Product from './page/product/Product'
import Transaction from './page/transaction/Transaction'
import TransactionLog from './page/transactionLog/TransactionLog'

//===============================

//===============================
//import ModalProductComponent from './component/ModalProductComponent/ModalProductComponent'
//import Job from './page/job/Job'
//import Test from './page/test/Test'
//import Calendar from './component/calendar/Calendar.js'

import {MainContext} from './context/MainContext';

import './App2.css'


function App() {
  const {username,setUsername,
    reloadCheckToken,setReloadCheckToken,
    haveShopToken,setHaveShopToken,
    haveUserToken,setHaveUserToken,
    userName,setUserName,

    basicData
     }=React.useContext(MainContext)

console.log('App')

return(
<div className="bgc-lightGray" style={{height:"100%"}}>
<Navbar/> 

<Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/shop" component={haveShopToken?UserWelcome:ShopWelcome}/>
  <Route exact path="/user" component={haveShopToken?UserWelcome:ShopWelcome}/> 
  <Route exact path="/basicdata" component={haveShopToken?(haveUserToken?BasicData:UserWelcome):ShopWelcome} /> 
  <Route exact path="/partner" component={haveShopToken?(haveUserToken?Partner:UserWelcome):ShopWelcome}/> 
  <Route exact path="/product" component={haveShopToken?(haveUserToken?Product:UserWelcome):ShopWelcome}/> 
  <Route exact path="/transaction" component={haveShopToken?(haveUserToken?Transaction:UserWelcome):ShopWelcome}/> 
  <Route exact path="/transactionlog" component={haveShopToken?(haveUserToken?TransactionLog:UserWelcome):ShopWelcome}/> 

</Switch>


</div>



)
}
export default App;


//<Route exact path="/transaction" component={haveShopToken?(haveUserToken?Transaction:UserWelcome):ShopWelcome}/> 

/*

  <Navbar/> 

  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/shop" component={haveShopToken?UserWelcome:ShopWelcome}/>
    <Route exact path="/user" component={haveShopToken?UserWelcome:ShopWelcome}/> 
    <Route exact path="/basicdata" component={haveShopToken?(haveUserToken?BasicData:UserWelcome):ShopWelcome} /> 
    <Route exact path="/partner" component={haveShopToken?(haveUserToken?Partner:UserWelcome):ShopWelcome}/> 
    <Route exact path="/product" component={haveShopToken?(haveUserToken?Product:UserWelcome):ShopWelcome}/> 
 
    <Route exact path="/transaction" component={haveShopToken?(haveUserToken?Transaction:UserWelcome):ShopWelcome}/> 

  </Switch>


*/

/*{
  Array.from(Array(50).keys()).map((i,index)=>(
    <div key={i}>{`Test : ${i}`}</div>
  ))
}*/

/*
return (
  <div style={{width:"100vw",height:"100vh"}}>
    <div style={{width:"50%",height:"2rem"}}>
      <Calendar inputDate={"2021-01-15T13:58:32.188Z"}/>  
    </div>
  </div>
);
*/
/*
<Route exact path="/"> <Redirect to={haveShopToken?"/user":"/shop"}/> </Route>
*/


