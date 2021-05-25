import room1 from "./images/room1.jpeg";
import room2 from "./images/room2.jpeg";
import room3 from "./images/room3.jpeg";
import room4 from "./images/room4.jpeg";

const jobData=[
    {
        _id: "5ea3f50c7a04c4369f385741",
        jobId: "c790cd22-4f6d-4f4a-8e93-b3aeac8caebd",
        dateIn: "2020-04-30T08:29:00.000Z",
        dateOut: "2020-04-30T08:29:00.000Z",
        placeIn: "ร้านใน",
        placeOut: "ร้านใน",
        afterImg: ["room1,room2"],
        beforeImg: ["room1,room2,room3,room4"],
        imageUrl: [],
        remark: "งานดีมาก",
        status: "ทำเสร็จแล้ว",
        customerId: "1bb7011c-7a8e-4a37-b1b2-7ec78bd22f93",
        title: "คุณ",
        name: "ปลาดุก",
        surname: "สุดอร่อย",
        phone: ["09881727637"],
        line: ["aline"],
        email: ["a@mail.com"],
        jobdetail:[
            {
            id: "5ea3f5577a04c4369f385747",
            iId: "4abdb656-b806-4d44-8554-15d09eb9e807",
            iIndex: "0",
            iname: "ดินสอสี",
            price: 3,
            unit: "อัน",
            startDate: "2020-04-25T08:29:00.000Z",
            endDate: "2020-04-25T08:29:00.000Z",
            pic: "แป๊ะ"
            },
            {
            _id: "5ea3f5577a04c4369f385748",
            iId: "6371bcf5-dbfc-48ee-aca0-39e460ec0be0",
            iIndex: "1",
            iname: "โมจิ",
            price: 40,
            unit: "อัน",
            startDate: "2020-04-25T08:29:38.000Z",
            endDate: "2020-04-25T08:29:38.000Z",
            pic: "แป๊ะ"
            }
        ]
    },
    {
        _id: "5ea3f50c7a04c4369f385741",
        jobId: "c790cd22-4f6d-4f4a-8e93-b3aeac8caebd",
        dateIn: "2020-04-30T08:29:00.000Z",
        dateOut: "2020-04-30T08:29:00.000Z",
        placeIn: "ร้านใน",
        placeOut: "ร้านใน",
        afterImg: ["room1,room2"],
        beforeImg: ["room1,room2,room3,room4"],
        imageUrl: [],
        remark: "งานดีมาก",
        status: "ทำเสร็จแล้ว",
        customerId: "1bb7011c-7a8e-4a37-b1b2-7ec78bd22f93",
        title: "คุณ",
        name: "ปลาดุก",
        surname: "สุดอร่อย",
        phone: ["09881727637"],
        line: ["aline"],
        email: ["a@mail.com"],
        jobdetail:[
            {
            id: "5ea3f5577a04c4369f385747",
            iId: "4abdb656-b806-4d44-8554-15d09eb9e807",
            iIndex: "0",
            iname: "ดินสอสี",
            price: 3,
            unit: "อัน",
            startDate: "2020-04-25T08:29:00.000Z",
            endDate: "2020-04-25T08:29:00.000Z",
            pic: "แป๊ะ"
            },
            {
            _id: "5ea3f5577a04c4369f385748",
            iId: "6371bcf5-dbfc-48ee-aca0-39e460ec0be0",
            iIndex: "1",
            iname: "โมจิ",
            price: 40,
            unit: "อัน",
            startDate: "2020-04-25T08:29:38.000Z",
            endDate: "2020-04-25T08:29:38.000Z",
            pic: "แป๊ะ"
            }
        ]
    }   
]


