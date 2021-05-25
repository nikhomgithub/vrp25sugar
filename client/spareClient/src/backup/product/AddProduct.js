import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import ProductForm from './ProductForm'

export default function AddEmployee() {
    const {addProduct}=React.useContext(MainContext)

    return (

      <div>
        <ProductForm title={'เพิ่ม'} initState={addProduct} isAdd={true}/>
      </div> 

    )
}

//<EmployeeForm title={'เพิ่ม'} initState={addEmployee} isAdd={true}/>