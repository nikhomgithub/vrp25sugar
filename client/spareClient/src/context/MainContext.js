import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StateTemplate from '../model/StateTemplate'
import StateUtil from '../model/StateUtil'

const {basicDataState,partnerState,productState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil

export const MainContext=React.createContext();

const MainContextProvider=(props)=>{
    console.log('MainContext')
    
    //==========================
    //basicData
    let [basicData,setBasicData] = React.useState(
        genBlankState({template:basicDataState}).state
    );

    const [reloadCheckToken,setReloadCheckToken]=React.useState(true)
    const [haveShopToken,setHaveShopToken]=React.useState(false)
    const [haveUserToken,setHaveUserToken]=React.useState(false)
    const [userName,setUserName]=React.useState(null)
    
    React.useEffect(()=>{
        if(reloadCheckToken){

            if(localStorage.getItem('shopauthorization')){
                setHaveShopToken(true)
            }
            else{
                setHaveShopToken(false)
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            if(localStorage.getItem('userauthorization')&&
               localStorage.getItem('username')){
                setHaveUserToken(true)
                setUserName(localStorage.getItem('username'))
            }
            else{
                setHaveUserToken(false)
                setUserName(null)
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            setReloadCheckToken(false)
        }
    },[reloadCheckToken])

    const [reloadBasicData,setReloadBasicData] = React.useState(true);
    
    React.useEffect(()=>{
        if(reloadBasicData){

            if(localStorage.getItem('shopauthorization')&&
               localStorage.getItem('userauthorization')
               //to ensure user&shop token in place before request to server
            ){
                axios.post('/basicdata/getcustom',
                {},
                {headers: {'Content-Type': 'application/json',
                    'Shopauthorization':localStorage.getItem('shopauthorization'),
                    'Userauthorization':localStorage.getItem('userauthorization')
                }}
                )
                .then(result=>{
                    console.log(`MainContext: basicData: '/basicdata/getcustom'`)
                    console.log(result.data[0])
                    setReloadBasicData(false)
                    setBasicData(result.data[0])
                })
                .catch(err=>{
                    console.log(err)
                    setReloadBasicData(false)
                })
            }
        }
    },[reloadBasicData])
    
    ////console.log('date') console.log(new Date("2017-01-31").toISOString())

    /*
    const [widthLeft,setWidthLeft]=React.useState(30)

    //====================
    //selectPartner
    let [selectPartner,setSelectPartner]=React.useState(null)

    React.useEffect(()=>{
        //console.log('selectPartner')
        //console.log(selectPartner)
    },[selectPartner])

    //====================
    //selectProduct
    let [allProduct1,setAllProduct1]=React.useState(null)
    let [allProduct2,setAllProduct2]=React.useState(null)
    
    let [selectProduct1,setSelectProduct1]=React.useState(null)
    let [selectProduct2,setSelectProduct2]=React.useState(null)

    const [reloadProduct1,setReloadProduct1]=React.useState(true)
    const [reloadProduct2,setReloadProduct2]=React.useState(true)

    React.useEffect(()=>{
        //console.log('allProduct1')
        //console.log(allProduct1)
        if(allProduct1&&selectProduct1){
            allProduct1.map(i=>{
                if(i.id==selectProduct1.id){
                    setSelectProduct1(i)
                }
            })
        }

    },[allProduct1])

    React.useEffect(()=>{
        //console.log('allProduct2')
        //console.log(allProduct2)
        if(allProduct2&&selectProduct2){
            allProduct2.map(i=>{
                if(i.id==selectProduct2.id){
                    setSelectProduct2(i)
                }
            })
        }

    },[allProduct2])

    React.useEffect(()=>{
        //console.log('selectProduct1')
        //console.log(selectProduct1)
    },[selectProduct1])

    //=====================
    let [allTransaction,setAllTransaction]=React.useState(null)
    
    let [selectTransaction1,setSelectTransaction1]=React.useState(null)

    let [selectTransactionGroup1,setSelectTransactionGroup1]=React.useState(null)

    const [reloadTransaction,setReloadTransaction]=React.useState(true)

    */
//==================================
return(
        <MainContext.Provider value={
            {
               basicData,setBasicData,
               reloadBasicData,setReloadBasicData,
            
               reloadCheckToken,setReloadCheckToken,
               haveShopToken,setHaveShopToken,
               haveUserToken,setHaveUserToken,
               userName,setUserName,

            /*
               selectPartner,setSelectPartner,
               
               allProduct1,setAllProduct1,
               allProduct2,setAllProduct2, 

               selectProduct1,setSelectProduct1,
               selectProduct2,setSelectProduct2,

               reloadProduct1,setReloadProduct1,
               reloadProduct2,setReloadProduct2,

               widthLeft,setWidthLeft,
                
               allTransaction,setAllTransaction,
               selectTransaction1,setSelectTransaction1,
               reloadTransaction,setReloadTransaction,
               selectTransactionGroup1,setSelectTransactionGroup1,                

            */
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
