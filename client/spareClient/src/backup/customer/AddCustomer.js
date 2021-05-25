import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import CustomerForm from './CustomerForm'

export default function AddCustomer() {
    const {blankCustomer,
        customer,setCustomer,
        reloadCustomer,setReloadCustomer,
        
        editCustomer,setEditCustomer,
        addCustomer,setAddCustomer,
        }=React.useContext(MainContext)

    return (

      <div>
        <CustomerForm title={'เพิ่ม'} initState={addCustomer} isAdd={true}/>
      </div> 

    )
}
