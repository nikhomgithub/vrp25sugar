import React from 'react';
import StateUtil from '../../model/StateUtil'
import renderForm from './renderForm'
import Galleryone_add from '../../component/galleryone_add/Galleryone_add'
import photoUtil from '../../component/galleryone_add/photoUtil'
import formUtil from './formUtil'
import tableUtil from '../../component/table/tableUtil'

import renderModalError from '../renderModalError'

import axiosUtil from '../../util/axiosUtil'


function ModalForm({param}) {

    const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil  
    const {submitFunc}=axiosUtil  
    const {changeArrayFile}=photoUtil
    const {convertFormTemplateToTableTemplate}=formUtil
    const {tableResize}=tableUtil
  
    const { isAddForm,lb,
            formTemplate,stateTemplate,
            //setShowModalError,
            selectData,
            //basicData,
            
            //ref1,ref2,
            iconAction,
            iconActionData,
            iconActionDataDetail,
            //blankData,
            loadData,
            //setLoadData,
            //refAndValue,setRefAndValue,
            //showImage,setShowImage,
            //fileUrl,
            //arrayFile,setArrayFile,
            keyName,
            show,setShow,
            //reload,setReload,
            url,
            //submitOption,
            //submitKey,
            //mainInputState,
            //updateMainKeyInMainInputState,
            //setReloadCheckToken
            actionAfterSuccess,
            useGenFD,
            //fileName,
            //serverFolder
            lastRecordId,
            genAutoId,
            calculation,
            detailTableTemplate
          } = param
    //console.log('ModalForm')
    //console.log(param.loadData)
    const isFirstRun=React.useRef(true)
    
    const [showModalError,setShowModalError]=React.useState(false)
    const [hidePassword,setHidePassword]=React.useState(true)

    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก     
    const refClearForm=React.createRef() //ล้างข้อมูล     

    const blankData=genBlankState({template:stateTemplate}).state
    
    //console.log('blankData')
    //console.log(blankData)

    const refAndValueBlankData = genRefAndValue({template:formTemplate,FData:blankData})

    const genFormInputState =() =>{
        
        //console.log(loadData)
        if(isAddForm){

            if(genAutoId){
                return {...blankData,id:lastRecordId+1}
            }
            else{
                return blankData
            }
        }
        else{
            //we create combineLoadDataBlankState function
            //to make sure that every filed is valid at least ""
            //because in mongoDB if model type = number, it we send "" it will be save as null
            //when we receive data back it will be just like customerId=null
            //so this function will make customerId="" again
            const temp=combineLoadDataBlankState({template:stateTemplate,loadData})
            //console.log('temp')
            //console.log(temp)
            //console.log('loadData')
            //console.log(loadData)

            //console.log('loadData')
            //console.log(loadData)
            //const temp={...loadData}
            return temp
        }
    }
    
    let [formInputState,setFormInputState]=React.useState(genFormInputState())
    let [sumAmount,setSumAmount]=React.useState(null)
    
    React.useEffect(()=>{

        if(iconActionData){
        
                setFormInputState({...formInputState,...iconActionData})
            
        }
    },[iconActionData])
    


    React.useEffect(()=>{
        //console.log('iconActionDataForDetail')
        //console.log(iconActionDataDetail)
        
        //console.log('selectRow')
        //console.log(selectRow)
        
        if(iconActionDataDetail&&selectRow){
            if(iconActionDataDetail.id>0){

                let temp=[]
                formInputState.detail.map((i,index)=>{
                    if(selectRow.index==index){
                       const tempLine={...i,...iconActionDataDetail,["index"]:index}
                       temp=[...temp,tempLine] 
                    }
                    else{
                        temp=[...temp,i]
                    }
                })

                setFormInputState({...formInputState,["detail"]:temp})
            }
        }
        
    },[iconActionDataDetail])


    let [refAndValue,setRefAndValue]=React.useState(
        genRefAndValue({template:formTemplate,FData:formInputState})
    )
    
    React.useEffect(()=>{
        //console.log('refAndValue')
        //console.log(refAndValue)
    },[refAndValue])

    React.useEffect(()=>{
        //if(isFirstRun.current){isFirstRun.current=false;console.log('isFirstRun');return;}    
        
        let passCheck=false
        if(formInputState){
            if(formInputState.detail){
                passCheck=true
            }
        }

        if(tableTemplate){
           passCheck=true
        }

        if(passCheck){
            const objKeys=Object.keys(tableTemplate)
            let newSum={}
            let showSum=false

            objKeys.map(h=>{
                if(tableTemplate[h]){
                    if(tableTemplate[h].showSum){
                        newSum={...newSum,[h]:0}
                        showSum=true
                    }
                }
            })

            formInputState.detail.map(i=>{
                objKeys.map(j=>{
                    if(tableTemplate[j]){
                        if(tableTemplate[j].showSum){
                            newSum={...newSum,[j]:(newSum[j]+i[j])}
                        }
                    }
                })
            })

            if(showSum){
                setSumAmount(newSum)
            }
        }


        const temp=genRefAndValue({
            template:formTemplate,
            FData:formInputState
            })
        setRefAndValue({...temp})

        console.log('formInputState')
        console.log(formInputState)
        
    },[formInputState])
  //===================================
  //===================================
  //===================================
  //for tableForm
  let [showTable,setShowTable]=React.useState({
    width:1200,
    gridCol:""
  })
  
  React.useEffect(()=>{
      //console.log('showTable')
      //console.log(showTable)
  },[showTable])

  const [tableTemplate,setTableTemplate]=React.useState(
        convertFormTemplateToTableTemplate(formTemplate,detailTableTemplate)
  )
  
  React.useEffect(()=>{
    //console.log('tableTemplate')
    //console.log(tableTemplate)
    tableResize({tableTemplate,showTable,setShowTable})

  },[tableTemplate])

  const [selectRow,setSelectRow]=React.useState(null)
  React.useEffect(()=>{
    //console.log('selectRow')
    //console.log(selectRow)
  },[selectRow])
  //==============================
  //==============================
  //==============================
  //image
  // 1 = photoUrl1
  // 2 = photoUrl1 , photoUrl2
  
  //---------------
  //We limiet only 2 image which is photoUrl1,photoUrl2 perform
  //image1
  
  const [showImage1,setShowImage1]=React.useState(true)
  const [arrayFile1,setArrayFile1]=React.useState([])
  const [fileUrl1,setFileUrl1]=React.useState([])

  React.useEffect(()=>{
    if(isFirstRun.current){isFirstRun.current=false;return;}    
  
    if(keyName){
        if(keyName[0]=="photoUrl1"){
            changeArrayFile({ arrayFile:arrayFile1,
                fileUrl:fileUrl1,
                setFileUrl:setFileUrl1,
                inputState:formInputState,
                setInputState:setFormInputState,
                keyName:keyName[0],
                //fileName,
                //serverFolder,
                //fileName:"file",
                //serverFolder:"/upload/customer",
                setShowImage:setShowImage1})
        }
    }
    
  },[arrayFile1])
  //----------------
  //image1
  const [showImage2,setShowImage2]=React.useState(true)
  const [arrayFile2,setArrayFile2]=React.useState([])
  const [fileUrl2,setFileUrl2]=React.useState([])

  React.useEffect(()=>{
    if(isFirstRun.current){isFirstRun.current=false;return;}    
  
    if(keyName){
        if(keyName[1]=="photoUrl2"){
            changeArrayFile({ arrayFile:arrayFile2,
                fileUrl:fileUrl2,
                setFileUrl:setFileUrl2,
                inputState:formInputState,
                setInputState:setFormInputState,
                keyName:keyName[1],
                //fileName,
                //serverFolder,
                //fileName:"file",
                //serverFolder:"/upload/customer",
                setShowImage:setShowImage2})
        }
    }
  },[arrayFile2])

//==============================  
const clearForm=()=>{
    setFormInputState(blankData)
}
//==============================
const submitFunctionOption=()=>{
//console.log(`submitFuctionOption ModalForm `)

    submitFunc({
        url,
        stateTemplate,
        inputState:formInputState,
        
        setShow,
        setShowModalError,
    
        clearForm,
        actionAfterSuccess, //we add actionAfterSuccess to such as update localStorage or reload 
        useGenFD //we use if(useGenFD) instad of if(stateTemplate) to decide to use genFD or not in SubmitFunc
    })


}
//====================
//console.log('ModalForm')
//====================
const renderFooter=()=>{
    return(
    <div style={{display:"flex",position:"fixed",bottom:"1rem",right:"2rem",zIndex:"100"}}
    >
        <div>
            <button
                ref={refSubmitForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowRight"){
                        refClearForm.current.focus()
                    }
                }}
                onClick={e=>{
                    submitFunctionOption()
                }}
            >ตกลง</button>
        </div>

        <div>
            <button
                ref={refClearForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowRight"){
                        refCancelForm.current.focus()
                    }
                    if(e.key=="ArrowLeft"){
                        refSubmitForm.current.focus()
                    }
                }}
                onClick={e=>{
                    clearForm();
                }}

            >
                ล้างข้อมูล
            </button>
        </div>
        
        
        <div>
            <button
                ref={refCancelForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowLeft"){
                        refClearForm.current.focus()
                    }
                }}
                onClick={e=>{
                    clearForm()
                    setShow(false)
                }}
            >ยกเลิก</button>
        </div>

    </div>
    )
}



