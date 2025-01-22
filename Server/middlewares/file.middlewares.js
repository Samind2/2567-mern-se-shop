const multer = require("multer");
const path = require("path");

const firebaseConfig = require("../configs/firebase.config");
// console.log(firebaseConfig);
const {
 getStorage,
 ref,
 uploadBytesResumable,
 getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

// Init Upload
const upload = multer({
 storage: multer.memoryStorage(),
 limits: { fileSize: 1000000 }, //limit 1Mb
 fileFilter: (req, file, cb) => {
  checkFileType(file, cb); // Check file ext
 },
}).single("file"); // input name

function checkFileType(file, cb) {
 const fileTypes = /jpeg|jpg|png|gif|webp/;
 const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
 const mimetype = fileTypes.test(file.mimetype);

 if (mimetype && extName) {
  return cb(null, true);
 } else {
  cb("Error: Image Only!");
 }
}

//upload to firebase storage
async function uploadToFirebase(req, res, next) {
 if (!req.file) {
  // return res.status(400).json({ message: "Image is required" });
  next();
  return;
 }
 //save location
 const storageRef = ref(
  firebaseStorage,
  `se-shop/upload/${req.file.originalname}`
 );
 //file type
 const metadata = {
  contentType: req.file.mimetype,
 };
 try {
  //uploading....
  const snapshot = await uploadBytesResumable(
   storageRef,
   req.file.buffer,
   metadata
  );
  // get url from firebase
  req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
  // console.log(req.file.firebaseUrl);

  next();
  return;
 } catch (error) {
  res.status(500).json({
   message:
    error.message || "Somthing wen wrong while uploading to firebase",
  });
 }
}

module.exports = { upload, uploadToFirebase };