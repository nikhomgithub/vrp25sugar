import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import JobForm from './JobForm'

export default function AddJob() {
    const {
        tempAddJob
    }=React.useContext(MainContext)

    return (
      <div>
        <JobForm title={'เพิ่ม'} initState={tempAddJob} isAdd={true}/>
      </div> 
    )
}

