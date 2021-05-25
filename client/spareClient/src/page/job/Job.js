import React from 'react';
import JobComponent from '../../component/jobComponent/JobComponent'
import {MainContext} from '../../context/MainContext'

function Job() {
    
const { 
    swapState,setSwapState,selectJob
}=React.useContext(MainContext)

const [showRange,setShowRange]=React.useState(true)
const [widthLeft,setWidthLeft]=React.useState(50)


return (
    <div className="page-badge">
        <div className="w-100 h-100">
            <JobComponent badgeLayoutOption={0}/>  
        </div> 
    </div>
)
}

export default Job;
/*
<div className="w-100 h-100 hide-on-screen">
<JobComponent badgeLayoutOption={0}/>
</div>
*/