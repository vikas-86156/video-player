if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose=require('mongoose')
const app = express()
const multer = require('multer');
const port = process.env.PORT || 3000

const uploadRoutes=require('./routes/upload');
const streamRoutes=require('./routes/stream');
const downloadRoutes=require('./routes/download');


mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/videos',{
    useNewUrlParser:true,
    
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("connection open ...")
})
.catch((err)=>{
    console.log(err)
    console.log("error")
})

app.use('/upload', uploadRoutes);
app.use('/stream', streamRoutes);
app.use('/download', downloadRoutes);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})


// -- code without refactoring ----


// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const Upload=require('./models/upload');
// const axios= require('axios');
// const fs=require('fs')

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         resource_type: 'video',
//         folder: 'assigment',
//         allowedFormats: ['mp4','jpg','png']
//     }

// });
// const upload=multer({storage})


// app.post('/upload',upload.single('video'), async (req,res)=>{    
//     const {originalname,path,filename}=req.file
//     const video= await new Upload({originalname,path,filename})
//     await video.save()
//     res.send("js");

// })

// app.get('/stream/:id',async (req,res)=>{
//     const video=await  Upload.findById(req.params.id);
//     console.log(video);
//     res.redirect(video.path);
// })

// app.get('/download/:id',async (req,res)=>{
//     const video=await  Upload.findById(req.params.id);
//     const pathToVideo=video.path;
//     // const pathToVideo="https://res.cloudinary.com/dtmkiofx9/video/upload/v1680781496/assigment/gmfimmynkc2thn1mvazk.mp4";
//     axios({
//         method: "get",
//         url: pathToVideo,
//         responseType: "stream"
//     }).then(function (response) {
//         response.data.pipe(fs.createWriteStream("video.mp4"));
//         res.send("hllo")
//     });
// })
