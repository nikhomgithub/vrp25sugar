import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import DetailForm from './DetailForm'

export default function EditDetail() {
    const {
        tempEditJob
    }=React.useContext(MainContext)


    return (
      <div>
        <DetailForm title={'แก้ไข'} initState={tempEditJob} isAdd={false}/>
      </div> 
    )
}
