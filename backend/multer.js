// const multer = require ("multer");

// const storage = multer.diskStorage({
//     destination: function (req, res, cb ){
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb){
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()  * 1e9);
//         const filename = file.originalname.split(".")[0];
//         cb(null, filename + "-" + uniqueSuffix + ".png");
//     },
// });

//  exports.upload = multer ({storage: storage });



// const multer = require("multer");

// const storage = multer.memoryStorage();

// exports.upload = multer({ storage: storage });




const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

// Create a named export
const upload = multer({ storage: storage });
exports.upload = upload; 