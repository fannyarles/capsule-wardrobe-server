const fileUploader = require('../config/cloudinary.config')
const ClothingItem = require('../models/ClothingItem.model');

const router = require('express').Router();

router.get('/', (req, res, next) => {
    // const items = ClothingItem.find();
    res.json('test')
});

router.post('/add-item', (req, res, next) => {
    ClothingItem.create(req.body)
    .then(response => res.status(201).json({ message: `Item created.`} ))
    .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
    
    if ( !req.file ) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    res.json({ fileUrl: req.file.path });

});


module.exports = router;