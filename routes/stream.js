const express=require('express');
const router=express.Router();
const Upload=require('../models/upload');
const catchAsync=require('../utilities/catchAsync');
const expressError=require('../utilities/expressError');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.get('/:id',catchAsync(async (req,res)=>{
    const video=await  Upload.findById(req.params.id);
    console.log(video);
    res.redirect(video.path);
}))

module.exports=router