return (
    <div className="Modal-background">
        <div className="Modal-box" style={{paddingBottom:"7rem"}}>
            <div className="Modal-header">
                <div>
                    <h1>{lb}</h1>
                </div>
                {renderFooter()}
            </div>
            <div className="Modal-body" >
                <div>
                {
                 renderForm({
                    cName:"form-row flex-justify-start flex-align-stretch bd-green",
                    template:formTemplate,
                    ref1:refSubmitForm,
                    iconAction,
                    refAndValue, //origin dont have ModalRefAndValue
                    setRefAndValue, //Origin dont have ModalRefAndValue
                    loadData:formInputState,
                    setLoadData:setFormInputState,
                    selectData,
                    //basicData:basicData,
                    blankData,
                    refAndValueBlankData,
                    hidePassword,setHidePassword,

                    tableTemplate,setTableTemplate,
                    showTable,setShowTable,
                    selectRow,setSelectRow,
                    lastRecordId,isAddForm,
                    calculation,
                    sumAmount
                  })
                }
                </div>
            </div>

            {
            keyName
            ?<div className="xc12 form-row"
                  style={{justifyContent:"space-around"}}>
                    {  
                    keyName[0]=="photoUrl1"
                    ?<div className="xc4 sc10 bgc-darkGray bd-lightGray"
                          style={{height:"80vh"}}>
                        {
                        showImage1
                        ?<Galleryone_add 
                            fileUrl={fileUrl1}
                            arrayFile={arrayFile1}
                            setArrayFile={setArrayFile1}
                            keyName={keyName[0]}

                            setShowImage={setShowImage1}
                            inputState={formInputState}
                            setInputState={setFormInputState}
                        />
                        :null
                        }   
                    </div>    
                    :null
                    }
                    {
                    keyName[1]=="photoUrl2"
                    ?<div className="xc4 sc10 bgc-darkGray bd-lightGray">
                        {
                        showImage2
                        ?<Galleryone_add 
                            fileUrl={fileUrl2}
                            arrayFile={arrayFile2}
                            setArrayFile={setArrayFile2}
                            keyName={keyName[1]}

                            setShowImage={setShowImage2}
                            inputState={formInputState}
                            setInputState={setFormInputState}
                        />
                        :null
                        }   
                    </div>    
                    :null
                    }
            </div>
            :null
            }
           
            {
                renderModalError({show:showModalError,setShow:setShowModalError})
            }            
        </div>
    </div>
  );
}
export default ModalForm;
