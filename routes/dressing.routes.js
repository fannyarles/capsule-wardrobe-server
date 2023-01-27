const fileUploader = require('../config/cloudinary.config')
const ClothingItem = require('../models/ClothingItem.model');
const User = require('../models/User.model');

const router = require('express').Router();


router.post('/add-item', (req, res, next) => {
    ClothingItem.create(req.body)
    .then(item => User.findByIdAndUpdate(req.body.ownerId, { $push: { items: item._id } }))
    .then(() => res.status(201).json({ message: `Item created.`} ))
    .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
    
    if ( !req.file ) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    res.json({ fileUrl: req.file.path });

});

router.get('/user/:userId', (req, res, next) => {
    ClothingItem.find({ ownerId: req.params.userId })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});


module.exports = router;