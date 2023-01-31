const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middlewares/jwt.middleware');
const User = require('../models/User.model');

router.get('/:userId', isAuthenticated, (req, res, next) => {
    if (req.params.userId !== req.payload.id) { res.status(403).json({ message: `Forbidden.` }); return; }

    User.findById(req.payload.id, { email: 1, avatarUrl: 1 })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }));
});

router.post('/upload', isAuthenticated, fileUploader.single('avatar'), (req, res, next) => {

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }

    res.json({ fileUrl: req.file.path });

});

router.post('/edit/:userId', isAuthenticated, (req, res, next) => {
    if (req.params.userId !== req.payload.id) { res.status(403).json({ message: `Forbidden.` }); return; }

    User.findByIdAndUpdate(req.payload.id, req.body)
        .then(response => res.status(200).json({ message: `User updated.` }))
        .catch(err => res.status(500).json({ message: `Internal Server Error.` }));

});

module.exports = router;