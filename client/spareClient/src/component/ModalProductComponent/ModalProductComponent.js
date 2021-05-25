import React from 'react';
import GroupAndProductTable from './GroupAndProductTable'
import ModalComponent from '../../render/ModalComponent';
import {MainContext} from '../../context/MainContext'

function ModalProductComponent({funcOK,funcCancel}) {
    
    /*
    const {selectProduct2,setSelectProduct2,
           selectGroup2,setSelectGroup2,
           showModal,
           setShowModal
      }=React.useContext(MainContext)
    */


return (
    <ModalComponent
        funcOK={funcOK}
        funcCancel={funcCancel}
        title={"เลือกสินค้า"}
        fullScreen={true}
    >
        <GroupAndProductTable/> 
    </ModalComponent>
)
}

export default ModalProductComponent;
/*
<ModalComponent
funcOK={setShowModal}
funcCancel={setShowModal}
title={"เลือกสินค้า"}
>
<button 
    onClick={e=>setShowModal(false)}
>AAAA</button>
</ModalComponent>

*/


/*
<GroupAndProductTable 
selectProduct={selectProduct2} 
setSelectProduct={setSelectProduct2}
selectGroup={selectGroup2}
setSelectGroup={setSelectGroup2}
showModalProductComponent={showModalProductComponent}
setShowModalProductComponent={setShowModalProductComponent}
/>
*/