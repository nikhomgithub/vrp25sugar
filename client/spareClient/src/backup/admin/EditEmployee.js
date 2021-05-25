import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

//import EmployeeForm from './EmployeeForm'

export default function EditEmployee() {
    const {blankEmployee,
        employee,setEmployee,
        reloadEmployee,setReloadEmployee,
        
        editEmployee,setEditEmployee,
        addEmployee,setAddEmployee,
        }=React.useContext(MainContext)

    return (
        <div>
          
        </div>
    )
}

//<EmployeeForm title={'แก้ไข'} initState={editEmployee} isAdd={false}/>