//=================================
const lineData=[
    {
        _id: "5e7b0b602ef0ec5993496edf",
        id: "main",
        name: "กลุ่มหลัก",
        children:["ecca6c1b-f361-4aec-89ae-913a702ede2a", 
                  "f286a2e7-f38b-4e60-a78b-78f524071795", 
                  "1b1f70ff-b599-4148-b491-e8e44aea7e5e"],
        pd: []
    },
    {
        id: "ecca6c1b-f361-4aec-89ae-913a702ede2a",
        _id: "5e859bd95762ddbec2fb3562",
        name: " ขนมหวาน",
        children: [],
        pd: [{
            _id: "5e859bd9b303fc371efb1b00",
            iId: "6371bcf5-dbfc-48ee-aca0-39e460ec0be0",
            iname: "โมจิ",
            price: "40",
            unit: "อัน"
        }]
    },
    {
        id: "f286a2e7-f38b-4e60-a78b-78f524071795",
        _id: "5e859bd95762ddbec2fb359f",
        name: "น้ำดื่ม",
        children: [],
        pd: (2) [
            {
                _id: "5e859bd9b303fc371efb1b01",
                iId: "7b25da1f-3bec-4abb-9af9-547b97f1f2fa",
                iname: "โค้ก",
                price: "43",
                unit: "ขวด"
            }, 
            {
                _id: "5e859bd9b303fc371efb1b02",
                iId: "046416b0-6f34-4ba8-8566-de96afa272e4",
                iname: "โออิชิ",
                price: "25",
                unit: "ขวด"
            }
        ]
    },
    {
        _id: "5e859bda5762ddbec2fb35f9",
        id: "1b1f70ff-b599-4148-b491-e8e44aea7e5e",
        name: "เครื่องเขียน ดีดี",
        children: ["362c6494-1562-44c6-8274-34f467c7072f"],
        pd: [
            {
                _id: "5ea0143ae99cfb40a438363a",
                iId: "4abdb656-b806-4d44-8554-15d09eb9e807",
                iname: "ดินสอสี",
                price: "3",
                unit: "อัน",
            }
        ]
    },
    {
        _id: "5ea0143a0e4ac544417e45c9",
        id: "362c6494-1562-44c6-8274-34f467c7072f",
        name: "ปากกาสี",
        children: [],
        pd: []
    }
]
    
//==================================

const customerData=[
    {   
        _id: "5e859a45b303fc371efb1afd",
        customerId: "afb3372e-b7a4-4110-8f0a-0163443ee822",
        title: "",
        name: "ยลโฉม",
        surname: "สุดใจ",
        phone:["9999999999", "0881235555", "0795349999", ""],
        line:["aline", "bline"],
        email:["abcd@mail.com", "bd@mail.com"],
        tax: "",
        address:[
            {
                district: "สนามหญ้า",
                number: "1234/234 หมู่ 7",
                postcode: " 293840",
                province: "สมุทรปราการที่สุด",
                tambon: "บ่อน้ำ",
                _id: "5e899278f198a512b22a8201",
            }, {
                district: "ตัวใหญ่",
                number: "1/99",
                postcode: "543671",
                province: "น่ารักจัง",
                tambon: "ปลานิล",
                _id: "5e899278f198a512b22a8202"
            }
        ]
    },
    {
        _id: "5e87f18a2cddbc1b84218a75",
        customerId: "1bb7011c-7a8e-4a37-b1b2-7ec78bd22f93",
        title: "",
        name: "ปลาดุก",
        surname: "สุดอร่อย",
        phone: ["09881727637"],
        line: [],
        email: [],
        tax: "",
        address:[
            {
                district: "ทุ่งหญ้า",
                number: "123 หมู่ 89",
                postcode: "123456",
                province: "เขียวขจี",
                tambon: "กว้างใหญ่",
            }, 
            {
                district: "บางบ่อ",
                number: "99 หมู่ 5",
                postcode: "10560",
                province: "สมุทรปราการ",
                tambon: "บ้านระกาศ"
            }
        ]
    }
   
]

//============================
const basicData={
    jobstatus:["หาไม่เจอ", "ลูกค้ารับไปแล้ว", "ยังไม่ทำรอถามลูกค้า", "ยังไม่ทำรอคิว"],
    jobtype:["เอามาให้ดูเฉยๆ", "เอามาใช้", "เอามาซ่อม", "สั่งทำใหม่", "สั่งซื้อใหม่"],
    owner:["ของลูกค้า", "ของร้านใหม่"],
    pic:["แม็ก", "แป๊ะ", "เสรี", "อุ๋ย", "อั๊น", "ยังไม่ระบุ", "นันท์", "ต้นใหญ่", "ต้นเล็ก", "ดาวิด", "ฑูรย์", "ก็อต", "กรณ์"],
    place:["ไปส่ง", "ร้านใน", "ร้านนอก", " รอยืนยัน"],
    title:["เฮีย", "เจ๊", "ผู้ใหญ่", "นาย", "นางสาว", "นาง"],
    unit:["โหล", "แผ่น", "แกลลอน", "เมตร", "อัน", "ลำ", "ตร.เมตร", "ชุด", "คู่", "ขวด", "กิโลกรัม"],
    _id: "5e74a6028d899144eb68b456"
}