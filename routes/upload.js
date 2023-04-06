const express=require('express');
const router=express.Router();
const Upload=require('../models/upload');
const catchAsync=require('../utilities/catchAsync');
const expressError=require('../utilities/expressError');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.post('/',upload.single('video'),catchAsync(async (req,res)=>{    
    const {originalname,path,filename}=req.file
    const video= new Upload({originalname,path,filename})
    await video.save()
    return res.status(200).send(video._id);
}))

module.exports=router