const checkscroll=(window,setShowNav)=>{
    //console.log('vh : vw')
    //console.log(window.screen.height,window.screen.width)

    let stopY= 0;
    let currentY=0;

    //true="down", false="up"
    let movedown = true;
    let premovedown = true;

    //คอยฟังการขยับของ window จากการ scroll
    window.addEventListener("scroll", (e)=>{    
        //เมื่อหน้าจอมีการขยับในแนวดิ่ง 
        currentY = window.pageYOffset;
            //ถ้าค่า y ที่ได้ต่ำกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ลง
            if(currentY>(stopY+5)){
                stopY=currentY; 
                movedown=true;
            }
            //ถ้าค่า y ที่ได้น้อยกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ขึ้น
            else if(currentY<(stopY-5)){
                stopY=currentY;
                movedown=false;
            }
            //ค่าระหว่าง +5 และ -5 ไม่นำมาพิจารณาเพราะอาจเกิด bouncing
            //ดังนั้นค่า movedown เหมือนเดิม
          
            //เราจะจำกัดการเปลี่ยนค่า showNave ตามเงื่อนไขที่กำหนดไว้เท่านั้น
            //ถ้ามีการเปลี่ยนแปลงทิศทางการเคลื่อนที่ 
            //และการเคลื่อนที่ปัจจบัน เป็น การเคลื่อนที่ลง ไม่ต้องแสดง navbar
            //แต่ถ้ากำลังเคลื่อนที่ขึ้น ให้แสดง navbar 
            if(movedown!=premovedown){
                //console.log('change')
                if(movedown){
                    setShowNav(false);
                }
                else{
                    setShowNav(true)
                }
                //ทำการบันทึกการเคลื่อนที่ของรอบนี้ไว้เทียบกับของรอบหน้า
                premovedown=movedown
            }
    })
}


const navbarUtil={checkscroll}

export default navbarUtil