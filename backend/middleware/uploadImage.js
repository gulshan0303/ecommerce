const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/img"));
    },
    filename:function(req,file,cb){
        const uniquesufix = Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null,file.fieldname+"-"+uniquesufix+".jpeg");
    }
})

const multerFilter = (req,file,cb) =>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb({message:"Unsupported file"},false)
  }
}

const uploadFile = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fieldSize:2000000}
});

const productImageResize = async(req,res,next) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async(file) => {
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/product/${file.filename}`);
        })
       
    )
    next();
}

const blogImageResize = async(req,res,next) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async(file) => {
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/blog/${file.filename}`);
        })
       
    )
    next();
}


module.exports = {uploadFile,productImageResize,blogImageResize}