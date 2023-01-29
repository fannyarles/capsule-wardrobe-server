const { categories } = require('../data/itemsParams.data');
const router = require('express').Router();
const User = require('../models/User.model');
const ClothingItem = require('../models/ClothingItem.model');
const Outfit = require('../models/Outfit.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');


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

    // ONE-PIECE OUTFIT GENERATOR
    if (category === 'onePiece' || category === '') {
        let onePieceItems = filteredItems.filter(item => item.type === "One-Pieces");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem) { onePieceItems = onePieceItems.filter(item => item.category === pieceItem) }

        // CREATE OUTFITS BY ADDING SHOES
        onePieceItems.forEach(item => {
            const randNum = Math.floor(Math.random() * footwearItems.length);
            const randShoes = footwearItems[randNum];
            const newoutfit = { type: "onePiece", piece: item, footwear: randShoes };
        });

    };

    // TWO-PIECE OUTFIT GENERATOR
    if (category === 'twoPiece' || category === '') {
        let topsItems = filteredItems.filter(item => item.type === "Tops");
        let bottomsItems = filteredItems.filter(item => item.type === "Bottoms");

        // IF PIECE ITEM SPECIFIED, FILTER MORE
        if (pieceItem) { bottomsItems = bottomsItems.filter(item => item.category === pieceItem) }

        // MATCH TOPS WITH BOTTOMS
        filteredItems.forEach(item => {

            // If "Tops", add "Bottoms"
            if (item.type === 'Tops') {
                const randNumBottoms = Math.floor(Math.random() * bottomsItems.length);
                const randBottoms = bottomsItems[randNumBottoms];
                const randNumShoes = Math.floor(Math.random() * footwearItems.length);
                const randShoes = footwearItems[randNumShoes];
                const newoutfit = { type: "twoPiece", top: item, bottoms: randBottoms, footwear: randShoes };
                outfits.push(newoutfit);
            }

            // If "Bottoms", add "Tops"
            if (item.type === 'Bottoms') {
                const randNumTop = Math.floor(Math.random() * topsItems.length);
                const randTop = topsItems[randNumTop];
                const randNumShoes = Math.floor(Math.random() * footwearItems.length);
                const randShoes = footwearItems[randNumShoes];
                const newoutfit = { type: "twoPiece", top: randTop, bottoms: item, footwear: randShoes };
                outfits.push(newoutfit);
            }

        });

    }

    console.log(outfits.length)
    res.status(200).json(outfits)

    // if (!items.length) { res.status(400).json({ message: `You have no outfits matching these choices.` }); return; };

    // if (pieceItem !== 'any') { filteredItems = filteredItems.filter(item => item.category === pieceItem) };

});

router.post('/save', isAuthenticated, (req, res, next) => {
    req.body.ownerId = req.payload.id;
    Outfit.create(req.body)
        .then(outfit => User.findByIdAndUpdate(req.payload.id, { $push: { outfits: outfit._id } }))
        .then(() => res.status(201).json({ message: `Item created.` }))
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

module.exports = router;