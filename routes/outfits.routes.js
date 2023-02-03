const { categories } = require('../data/itemsParams.data');
const router = require('express').Router();
const User = require('../models/User.model');
const ClothingItem = require('../models/ClothingItem.model');
const Outfit = require('../models/Outfit.model');
const Category = require('../models/Category.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

router.get('/view/:outfitId', isAuthenticated, (req, res, next) => {
    Outfit.findById(req.params.outfitId)
        .populate('top')
        .populate('bottoms')
        .populate('piece')
        .populate('footwear')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/random/:occasion/:category/:pieceItem', isAuthenticated, async (req, res, next) => {
    const { occasion, category, pieceItem } = req.params;
    const results = { occasion: occasion, outfits: [] }

    if (category === '1') { if (!['any', 'Dress', 'Pantsuit'].includes(pieceItem)) { res.status(200).json(results); return; } }
    if (category === '2') { if (!['any', 'Pants', 'Skirt'].includes(pieceItem)) { res.status(200).json(results); return; } }

    const outfits = [];
    const outfitsStr = [];

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
    if (category === '1' || category === 'any') {
        let onePieceItems = filteredItems.filter(item => item.type === "One-Pieces");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem !== "any") { onePieceItems = onePieceItems.filter(item => item.category === pieceItem) }

        // CREATE OUTFITS BY ADDING SHOES
        onePieceItems.forEach(item => {
            const newoutfit = { type: "1", piece: item, footwear: getRandShoes(), layers: getRandLayers() };
            const strOutfit = `${newoutfit.piece}|${newoutfit.footwear}`;
            if (!outfitsStr.includes(strOutfit)) {
                outfits.push(newoutfit);
                outfitsStr.push(strOutfit)
            }
        });

    };

    // TWO-PIECE OUTFIT GENERATOR
    if (category === '2' || category === 'any') {
        let topsItems = filteredItems.filter(item => item.type === "Tops");
        let bottomsItems = filteredItems.filter(item => item.type === "Bottoms");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem !== "any") { bottomsItems = bottomsItems.filter(item => item.category === pieceItem) }

        // MATCH TOPS WITH BOTTOMS
        topsItems.forEach(item => {
            const randBottoms = bottomsItems[Math.floor(Math.random() * bottomsItems.length)];
            const newoutfit = { type: "2", top: item, bottoms: randBottoms, footwear: getRandShoes(), layers: getRandLayers() };
            const strOutfit = `${newoutfit.top}|${newoutfit.bottoms}}|${newoutfit.footwear}`;
            if (!outfitsStr.includes(strOutfit)) {
                outfits.push(newoutfit);
                outfitsStr.push(strOutfit)
            }
        });

        // MATCH BOTTOMS WITH TOPS
        bottomsItems.forEach(item => {
            const randTop = topsItems[Math.floor(Math.random() * topsItems.length)];
            const newoutfit = { type: "2", top: randTop, bottoms: item, footwear: getRandShoes(), layers: getRandLayers() };
            const strOutfit = `${newoutfit.top}|${newoutfit.bottoms}}|${newoutfit.footwear}`;
            if (!outfitsStr.includes(strOutfit)) {
                outfits.push(newoutfit);
                outfitsStr.push(strOutfit)
            }
        });

    }

    res.status(200).json({ occasion: occasion, outfits: outfits });

});

router.post('/save', isAuthenticated, (req, res, next) => {
    req.body.ownerId = req.payload.id;
    Outfit.create(req.body)
        .then(outfit => {
            User.findByIdAndUpdate(req.payload.id, { $push: { outfits: outfit._id } })

            if (req.body.type === '1') ClothingItem.findByIdAndUpdate(req.body.piece, { $push: { outfits: outfit._id } }).catch(err => console.log(err));
            if (req.body.type === '2') {
                ClothingItem.findByIdAndUpdate(req.body.top, { $push: { outfits: outfit._id } }).catch(err => console.log(err));
                ClothingItem.findByIdAndUpdate(req.body.bottoms, { $push: { outfits: outfit._id } }).catch(err => console.log(err));
            }
            ClothingItem.findByIdAndUpdate(req.body.footwear, { $push: { outfits: outfit._id } }).catch(err => console.log(err));

            Category.findOneAndUpdate({ slug: req.body.occasion }, { $push: { outfits: outfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }));
        })
        .then(() => res.status(201).json({ message: `Item created.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.put('/save/:outfitId', isAuthenticated, (req, res, next) => {
    Outfit.findByIdAndUpdate(req.params.outfitId, req.body)
        .then(oldOutfit => {

            // remove outfit id from old items
            if (oldOutfit.type === '1') ClothingItem.findByIdAndUpdate(oldOutfit.piece, { $pull: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
            if (oldOutfit.type === '2') {
                ClothingItem.findByIdAndUpdate(oldOutfit.top, { $pull: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
                ClothingItem.findByIdAndUpdate(oldOutfit.bottoms, { $pull: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
            }
            ClothingItem.findByIdAndUpdate(oldOutfit.footwear, { $pull: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));

            // add outfit to new items selected
            if (oldOutfit.type === '1') ClothingItem.findById(req.body.piece, { $push: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
            if (oldOutfit.type === '2') {
                ClothingItem.findByIdAndUpdate(req.body.top, { $push: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
                ClothingItem.findByIdAndUpdate(req.body.bottoms, { $push: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));
            }
            ClothingItem.findByIdAndUpdate(req.body.footwear, { $push: { outfits: oldOutfit._id } }).catch(err => console.log(`Internal Server Error.`));

        })
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

router.delete('/delete/:outfitId', isAuthenticated, (req, res, next) => {
    Outfit.findByIdAndDelete({ _id: req.params.outfitId })
        .then(deletedOutfit => {
            User.findByIdAndUpdate(deletedOutfit.ownerId, { $pull: { outfits: deletedOutfit._id } })
                .catch(err => res.status(500).json({ message: `Internal Server Error.` }))

            // remove outfit id from old items
            if (deletedOutfit.type === '1') ClothingItem.findByIdAndUpdate(deletedOutfit.piece, { $pull: { outfits: deletedOutfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }))
            if (deletedOutfit.type === '2') {
                ClothingItem.findByIdAndUpdate(deletedOutfit.top, { $pull: { outfits: deletedOutfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }))
                ClothingItem.findByIdAndUpdate(deletedOutfit.bottoms, { $pull: { outfits: deletedOutfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }))
            }
            ClothingItem.findByIdAndUpdate(deletedOutfit.footwear, { $pull: { outfits: deletedOutfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }))

            Category.findOneAndUpdate({ slug: deletedOutfit.occasion }, { $pull: { outfits: deletedOutfit._id } }).catch(err => res.status(500).json({ message: `Internal Server Error.` }));
        })
        .then(() => res.status(200).json({ message: `Item deleted.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }))
});

router.get('/cat/top5', isAuthenticated, (req, res, next) => {
    Outfit.find({ ownerId: req.payload.id })
        .then(response => {
            const catResults = [{ name: "casual", count: 0 }, { name: "formal", count: 0 }, { name: "business", count: 0 }, { name: "sportswear", count: 0 }]
            const outfitsData = [...response];
            outfitsData.map(el => {
                switch (el.occasion) {
                    case "casual":
                        catResults[0].count++
                        break;
                    case "Formal":
                        catResults[1].count++
                        break;
                    case "business":
                        catResults[2].count++
                        break;
                    case "sportswear":
                        catResults[3].count++
                        break;
                }
            })
            catResults.sort((a, b) => b.count - a.count);
            res.status(200).json(catResults)
        })
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }));
});

module.exports = router;