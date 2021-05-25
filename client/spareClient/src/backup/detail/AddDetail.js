import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import DetailForm from './DetailForm'

export default function AddDetail() {
    const {
        tempAddJob
    }=React.useContext(MainContext)

    return (
      <div>
        <DetailForm title={'เพิ่ม'} initState={tempAddJob} isAdd={true}/>
      </div> 
    )
}

