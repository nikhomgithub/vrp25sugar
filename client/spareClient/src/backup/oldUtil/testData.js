
//==================================
const people = [
    {
        id:0,
        name:"Peter",
        active:true,
        email:["peter1@mail.com","peter2@mail.com"],
        photoUrl1:["upload/employee/room-1.jpeg","upload/employee/room-2.jpeg"],
        file1:null,
        photoUrl2:[],
        file2:null,
        imageUrl:[],
        address:[
            {district:"Bangbo",phone:["012","345"]},
            {district:"Bangbo",phone:["234","456"]}
        ]
    },
    {
        id:1,
        name:"Jame",
        active:false,
        email:["jame1@mail.com","jame2@mail.com"],
        photoUrl1:["upload/employee/room-3.jpeg","upload/employee/room-4.jpeg"],
        file1:null,
        photoUrl2:[],
        file2:null,
        imageUrl:[],
        address:[
            {district:"Bangbo",phone:["089921679"]},
            {district:"Bangbo",phone:["089921679"]}
        ]
    },
    
    {
        id:2,
        name:"Me",
        active:true,
        email:["me1@mail.com","me2@mailcom"],
        photoUrl1:["upload/employee/room-5.jpeg","upload/employee/room-6.jpeg"],
        file1:null,
        photoUrl2:[],
        file2:null,
        imageUrl:[],
        address:[
            {district:"Bangbo",phone:["0899210000"]},
            {district:"Bangbo",phone:["0899210000"]}
        ]
    },
]
//================================
const blankPerson={
    
    id:0,
    name:"",
    active:false,
    email:[],
    photoUrl1:[],
    file1:null,
    photoUrl2:[],
    file2:null,
    imageUrl:[],
    address:[]

}


//================================
const testData={people,blankPerson}

export default testData