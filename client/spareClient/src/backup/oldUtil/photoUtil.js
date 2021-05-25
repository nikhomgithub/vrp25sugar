//import React from 'react'

function fileListItem(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError("expected argument to fileList1 is File or array of File objects")
    for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
} 
//=================================
const changeArrayFile=({arrayFile,setFileUrl,inputState,
    setInputState,fileName,setShowImage})=>{
    const tempFileList= new fileListItem( arrayFile )
    
    let tempFileUrl=[]
    for(let i=0;i<tempFileList.length;i++){
        const tempObject={ name:tempFileList[i].name,
                           blob:URL.createObjectURL(tempFileList[i])}
        tempFileUrl=[...tempFileUrl,tempObject]
    }
    setFileUrl(tempFileUrl)
      
    setInputState({...inputState,[fileName]:tempFileList})
    reloadImage({setShowImage})
}
//==================================
const handleInputFile=({files,arrayFile,setArrayFile})=>{
    const unique=Array.from(new Set([...arrayFile,...files]))
    setArrayFile(unique)   
}
//====================================

const reloadImage=({setShowImage})=>{
    setShowImage(false)
    setTimeout(()=>{
        setShowImage(true)
    },100)
}
//===================================

const resetFile=({setArrayFile,setFileUrl})=>{
    setArrayFile([])
    setFileUrl([])
}
//===================================
const deleteFileUrl=({name,arrayFile,setArrayFile,
    reloadImage,setShowImage})=>{
    let tempArray=[]
    arrayFile.map((i,index)=>{
        if(i.name!==name){
            tempArray.push(i)
        }
        return tempArray
    })
    setArrayFile(tempArray)   
    reloadImage({setShowImage});   
}
//=========================================
const deletePhotoUrl=({name,inputState,setInputState,
    reloadImage,setShowImage})=>{
    const tempLength=inputState.photoUrl.length
    let temp=[]
    for(let i=0;i<tempLength;i++){
        if(inputState.photoUrl[i]!=name){
            temp=[...temp,inputState.photoUrl[i]]
        }
        if(i==tempLength-1){
            setInputState({...inputState,photoUrl:temp})
        }
    }
    reloadImage({setShowImage})
}
//==================================

const photoUtil={fileListItem,changeArrayFile,handleInputFile,
    reloadImage,resetFile,deleteFileUrl,deletePhotoUrl}

export default photoUtil
