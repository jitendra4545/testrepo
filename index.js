const multer=require('multer')
const express=require(`express`)
const cors=require('cors')
const { connection } = require("./config/db")
require("dotenv").config()
const app=express()
const fs=require('fs')
const bodyParser=require('body-parser')
const { StudentModel } = require('./model/StudentsModel')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


app.get("/",(req,res)=>{
    console.log('welcome to satyam education')
})


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'allphoto/');
    },
    filename: (req, file, callback) => {
        callback(null,file.originalname);
      },
    });

    const upload = multer({ storage: storage });


    app.get("/getall", async(req, res) => {
        try{
           let allData=await StudentModel.find()
           res.send(allData)
        }catch(err){
             console.log(err)
        }
    })
    



    app.post("/add",upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
        { name: 'image5', maxCount: 1 },
        { name: 'image6', maxCount: 1 },
        { name: 'image7', maxCount: 1 },
        { name: 'image8', maxCount: 1 },
        { name: 'image9', maxCount: 1 },
        { name: 'image10', maxCount: 1 },
        { name: 'image11', maxCount: 1 },
        { name: 'image12', maxCount: 1 }
      ]),async(req,res)=>{

        const img = [
            { contentType: 'input1', ...req.files['image1'][0] },
            { contentType: 'input2', ...req.files['image2'][0] },
            { contentType: 'input3', ...req.files['image3'][0] },
            { contentType: 'input4', ...req.files['image4'][0] },
            { contentType: 'input5', ...req.files['image5'][0] },
            { contentType: 'input6', ...req.files['image6'][0] },
            { contentType: 'input7', ...req.files['image7'][0] },
            { contentType: 'input8', ...req.files['image8'][0] },
            { contentType: 'input9', ...req.files['image9'][0] },
            { contentType: 'input10', ...req.files['image10'][0] },
            { contentType: 'input11', ...req.files['image11'][0] },
            { contentType: 'input12', ...req?.files['image12'][0] },
          ];

const addData=StudentModel({
    
    name:req.body.name,
    father_name:req.body.father_name,
    mother_name:req.body.mother_name,
    dob:req.body.dob,
    gender:req.body.gender,
    address:req.body.address,
    category:req.body.category,
    email:req.body.email,
     pnumber:req.body.pnumber,
     anumber:req.body.anumber,
     course:req.body.course,
      methodology1:req.body.methodology1,
      methodology2:req.body.methodology2,
      
      photo1:{
        data:fs.readFileSync('allphoto/'+img[0].filename),
        contentType:"image/png"
     
    },
      photo2: {
        data:fs.readFileSync('allphoto/'+img[1].filename),
        contentType:"image/png"
     
    },
      photo3:{
        data:fs.readFileSync('allphoto/'+img[2].filename),
        contentType:"image/png"
     
    },
      photo4: {
        data:fs.readFileSync('allphoto/'+img[3].filename),
        contentType:"image/png"
     
    },
      photo5: {
        data:fs.readFileSync('allphoto/'+img[4].filename),
        contentType:"image/png"
     
    },
      photo6: {
        data:fs.readFileSync('allphoto/'+img[5].filename),
        contentType:"image/png"
     
    },
      photo7: {
        data:fs.readFileSync('allphoto/'+img[6].filename),
        contentType:"image/png"
     
    },
      photo8: {
        data:fs.readFileSync('allphoto/'+img[7].filename),
        contentType:"image/png"
     
    },
      photo9: {
        data:fs.readFileSync('allphoto/'+img[8].filename),
        contentType:"image/png"
     
    },
      photo10: {
        data:fs.readFileSync('allphoto/'+img[9].filename),
        contentType:"image/png"
     
    },
      photo11: {
        data:fs.readFileSync('allphoto/'+img[10].filename),
        contentType:"image/png"
     
    },
      photo12: {
        data:fs.readFileSync('allphoto/'+img[11]?.filename),
        contentType:"image/png"
     
    },
      stream1:req.body.stream1,
      stream2:req.body.stream2,
      stream3:req.body.stream3,
      stream4:req.body.stream4,
      board1:req.body.board1,
      board2:req.body.board2,
      board3:req.body.board3,
      board4:req.body.board4,
      year1:req.body.year1,
      year2:req.body.year2,
      year3:req.body.year3,
      year4:req.body.year4,
      roll1:req.body.roll1,
      roll2:req.body.roll2,
      roll3:req.body.roll3,
      roll4:req.body.roll4,
      fullmark1:req.body.fullmark1,
      fullmark2:req.body.fullmark2,
      fullmark3:req.body.fullmark3,
      fullmark4:req.body.fullmark4,
      obtain1:req.body.obtain1,
      obtain2:req.body.obtain2,
      obtain3:req.body.obtain3,
      obtain4:req.body.obtain4,
      radio:req.body.radio

})

try{
    await addData.save()

    res.send("Data Saved Sucessfully")
    console.log("send")
}catch(err){
    res.send ("Couldn't save Data Successfully",(err.message))
}




    })






app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("db connected successfully")
    }catch(err){
console.log("connection failed")
    }
  console.log(`server running in port ${process.env.port}`)
})