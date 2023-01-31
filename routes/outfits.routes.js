const { categories } = require('../data/itemsParams.data');
const router = require('express').Router();
const User = require('../models/User.model');
const ClothingItem = require('../models/ClothingItem.model');
const Outfit = require('../models/Outfit.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

router.get('/view/:outfitId', (req, res, next) => {
    Outfit.findById(req.params.outfitId)
        .populate('top')
        .populate('bottoms')
        .populate('piece')
        .populate('footwear')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.post('/random', async (req, res, next) => {
    const { category, pieceItem, occasion } = req.body;
    const outfits = [];

    const items = await ClothingItem.find()
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }));

    if (!items.length) { res.status(400).json({ message: `You have no pieces in your wardrobe yet.` }); return; };

    let filteredItems = [...items];

    // FILTER BY OCCASION
    if (occasion) { filteredItems = filteredItems.filter(el => el.occasions.includes(occasion)); }
    if (!items.length) { res.status(400).json({ message: `You have no '${occasion} pieces in your wardrobe yet.` }); return; };

    // GET SHOES
    const footwearItems = filteredItems.filter(item => item.type === "Footwear");
    const getRandShoes = () => footwearItems[Math.floor(Math.random() * footwearItems.length)];

    // GET LAYER
    const layerItems = filteredItems.filter(item => item.type === "Layers");
    const getRandLayers = () => layerItems[Math.floor(Math.random() * layerItems.length)];

    // ONE-PIECE OUTFIT GENERATOR
    if (category === 'onePiece' || category === '') {
        let onePieceItems = filteredItems.filter(item => item.type === "One-Pieces");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem) { onePieceItems = onePieceItems.filter(item => item.category === pieceItem) }

        // CREATE OUTFITS BY ADDING SHOES
        onePieceItems.forEach(item => {
            const newoutfit = { type: "onePiece", piece: item, footwear: getRandShoes(), layers: getRandLayers() };
            outfits.push(newoutfit);
        });

    };

    // TWO-PIECE OUTFIT GENERATOR
    if (category === 'twoPiece' || category === '') {
        let topsItems = filteredItems.filter(item => item.type === "Tops");
        let bottomsItems = filteredItems.filter(item => item.type === "Bottoms");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem) { bottomsItems = bottomsItems.filter(item => item.category === pieceItem) }

        // MATCH TOPS WITH BOTTOMS
        topsItems.forEach(item => {
            const randBottoms = bottomsItems[Math.floor(Math.random() * bottomsItems.length)];
            const newoutfit = { type: "twoPiece", top: item, bottoms: randBottoms, footwear: getRandShoes(), layers: getRandLayers() };
            outfits.push(newoutfit);
        });

        // MATCH BOTTOMS WITH TOPS
        bottomsItems.forEach(item => {
            const randTop = topsItems[Math.floor(Math.random() * topsItems.length)];
            const newoutfit = { type: "twoPiece", top: randTop, bottoms: item, footwear: getRandShoes(), layers: getRandLayers() };
            outfits.push(newoutfit);
        });

    }

    const results = { occasion: occasion, outfits: outfits }
    res.status(200).json(results);

});

router.post('/save', isAuthenticated, (req, res, next) => {
    req.body.ownerId = req.payload.id;
    Outfit.create(req.body)
        .then(outfit => {
            User.findByIdAndUpdate(req.payload.id, { $push: { outfits: outfit._id } });
        })
        .then(() => res.status(201).json({ message: `Item created.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.put('/save/:outfitId', isAuthenticated, (req, res, next) => {
    Outfit.findByIdAndUpdate(req.params.outfitId, req.body)
        .then(() => res.status(201).json({ message: `Item updated.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/saved', isAuthenticated, (req, res, next) => {
    Outfit.find({ ownerId: req.payload.id })
        .populate('top')
        .populate('bottoms')
        .populate('piece')
        .populate('footwear')
        .then(outfits => res.status(200).json(outfits))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.delete('/delete/:outfitId', (req, res, next) => {
    Outfit.findByIdAndDelete({ _id: req.params.outfitId })
        .then(deletedOutfit => {
            return User.findByIdAndUpdate(deletedOutfit.ownerId, { $pull: { outfits: deletedOutfit._id } })
                .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
        })
        .then(response => res.status(200).json({ message: `Item deleted.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

module.exports = router;