const express=require('express');
const router=express.Router();
const Upload=require('../models/upload');
const catchAsync=require('../utilities/catchAsync');
const expressError=require('../utilities/expressError');
const axios= require('axios');
const fs=require('fs')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/:id',catchAsync( async (req,res)=>{
    const video=await  Upload.findById(req.params.id);
    const pathToVideo=video.path;
    // const pathToVideo="https://res.cloudinary.com/dtmkiofx9/video/upload/v1680781496/assigment/gmfimmynkc2thn1mvazk.mp4";
    axios({
        method: "get",
        url: pathToVideo,
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream("video.mp4"));
        return res.send("video downloaded")
    });
    return;
}))

module.exports=router