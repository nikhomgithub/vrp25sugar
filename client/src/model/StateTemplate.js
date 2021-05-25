
const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}

const valArray= (pttn,array)=>{
    let tempResult=true

    for (let i=0; i<array.length;i++){
        tempResult= new RegExp(pttn).test(array[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}
const valNone=()=>{
  return true
}

const shopSignUpState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  ownerName:    {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อเจ้าของ"},
  ownerPassword:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสเ้จ้าของ"},
  ownerEmail:   {stType:"string", validate:valBasic,  pattern:patternEmail, lb:"อีเมล"},
}

const shopLogInState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
}

const shopChangePasswordState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่อีกรั้ง"},
}

const addUserState={
  id:       {stType:"string", validate:valBasic,  pattern:patternNumber, lb:"ไอดี"},
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  userLevel:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  name:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  surname:  {stType:"string", validate:valBasic,  pattern:patternString, lb:"สกุล"},
}

const logInState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
}

const changePasswordState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่อีกครั้ง"},
}

const customerState={
  id: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"Idลูกค้า"},
  title:{stType:"string", validate:valBasic,  pattern:patternString, lb:"คำนำหน้า"},
  name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  surname:{stType:"string", validate:valBasic,  pattern:patternString, lb:"นามสกุล"},
  phone:{stType:"array",  validate:valArray,  pattern:patternNumber, lb:"โทรศัพท์"},
  customerType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทลูกค้า"},
  //arrayNumber
  address:{stType:"arrayObject",stChildren:{
    number:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ที่อยู่"},
    tambon:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ตำบล"},
    district:{stType:"string", validate:valBasic,  pattern:patternString, lb:"อำเภอ"},
    province:{stType:"string", validate:valBasic,  pattern:patternString, lb:"จังหวัด"},
    postcode:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสไปรษณีย์"},
  }},

  file1:{stType:"file",validate:valNone,pattern:null, lb:"ไฟล์1"},
  photoUrl1:{stType:"array",  validate:valArray,    patternFileName, lb:"รูป1"},
  //partnerType:{stType:"string",  validate:valBasic,     pattern:patternString, lb:""},
  remark:{stType:"string",  validate:valBasic,     pattern:patternString, lb:"หมายเหตุ"},
}

const basicDataState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
  title:{stType:"array", validate:valArray, pattern:patternString, lb:"คำนำหน้า"},
  unit:{stType:"array", validate:valArray, pattern:patternString, lb:"หน่วย"},
  userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"สิทธิ์ผู้ใช้"},

  /*transactionStatus:{stType:"array", validate:valArray, pattern:patternString, lb:""},*/
  jobType:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบสต็อก"},
  jobStatus:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบจอง"},
  customerType:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบแผน"},

  routeAuth:{stType:"arrayObject",stChildren:{
      id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
      routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
      routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
      userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"สิทธิ์ผู้ใช้"},
  }}

}

const routeAuthState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
    routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
    routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
    userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"สิทธิ์ผู้ใช้"},
}

const jobState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
  dateIn:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่สั่งงาน"},
  dateTarget:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่นัดรับ"},
  dateOut:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่เสร็จจริง"},

  file1:{stType:"file",validate:valNone,pattern:null, lb:"ไฟล์1"},
  photoUrl1:{stType:"array",  validate:valArray,    patternFileName, lb:"รูป1"},
  
  file2:{stType:"file",validate:valNone,pattern:null, lb:"ไฟล์1"},
  photoUrl2:{stType:"array",  validate:valArray,    patternFileName, lb:"รูป2"},

  jobType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทงาน"},
  jobStatus:{stType:"string", validate:valBasic,  pattern:patternString, stDefault:"สถานะงาน"},

  customerId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"IDลูกค้า"},
  title:{stType:"string", validate:valBasic,  pattern:patternString, lb:"คำนำหน้า"},
  name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  surname:{stType:"string", validate:valBasic,  pattern:patternString, lb:"นามสกุล"},
  phone:{stType:"array", validate:valArray, pattern:patternString, lb:"โทรศัพท์"},

  remark:{stType:"string", validate:valBasic,  pattern:patternString, lb:"หมายเหตุ"},

  jobValue:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"มูลค่างาน"},
  progress:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ความก้าวหน้า"},

}

const StateTemplate={
  shopSignUpState,shopLogInState,shopChangePasswordState,
  addUserState,logInState,changePasswordState,
  customerState,
  basicDataState,routeAuthState,
  jobState
}

export default StateTemplate
