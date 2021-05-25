//const modalTemplate = require('./modalTemplate.js')

//const {filterData}=modalTemplate

const valReqBody = ({stateTemplate,inputState})=>{
    let valResult=true

    const valFunction=({reqBody,template})=>{
        const arrayTemplate=Object.keys(template)

        arrayTemplate.map((tpKey,tpIdx)=>{    
            if(reqBody[tpKey]){
                const {stType,validate,pattern,children}=template[tpKey]

                if(stType=="object"){
                    valFunction({reqBody:reqBody[tpKey],template:template[tpKey].children})
                }
                else if(stType=="arrayObject"){
                    reqBody[tpKey].map(i=>{
                        valFunction({reqBody:i,template:template[tpKey].children})
                    })
                }else if(stType=="file"){
                    
                }
                else{

                    valResult=validate(pattern,reqBody[tpKey])
                    if(!valResult){
                        throw(`${tpKey} : invalid`)
                    }
                    
                }
            }
        })
    }
   
    try {
        valFunction({reqBody:inputState,template:stateTemplate})
        return valResult
        //return next()
    } 
    
    catch (error) {
        //console.log(error)
        return error 
        //false
        //return res.status(401).json({ msg:error});
    }
               
}

module.exports = valReqBody

/*
{
    "id":43,
    "name":"Bun1ny",
    "age":123,
    "email":["john@mail.com"],
    "bonus":[1000,200,300,400],
    "BOD":"2021-10-01",
    "education":{ "university":"KU", "grade":1},
    "photoUrl":[],
    "family":[
            {
            "name":"John",
            "age":100,
            "email":["john@mail.com"],
            "bonus":[1,2,3,4],
            "BOD":"2021-10-01",
            "education":{ "university":"BU", "grade":1}
           }
          
    ]
}
*/

