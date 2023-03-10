const { ObjectId } = require('mongodb');
const fileUploader = require('../config/cloudinary.config')
const ClothingItem = require('../models/ClothingItem.model');
const User = require('../models/User.model');
const { Schema } = require('mongoose');
const { categories } = require('../data/itemsParams.data');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

const router = require('express').Router();

const getItemMainCategory = (item) => categories.find(el => el.items.includes(item.category)).name;

router.get('/user/:userId', isAuthenticated, (req, res, next) => {
    ClothingItem.find({ ownerId: req.params.userId })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/item/add', isAuthenticated, (req, res, next) => {

    req.body.type = getItemMainCategory(req.body)

    ClothingItem.create(req.body)
        .then(item => User.findByIdAndUpdate(req.body.ownerId, { $push: { items: item._id } }))
        .then(() => res.status(201).json({ message: `Item created.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/item/uploadPic', isAuthenticated, fileUploader.single('imageUrl'), (req, res, next) => {

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }

    res.json({ fileUrl: req.file.path });

});

router.get('/item/:itemId', isAuthenticated, (req, res, next) => {
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

router.put('/item/:itemId', isAuthenticated, (req, res, next) => {

    req.body.type = getItemMainCategory(req.body)

    ClothingItem.findOneAndUpdate({ _id: req.params.itemId }, req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.delete('/item/:itemId', isAuthenticated, (req, res, next) => {
    // res.json(req.params.itemId)
    ClothingItem.findByIdAndDelete({ _id: req.params.itemId })
        .then(item => {
            return User.findByIdAndUpdate(item.ownerId, { $pull: { items: item._id } })
                .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
        })
        .then(response => res.status(200).json({ message: `Item deleted.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/switch/:occasion/:itemType/:currId', isAuthenticated, (req, res, next) => {
    const { occasion, itemType, currId } = req.params;
    const { id } = req.payload;

    ClothingItem.find({ _id: { $ne: currId }, ownerId: id, occasions: { $in: occasion }, type: itemType })
        .then(response => {
            const randNum = Math.floor(Math.random() * response.length)
            res.status(200).json(response[randNum])
        })
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/items/top5/:userId', (req, res, next) => {

    ClothingItem.aggregate([
        {
            $project: {
                category: 1,
                type: 1,
                brand: 1,
                occasion: 1,
                imageUrl: 1,
                outfits: 1,
                ownerId: 1,
                length: { $cond: { if: { $isArray: "$outfits" }, then: { $size: "$outfits" }, else: 0 } }
            }
        }, {
            $match: {
                $and: [
                    { length: { $ne: 0 } },
                    { ownerId: ObjectId(req.params.userId) }
                ]
            }
        }, {
            $sort: { length: -1 },
        }, {
            $limit: 5
        }
    ]
    )
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }));
});


module.exports = router;