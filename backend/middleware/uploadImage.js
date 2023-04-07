const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/img'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    },
  });

const multerFilter = (req, file, cb) => {
    file.mimetype.startsWith('image')
      ? cb(null, true)
      : cb({ message: 'Unsupported file' }, false);
  };

const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fieldSize:2000000}
});

const productImgResize = async(req,res,next) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async(file) => {
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/product/${file.filename}`);
            fs.unlinkSync(`public/img/product/${file.filename}`);
        })
       
    )
    next();
}

const blogImageResize = async(req,res,next) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async(file) => {
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/blog/${file.filename}`);
            fs.unlinkSync(`public/img/blog/${file.filename}`);
        })
       
    )
    next();
}


module.exports = {productImgResize,blogImageResize,uploadPhoto}