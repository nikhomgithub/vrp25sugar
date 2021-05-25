import React from 'react';
import ProductComponent from './ProductComponent'
import ModalComponent from '../../render/ModalComponent';
import {MainContext} from '../../context/MainContext'

function ModalProductComponent({funcOK,funcCancel}) {
    
    const {
            allProduct2,setAllProduct2,
            selectProduct2,setSelectProduct2,
            selectGroup2,setSelectGroup2,
            reloadProduct2,setReloadProduct2,
      }=React.useContext(MainContext)

return (
    <ModalComponent
        funcOK={funcOK}
        funcCancel={funcCancel}
        title={"เลือกสินค้า"}
        fullScreen={true}
    >
        <ProductComponent 
            allDataOut={allProduct2}            setAllDataOut={setAllProduct2}
            selectDataOut={selectProduct2}      setSelectDataOut={setSelectProduct2}
            selectGroup={selectGroup2}          setSelectGroup={setSelectGroup2}
            reloadData={reloadProduct2}          setReloadData={setReloadProduct2}
            selectDataInForDetail={null}        setSelectDataInForDetail={()=>{}}
            canChangeData={false}
            />
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