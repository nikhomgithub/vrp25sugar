import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


export default function ErrorModal ({refOpenErrorModal}) {


return (
<div>
    <button type="button" className="btn btn-primary d-none" 
        data-toggle="modal" data-target="#errorModal"
        ref={refOpenErrorModal}/>

    <div className="modal fade" id="errorModal"role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">แจ้งเตือน</h5>
                </div>
            <div className="modal-body">
                <p className="modal-title" id="exampleModalLabel">ดำเนินการไม่สำเร็จ</p>
            </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" 
                           data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
)
}
