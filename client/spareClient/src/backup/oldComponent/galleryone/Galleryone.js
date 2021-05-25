import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery';
import './Galleryone.css';

export default function Galleryone({imgarrs,deleteFile,deleteUrl}) {
    
    const [imgFrameHeight,setImgFrameHeight]=React.useState('')

    const [imgTrackWidth,setImgTrackWidth]=React.useState('')

    const refFrame=React.useRef();
    const refImg=React.useRef()
    
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
            //console.log('imgFrameHeight')
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
                        <img className="img" src={imgSrc} ref={refImg} style={{width:"auto"}} />
                    </div>   
                    )
                }
            ) 
        }
    } 
    //console.log($(`#img-id`).width()*0.57)
    //style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
    return (
        <div style={{height:"100%"}} >
        {
        (imgarrs)
        ?
            <div className="img-frame border" 
                id="img-id"
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