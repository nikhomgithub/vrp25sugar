
const convertFormTemplateToTableTemplate=(formTemplate,detailTableTemplate)=>{

    if(!formTemplate){
      return null
    }

    if(!formTemplate["detail"]){
      return null
    }

    if(!formTemplate["detail"]["subFormTemplate"]){
      return null
    }
    else{
        const detailFormTemplate=formTemplate["detail"]["subFormTemplate"]
        const temp={}
        const objKeys = Object.keys(detailFormTemplate)
    
        objKeys.map(i=>{
          //const {lb,templateType,subCName,inputType,placeholder,nextEnter}=detailFormTemplate[i]
          const {templateType,subCName,...remaining} = detailFormTemplate[i]
          //const {lb,showCol,showColHead,type,width,showSum}=detailTableTemplate[i]
          
          if(detailTableTemplate[i]){
            temp[i]={...detailFormTemplate[i],...detailTableTemplate[i]}
          }      
          else{
            temp[i]={ type:templateType, 
                      width:subCName[0],
                      showCol:true,
                      showColHead:true,
                      ...remaining}
          }
        })
        return temp
    }
  }
  

const formUtil={convertFormTemplateToTableTemplate}

export default formUtil