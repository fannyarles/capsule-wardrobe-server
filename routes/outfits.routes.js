const { categories } = require('../data/itemsParams.data');
const router = require('express').Router();
const ClothingItem = require('../models/ClothingItem.model')


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
            outfits.push([item, randShoes]);
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

            const randNum = Math.floor(Math.random() * footwearItems.length);
            const randShoes = footwearItems[randNum];

            // If "Tops", add "Bottoms"
            if (item.type === 'Tops') {
                const randNum = Math.floor(Math.random() * bottomsItems.length);
                const randBottoms = bottomsItems[randNum];
                const newoutfit = [item, randBottoms, randShoes];
                if (outfits.indexOf(newoutfit) === -1) outfits.push(newoutfit);
            }

            // If "Bottoms", add "Tops"
            if (item.type === 'Bottoms') {
                const randNum = Math.floor(Math.random() * topsItems.length);
                const randTop = topsItems[randNum];
                const newoutfit = [randTop, item, randShoes];
                if (outfits.indexOf(newoutfit) === -1) outfits.push(newoutfit);
            }

        });

    }

    console.log(outfits.length)
    res.status(200).json(outfits)

    // if (!items.length) { res.status(400).json({ message: `You have no outfits matching these choices.` }); return; };

    // if (pieceItem !== 'any') { filteredItems = filteredItems.filter(item => item.category === pieceItem) };

});

module.exports = router;