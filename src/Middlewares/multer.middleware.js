import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

      cb(null, Date.now() + "-" + file.originalname)
    }
  })

  const fileFilter = function (req, file, cb) {
    console.log("file",file)
  if (!file.originalname.match(/\.(csv|xlsx|xls)$/)) {
    return cb(new Error("Only .csv, .xlsx, .xls files are allowed!"), false);
  }

  cb(null, true);
};

  
 export const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }

   })

   