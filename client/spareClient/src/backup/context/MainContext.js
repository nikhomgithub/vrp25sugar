import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Util from './Util'

export const MainContext=React.createContext();

const MainContextProvider=(props)=>{


//==================================
    return(
        <MainContext.Provider value={
            {
               
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
