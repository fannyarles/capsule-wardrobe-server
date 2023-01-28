const fileUploader = require('../config/cloudinary.config')
const ClothingItem = require('../models/ClothingItem.model');
const User = require('../models/User.model');
const { Schema } = require('mongoose');
const { categories } = require('../data/itemsParams.data');

const router = require('express').Router();

const getItemMainCategory = (item) => categories.find(el => el.items.includes(item.category)).name;


router.get('/user/:userId', (req, res, next) => {
    ClothingItem.find({ ownerId: req.params.userId })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/item/add', (req, res, next) => {

    req.body.type = getItemMainCategory(req.body)

    ClothingItem.create(req.body)
        .then(item => User.findByIdAndUpdate(req.body.ownerId, { $push: { items: item._id } }))
        .then(() => res.status(201).json({ message: `Item created.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/item/uploadPic', fileUploader.single('imageUrl'), (req, res, next) => {

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }

    res.json({ fileUrl: req.file.path });

});

router.get('/item/:itemId', (req, res, next) => {
    // res.json(req.params.itemId)
    ClothingItem.find({ _id: req.params.itemId })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/item/:itemId/updatePic', fileUploader.single('imageUrl'), (req, res, next) => {
    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }

    res.json({ fileUrl: req.file.path });
});

router.put('/item/:itemId', (req, res, next) => {

    req.body.type = getItemMainCategory(req.body)

    ClothingItem.findOneAndUpdate({ _id: req.params.itemId }, req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.delete('/item/:itemId', (req, res, next) => {
    // res.json(req.params.itemId)
    ClothingItem.findByIdAndDelete({ _id: req.params.itemId })
        .then(item => {
            return User.findByIdAndUpdate(item.ownerId, { $pull: { items: item._id } })
                .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
        })
        .then(response => res.status(200).json({ message: `Item deleted.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});


module.exports = router;