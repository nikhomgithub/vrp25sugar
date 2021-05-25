import React from 'react';
import PartnerComponent from './PartnerComponent'
import ModalComponent from '../../render/ModalComponent';
import {MainContext} from '../../context/MainContext'

function ModalPartnerComponent({funcOK,funcCancel}) {

return (
    <ModalComponent
        funcOK={funcOK}
        funcCancel={funcCancel}
        title={"เลือกคู่ค้า"}
        fullScreen={true}
    >
        <PartnerComponent/> 
    </ModalComponent>
)
}

export default ModalPartnerComponent;