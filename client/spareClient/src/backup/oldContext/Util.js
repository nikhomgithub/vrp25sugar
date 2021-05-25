import React from 'react'
import axios from 'axios';

//line to nested object
const convertToObject=(myarrs)=>{         
    const searchId=(_id,groupId,groupName,remark,subGroup,folders)=>{
        folders.map(f=>{
            if(groupId==f.fId){
               f._id=_id 
               f.fName=groupName
               f.fRemark=remark
               subGroup.map(kidId=>{
                   const ob={fId:kidId,folders:[],fParent:groupId}
                   f.folders.push(ob)
               })
            }
            else{
                searchId(_id,groupId,groupName,remark,subGroup,f.folders)
            }
        })
    }

    let mainObj={}       
    myarrs.map(l=>{
        if(l.groupId==1){     
            mainObj ={_id     :l._id,
                      fId     :l.groupId,
                      fName   :l.groupName,
                      fRemark :l.remark,
                      folders :[],
                      fParent :null}

            l.subGroup.map(kidId=>{
                const secondObj={fId     :kidId,
                                 folders :[],
                                 fParent :l.groupId}

                mainObj.folders.push(secondObj)
            })
        }                 
        else{
            searchId(l._id,l.groupId,l.groupName,l.remark,l.subGroup,
                     mainObj.folders)
        }
    })
    //console.log(temp)
    let returntemp=[mainObj]
    
    return returntemp
}

/*
//nested object to line
const convertToLine=(nesteddata)=>{
    let newlist=[]
    const loopArray=(arr)=>{
        if(arr){if(arr.length>0){
            arr.map((obj,index)=>{
                const newobject={
                    id:obj.fId,
                    name:obj.fname,
                    pd:obj.items,
                    children:obj.folders.map(k=>k.fId)
                }
                newlist=[...newlist,newobject]
                
                if(obj.folders){if(obj.folders.length>0){
                    loopArray(obj.folders)
                }}
            })  
        }}            
    }

    loopArray(nesteddata)
    return newlist
}

const formProductlist=(data)=>{
    let newlist=[]
    const loopArray=(arr,mother)=>{
        if(arr){if(arr.length>0){
            arr.map((i,index)=>{
                if(i.items){if(i.items.length>0){
                    
                    i.items.map(x=>{
                        newlist=[...newlist,{...x,parent:[...mother,{fId:i.fId,fname:i.fname}]}]
                    })
            
                }}
                if(i.folders){if(i.folders.length>0){
                    //console.log(`${i.fId} && ${i.fname}`)
                    loopArray(i.folders,[...mother,{fId:i.fId,fname:i.fname}])
                }}
            })
        }}
    }
    loopArray(data,[])

    return newlist
}
*/
const getData=({api,data,setData,blankData,reactEffect})=>{
    const {origin,reload,filter,add,edit}=data

    reactEffect(()=>{
        if(data.reload){
            axios
            .get(api)
            .then(result=>{
                setData({...data,
                        origin:result.data,
                        filter:result.data,
                        reload:false})       
            })
            .catch(err=>{
                setData({...data,
                        origin:null,       
                        filter:null,       
                        reload:false})
            })
        }
    },[reload])

    reactEffect(()=>{
        console.log(api)
        console.log('origin')
        console.log(origin)
        if(origin){
            if(origin.length>0){
                const temp= {...blankData, 
                    id:origin[origin.length-1].id+1}
                setData({...data,add:temp})
            }
            if(origin.length==0){
                const temp={...blankData, id:1}
                setData({...data,add:temp})
            }
        }
    },[origin])

    reactEffect(()=>{
        console.log(api)
        console.log('add')
        console.log(add)
    },[add])

    reactEffect(()=>{
        console.log(api)
        console.log('edit')
        console.log(edit)
    },[edit])

    reactEffect(()=>{
        console.log(api)
        console.log('filter')
        console.log(filter)
    },[filter])
}

const Util={convertToObject,getData}

export default Util