import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {MainContext} from '../context/MainContext';

//import EmployeeForm from './EmployeeForm'

export default function AddEmployee() {
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
//<EmployeeForm title={'เพิ่ม'} initState={addEmployee} isAdd={true}/>
//<EmployeeForm title={'เพิ่ม'} initState={addEmployee} isAdd={true}/>