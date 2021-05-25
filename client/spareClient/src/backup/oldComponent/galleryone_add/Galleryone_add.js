import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import $ from 'jquery';
import './Galleryone_add.css';

export default function Galleryone_add({
            imgarrs,deleteFile,deleteUrl,
            arrayFile,setArrayFile,
            reloadImage,setShowImage,
            inputState,setInputState}) {
    
    const [imgFrameHeight,setImgFrameHeight]=React.useState('')

    const [imgTrackWidth,setImgTrackWidth]=React.useState('')

    const refFrame=React.useRef();
    
    React.useEffect(()=>{

        if(imgarrs){if(imgarrs.length>0){
            //to get imgFrameHeight 
            if(refFrame){
                refFrame.current.click()
            }
            //to set imgTrackWidth
            let temp=imgarrs.length*100
            setImgTrackWidth(`${temp}%`)

        }} 
        
    },[])

    React.useEffect(()=>{
        if(imgFrameHeight){
            //console.log(imgFrameHeight);
        }
    },[imgFrameHeight])

    const renderImg=(arrs)=>{
        if(arrs){
            return arrs.map((i,index)=>{
                let imgSrc
                let imgName
                let isFile
                if(i.blob){
                    isFile=true
                    imgSrc=i.blob
                    imgName=i.name 
                }    
                else {
                    isFile=false
                    imgSrc=i
                    imgName=i
                }

                return    (
                    <div key={index} style={{height:'100%',width:'100%',
                        display:'grid',placeItems: 'center',
                        position:"relative"}}>
                        <img className="img" src={imgSrc} style={{width:"auto"}} />
                        <DeleteForeverIcon  
                            className="rounded-circle"
                            style={{
                                position:"absolute",color:isFile?"red":"green",fontSize:"3rem",
                                backgroundColor:"white",bottom:"1rem",right:"1rem",
                                zIndex:"1000"
                            }}
                            onClick={e=>{
                                if(isFile){
                                    deleteFile({name:imgName,arrayFile,setArrayFile,reloadImage,setShowImage})
                                    
                                    //console.log(imgName)
                                    //deleteFile(imgName)
                                }else{
                                    //console.log(imgName)
                                    deleteUrl({name:imgName,inputState,setInputState,reloadImage,setShowImage})
                                    //deleteUrl(imgName)
                                }
                            }}             
                        />
                    </div>   
                    )
                }
            ) 
        }
    } 

    return (
        <div >
        {
        (imgarrs)
        ?
            <div className="img-frame border" 
                ref={refFrame}
                style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
                onClick={e=>{setImgFrameHeight($(e.currentTarget).width()*0.57)
                }}    
            >       
                <div className="img-track" 
                        style={{display:'flex',width:imgTrackWidth,height:"100%"}}>
                {renderImg(imgarrs)}
                </div>  
            </div>
        :null  
        }
        </div>
    )
}
//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}