const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' || 
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb('Archivo no valido', false);
    }
}

const uploads = multer({storage: storage, fileFilter: fileFilter});

module.exports = uploads;