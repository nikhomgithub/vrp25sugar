/*

import React from 'react';
import treeUtil from './render/renderTree/treeUtil'
import renderTreeAndModal from './render/renderTree/renderTreeAndModal'
import './App.css'

function App() {

const {convertToObject,createGroupTree}=treeUtil

const group=[
  {id:1,name:'main',        parent:null,children:[2,3],remark:'this is main'},
  
  {id:2,name:'คอมพิวเตอร์',   parent:1,children:[4,5,6],remark:'ขายหน้าร้าน'},
  {id:3,name:'มือถือ',        parent:1,children:[7,8],remark:'ขายออนไลน์'},
  
  {id:4,name:'พีซี',          parent:2,children:[],remark:'มือหนึ่ง'},
  {id:5,name:'แลปทอบ',      parent:2,children:[],remark:'มือหนึ่ง'},
  {id:6,name:'เครื่องพิมพ์',     parent:2,children:[],remark:'มือหนึ่ง'},
  
  {id:7,name:'samsung',      parent:3,children:[],remark:'มือสอง'},
  {id:8,name:'oppo',         parent:3,children:[9,10],remark:'มือสอง'},
  
  {id:9,name:'oppo-AS',         parent:8,children:[],remark:'มาแล้ว'},
  {id:10,name:'oppo-BS',         parent:8,children:[],remark:'ยังไม่มี'},
]

const [groupTree,setGroupTree]=React.useState(createGroupTree(group))
const [tempObj,setTempObj]=React.useState(null)
const [showModalTreeEdit,setShowModalTreeEdit]=React.useState(false)

React.useEffect(()=>{
  setTempObj(convertToObject(groupTree))
},[groupTree])

const formTamplate=React.useState([
  {keyName:'id',       lb:'ID',     type:"number"},
  {keyName:'name',     lb:'ชื่อกลุ่ม',  type:"string"},
  {keyName:'parent',   lb:'กลุ่มแม่',  type:"number"},
  {keyName:'children', lb:'กลุ่มย่อย', type:"arrayNumber"},
  {keyName:'remark',   lb:'หมายเหตุ', type:"string"}
]) 

let [selectObject,setSelectObject]=React.useState(
  {id:0,name:'',parent:null,children:[],remark:''}
)

//================================
  return (
    <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",overflow:"auto"}}>
     
      <div style={{width:"50%",height:"50%",border:"1px solid black"}}>
        
      {
        renderTreeAndModal({
                arrs:tempObj,
                selectObject,setSelectObject,
                groupTree,setGroupTree,
                show:showModalTreeEdit,setShow:setShowModalTreeEdit,
                formTamplate
        })
      }

      </div>
    </div>
  );
}

export default App;


*/

import React from 'react';
import renderTree from './renderTree'
import renderModalTreeEdit from './renderModalTreeEdit'
import {MdEdit} from 'react-icons/md'; 
import '../Modal.css'


const  renderTreeAndModal=({ arrs,
                            selectGroupObject,setSelectGroupObject,
                            groupTree,setGroupTree,
                            show,setShow,
                            formTemplate })=>{
                              
    const {renderTreeWithState}=renderTree

    return (
    <div style={{width:"100%",height:"100%",paddingTop:"0.5rem",position:"relative"}}>
        
        <MdEdit class="lg-icon" style={{position:"absolute",top:"0.5rem",right:"0.5rem",zIndex:"100"}}
            onClick={e=>{setShow(true)}}
        />
        {
         renderModalTreeEdit({
           show,setShow,
           selectGroupObject,setSelectGroupObject,
           formTemplate})
        }
        {
        renderTreeWithState({
          arrs,selectGroupObject,setSelectGroupObject,
          groupTree,setGroupTree})
        }       
        
        {
          //renderTreeJQRY({arrs,selectObject,setSelectObject})
        }

    </div>
    )
}

export default renderTreeAndModal
