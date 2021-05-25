import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import ProductForm from './ProductForm'

export default function EditProduct() {
    const {editProduct}=React.useContext(MainContext)

    return (
        <div>
          <ProductForm title={'แก้ไข'} initState={editProduct} isAdd={false}/>
        </div>
    )
}

