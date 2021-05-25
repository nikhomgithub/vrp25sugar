import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

import JobForm from './JobForm'

export default function EditJob() {
    const {
        tempEditJob
    }=React.useContext(MainContext)

    return (
        <div>
            <JobForm title={'แก้ไข'} initState={tempEditJob} isAdd={false}/>
        </div>
    )
}

//